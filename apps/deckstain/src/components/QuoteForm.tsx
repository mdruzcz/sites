"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const services = [
  "Deck Staining",
  "Deck Cleaning",
  "Deck Sealing",
  "Deck Restoration",
  "Deck Refinishing",
  "Fence Staining",
  "Not Sure — Need Advice",
];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeyRef.current?.value) return; // honeypot triggered
    if (!token) {
      setErrorMessage("Please complete the security check.");
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Quote Request Received!</h3>
        <p className="text-green-700 text-sm">
          Thanks — we&apos;ll review your details and get back to you within{" "}
          <strong>2 business days</strong>. Check your email for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot */}
      <input ref={honeyRef} type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[var(--charcoal)] mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--charcoal)] placeholder-[var(--concrete)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent bg-white"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[var(--charcoal)] mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="519-555-0123"
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--charcoal)] placeholder-[var(--concrete)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent bg-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[var(--charcoal)] mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--charcoal)] placeholder-[var(--concrete)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent bg-white"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-[var(--charcoal)] mb-1.5">
          Service Needed <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent bg-white"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[var(--charcoal)] mb-1.5">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your deck (size, condition, location). You can also reply to our email with photos — we'll use them to prepare your quote."
          className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--charcoal)] placeholder-[var(--concrete)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent bg-white resize-none"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={setToken}
        options={{ theme: "light" }}
      />

      {errorMessage && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full text-sm"
      >
        {status === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </>
        ) : (
          "Get My Free Photo Quote"
        )}
      </button>

      <p className="text-xs text-[var(--concrete)] text-center">
        We&apos;ll reply within 2 business days. No obligation.
      </p>
    </form>
  );
}
