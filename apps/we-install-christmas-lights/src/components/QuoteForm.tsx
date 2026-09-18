"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { CheckIcon } from "./icons";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const CITY_OPTIONS = [
  "London", "St. Thomas", "Strathroy", "Ingersoll", "Woodstock", "Kitchener", "Waterloo", "Cambridge", "Guelph",
  "Hamilton", "Ancaster", "Burlington", "Oakville", "Milton", "Georgetown", "Mississauga", "Brampton", "Etobicoke", "Other",
];

const SERVICE_OPTIONS: Record<"Residential" | "Commercial", string[]> = {
  Residential: ["Roofline Christmas lights", "Roofline + trees & shrubs", "Full property (Griswold)", "Wreaths, garland & décor", "Permanent Govee / Eufy lights", "Takedown or storage only", "Not sure yet"],
  Commercial: ["Storefront / plaza lighting", "Office or commercial building outline", "Tree wraps & lit cone trees", "Giant Christmas tree (indoor or outdoor)", "Lobby / atrium décor", "Multi-property program", "Special event or production"],
};

type Props = {
  /** "hero" = compact card for above-the-fold; "full" = the long contact form. */
  variant?: "hero" | "full";
  defaultType?: "Residential" | "Commercial";
  defaultCity?: string;
  source?: string;
  heading?: string;
  subheading?: string;
  className?: string;
};

/**
 * Single quote form used everywhere. Property type toggles the service list and
 * tags the lead as commercial in the email subject. Turnstile mounts on
 * visibility, and a watchdog shows a call fallback if no token arrives.
 */
export function QuoteForm({ variant = "full", defaultType = "Residential", defaultCity, source, heading, subheading, className = "" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<"Residential" | "Commercial">(defaultType);
  const [visible, setVisible] = useState(false);
  const [stalled, setStalled] = useState(false);
  const ref = useRef<TurnstileInstance | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hero = variant === "hero";

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { setVisible(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || token) return;
    const t = setTimeout(() => setStalled(true), 15000);
    return () => clearTimeout(t);
  }, [visible, token]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    if (form.get("website")) { setStatus("success"); return; }
    if (!token) { setErrorMsg("Please wait a moment for the security check to finish, or call us."); setStatus("error"); return; }
    setStatus("submitting");
    setErrorMsg(null);

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      city: String(form.get("city") || ""),
      propertyType: type,
      service: String(form.get("service") || ""),
      message: String(form.get("message") || ""),
      source: source || (typeof window !== "undefined" ? window.location.pathname : ""),
      turnstileToken: token,
    };

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      formEl.reset();
      ref.current?.reset();
      setToken(null);
      (window as unknown as { umami?: { track: (n: string, d?: Record<string, string>) => void } }).umami?.track("quote-request", { type, source: payload.source });
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "form_submission", form: "quote", type });
      setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    }
  }

  const input = "mt-1 w-full rounded-lg border border-[color:var(--border)] bg-white px-3.5 py-2.5 text-[15px] text-[color:var(--ink-strong)] focus:border-[color:var(--brand-green)] focus:outline-none min-h-[44px]";
  const label = "block text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]";

  if (status === "success") {
    return (
      <div ref={rootRef} className={`card p-8 text-center ${className}`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-green)] text-white"><CheckIcon className="h-6 w-6" /></div>
        <h3 className="heading-display mt-4 text-xl text-[color:var(--brand-green)]">Thanks, your request is in.</h3>
        <p className="mt-2 text-[color:var(--ink-soft)]">
          {type === "Commercial" ? "A commercial lighting specialist" : "We"} will reply with a free quote within 24 hours. Need it sooner? Call{" "}
          <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`card ${hero ? "p-5 sm:p-6" : "p-6 sm:p-8"} ${className}`}>
      {(heading || hero) && (
        <div className="mb-4">
          <h3 className="heading-display text-xl text-[color:var(--ink-strong)]">{heading ?? "Get your free quote"}</h3>
          <p className="mt-1 text-sm text-[color:var(--ink-soft)]">{subheading ?? "Reply within 24 hours. No obligation."}</p>
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
        <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />

        <div role="radiogroup" aria-label="Property type" className="grid grid-cols-2 gap-1 rounded-lg bg-[color:var(--bg-cream)] p-1">
          {(["Residential", "Commercial"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={type === t}
              onClick={() => setType(t)}
              className={`min-h-[40px] rounded-md text-sm font-bold transition-colors ${type === t ? "bg-[color:var(--brand-red)] text-white shadow-sm" : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink-strong)]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={hero ? "grid gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
          <div>
            <label htmlFor={`${variant}-name`} className={label}>Name *</label>
            <input id={`${variant}-name`} name="name" required autoComplete="name" className={input} placeholder={type === "Commercial" ? "Your name" : "Full name"} />
          </div>
          <div>
            <label htmlFor={`${variant}-phone`} className={label}>Phone *</label>
            <input id={`${variant}-phone`} name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={input} placeholder="(519) 555-0100" />
          </div>
          <div>
            <label htmlFor={`${variant}-email`} className={label}>Email *</label>
            <input id={`${variant}-email`} name="email" type="email" required autoComplete="email" className={input} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor={`${variant}-city`} className={label}>City</label>
            <select id={`${variant}-city`} name="city" defaultValue={defaultCity ?? ""} className={input}>
              <option value="">Select your city</option>
              {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${variant}-service`} className={label}>{type === "Commercial" ? "What does the property need?" : "What are you thinking of?"}</label>
            <select id={`${variant}-service`} name="service" className={input} defaultValue="">
              <option value="">Choose one</option>
              {SERVICE_OPTIONS[type].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {!hero && (
            <div className="sm:col-span-2">
              <label htmlFor={`${variant}-message`} className={label}>{type === "Commercial" ? "Property address, timing and any details" : "Tell us about your home (address helps us quote faster)"}</label>
              <textarea id={`${variant}-message`} name="message" rows={4} className={input} />
            </div>
          )}
          {hero && (
            <div className="sm:col-span-2">
              <label htmlFor={`${variant}-message`} className={label}>Address or notes (optional)</label>
              <input id={`${variant}-message`} name="message" className={input} placeholder={type === "Commercial" ? "Property address, number of buildings, deadline" : "Street address, roofline, trees you want lit"} />
            </div>
          )}
        </div>

        {siteKey && visible && (
          <div className="min-h-[65px]">
            <Turnstile ref={ref} siteKey={siteKey} options={{ theme: "light", size: "flexible" }} onSuccess={(t) => { setToken(t); setStalled(false); }} onExpire={() => setToken(null)} onError={() => setToken(null)} />
          </div>
        )}
        {stalled && !token && (
          <p className="text-xs text-[color:var(--ink-soft)]">Security check is taking a while. You can also call <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a> for a quote right now.</p>
        )}
        {errorMsg && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>}

        <button type="submit" disabled={status === "submitting"} className="btn btn-red w-full min-h-[48px] disabled:opacity-60">
          {status === "submitting" ? "Sending…" : type === "Commercial" ? "Request a Commercial Quote" : "Get My Free Quote"}
        </button>
        <p className="text-center text-xs text-[color:var(--ink-soft)]">{site.earlyBird.short} · Fully insured · 5.0★ Google rating</p>
      </form>
    </div>
  );
}
