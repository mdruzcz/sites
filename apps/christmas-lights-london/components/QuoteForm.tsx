"use client";

import { useState, useRef, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";

const serviceOptions = [
  "Residential Installation",
  "Commercial Installation",
  "Custom Design",
  "Takedown & Storage",
  "Wreath/Garland",
  "Other",
];

interface QuoteFormProps {
  heading?: string;
  showPromise?: boolean;
  dark?: boolean;
}

export function QuoteForm({
  heading,
  showPromise = false,
  dark = false,
}: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (data.get("website_url")?.toString().trim()) {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          serviceType: data.get("serviceType"),
          message: data.get("message"),
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      trackFormSubmission("quote_form");
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        className={`rounded-xl p-8 text-center border ${
          dark
            ? "bg-green-950/40 border-green-500/30"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="text-4xl mb-4">🎄</div>
        <h3 className={`text-2xl font-bold mb-2 ${dark ? "text-green-400" : "text-green-700"}`}>
          Quote Request Received!
        </h3>
        <p className={dark ? "text-white/70" : "text-[var(--muted)]"}>
          Thank you! We&apos;ll review your property and get back to you within{" "}
          <strong className={dark ? "text-white" : "text-[var(--foreground)]"}>
            1 business day
          </strong>{" "}
          with your free quote.
        </p>
      </div>
    );
  }

  const inputClass = dark
    ? "w-full rounded-lg border border-[var(--border-dark)] bg-[var(--dark-surface)] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--accent-gold)] min-h-[44px] transition-colors"
    : "form-input min-h-[44px]";

  return (
    <div>
      {heading && (
        <h3
          className={`text-2xl font-bold mb-6 ${dark ? "text-white" : "text-[var(--foreground)]"}`}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          {heading}
        </h3>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="website_url"
          autoComplete="off"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            required
            autoComplete="name"
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
          <input
            type="text"
            name="address"
            placeholder="Property Address *"
            required
            autoComplete="street-address"
            className={inputClass}
          />
        </div>

        <select
          name="serviceType"
          required
          defaultValue=""
          className={
            dark
              ? "w-full rounded-lg border border-[var(--border-dark)] bg-[var(--dark-surface)] px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent-gold)] min-h-[44px] transition-colors"
              : "form-input min-h-[44px]"
          }
        >
          <option value="" disabled>
            Select Service Type *
          </option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Tell us about your property or any special requests (optional)"
          rows={4}
          className={
            dark
              ? "w-full rounded-lg border border-[var(--border-dark)] bg-[var(--dark-surface)] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors resize-none min-h-[100px]"
              : "form-input min-h-[100px] resize-none"
          }
        />

        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setTurnstileToken(token)}
          />
        )}

        {error && (
          <p className="text-red-400 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full justify-center min-h-[52px] text-base font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
            dark
              ? "bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white"
              : "btn btn-primary"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Get My Free Quote"
          )}
        </button>

        {showPromise && (
          <p
            className={`text-xs text-center ${
              dark ? "text-white/40" : "text-[var(--muted)]"
            }`}
          >
            No spam. We respond within 1 business day.
          </p>
        )}
      </form>
    </div>
  );
}
