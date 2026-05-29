"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

interface QuoteFormProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export function QuoteForm({ title = "Get Your FREE Quote Today!", subtitle, dark }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
      honeypot: (form.elements.namedItem("website") as HTMLInputElement).value,
      token,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch {
      setStatus("error");
    }
  }

  const inputClass = `w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)] transition-colors ${dark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : "bg-white border-[var(--border)] text-[var(--foreground)] placeholder:text-gray-400"}`;
  const labelClass = `block text-sm font-semibold mb-1 ${dark ? "text-white" : "text-[var(--foreground)]"}`;

  return (
    <div>
      {title && (
        <h2 className={`text-xl font-extrabold mb-1 ${dark ? "text-[var(--accent)]" : "text-[var(--green)]"}`}>
          {title}
        </h2>
      )}
      {subtitle && <p className={`text-sm mb-4 ${dark ? "text-gray-300" : "text-[var(--muted)]"}`}>{subtitle}</p>}

      {status === "success" ? (
        <div ref={successRef} className="bg-green-100 border border-green-400 text-green-800 rounded-xl p-5 text-center">
          <p className="font-bold text-lg mb-1">✓ Quote Request Received!</p>
          <p className="text-sm">We&apos;ll get back to you within 48 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label htmlFor="name" className={labelClass}>Name *</label>
            <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your full name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone *</label>
              <input id="phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" className={inputClass} placeholder="519-000-0000" />
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea id="message" name="message" rows={3} className={inputClass} placeholder="Tell us about your fencing project…" />
          </div>

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
            onSuccess={setToken}
          />

          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !token}
            className="btn btn-primary w-full justify-center font-bold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending…" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
