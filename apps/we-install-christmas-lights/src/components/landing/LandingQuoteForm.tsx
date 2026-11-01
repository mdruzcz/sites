"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { CameraIcon, CheckIcon, CloseIcon } from "../icons";
import { site } from "@/lib/site";
import { getAttribution, trackConversion } from "@/lib/ads";
import { PACKAGE_EVENT, jumpToForm, type PackageChoice } from "./landing-events";

type Status = "idle" | "submitting" | "success" | "error";
type Photo = { name: string; type: string; data: string; previewUrl: string };
type Suggestion = { text: string };

const MAX_SIDE = 1800;
// Edge routes cap the request body near 4 MB and base64 adds a third.
const MAX_BYTES = 2_400_000;
const UNFINISHED_AFTER_MS = 3 * 60 * 1000;

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

function toBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

/** Phone photos run 3-12 MB, so they are shrunk in the browser before sending. */
async function preparePhoto(file: File): Promise<Photo> {
  if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) {
    throw new Error("Please choose a photo of your home.");
  }
  let blob: Blob | null = null;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    for (const quality of [0.82, 0.68, 0.5]) {
      blob = await canvasToBlob(canvas, quality);
      if (blob && blob.size <= MAX_BYTES) break;
    }
  } catch {
    // Browsers that cannot decode the file (HEIC on desktop Chrome) send it untouched if it fits.
    blob = file;
  }
  if (!blob || blob.size > MAX_BYTES) {
    throw new Error("That photo is too large to send. Try another, or tick the Street View box below.");
  }
  const type = blob === file ? file.type || "image/heic" : "image/jpeg";
  const stem = file.name.replace(/\.[^.]+$/, "") || "home-photo";
  return {
    name: `${stem}${blob === file ? file.name.slice(stem.length) : ".jpg"}`,
    type,
    data: await toBase64(blob),
    previewUrl: URL.createObjectURL(blob),
  };
}

// ── Google Places (New) ─────────────────────────────────────────────────
// Only loads once someone focuses the address field. With no key set the field
// stays a plain text input with browser autofill.
type PlacesLib = {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (req: Record<string, unknown>) => Promise<{
      suggestions: { placePrediction?: { text: { toString(): string } } | null }[];
    }>;
  };
};
let placesPromise: Promise<PlacesLib> | null = null;

