"use client";
import { useState, useRef } from "react";
import { site } from "@/lib/site";

const services = ["Deck Staining", "Deck Building", "Fence Installation", "Concrete Driveway / Patio", "Concrete Sealing", "Retaining Wall", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="bg-green-50 border border-green-200 rounded-xl p-8">
        <h2 className="text-xl font-bold text-green-800 mb-2">Thanks! We&apos;ll be in touch soon.</h2>
        <p className="text-green-700">Expect a response within 1 business day. Urgent? Call us at <a href={site.phoneHref} className="underline">{site.phone}</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Name *</label>
          <input name="name" required autoComplete="name" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Phone *</label>
          <input name="phone" required inputMode="tel" autoComplete="tel" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" placeholder="(519) 555-0100" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">Email</label>
        <input name="email" type="email" autoComplete="email" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">Service Needed</label>
        <select name="service" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] bg-white">
          <option value="">Select a service…</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">Message</label>
        <textarea name="message" rows={4} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] resize-none" placeholder="Describe your project…" />
      </div>
      {status === "error" && <p className="text-red-600 text-sm">Something went wrong. Call us at {site.phone}.</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
