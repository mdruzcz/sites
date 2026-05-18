"use client";

import { useState, useEffect, type FormEvent } from "react";
import { SERVICES, CITIES } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadedAt, setLoadedAt] = useState(0);

  useEffect(() => {
    setLoadedAt(Date.now());
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      first_name: (form.elements.namedItem("first_name") as HTMLInputElement).value,
      last_name: (form.elements.namedItem("last_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLSelectElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value, // honeypot
      _loaded: loadedAt,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      (window as any).umami?.track("form-submission", { type: "contact" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-forest/10 border border-forest/20 p-8 text-center">
        <svg className="mx-auto mb-4 h-12 w-12 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-serif text-xl font-bold text-wood-dark mb-2">Thank You!</h3>
        <p className="text-wood">
          We received your request and will get back to you within 24 hours with your free quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-wood-dark mb-1">
            First Name <span className="text-terracotta">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark placeholder:text-wood-light/60 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-wood-dark mb-1">
            Last Name <span className="text-terracotta">*</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            required
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark placeholder:text-wood-light/60 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors"
            placeholder="Smith"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-wood-dark mb-1">
            Email <span className="text-terracotta">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark placeholder:text-wood-light/60 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-wood-dark mb-1">
            Phone <span className="text-terracotta">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark placeholder:text-wood-light/60 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors"
            placeholder="(519) 555-0123"
          />
        </div>
      </div>

      {/* City & Service */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-wood-dark mb-1">
            City <span className="text-terracotta">*</span>
          </label>
          <select
            id="city"
            name="city"
            required
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors"
          >
            <option value="">Select your city</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}, {c.province}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-wood-dark mb-1">
            Service <span className="text-terracotta">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors"
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-wood-dark mb-1">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-wood-dark placeholder:text-wood-light/60 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors resize-y"
          placeholder="Describe your deck size, wood type, current condition, etc."
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="rounded-lg bg-terracotta/10 border border-terracotta/20 px-4 py-3 text-sm text-terra-dark">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-terracotta px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-terra-dark focus:ring-2 focus:ring-terracotta/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Sending...
          </span>
        ) : (
          "Get Your Free Quote"
        )}
      </button>
    </form>
  );
}
