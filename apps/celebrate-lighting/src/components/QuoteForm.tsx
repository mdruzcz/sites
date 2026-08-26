"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";

/* "Free On-Site Demo" is first and preselected — it's the offer we lead
   with everywhere else, so the form shouldn't make people hunt for it. */
const services = [
  "Free On-Site Demo",
  "New Installation",
  "Repair Service",
  "Consultation",
  "Maintenance",
  "Replace Existing Lights",
];

export function QuoteForm() {
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
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackFormSubmission("quote_form");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl bg-[#f0fdfb] border-2 border-[var(--accent)] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Got it — request received</h3>
        <p className="text-slate-600 leading-relaxed">
          We&apos;ll call within <strong>24 hours</strong> to book your free on-site demo. We come out, mount
          a live sample section on your house, and turn it on so you can see it before you decide.
        </p>
        <a href={site.phoneHref} className="mt-4 inline-block text-sm font-semibold text-[var(--accent-ink)] hover:underline">
          Need us sooner? Call {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="(519) 555-0100"
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1.5">Home Address</label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="123 Main St, London, ON"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1.5">Service *</label>
        <select
          id="service"
          name="service"
          required
          defaultValue="Free On-Site Demo"
          className="field"
        >
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Project Details</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your home, any specific lighting ideas, or questions..."
          className="field resize-none"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
        onSuccess={(token) => setTurnstileToken(token)}
      />

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>
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
            Processing...
          </>
        ) : (
          <>{site.demo.cta} →</>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        Free &amp; no obligation. No spam, ever. We reply within 24 hours.
      </p>
    </form>
  );
}
