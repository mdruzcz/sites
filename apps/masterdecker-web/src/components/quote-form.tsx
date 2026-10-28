"use client";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { getAttribution, trackQuoteSubmit } from "@/lib/gtm";

type Props = {
  /** Compact = short 3-field form for embedding on service/city pages. */
  compact?: boolean;
  /** Pre-fills the hidden "services" value so leads are tagged by page. */
  service?: string;
  /** Pre-fills the city field (e.g. on city landing pages). */
  city?: string;
  heading?: string;
  subheading?: string;
};

const serviceCheckboxes = [
  "Deck/Fence Staining",
  "New Deck",
  "Deck Repair / Remodel",
  "New Fence",
  "Concrete Driveway",
  "Concrete Patio",
  "Stamped Concrete",
  "Retaining Wall",
  "Concrete Sealing",
  "Other",
];

export function QuoteForm({ compact = false, service, city, heading, subheading }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const checked = formData.getAll("services").join(", ");
    const services = checked || service || "";
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName") || "",
      email: formData.get("email"),
      phone: formData.get("phone"),
      streetAddress: formData.get("streetAddress") || "",
      city: formData.get("city") || city || "",
      services,
      message: formData.get("message") || "",
      website: formData.get("website"),
      token,
      attribution: getAttribution(),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      trackQuoteSubmit(services, { email: data.email, phone: data.phone });
      setStatus("success");
      form.reset();
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="bg-green-50 border border-green-200 rounded-xl p-7">
        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Request received — talk soon!</h3>
        <p className="text-green-700 text-sm">
          We&apos;ll get back to you within 1 business day with the next steps. Need it sooner? Call us at{" "}
          <a href={site.phoneHref} className="underline font-bold">{site.phone}</a>.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full border border-[var(--border)] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {(heading || subheading) && (
        <div className="mb-1">
          {heading && <p className="font-extrabold text-xl text-[var(--ink)]">{heading}</p>}
          {subheading && <p className="text-sm text-[var(--ink-soft)] mt-1">{subheading}</p>}
        </div>
      )}

      {service && <input type="hidden" name="services" value={service} />}

      <div className="grid gap-3 sm:grid-cols-2">
        <input name="firstName" required autoComplete="given-name" className={fieldClass} placeholder="Name *" aria-label="Name" />
        <input name="phone" required inputMode="tel" autoComplete="tel" className={fieldClass} placeholder="Phone *" aria-label="Phone" />
      </div>
      <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="Email *" aria-label="Email" />

      {!compact && (
        <>
          <input name="lastName" autoComplete="family-name" className={fieldClass} placeholder="Last name (optional)" aria-label="Last name" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="streetAddress" autoComplete="street-address" className={fieldClass} placeholder="Street address" aria-label="Street address" />
            <input name="city" autoComplete="address-level2" defaultValue={city} className={fieldClass} placeholder="City" aria-label="City" />
          </div>
          <fieldset>
            <legend className="text-sm font-bold mb-2 text-[var(--ink)]">What can we help with? (check all that apply)</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {serviceCheckboxes.map((s) => (
                <label key={s} className="flex items-start gap-2 text-sm cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" name="services" value={s} className="mt-1 accent-[var(--accent)]" />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      {compact && (
        <input name="city" autoComplete="address-level2" defaultValue={city} className={fieldClass} placeholder="City" aria-label="City" />
      )}

      <textarea name="message" rows={compact ? 2 : 4} className={`${fieldClass} resize-none`} placeholder={compact ? "Briefly, what's the project? (optional)" : "Tell us about your project… (optional)"} aria-label="Message" />

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please call us at <a href={site.phoneHref} className="font-bold underline">{site.phone}</a>.
        </p>
      )}

      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"} onSuccess={setToken} />

      <button type="submit" disabled={status === "submitting" || !token} className="btn-primary w-full justify-center disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Get My Free Quote"}
      </button>
      <p className="text-xs text-[var(--ink-mute)] text-center">No obligation · We reply within 1 business day</p>
    </form>
  );
}
