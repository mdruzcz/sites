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
          // @ts-expect-error - umami runtime
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
      <div id="quote-success" className={`${variant === "card" ? "card" : ""} p-8 text-center`}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(124, 58, 237, 0.2))",
            border: "1px solid rgba(0, 229, 255, 0.4)",
          }}
        >
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent</h3>
        <p className="text-muted-strong mb-1">
          We'll be in touch within {site.responseTime}.
        </p>
        <p className="text-muted text-sm">
          For immediate help, call{" "}
          <a href={site.phoneHref} className="text-accent font-semibold hover:underline">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-surface px-3 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className={`${variant === "card" ? "card card-glow" : ""} p-6 sm:p-7 space-y-4`}>
      <div>
        <h3 className="text-xl font-bold mb-1 text-white">Get a Free Show Quote</h3>
        <p className="text-sm text-muted">No-obligation. We reply within {site.responseTime}.</p>
      </div>

      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider">Name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider">Phone *</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider">Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div>
        <label htmlFor="address" className="block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider">Project City</label>
        <input id="address" name="address" type="text" placeholder="e.g. Toronto, ON" autoComplete="address-level2" className={inputClass} />
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider">Project Type *</label>
        <select id="service" name="service" required defaultValue={defaultService || ""} className={inputClass}>
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Custom / Multiple">Custom / Multiple Services</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-muted-strong mb-1.5 uppercase tracking-wider">Project Details</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Venue type, scale, soundtrack, target dates, anything else helpful…"
          className={`${inputClass} resize-y`}
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />

      <button
        type="submit"
        disabled={status === "sending" || !token}
        className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Sending…
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

      <p className="text-xs text-center text-muted">
        No spam. We only contact you about your quote.
      </p>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or call {site.phone}.
        </p>
      )}
    </form>
  );
}
