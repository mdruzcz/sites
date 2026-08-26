"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";

/**
 * Hero demo-booking form.
 *
 * Deliberately shorter than the full <QuoteForm /> on /contact: name,
 * phone, email and an optional address. No service picker — a hero
 * visitor is booking the demo, not shopping a service line, and every
 * extra required field costs conversions. `service` is sent as a fixed
 * value so the API's required-field check and the CRM both stay happy.
 *
 * Lives inside a white .card-light, so all text here uses explicit
 * dark classes rather than --foreground (which is near-white site-wide).
 *
 * The homepage renders this twice (hero + closing CTA), so field ids are
 * namespaced by `formId` — otherwise the duplicate ids would break every
 * label association on the page. `formId` also tags the GTM event so the
 * two placements can be compared.
 */
export function QuoteFormCompact({
  formId = "hero",
  serviceValue = "Free On-Site Demo",
  submitLabel,
  reassurance,
  successTitle,
  successBody,
}: {
  formId?: string;
  /** Written to the CRM `service` column so permanent and seasonal leads
      are distinguishable at a glance. */
  serviceValue?: string;
  submitLabel?: string;
  reassurance?: string;
  successTitle?: string;
  /** Permanent promises a live on-house demo; seasonal must not. */
  successBody?: React.ReactNode;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) return;
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service: serviceValue, turnstileToken }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackFormSubmission(`demo_form_${formId}`);
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border-2 border-[var(--accent)] bg-[#f0fdfb] p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1.5">{successTitle ?? "Demo request received"}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {successBody ?? (
            <>
              We&apos;ll call within <strong>24 hours</strong> to lock in a time. Then we come out, mount a
              live sample on your house, and light it up — no cost, no obligation.
            </>
          )}
        </p>
        <a href={site.phoneHref} className="mt-4 inline-block text-sm font-semibold text-[var(--accent-ink)] hover:underline">
          Sooner? Call {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor={`${formId}-name`} className="sr-only">Full name</label>
        <input id={`${formId}-name`} name="name" type="text" required autoComplete="name" placeholder="Full name *" className="field" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${formId}-phone`} className="sr-only">Phone</label>
          <input id={`${formId}-phone`} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="Phone *" className="field" />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="sr-only">Email</label>
          <input id={`${formId}-email`} name="email" type="email" required autoComplete="email" placeholder="Email *" className="field" />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-address`} className="sr-only">Address or city</label>
        <input
          id={`${formId}-address`}
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="Address or city (so we know where to come)"
          className="field"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
        onSuccess={(token) => setTurnstileToken(token)}
        options={{ size: "flexible" }}
      />

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please try again, or call us at {site.phone}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !turnstileToken}
        className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z" />
            </svg>
            Sending...
          </>
        ) : (
          <>{submitLabel ?? site.demo.cta} →</>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center leading-relaxed">
        {reassurance ?? "Free & no obligation. We reply within 24 hours and never share your details."}
      </p>
    </form>
  );
}