function loadPlaces(apiKey: string) {
  if (placesPromise) return placesPromise;
  placesPromise = new Promise<PlacesLib>((resolve, reject) => {
    const w = window as unknown as Record<string, unknown> & { google?: { maps: { importLibrary: (n: string) => Promise<unknown> } } };
    w.__wiclPlacesReady = () => {
      w.google?.maps.importLibrary("places").then((lib) => resolve(lib as PlacesLib), reject);
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=__wiclPlacesReady`;
    s.async = true;
    s.onerror = () => reject(new Error("Places failed to load"));
    document.head.appendChild(s);
  });
  return placesPromise;
}

function AddressField({ value, onChange, label, center, error, inputClass }: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  center: { lat: number; lng: number };
  error?: string;
  inputClass: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [items, setItems] = useState<Suggestion[]>([]);
  const session = useRef<unknown>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function lookup(input: string) {
    if (timer.current) clearTimeout(timer.current);
    if (!apiKey || input.trim().length < 3) { setItems([]); return; }
    timer.current = setTimeout(async () => {
      try {
        const places = await loadPlaces(apiKey);
        session.current ??= new places.AutocompleteSessionToken();
        const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: session.current,
          includedRegionCodes: ["ca"],
          locationBias: { center, radius: 30000 },
        });
        setItems(suggestions.flatMap((s) => (s.placePrediction ? [{ text: s.placePrediction.text.toString() }] : [])).slice(0, 5));
      } catch {
        setItems([]);
      }
    }, 220);
  }

  return (
    <div className="relative sm:col-span-2">
      <label htmlFor="lp-address" className="lp-label">{label}</label>
      <input
        id="lp-address"
        name="address"
        autoComplete="street-address"
        required
        value={value}
        aria-invalid={!!error}
        onChange={(e) => { onChange(e.target.value); lookup(e.target.value); }}
        onFocus={() => { if (apiKey) void loadPlaces(apiKey).catch(() => undefined); }}
        onBlur={() => setTimeout(() => setItems([]), 150)}
        className={inputClass}
        placeholder="Start typing your street"
      />
      {items.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-[color:var(--border)] bg-white shadow-xl">
          {items.map((it) => (
            <li key={it.text}>
              <button
                type="button"
                className="block min-h-[44px] w-full px-3.5 py-2.5 text-left text-sm text-[color:var(--ink-strong)] hover:bg-[color:var(--bg-cream)]"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onChange(it.text); setItems([]); session.current = null; }}
              >
                {it.text}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

const track = (name: string, data?: Record<string, string>) =>
  (window as unknown as { umami?: { track: (n: string, d?: Record<string, string>) => void } }).umami?.track(name, data);

/**
 * Two-step quote form for PPC landing pages. Step 1 takes contact details, step 2
 * takes the home photo or a Street View opt-in. The photo reaches the team as an
 * email attachment through /api/contact, same route as the site's other forms.
 */
export function LandingQuoteForm({ city, areaLabel, center, source }: {
  city: string;
  areaLabel: string;
  center: { lat: number; lng: number };
  source: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [choice, setChoice] = useState<PackageChoice | null>(null);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [useStreetView, setUseStreetView] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [stalled, setStalled] = useState(false);
  // The captcha script only loads once someone starts on the form, which keeps first paint fast.
  const [armed, setArmed] = useState(false);
  const tokenRef = useRef<string | null>(null);
  const leadSent = useRef(false);
  const turnstile = useRef<TurnstileInstance | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const onPick = (e: Event) => { setChoice((e as CustomEvent<PackageChoice>).detail); setArmed(true); };
    window.addEventListener(PACKAGE_EVENT, onPick);
    return () => window.removeEventListener(PACKAGE_EVENT, onPick);
  }, []);

  useEffect(() => { tokenRef.current = token; }, [token]);

  // Step 1 is already a callable lead. If they stall or leave at the photo step, send what we have.
  useEffect(() => {
    if (step !== 2 || status === "success") return;
    const sendUnfinished = () => {
      if (leadSent.current || !tokenRef.current) return;
      const sent = navigator.sendBeacon("/api/contact", new Blob([JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city,
        propertyType: "Residential",
        service: choice?.lead ?? "Landing page quote",
        stage: "partial",
        source,
        turnstileToken: tokenRef.current,
        attribution: getAttribution(),
      })], { type: "application/json" }));
      if (!sent) return;
      leadSent.current = true;
      track("lp-unfinished-sent", { source });
      // Tokens are single use, so fetch a fresh one in case they come back and finish.
      tokenRef.current = null;
      setToken(null);
      turnstile.current?.reset();
    };
    const timer = setTimeout(sendUnfinished, UNFINISHED_AFTER_MS);
    window.addEventListener("pagehide", sendUnfinished);
    return () => { clearTimeout(timer); window.removeEventListener("pagehide", sendUnfinished); };
  }, [step, status, name, phone, address, city, choice, source]);

  useEffect(() => {
    if (step !== 2 || token) return;
    const t = setTimeout(() => setStalled(true), 15000);
    return () => clearTimeout(t);
  }, [step, token]);

  function nextStep(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Please enter a 10-digit phone number.";
    if (address.trim().length < 5) next.address = "Please enter your street address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setArmed(true);
    setStep(2);
    track("lp-step-1-complete", { source });
    setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
  }

  async function onFile(file?: File | null) {
    if (!file) return;
    setPhotoBusy(true);
    setErrorMsg(null);
    if (status === "error") setStatus("idle");
    try {
      const prepared = await preparePhoto(file);
      setPhoto((old) => { if (old) URL.revokeObjectURL(old.previewUrl); return prepared; });
      setUseStreetView(false);
      track("lp-photo-added", { source });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "We could not read that photo. Try another.");
    } finally {
      setPhotoBusy(false);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    if (form.get("website")) { setStatus("success"); return; }
    if (!photo && !useStreetView) {
      setStatus("error");
      setErrorMsg("Add a photo, or tick the box so we can use Street View.");
      return;
    }
    if (!token) {
      setStatus("error");
      setErrorMsg("Please wait a moment for the security check to finish, or call us.");
      return;
    }
    const finishingEarlierLead = leadSent.current;
    leadSent.current = true;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city,
          propertyType: "Residential",
          service: choice?.lead ?? "Landing page quote",
          message: finishingEarlierLead ? "They came back and finished after the earlier unfinished-quote email." : undefined,
          useStreetView: !photo && useStreetView,
          photo: photo ? { name: photo.name, type: photo.type, data: photo.data } : undefined,
          source,
          turnstileToken: token,
          attribution: getAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      track("quote-request", { type: "Residential", source, photo: photo ? "yes" : "street-view" });
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "form_submission", form: "landing-quote", type: "Residential" });
      trackConversion("quote", { phone });
      setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (err) {
      leadSent.current = finishingEarlierLead;
      turnstile.current?.reset();
      setToken(null);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    }
  }

  const input = "mt-1 min-h-[48px] w-full rounded-xl border border-[color:var(--border)] bg-white px-3.5 py-2.5 text-base text-[color:var(--ink-strong)] focus:border-[color:var(--brand-green)] focus:outline-none aria-[invalid=true]:border-red-500";

  if (status === "success") {
    return (
      <div ref={rootRef} id="quote-form" className="lp-form-card p-7 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-green)] text-white"><CheckIcon className="h-6 w-6" /></div>
        <h2 className="lp-heading mt-4 text-2xl">Thanks {name.split(" ")[0]}, we have it from here.</h2>
        <p className="mt-2 text-[color:var(--ink-soft)]">
          We&rsquo;ll send your custom design and quote within 24 hours. Need it sooner? Call{" "}
          <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} id="quote-form" className="lp-form-card p-5 sm:p-6" onFocusCapture={() => setArmed(true)}>
      <div className="flex items-center gap-2" aria-hidden>
        <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[color:var(--brand-red)]" : "bg-stone-200"}`} />
        <span className={`h-1.5 flex-1 rounded-full ${step === 2 ? "bg-[color:var(--brand-red)]" : "bg-stone-200"}`} />
      </div>

      {choice && (
        <p className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-[color:var(--bg-cream)] px-3 py-1.5 text-sm font-semibold text-[color:var(--ink-strong)]">
          {choice.label} package selected
          <button type="button" aria-label="Clear package" className="flex h-8 w-8 items-center justify-center" onClick={() => setChoice(null)}><CloseIcon className="h-4 w-4" /></button>
        </p>
      )}

      {step === 1 && (
        <form onSubmit={nextStep} noValidate className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--brand-red-deep)]">Step 1 of 2</p>
          <h2 className="lp-heading mt-1 text-xl sm:text-2xl">Get your fast {city} quote</h2>
          <p className="mt-0.5 text-sm text-[color:var(--ink-soft)]">Takes 60 seconds. Now booking November installs.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="lp-name" className="lp-label">Full name</label>
              <input id="lp-name" name="name" required autoComplete="name" value={name} aria-invalid={!!errors.name} onChange={(e) => setName(e.target.value)} className={input} />
              {errors.name && <p className="mt-1 text-xs font-semibold text-red-700">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="lp-phone" className="lp-label">Phone (SMS quote)</label>
              <input id="lp-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" value={phone} aria-invalid={!!errors.phone} onChange={(e) => setPhone(e.target.value)} className={input} />
              {errors.phone && <p className="mt-1 text-xs font-semibold text-red-700">{errors.phone}</p>}
            </div>
            <AddressField value={address} onChange={setAddress} label={`Street address (${areaLabel})`} center={center} error={errors.address} inputClass={input} />
          </div>
          <button type="submit" className="lp-cta mt-4 w-full">Next: Upload My Photo <span aria-hidden>→</span></button>
          <p className="mt-2.5 text-center text-xs leading-relaxed text-[color:var(--ink-soft)]">Free, no obligation. Tapping Next lets us text or call you about this quote only.</p>
          <p className="text-center text-xs text-[color:var(--ink-soft)]">Commercial property? <a className="inline-flex min-h-[44px] items-center font-semibold underline" href="/commercial-christmas-lighting">See commercial lighting</a></p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={submit} noValidate className="mt-4">
          <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--brand-red-deep)]">Step 2 of 2</p>
          <h2 className="lp-heading mt-1 text-xl sm:text-2xl">Snap &amp; upload for an accurate design</h2>

          {/* capture="environment" opens the rear camera on phones; desktop browsers ignore it. */}
          <input id="lp-photo-camera" type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = ""; }} />
          <input id="lp-photo-library" type="file" accept="image/*,.heic,.heif" className="sr-only" onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = ""; }} />

          {photo ? (
            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-[color:var(--border)]">
              <Image src={photo.previewUrl} alt="Your uploaded home photo" fill unoptimized className="object-cover" />
              <button type="button" onClick={() => { URL.revokeObjectURL(photo.previewUrl); setPhoto(null); }} className="absolute right-2 top-2 min-h-[44px] rounded-lg bg-black/70 px-3 text-sm font-semibold text-white">Replace</button>
            </div>
          ) : (
            <label
              htmlFor="lp-photo-camera"
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); void onFile(e.dataTransfer.files?.[0]); }}
              className={`mt-4 flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 text-center transition-colors ${dragging ? "border-[color:var(--brand-red)] bg-red-50" : "border-stone-300 bg-[color:var(--bg-cream)] hover:border-[color:var(--brand-red)]"}`}
            >
              <CameraIcon className="h-8 w-8 text-[color:var(--brand-red-deep)]" />
              <span className="mt-2 font-bold text-[color:var(--ink-strong)]">{photoBusy ? "Preparing your photo…" : "Drag & drop a front photo of your home here"}</span>
              <span className="mt-0.5 text-sm text-[color:var(--ink-soft)]">Or tap to upload from your phone camera</span>
            </label>
          )}
          {!photo && (
            <label htmlFor="lp-photo-library" className="mt-1 flex min-h-[44px] cursor-pointer items-center justify-center text-sm font-semibold text-[color:var(--brand-green)] underline lg:hidden">Choose from my photo library instead</label>
          )}
          <p className="mt-2 text-sm text-[color:var(--ink-soft)]"><strong className="text-[color:var(--ink-strong)]">Tip:</strong> Stand near the driveway or curb so we can clearly see the roofline.</p>

          <label className="mt-3 flex min-h-[44px] cursor-pointer items-start gap-2.5 text-sm text-[color:var(--ink-strong)]">
            <input type="checkbox" checked={useStreetView} disabled={!!photo} onChange={(e) => { setUseStreetView(e.target.checked); setErrorMsg(null); }} className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--brand-green)]" />
            <span>No photo handy? Use my address on Google Street View to estimate my roofline.</span>
          </label>

          {stalled && !token && (
            <p className="mt-2 text-xs text-[color:var(--ink-soft)]">Security check is taking a while. You can also call <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a> for a quote right now.</p>
          )}
          {errorMsg && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>}

          <button type="submit" disabled={status === "submitting" || photoBusy} className="lp-cta mt-3 w-full disabled:opacity-60">
            {status === "submitting" ? "Processing…" : "Submit my free design quote"}
          </button>
          <button type="button" onClick={() => { setStep(1); setErrorMsg(null); jumpToForm(); }} className="mt-1 min-h-[44px] w-full text-sm font-semibold text-[color:var(--ink-soft)] hover:text-[color:var(--ink-strong)]">← Back to my details</button>
        </form>
      )}

      {/* One widget across both steps. Interaction-only stays invisible unless Cloudflare needs a challenge. */}
      {siteKey && armed && (
        <div className="mt-2">
          <Turnstile ref={turnstile} siteKey={siteKey} options={{ theme: "light", size: "flexible", appearance: "interaction-only" }} onSuccess={(t) => { setToken(t); setStalled(false); }} onExpire={() => setToken(null)} onError={() => setToken(null)} />
        </div>
      )}
    </div>
  );
}
