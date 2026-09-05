"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckIcon } from "./icons";

export const SERVICE_OPTIONS = [
  "Driveway Sealing",
  "Patio Sealing",
  "Stamped Concrete Sealing",
  "Walkway Sealing",
  "Exposed Aggregate Sealing",
  "Commercial Sealing",
  "Not sure yet",
];

export const FINISH_OPTIONS = ["Matte", "Semi-Gloss", "Gloss", "Help me choose"];

/**
 * Short quote form for hero sections. Posts the same JSON shape as the full
 * form to /api/quote so leads land in the same table and inbox.
 */
export function HeroQuoteForm({ city, service, compact = false }: { city?: string; service?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (String(form.get("website") ?? "").trim()) {
      setStatus("success");
      return;
    }
    if (captcha && !token) {
      setError("Please complete the security check below.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          address: form.get("city"),
          service: form.get("service"),
          message: `Preferred finish: ${form.get("finish") || "not specified"}. Submitted from the website hero form.`,
          token: token ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please call us.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please call us.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass p-7 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--moss)] text-white"><CheckIcon className="w-7 h-7" /></div>
        <h3 className="font-display mt-4 text-xl text-[var(--ink)]">Got it. We&apos;ll be in touch.</h3>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">We reply within 4 business hours with next steps for your free site assessment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => setEngaged(true)} className={`glass ${compact ? "p-5" : "p-6 md:p-7"}`}>
      <p className="eyebrow-pill">Free quote</p>
      <h3 className="font-display mt-3 text-xl text-[var(--ink)] md:text-2xl">Get your concrete sealing quote</h3>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">Takes 30 seconds. We reply within 4 business hours.</p>
      <div className="mt-4 grid gap-3">
        <div>
          <label className="label" htmlFor="hq-name">Name</label>
          <input id="hq-name" name="name" required autoComplete="name" className="input" placeholder="Jane Smith" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="hq-phone">Phone</label>
            <input id="hq-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className="input" placeholder="(519) 000-0000" />
          </div>
          <div>
            <label className="label" htmlFor="hq-email">Email</label>
            <input id="hq-email" name="email" type="email" required autoComplete="email" className="input" placeholder="jane@email.com" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="hq-city">City</label>
            <input id="hq-city" name="city" autoComplete="address-level2" defaultValue={city ?? ""} className="input" placeholder="London" />
          </div>
          <div>
            <label className="label" htmlFor="hq-service">Surface</label>
            <select id="hq-service" name="service" required defaultValue={service ?? ""} className="input">
              <option value="" disabled>Select…</option>
              {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="hq-finish">Finish</label>
          <select id="hq-finish" name="finish" defaultValue="" className="input">
            <option value="">Matte, semi-gloss or gloss?</option>
            {FINISH_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        {captcha && engaged && <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} options={{ theme: "light", size: "flexible" }} />}
        {status === "error" && <p className="rounded-xl bg-[var(--accent-soft)] px-4 py-2.5 text-sm text-[var(--accent-deep)]">{error}</p>}
        <button type="submit" disabled={status === "sending"} className="btn-accent w-full disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Request my free quote"}
        </button>
        <p className="text-center text-xs text-[var(--muted)]">No obligation · Fully insured · 5-year warranty</p>
      </div>
    </form>
  );
}
