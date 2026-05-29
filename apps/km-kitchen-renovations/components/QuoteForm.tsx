"use client";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm({ source = "contact" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      service: fd.get("service") as string,
      message: fd.get("message") as string,
      honeypot: fd.get("_trap") as string,
      token,
      source,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="_trap" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[var(--navy)] mb-1.5">
            Full Name <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="name" name="name" type="text" required autoComplete="name"
            placeholder="John Smith"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-[var(--foreground)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[var(--navy)] mb-1.5">
            Phone <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel"
            placeholder="519-555-0123"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-[var(--foreground)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[var(--navy)] mb-1.5">
          Email <span className="text-[var(--gold)]">*</span>
        </label>
        <input
          id="email" name="email" type="email" required autoComplete="email"
          placeholder="john@example.com"
          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-[var(--foreground)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-[var(--navy)] mb-1.5">
          Service Interested In
        </label>
        <select
          id="service" name="service"
          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-[var(--foreground)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all"
        >
          <option value="">Select a service...</option>
          <option value="kitchen-renovation">Kitchen Renovation</option>
          <option value="kitchen-remodel">Kitchen Remodel</option>
          <option value="bathroom-remodel">Bathroom Remodel</option>
          <option value="white-shaker-cabinets">White Shaker Cabinet Installation</option>
          <option value="custom-cabinets">Custom Kitchen Cabinets</option>
          <option value="basement-finishing">Basement Finishing</option>
          <option value="basement-kitchen">Basement Kitchen</option>
          <option value="basement-bathroom">Basement Bathroom</option>
          <option value="other">Other / Not Sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[var(--navy)] mb-1.5">
          Project Details (Optional)
        </label>
        <textarea
          id="message" name="message" rows={4}
          placeholder="Tell us about your project — size, current condition, style ideas, timeline..."
          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-[var(--foreground)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all resize-none"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
        onSuccess={setToken}
      />

      <button
        type="submit"
        disabled={status === "submitting" || !token}
        className="btn btn-primary w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === "submitting" ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Sending...
          </>
        ) : "Get My Free Quote"}
      </button>

      {status === "success" && (
        <div ref={successRef} className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Quote Request Received!</p>
          <p className="text-green-700 text-sm mt-1">
            We&apos;ll be in touch within <strong>24 hours</strong> to discuss your project. Feel free to call us at{" "}
            <a href="tel:5199143405" className="underline font-semibold">519-914-3405</a> anytime.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-700 font-semibold">Something went wrong. Please call us at <a href="tel:5199143405" className="underline">519-914-3405</a>.</p>
        </div>
      )}
    </form>
  );
}
