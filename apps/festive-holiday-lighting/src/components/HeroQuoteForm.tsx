"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckIcon } from "./icons";

const SERVICES = [
  "Classic Christmas Lights (Seasonal)",
  "Permanent Holiday Lighting",
  "Commercial Lighting",
  "Municipal / BIA Lighting",
  "Tree Lighting",
  "Interior Holiday Decorating",
  "Not sure yet",
];

/**
 * Short quote form for hero sections. Posts to the same /api/contact route as
 * the full form, so leads land in the same table and inbox.
 */
export function HeroQuoteForm({ city, service, compact = false }: { city?: string; service?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const loadedAt = useRef(Date.now());
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (captcha && !token) {
      setError("Please complete the captcha.");
      setStatus("error");
      return;
    }
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const [first, ...rest] = name.split(/\s+/);
    form.set("first_name", first ?? "");
    form.set("last_name", rest.join(" "));
    form.set("_loaded", String(loadedAt.current));
    form.set("token", token ?? "");
    form.set("property_type", "");
    form.set("heard_about", "Website hero form");
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
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
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--pine)] text-white"><CheckIcon className="w-7 h-7" /></div>
        <h3 className="font-display mt-4 text-xl text-[var(--ink)]">Got it. Cameron will call you.</h3>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">We reply within 24 hours, usually the same day, with your free no-obligation quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => setEngaged(true)} className={`glass ${compact ? "p-5" : "p-6 md:p-7"}`}>
      <p className="eyebrow-pill candy">Free quote</p>
      <h3 className="font-display mt-3 text-xl text-[var(--ink)] md:text-2xl">Get your holiday lighting quote</h3>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">Takes 30 seconds. We call or text back within 24 hours.</p>
      <div className="mt-4 grid gap-3">
        <div>
          <label className="label" htmlFor="hq-name">Name</label>
          <input id="hq-name" name="name" required autoComplete="name" className="input" placeholder="Jane Smith" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="hq-phone">Phone</label>
            <input id="hq-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className="input" placeholder="(289) 000-0000" />
          </div>
          <div>
            <label className="label" htmlFor="hq-email">Email</label>
            <input id="hq-email" name="email" type="email" required autoComplete="email" className="input" placeholder="jane@email.com" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="hq-city">City</label>
            <input id="hq-city" name="city" autoComplete="address-level2" defaultValue={city ?? ""} className="input" placeholder="Hamilton" />
          </div>
          <div>
            <label className="label" htmlFor="hq-service">Service</label>
            <select id="hq-service" name="service" required defaultValue={service ?? ""} className="input">
              <option value="" disabled>Select…</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <input type="hidden" name="message" value="" />
        {captcha && engaged && <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} options={{ theme: "light", size: "flexible" }} />}
        {status === "error" && <p className="rounded-xl bg-[var(--candy-soft)] px-4 py-2.5 text-sm text-[var(--candy-deep)]">{error}</p>}
        <button type="submit" disabled={status === "sending"} className="btn-candy w-full disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Request my free quote"}
        </button>
        <p className="text-center text-xs text-[var(--muted)]">No obligation · $5M insured · WSIB compliant</p>
      </div>
    </form>
  );
}
