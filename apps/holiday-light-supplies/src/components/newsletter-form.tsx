"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { WELCOME_CODE } from "@/lib/site";
import { Icon } from "@/components/icons";

const SEGMENTS = ["Mall / shopping centre", "BIA / downtown", "Municipality / parks", "Property manager / hotel", "Installer", "Homeowner"];

interface Props {
  variant?: "dark" | "light";
  source: string;
  showSegment?: boolean;
  onSuccess?: () => void;
}

export function NewsletterForm({ variant = "light", source, showSegment = false, onSuccess }: Props) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [segment, setSegment] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      const res = await subscribeNewsletter({
        email: String(fd.get("email") ?? ""),
        segment,
        source,
        website: String(fd.get("website") ?? "")
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setDone(true);
      onSuccess?.();
    });
  }

  const dark = variant === "dark";

  if (done) {
    return (
      <div className={`rounded-2xl p-5 ${dark ? "bg-white/10 text-white" : "bg-[var(--color-brand-soft)] text-[var(--color-brand-dark)]"}`}>
        <p className="flex items-center gap-2 font-semibold">
          <Icon.check size={18} className="text-[var(--color-gold-bright)]" /> You&rsquo;re on the list.
        </p>
        <p className="mt-1 text-sm opacity-80">
          Use code <span className="font-mono font-bold tracking-wider">{WELCOME_CODE}</span> when you submit your first inquiry and we&rsquo;ll take 10% off the product subtotal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      {showSegment && (
        <div className="mb-4">
          <p className={`mb-2 text-xs font-semibold ${dark ? "text-white/70" : "text-[var(--color-muted)]"}`}>I&rsquo;m buying for a…</p>
          <div className="flex flex-wrap gap-2">
            {SEGMENTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSegment(segment === s ? null : s)}
                aria-pressed={segment === s}
                className={`chip min-h-[36px] transition ${
                  segment === s ? "!border-[var(--color-accent)] !bg-[var(--color-accent-soft)] !text-[var(--color-accent-dark)]" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`nl-email-${source}`}>Email address</label>
        <input
          id={`nl-email-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.ca"
          className={`input flex-1 ${dark ? "!border-white/20 !bg-white/10 !text-white placeholder:!text-white/50" : ""}`}
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button type="submit" disabled={pending} className={`${dark ? "btn-gold" : "btn-accent"} disabled:opacity-60`}>
          {pending ? "Subscribing…" : "Get my 10% code"}
        </button>
      </div>
      {error && <p className={`mt-2 text-sm ${dark ? "text-rose-200" : "text-rose-700"}`}>{error}</p>}
      <p className={`mt-2 text-xs ${dark ? "text-white/50" : "text-[var(--color-muted)]"}`}>No spam. Unsubscribe any time.</p>
    </form>
  );
}
