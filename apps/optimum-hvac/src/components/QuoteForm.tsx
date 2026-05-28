"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";

type FormType = "contact" | "quote" | "emergency";

type Props = {
  defaultService?: string;
  formType?: FormType;
  variant?: "card" | "inline";
};

export function QuoteForm({ defaultService, formType = "contact", variant = "card" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const services = getServices();

  const endpoint = formType === "emergency" ? "/api/emergency" : formType === "quote" ? "/api/quote" : "/api/contact";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) { setStatus("error"); return; }
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.token = token;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        if (typeof window !== "undefined") {
          // @ts-expect-error - dataLayer added at runtime
          window.dataLayer?.push?.({ event: "formSubmit", formType });
          // @ts-expect-error - umami added at runtime
          window.umami?.track?.("form-submission", { type: formType });
        }
        const el = document.getElementById("form-success");
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
      <div id="form-success" className={variant === "card" ? "card p-8 text-center" : "p-8 text-center"}>
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide text-[var(--navy)] mb-2">
          {formType === "emergency" ? "Emergency Request Received!" : "Quote Request Sent!"}
        </h3>
        <p className="text-slate-600 mb-1">
          {formType === "emergency"
            ? "Our emergency line will call you back within 15 minutes."
            : `Thanks — we'll be in touch ${site.responseTime}.`}
        </p>
        <p className="text-slate-500 text-sm">
          For immediate help, call{" "}
          <a href={site.phoneHref} className="text-[var(--heat)] font-semibold">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${variant === "card" ? "card" : ""} p-6 sm:p-8 space-y-4`}>
      <div>
        <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--navy)] mb-1">
          {formType === "emergency" ? "Request Emergency Service" : formType === "quote" ? "Get a Free Quote" : "Contact Us"}
        </h3>
        <p className="text-sm text-[var(--slate)] normal-case">
          {formType === "emergency"
            ? "We'll call you back within 15 minutes."
            : `No-obligation. We reply within ${site.responseTime}.`}
        </p>
      </div>

      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="form-label">Name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" className="form-input" />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Phone *</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className="form-input" />
      </div>

      {formType === "emergency" && (
        <div>
          <label htmlFor="address" className="form-label">Service Address *</label>
          <input id="address" name="address" type="text" required autoComplete="street-address" className="form-input" placeholder="Street address, city" />
        </div>
      )}

      <div>
        <label htmlFor="service" className="form-label">Service Needed *</label>
        <select id="service" name="service" required defaultValue={defaultService || ""} className="form-input">
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Emergency Repair">Emergency Repair</option>
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      {formType === "quote" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="propertyType" className="form-label">Property Type</label>
              <select id="propertyType" name="propertyType" className="form-input">
                <option value="">Select...</option>
                <option>Single Family Home</option>
                <option>Townhouse / Condo</option>
                <option>Commercial</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="systemAge" className="form-label">System Age (approx.)</label>
              <select id="systemAge" name="systemAge" className="form-input">
                <option value="">Select...</option>
                <option>Under 5 years</option>
                <option>5–10 years</option>
                <option>10–15 years</option>
                <option>15–20 years</option>
                <option>20+ years</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="form-label">
          {formType === "emergency" ? "Describe the Problem *" : "Additional Details"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required={formType === "emergency"}
          placeholder={formType === "emergency" ? "What is happening? Is there a gas smell? No heat?" : "Size, timing, any other details..."}
          className="form-input resize-y"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />

      <button
        type="submit"
        disabled={status === "sending" || !token}
        className={`btn w-full disabled:opacity-60 disabled:cursor-not-allowed ${formType === "emergency" ? "btn-navy" : "btn-primary"}`}
      >
        {status === "sending" ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Sending...
          </>
        ) : formType === "emergency" ? (
          <>
            Request Emergency Service
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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
          Something went wrong. Please call{" "}
          <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a> directly.
        </p>
      )}
    </form>
  );
}
