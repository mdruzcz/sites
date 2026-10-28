"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { getAttribution, trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

export const PROPERTY_TYPES = [
  "Hotel / hospitality",
  "Condo or apartment building",
  "Plaza or shopping centre",
  "Office building",
  "Property management portfolio",
  "Restaurant, retail or dealership",
  "Municipality / BIA",
  "Other commercial",
];

/**
 * Short lead form for heroes and closing CTAs: name, company, phone, email, property type.
 * Rendered in a white .card-light, so text uses explicit slate classes.
 */
export function QuoteFormCompact({ formId = "hero", defaultPropertyType = "", submitLabel, reassurance }: { formId?: string; defaultPropertyType?: string; submitLabel?: string; reassurance?: string }) {
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
        body: JSON.stringify({ ...data, turnstileToken: token, formId, attribution: getAttribution() }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackFormSubmission(`quote_${formId}`, { email: data.email, phone: data.phone });
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border-2 border-[var(--accent)] bg-[#f1f8f4] p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto mb-3"><Icon.Check width={22} height={22} strokeWidth={3} /></div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Request received</h3>
        <p className="text-sm text-slate-600">We reply within {site.responseTime} to book your site visit or walk through plans and photos.</p>
        <Link href="/guides" className="mt-4 inline-block text-sm font-semibold text-[var(--accent-ink)] hover:underline">Read our planning guides while you wait</Link>
      </div>
    );
  }

  const id = (n: string) => `${formId}-${n}`;
  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate={false}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label htmlFor={id("name")} className="sr-only">Your name</label><input id={id("name")} name="name" required autoComplete="name" placeholder="Your name *" className="field" /></div>
        <div><label htmlFor={id("company")} className="sr-only">Company or property</label><input id={id("company")} name="company" autoComplete="organization" placeholder="Company / property" className="field" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label htmlFor={id("phone")} className="sr-only">Phone</label><input id={id("phone")} name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="Phone *" className="field" /></div>
        <div><label htmlFor={id("email")} className="sr-only">Email</label><input id={id("email")} name="email" type="email" required autoComplete="email" placeholder="Email *" className="field" /></div>
      </div>
      <div>
        <label htmlFor={id("propertyType")} className="sr-only">Property type</label>
        <select id={id("propertyType")} name="propertyType" required className="field" defaultValue={defaultPropertyType}>
          <option value="" disabled>Property type *</option>
          {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div><label htmlFor={id("city")} className="sr-only">City</label><input id={id("city")} name="city" autoComplete="address-level2" placeholder="City or property address" className="field" /></div>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onSuccess={setToken} options={{ size: "flexible", theme: "light" }} />
      )}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Sending…" : submitLabel ?? site.quote.ctaLong}
      </button>
      <p className="text-[11px] text-slate-500 text-center leading-snug">{reassurance ?? `No obligation. We reply within ${site.responseTime}.`}</p>
      {status === "error" && <p className="text-sm text-red-600" role="alert">Something went wrong. Please try again, or call us at {site.phone}.</p>}
    </form>
  );
}
