"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { getAttribution, trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { PROPERTY_TYPES } from "./QuoteFormCompact";

const INTERESTS = [
  "Interior lobby / atrium decor",
  "Lobby Christmas tree rental",
  "Exterior building lighting",
  "Tree wrapping & cone trees",
  "Wreaths, garland & planters",
  "Santa set / custom display",
  "Animated light show",
  "Multi-site portfolio program",
];

const TIMELINES = ["This season", "Next season", "Multi-year program", "Just exploring"];

/** The full contact form (/contact). */
export function ContactForm({ defaultPropertyType = "" }: { defaultPropertyType?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [token, setToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(fd);
    data.interests = fd.getAll("interests");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token, formId: "contact", attribution: getAttribution() }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackFormSubmission("contact_form", { email: data.email, phone: data.phone });
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-light)] p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto mb-4"><Icon.Check width={26} height={26} strokeWidth={3} /></div>
        <h3 className="text-xl font-bold text-ink mb-2">Thanks, we have your request.</h3>
        <p className="text-body leading-relaxed">We reply within <strong>{site.responseTime}</strong> to set up a site visit or review plans and photos. For anything urgent, call <a href={site.phoneHref} className="text-[var(--accent-ink)] font-semibold">{site.phone}</a>.</p>
        <Link href="/gallery" className="btn btn-outline mt-6">Browse the gallery meanwhile</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label htmlFor="c-name" className="block text-sm font-semibold text-ink mb-1.5">Your name *</label><input id="c-name" name="name" required autoComplete="name" className="field" /></div>
        <div><label htmlFor="c-company" className="block text-sm font-semibold text-ink mb-1.5">Company / property</label><input id="c-company" name="company" autoComplete="organization" className="field" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label htmlFor="c-phone" className="block text-sm font-semibold text-ink mb-1.5">Phone *</label><input id="c-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" className="field" /></div>
        <div><label htmlFor="c-email" className="block text-sm font-semibold text-ink mb-1.5">Email *</label><input id="c-email" name="email" type="email" required autoComplete="email" className="field" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-type" className="block text-sm font-semibold text-ink mb-1.5">Property type *</label>
          <select id="c-type" name="propertyType" required className="field" defaultValue={defaultPropertyType}>
            <option value="" disabled>Choose one</option>
            {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div><label htmlFor="c-address" className="block text-sm font-semibold text-ink mb-1.5">Property address or city</label><input id="c-address" name="address" autoComplete="street-address" placeholder="So we can plan the site visit" className="field" /></div>
      </div>
      <fieldset>
        <legend className="block text-sm font-semibold text-ink mb-2">What are you interested in?</legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {INTERESTS.map((it) => (
            <label key={it} className="flex items-center gap-2.5 rounded-xl border border-[var(--border-strong)] px-3 min-h-[44px] text-sm text-body cursor-pointer hover:bg-[var(--surface)] has-[:checked]:border-[var(--accent)] has-[:checked]:bg-[var(--accent-light)]">
              <input type="checkbox" name="interests" value={it} className="accent-[var(--accent)]" /> {it}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="block text-sm font-semibold text-ink mb-2">Timeline</label>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <label key={t} className="chip cursor-pointer has-[:checked]:chip-active"><input type="radio" name="timeline" value={t} className="sr-only" />{t}</label>
          ))}
        </div>
      </div>
      <div><label htmlFor="c-message" className="block text-sm font-semibold text-ink mb-1.5">Tell us about the property</label><textarea id="c-message" name="message" placeholder="Lobby ceiling height, number of buildings, rooflines or trees you want lit, colour scheme, dates that matter…" className="field" /></div>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onSuccess={setToken} options={{ size: "flexible", theme: "light" }} />
      )}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary btn-lg disabled:opacity-60">{status === "loading" ? "Sending…" : "Send my request"}</button>
      <p className="text-xs text-[var(--muted)]">We reply within {site.responseTime}. No spam, no sharing your details.</p>
      {status === "error" && <p className="text-sm text-red-600" role="alert">Something went wrong. Please try again, or call us at {site.phone}.</p>}
    </form>
  );
}
