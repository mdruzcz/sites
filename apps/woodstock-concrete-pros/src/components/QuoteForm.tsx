"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const services = getServices();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-700 mb-2">Quote Request Sent!</h3>
        <p className="text-slate-600">
          We&apos;ll get back to you within 24 hours. For immediate assistance, call{" "}
          <a href={site.phoneHref} className="text-[var(--accent)] font-semibold">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-4">
      <h3 className="text-xl font-bold mb-2">Get a Free Quote</h3>

      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Service *</label>
        <select
          id="service"
          name="service"
          required
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Project Details</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell us about your project — size, current condition, timeline..."
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full disabled:opacity-50 min-h-[44px]"
      >
        {status === "sending" ? "Sending..." : "Request Free Quote"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please try again or call {site.phone}.
        </p>
      )}
    </form>
  );
}
