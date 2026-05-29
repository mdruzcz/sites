"use client";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";

const serviceCheckboxes = [
  "Deck/Fence Staining",
  "Existing Deck Remodel",
  "New Deck",
  "New Fence",
  "Fence Repair",
  "New Concrete Patios",
  "New Concrete Driveway",
  "New Concrete Walkway",
  "Concrete Sealing",
  "Retaining Wall",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) { setStatus("error"); return; }
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const services = formData.getAll("services").join(", ");
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      streetAddress: formData.get("streetAddress"),
      city: formData.get("city"),
      services,
      message: formData.get("message"),
      website: formData.get("website"),
      token,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
        <h2 className="text-2xl font-bold text-green-800 mb-2">Thanks! We&apos;ll be in touch soon.</h2>
        <p className="text-green-700">
          Expect a response within 1 business day. Urgent? Call us at{" "}
          <a href={site.phoneHref} className="underline font-bold">{site.phone}</a>.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full border border-[var(--border)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white";
  const labelClass = "block text-sm font-bold mb-1.5 text-[var(--ink)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input id="firstName" name="firstName" required autoComplete="given-name" className={fieldClass} placeholder="First name" />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name <span className="font-normal text-[var(--ink-soft)]">(Optional)</span></label>
          <input id="lastName" name="lastName" autoComplete="family-name" className={fieldClass} placeholder="Last name" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone *</label>
          <input id="phone" name="phone" required inputMode="tel" autoComplete="tel" className={fieldClass} placeholder="(519) 555-0100" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Address *</label>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="streetAddress" required autoComplete="street-address" className={fieldClass} placeholder="Street Address" />
          <input name="city" required autoComplete="address-level2" className={fieldClass} placeholder="City" />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Interested in the following services (Please check all that apply)</legend>
        <div className="grid gap-2 sm:grid-cols-2 mt-2">
          {serviceCheckboxes.map((s) => (
            <label key={s} className="flex items-start gap-2 text-sm cursor-pointer hover:text-[var(--accent)]">
              <input type="checkbox" name="services" value={s} className="mt-1 accent-[var(--accent)]" />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClass}>Message <span className="font-normal text-[var(--ink-soft)]">(Optional)</span></label>
        <textarea id="message" name="message" rows={4} className={`${fieldClass} resize-none`} placeholder="Tell us about your project…" />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong sending your message. Please call us at <a href={site.phoneHref} className="font-bold underline">{site.phone}</a>.
        </p>
      )}

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />

      <button type="submit" disabled={status === "submitting" || !token} className="btn-primary w-full justify-center disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
