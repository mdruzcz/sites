"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";

type Props = {
  defaultService?: string;
  variant?: "card" | "inline";
};

export function QuoteForm({ defaultService, variant = "card" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const services = getServices();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) { setStatus("error"); return; }
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.token = token;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        if (typeof window !== "undefined") {
          // @ts-expect-error - umami added at runtime
          window.umami?.track?.("form-submission", { type: "quote" });
        }
        const el = document.getElementById("quote-success");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div id="quote-success" className={variant === "card" ? "card p-8 text-center" : "p-8 text-center"}>
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide text-[var(--charcoal)] mb-2">
          Quote Request Sent!
        </h3>
        <p className="text-slate-600 mb-1">
          Thanks — we&apos;ll be in touch within {site.responseTime}.
        </p>
        <p className="text-slate-500 text-sm">
          For immediate help, call{" "}
          <a href={site.phoneHref} className="text-[var(--accent)] font-semibold">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${variant === "card" ? "card" : ""} p-6 sm:p-8 space-y-4`}>
      <div>
        <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--charcoal)] mb-1">Get a Free Quote</h3>
        <p className="text-sm text-[var(--concrete)] normal-case">No-obligation. We reply within {site.responseTime}.</p>
      </div>

      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5">Name *</label>
          <input id="name" name="name" type="text" required autoComplete="name"
            className="w-full rounded border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5">Phone *</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
            className="w-full rounded border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5">Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className="w-full rounded border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5">Service *</label>
        <select id="service" name="service" required defaultValue={defaultService || ""}
          className="w-full rounded border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent bg-white"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5">Project Details</label>
        <textarea id="message" name="message" rows={3}
          placeholder="Size, finish preference, timing..."
          className="w-full rounded border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-y"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />

      <button type="submit" disabled={status === "sending" || !token}
        className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center normal-case">
          Something went wrong. Please call {site.phone} directly.
        </p>
      )}
    </form>
  );
}
