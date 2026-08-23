"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";

const INTERESTS = [
  "Commercial wreaths",
  "Mega tree",
  "Large displays",
  "Custom display",
  "Roofline lighting",
  "Not sure yet"
];

const PROPERTY_TYPES = [
  "Retail / plaza",
  "Office / industrial",
  "Municipality / BIA",
  "Hotel / restaurant",
  "Property management",
  "Other"
];

const TIMELINES = ["This season", "Next season", "Just budgeting for now"];

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const interests = fd.getAll("interests").map(String);
    const data = Object.fromEntries(fd);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interests, turnstileToken: token })
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className="rounded-2xl border border-[var(--color-green)] bg-[var(--color-green-soft)] p-8 text-center"
      >
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--color-green)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display mt-5 text-xl">Request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-text-soft)]">
          Thanks — we have your details. Someone will get back to you within {site.responseTime} to book a
          site walk-through. If it is urgent, call{" "}
          <a href={site.phoneHref} className="font-semibold text-[var(--color-green-dark)] underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "mt-2 min-h-11 w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--color-green)] focus:bg-white focus:ring-4 focus:ring-[var(--color-green)]/10";
  const label = "text-sm font-semibold text-[var(--color-text)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — real people never fill this */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="company">Company / organization *</label>
          <input id="company" name="company" required autoComplete="organization" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="name">Contact name *</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="propertyAddress">Property address or city *</label>
        <input id="propertyAddress" name="propertyAddress" required autoComplete="street-address" className={field} />
      </div>

      {!compact && (
        <fieldset>
          <legend className={label}>What are you interested in?</legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {INTERESTS.map((i) => (
              <label
                key={i}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm transition hover:border-[var(--color-green)] has-[:checked]:border-[var(--color-green)] has-[:checked]:bg-[var(--color-green-soft)]"
              >
                <input type="checkbox" name="interests" value={i} className="size-4 accent-[var(--color-green)]" />
                {i}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="propertyType">Property type</label>
          <select id="propertyType" name="propertyType" className={field} defaultValue="">
            <option value="">Select…</option>
            {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="timeline">Timeline</label>
          <select id="timeline" name="timeline" className={field} defaultValue="">
            <option value="">Select…</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">Anything else we should know?</label>
        <textarea id="message" name="message" rows={4} className={field} placeholder="Frontage length, mounting height, power access, anything you already know." />
      </div>

      {siteKey && (
        <Turnstile siteKey={siteKey} onSuccess={setToken} options={{ theme: "light" }} />
      )}

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[var(--color-red)] bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]">
          {errorMsg} You can also call us at{" "}
          <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-ember group w-full disabled:opacity-60">
        {status === "loading" ? "Sending…" : site.quote.ctaLong}
        {status !== "loading" && (
          <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-[var(--color-muted)]">
        We reply within {site.responseTime}. No obligation, and we never share your details.
      </p>
    </form>
  );
}
