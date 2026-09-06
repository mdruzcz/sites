"use client";

import { useState, useRef, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckIcon } from "./icons";

export const SERVICE_OPTIONS = ["Driveway Sealing", "Patio & Deck Sealing", "Stamped Concrete Sealing", "Decorative Concrete Sealing", "Walkway & Path Sealing", "Pool Deck Sealing", "Garage Floor Sealing", "Not sure yet"];
export const SHEEN_OPTIONS = ["High Gloss", "Semi-Gloss", "Matte", "Help me choose"];

export function QuoteForm({ city, service, light = false, compact = false }: { city?: string; service?: string; light?: boolean; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const okRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captcha = !!siteKey && !siteKey.startsWith("1x000");
  const input = light ? "input-light" : "input";
  const label = light ? "label label-light" : "label";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("website") ?? "").trim()) { setStatus("success"); return; }
    if (captcha && !token) { setError("Please complete the security check."); setStatus("error"); return; }
    setStatus("sending"); setError("");
    const sheen = String(f.get("sheen") ?? "");
    const message = [sheen ? `Preferred finish: ${sheen}.` : "", String(f.get("message") ?? "")].filter(Boolean).join(" ");
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.get("name"), phone: f.get("phone"), email: f.get("email"), address: f.get("address"), service: f.get("service"), message, token: token ?? "" }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || "Something went wrong. Please call us."); setStatus("error"); return; }
      setStatus("success");
      setTimeout(() => okRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch { setError("Network error. Please call us."); setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div ref={okRef} className={`rounded-lg p-8 text-center ${light ? "card" : "card-dark"}`}>
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--moss)] text-white"><CheckIcon className="w-7 h-7" /></div>
        <h3 className={`font-display mt-4 text-2xl ${light ? "" : "text-white"}`}>Request received</h3>
        <p className={`mt-2 text-sm ${light ? "text-[var(--ink-soft)]" : "text-white/70"}`}>We reply within one business day to book your free inspection.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => setEngaged(true)} className="grid gap-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div><label className={label} htmlFor="q-name">Name *</label><input id="q-name" name="name" required autoComplete="name" className={input} placeholder="Jane Smith" /></div>
        <div><label className={label} htmlFor="q-phone">Phone *</label><input id="q-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={input} placeholder="(519) 000-0000" /></div>
      </div>
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div><label className={label} htmlFor="q-email">Email *</label><input id="q-email" name="email" type="email" required autoComplete="email" className={input} placeholder="jane@email.com" /></div>
        <div><label className={label} htmlFor="q-address">City / address</label><input id="q-address" name="address" autoComplete="street-address" defaultValue={city ?? ""} className={input} placeholder="Woodstock" /></div>
      </div>
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div><label className={label} htmlFor="q-service">Surface *</label><select id="q-service" name="service" required defaultValue={service ?? ""} className={input}><option value="" disabled>Select…</option>{SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
        <div><label className={label} htmlFor="q-sheen">Finish</label><select id="q-sheen" name="sheen" defaultValue="" className={input}><option value="">High gloss, semi-gloss or matte?</option>{SHEEN_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
      </div>
      {!compact && <div><label className={label} htmlFor="q-message">Details</label><textarea id="q-message" name="message" rows={3} className={`${input} resize-none`} placeholder="Approximate size, stamped or broom finish, sealed before, timing…" /></div>}
      {captcha && engaged && <Turnstile siteKey={siteKey!} onSuccess={setToken} onExpire={() => setToken(null)} options={{ theme: light ? "light" : "dark", size: "flexible" }} />}
      {status === "error" && <p className="rounded bg-[var(--orange-soft)] px-4 py-2.5 text-sm text-[var(--orange-deep)]">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-orange w-full disabled:opacity-60">{status === "sending" ? "Sending…" : "Request my free quote"}</button>
      <p className={`text-center text-xs ${light ? "text-[var(--muted)]" : "text-white/50"}`}>Free inspection · No obligation · Reply within one business day</p>
    </form>
  );
}
