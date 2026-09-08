"use client";
import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";

const WALL_TYPES = ["Not sure yet", "Interlocking block", "Poured concrete", "Timber", "Natural / armour stone", "Repair or rebuild"];

export default function QuoteForm({ compact = false, source = "" }: { compact?: boolean; source?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [token, setToken] = useState("");
  const [captchaState, setCaptchaState] = useState<"loading" | "ready" | "error">("loading");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const body = {
      name: `${fd.get("name") ?? ""} ${fd.get("last_name") ?? ""}`.trim(),
      email: fd.get("email"),
      phone: fd.get("phone"),
      city: fd.get("city"),
      wallType: fd.get("wall_type"),
      message: fd.get("message"),
      source,
      honeypot: fd.get("website"),
      token,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined" && (window as unknown as { umami?: { track: (n: string) => void } }).umami) (window as unknown as { umami: { track: (n: string) => void } }).umami.track("quote-submitted");
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full border border-[var(--line)] bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-stone focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
  const label = "mb-1 block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink-2";

  if (status === "success") {
    return (
      <div ref={successRef} className="border border-moss/30 bg-white p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center bg-moss text-white" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="mt-4 font-display text-xl font-extrabold uppercase">Request received</h3>
        <p className="mt-2 text-ink-2">Kyle reviews every request personally. Expect a call or email within one business day to book a site visit. Need it sooner? Call <a href={site.phoneHref} className="font-semibold text-accent-2">{site.phone}</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" aria-label="Free quote request">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid grid-cols-2 gap-3">
        <div><label className={label} htmlFor="q-name">First name *</label><input id="q-name" name="name" required autoComplete="given-name" className={input} /></div>
        <div><label className={label} htmlFor="q-last">Last name</label><input id="q-last" name="last_name" autoComplete="family-name" className={input} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={label} htmlFor="q-phone">Phone *</label><input id="q-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={input} placeholder="519-555-0100" /></div>
        <div><label className={label} htmlFor="q-email">Email *</label><input id="q-email" name="email" type="email" required autoComplete="email" className={input} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={label} htmlFor="q-city">Town / city</label><input id="q-city" name="city" autoComplete="address-level2" className={input} placeholder="London, St. Thomas…" /></div>
        <div>
          <label className={label} htmlFor="q-type">Wall type</label>
          <select id="q-type" name="wall_type" className={input} defaultValue={WALL_TYPES[0]}>
            {WALL_TYPES.map((w) => <option key={w}>{w}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="q-msg">Tell us about the wall</label>
        <textarea id="q-msg" name="message" rows={compact ? 2 : 4} className={input} placeholder="Approximate length and height, what is above and below it, any existing wall problems" />
      </div>
      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} onSuccess={(t) => { setToken(t); setCaptchaState("ready"); }} onError={() => setCaptchaState("error")} onExpire={() => setToken("")} options={{ size: "flexible" }} />
      {captchaState === "error" && <p className="text-sm text-red-700">The spam check failed to load. Please call {site.phone} instead.</p>}
      {status === "error" && <p className="text-sm text-red-700">Something went wrong sending your request. Please try again or call {site.phone}.</p>}
      <button type="submit" disabled={status === "submitting" || !token} className="btn btn-accent w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Request my free quote"}
      </button>
      <p className="text-center text-xs text-stone">Free written quote. No obligation. We reply within one business day.</p>
    </form>
  );
}
