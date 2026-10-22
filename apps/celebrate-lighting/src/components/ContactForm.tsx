"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

const SERVICES = [
  "Permanent Lighting — Free On-Site Demo",
  "Seasonal C9 Christmas Lights",
  "Commercial / Municipal Lighting",
  "Repair or Service on an Existing System",
  "Free AI Home Preview",
  "General Question",
];

/** The full contact form (/contact). Dark fields on a dark card. */
export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [token, setToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token, formId: "contact" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackFormSubmission("contact_form");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-light)] p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-[#04121a] flex items-center justify-center mx-auto mb-4"><Icon.Check strokeWidth={3} width={26} height={26} /></div>
        <h3 className="text-xl font-bold text-ink mb-2">Thanks, we’ve got your message.</h3>
        <p className="text-body leading-relaxed">We reply to every request within <strong>24 hours</strong>, usually sooner. If it’s urgent, call us at <a href={site.phoneHref} className="text-[var(--accent-ink)] font-semibold">{site.phone}</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="block text-sm font-semibold text-ink mb-1.5">Full name *</label>
          <input id="c-name" name="name" required autoComplete="name" className="field field-dark" />
        </div>
        <div>
          <label htmlFor="c-phone" className="block text-sm font-semibold text-ink mb-1.5">Phone *</label>
          <input id="c-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" className="field field-dark" />
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-semibold text-ink mb-1.5">Email *</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className="field field-dark" />
        </div>
        <div>
          <label htmlFor="c-address" className="block text-sm font-semibold text-ink mb-1.5">Address or city</label>
          <input id="c-address" name="address" autoComplete="street-address" placeholder="So we know where to come" className="field field-dark" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-service" className="block text-sm font-semibold text-ink mb-1.5">What are you interested in? *</label>
          <select id="c-service" name="service" required className="field field-dark" defaultValue={defaultService}>
            <option value="" disabled>Choose one</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="block text-sm font-semibold text-ink mb-1.5">Tell us about your home or project</label>
          <textarea id="c-message" name="message" placeholder="Storeys, roofline sections you want lit, colours you have in mind, timing…" className="field field-dark" />
        </div>
        <div className="sm:col-span-2">
          <fieldset>
            <legend className="block text-sm font-semibold text-ink mb-1.5">Preferred contact</legend>
            <div className="flex flex-wrap gap-2">
              {["Call", "Text", "Email"].map((m) => (
                <label key={m} className="chip cursor-pointer has-[:checked]:chip-active">
                  <input type="radio" name="preferredContact" value={m} defaultChecked={m === "Call"} className="sr-only" />
                  {m}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess={setToken} onExpire={() => setToken("")} options={{ size: "flexible", theme: "dark" }} />
      {status === "error" && <p className="text-sm text-red-400" role="alert">Something went wrong. Please try again, or call us at {site.phone}.</p>}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary btn-lg w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "loading" ? (<><span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" aria-hidden="true" /> Sending…</>) : "Send My Request"}
      </button>
      <p className="text-xs text-[var(--muted)]">We reply within 24 hours. No spam, no sharing your details.</p>
    </form>
  );
}
