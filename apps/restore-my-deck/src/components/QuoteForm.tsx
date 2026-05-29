"use client";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function QuoteForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [token, setToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      honeypot: fd.get("website"),
      token,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls = `w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${dark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"}`;
  const labelCls = `block text-xs font-semibold mb-1 ${dark ? "text-white/80" : "text-gray-600"}`;

  if (status === "success") {
    return (
      <div ref={successRef} className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>Quote Request Received!</h3>
        <p className={dark ? "text-white/80" : "text-gray-600"}>We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input type="text" name="name" required autoComplete="name" placeholder="Your full name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input type="tel" name="phone" required autoComplete="tel" inputMode="tel" placeholder="226-555-0100" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email *</label>
        <input type="email" name="email" required autoComplete="email" placeholder="your@email.com" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Tell us about your project</label>
        <textarea name="message" rows={3} placeholder="Deck size, condition, service needed..." className={inputCls} />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
        onSuccess={setToken}
      />

      {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}

      <button type="submit" disabled={status === "submitting" || !token} className="btn btn-accent w-full disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Get My Free Quote"}
      </button>
    </form>
  );
}
