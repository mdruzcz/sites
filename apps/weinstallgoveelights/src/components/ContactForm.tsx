"use client";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  honeypot: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    honeypot: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token, hostname: "weinstallgoveelights.ca" }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} className="bg-[#141430] border border-[#8B5CF6]/40 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-white mb-2">Quote Request Sent!</h3>
        <p className="text-gray-300">
          We'll review your request and get back to you within one business day.
          Check your email for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 md:p-8 space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name *</label>
          <input
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full bg-[#0E0E24] border border-[#1E1E42] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name *</label>
          <input
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full bg-[#0E0E24] border border-[#1E1E42] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
            placeholder="Smith"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#0E0E24] border border-[#1E1E42] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-[#0E0E24] border border-[#1E1E42] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
            placeholder="519-555-0100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Your City *</label>
        <input
          type="text"
          required
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full bg-[#0E0E24] border border-[#1E1E42] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
          placeholder="London, Kitchener, Hamilton..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Tell us about your project</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-[#0E0E24] border border-[#1E1E42] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
          placeholder="Home size, approximate linear footage, specific goals (e.g. holiday lighting, year-round accent)..."
        />
      </div>

      <Turnstile
        siteKey={siteKey}
        onSuccess={(t) => setToken(t)}
        options={{ theme: "dark" }}
      />

      {status === "error" && (
        <p className="text-red-400 text-sm">
          {!token ? "Please complete the security check above." : "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg transition-colors"
      >
        {status === "submitting" ? "Sending..." : "Get My Free Quote →"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        No obligation · We respond within 1 business day
      </p>
    </form>
  );
}
