"use client";

import Link from "next/link";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { getAttribution, trackFormSubmission } from "@/lib/gtm";
import { Icon } from "./Icons";

const COLOURS = ["Warm white (everyday)", "Cool white", "Multicolour / holiday", "Red & green (Christmas)", "Team colours", "Not sure, surprise me"];

/** Shrink the upload client-side so the request stays small and fast on mobile. */
async function compressImage(file: File, maxSide = 1600, quality = 0.82): Promise<string> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality);
}

export function AiPreviewForm({ formId = "ai", compact = false, onDone }: { formId?: string; compact?: boolean; onDone?: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [photoName, setPhotoName] = useState<string>("");
  const [token, setToken] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose a photo (JPG, PNG or HEIC).");
      return;
    }
    setError("");
    try {
      const dataUrl = await compressImage(file);
      setPhoto(dataUrl);
      setPhotoName(file.name);
    } catch {
      setError("We couldn't read that photo. Try a different one.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!photo) {
      setError("Add a photo of your home first.");
      return;
    }
    setStatus("loading");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/ai-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, photo, turnstileToken: token, formId, attribution: getAttribution() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      // Collects name, email and phone (all required), so it counts as a lead.
      trackFormSubmission(`ai_preview_${formId}`, { email: data.email, phone: data.phone });
      onDone?.();
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message !== "Failed" ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-light)] p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-[#04121a] flex items-center justify-center mx-auto mb-3">
          <Icon.Check strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-ink mb-1.5">Photo received. Your preview is on its way.</h3>
        <p className="text-sm text-body leading-relaxed">
          We’ll email your AI preview <strong>{site.aiPreview.turnaround}</strong>. Want to see it for real? We can also book your free on-site demo at the same time.
        </p>
        <Link href="/faq" className="mt-4 inline-block text-sm font-semibold text-[var(--accent-ink)] hover:underline">Questions? Read the FAQ</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {/* Photo */}
      <div
        className={`relative rounded-2xl border-2 border-dashed p-4 text-center transition-colors ${drag ? "border-[var(--accent)] bg-[var(--accent-light)]" : "border-[var(--border-strong)] bg-white/[0.03]"}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
      >
        <input
          ref={fileRef}
          id={`${formId}-photo`}
          name="photoFile"
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {photo ? (
          <div className="flex items-center gap-3 text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="Your uploaded home photo" className="w-20 h-16 object-cover rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink truncate">{photoName}</p>
              <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-[var(--accent-ink)] hover:underline min-h-[32px]">Change photo</button>
            </div>
          </div>
        ) : (
          <label htmlFor={`${formId}-photo`} className="flex flex-col items-center gap-2 cursor-pointer py-2 min-h-[44px]">
            <span className="icon-tile"><Icon.Upload /></span>
            <span className="text-sm font-semibold text-ink">Tap to add a photo of your home</span>
            <span className="text-xs text-[var(--muted)]">Front of the house from the street, whole roofline in frame. Day or dusk both work.</span>
          </label>
        )}
      </div>

      <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">Full name</label>
          <input id={`${formId}-name`} name="name" required autoComplete="name" placeholder="Full name *" className="field field-dark" />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="sr-only">Email</label>
          <input id={`${formId}-email`} name="email" type="email" required autoComplete="email" placeholder="Email (we send the preview here) *" className="field field-dark" />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="sr-only">Phone</label>
          <input id={`${formId}-phone`} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="Phone *" className="field field-dark" />
        </div>
        <div>
          <label htmlFor={`${formId}-city`} className="sr-only">City</label>
          <select id={`${formId}-city`} name="city" required className="field field-dark" defaultValue="">
            <option value="" disabled>City *</option>
            {site.serviceAreas.map((c) => <option key={c} value={c}>{c}</option>)}
            <option value="Other">Other (Southwestern Ontario)</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-colour`} className="sr-only">Colour preference</label>
          <select id={`${formId}-colour`} name="colour" className="field field-dark" defaultValue="">
            <option value="" disabled>Colour you’d like to see</option>
            {COLOURS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-notes`} className="sr-only">Notes</label>
            <textarea id={`${formId}-notes`} name="notes" placeholder="Anything we should know? (e.g. just the front, include the garage, interested in C9 too)" className="field field-dark !min-h-[90px]" />
          </div>
        )}
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
        onSuccess={setToken}
        onExpire={() => setToken("")}
        options={{ size: "flexible", theme: "dark" }}
      />

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-[#04121a]/30 border-t-[#04121a] animate-spin" aria-hidden="true" />
            Uploading…
          </>
        ) : (
          <>
            <Icon.Sparkle width={16} height={16} /> {site.aiPreview.cta}
          </>
        )}
      </button>
      <p className="text-[11px] text-[var(--muted)] text-center leading-snug">
        Free and no obligation. We only use your photo to build your preview. Preview emailed {site.aiPreview.turnaround}.
      </p>
    </form>
  );
}
