"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { useUI } from "./ui-context";
import { submitQuote } from "@/lib/actions/quote";
import { clearAttachment, readAttachment, type DesignAttachment } from "@/lib/planner/attach";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function QuoteForm() {
  const { lines, clear } = useUI();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [design, setDesign] = useState<DesignAttachment | null>(null);

  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    setDesign(readAttachment());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      postal_code: String(form.get("postal_code") || ""),
      address: String(form.get("address") || ""),
      referrer_site: String(form.get("referrer_site") || ""),
      notes: String(form.get("notes") || ""),
      turnstile_token: token || undefined,
      lines,
      design: design ? { name: design.name, link: design.link, summary: design.summary, notes: design.notes } : undefined,
    };
    if (turnstileKey && !token) {
      setError("Please complete the captcha first.");
      return;
    }
    startTransition(async () => {
      try {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "quote_submitted",
            item_count: lines.length,
            has_design: !!design,
          });
        }
        clear();
        clearAttachment();
        await submitQuote(payload);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {design && (
        <div className="flex items-start gap-3 rounded-sm border border-[var(--color-brass)] bg-[var(--color-cream-warm)] p-3 text-sm">
          <span aria-hidden="true">📐</span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-[var(--color-navy)]">Kitchen plan attached: {design.name}</p>
            <p className="mt-0.5 text-[12px] text-[var(--color-ink-soft)]">{design.summary}</p>
            <p className="mt-1 text-[12px]">
              <Link href={design.link} className="underline underline-offset-2" target="_blank">
                Open plan
              </Link>
              <span className="mx-2 text-[var(--color-line)]">|</span>
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={() => {
                  clearAttachment();
                  setDesign(null);
                }}
              >
                Remove
              </button>
            </p>
          </div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Your name" required autoComplete="name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
        <Field name="phone" label="Phone" type="tel" inputMode="tel" autoComplete="tel" />
        <Field name="postal_code" label="Postal code" autoComplete="postal-code" />
      </div>
      <Field name="address" label="Delivery address (optional)" autoComplete="street-address" />
      <Field
        name="referrer_site"
        label="Where did you buy your existing kitchen? (optional)"
        placeholder="e.g. RTA Cabinets Canada, Wayfair, Nelson…"
      />
      <div>
        <label htmlFor="notes" className="mb-1 block text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          Anything else? (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="block w-full rounded-sm border border-[var(--color-line)] bg-white p-3 text-sm focus:border-[var(--color-navy)] focus:outline-none"
        />
      </div>

      {turnstileKey && (
        <div>
          <Turnstile
            siteKey={turnstileKey}
            onSuccess={(t) => setToken(t)}
            onError={() => setToken(null)}
            onExpire={() => setToken(null)}
            options={{ theme: "light" }}
          />
        </div>
      )}

      {error && (
        <p className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || lines.length === 0}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Submitting…" : "Submit request — we'll confirm within 1 business day"}
      </button>
      <p className="text-center text-xs text-[var(--color-ink-soft)]">
        No payment now · We&rsquo;ll quote shipping &amp; confirm stock before charging anything
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  ...props
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
        {label} {required && <span className="text-[var(--color-brass-dark)]">*</span>}
      </label>
      <input
        {...props}
        id={name}
        name={name}
        type={type}
        required={required}
        className="block h-11 w-full rounded-sm border border-[var(--color-line)] bg-white px-3 text-sm focus:border-[var(--color-navy)] focus:outline-none"
      />
    </div>
  );
}
