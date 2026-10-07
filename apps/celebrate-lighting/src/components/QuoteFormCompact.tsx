"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

/**
 * Short lead form for heroes and closing CTAs: name, phone, email, address.
 * `serviceValue` tags the CRM row so permanent and seasonal leads are
 * distinguishable. Rendered in a white .card-light, so text uses explicit
 * slate classes rather than --foreground.
 */
export function QuoteFormCompact({
  formId = "hero",
  serviceValue = "Free On-Site Demo",
  submitLabel,
  reassurance,
  successTitle,
  successBody,
  gold = false,
}: {
  formId?: string;
  serviceValue?: string;
  submitLabel?: string;
  reassurance?: string;
  successTitle?: string;
  successBody?: React.ReactNode;
  gold?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [token, setToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service: serviceValue, turnstileToken: token, formId }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackFormSubmission(`lead_form_${formId}`);
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border-2 border-[var(--accent)] bg-[#f0fdfb] p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-[#04121a] flex items-center justify-center mx-auto mb-3"><Icon.Check strokeWidth={3} /></div>
        <h3 className="text-lg font-bold text-slate-900 mb-1.5">{successTitle ?? "Request received"}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {successBody ?? (<>We’ll call within <strong>24 hours</strong> to lock in a time. Then we come out, mount a live sample on your house, and light it up. No cost, no obligation.</>)}
        </p>
        <a href={site.phoneHref} className="mt-4 inline-block text-sm font-semibold text-[var(--accent-ink)] hover:underline">Sooner? Call {site.phone}</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div>
        <label htmlFor={`${formId}-name`} className="sr-only">Full name</label>
        <input id={`${formId}-name`} name="name" required autoComplete="name" placeholder="Full name *" className="field" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${formId}-phone`} className="sr-only">Phone</label>
          <input id={`${formId}-phone`} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="Phone *" className="field" />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="sr-only">Email</label>
          <input id={`${formId}-email`} name="email" type="email" required autoComplete="email" placeholder="Email *" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor={`${formId}-address`} className="sr-only">Address or city</label>
        <input id={`${formId}-address`} name="address" autoComplete="street-address" placeholder="Address or city (so we know where to come)" className="field" />
      </div>
      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess={setToken} onExpire={() => setToken("")} options={{ size: "flexible" }} />
      {status === "error" && <p className="text-sm text-red-600" role="alert">Something went wrong. Please try again, or call us at {site.phone}.</p>}
      <button type="submit" disabled={status === "loading"} className={`btn ${gold ? "btn-gold" : "btn-primary"} w-full disabled:opacity-60 disabled:cursor-not-allowed`}>
        {status === "loading" ? (<><span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" aria-hidden="true" /> Sending…</>) : (submitLabel ?? site.demo.ctaLong)}
      </button>
      <p className="text-[11px] text-slate-500 text-center leading-snug">{reassurance ?? "Free. No obligation. We reply within 24 hours."}</p>
    </form>
  );
}
