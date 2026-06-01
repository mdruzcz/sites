"use client";

import { useUI } from "@/components/ui-context";
import { useState } from "react";

export function OfferPopup() {
  const { popupOpen, dismissPopup } = useUI();
  const [copied, setCopied] = useState(false);
  if (!popupOpen) return null;

  function copyCode() {
    try {
      navigator.clipboard.writeText("SAVE15");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
      className="drawer-overlay !flex !items-center !justify-center !bg-black/60 p-4"
      onClick={dismissPopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={dismissPopup}
          aria-label="Close special offer"
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/80 text-slate-700 hover:bg-white"
        >
          ✕
        </button>

        {/* Festive header strip */}
        <div className="relative bg-gradient-to-br from-[var(--color-brand)] via-[var(--color-brand-dark)] to-[var(--color-brand-deep)] px-8 py-10 text-center text-white">
          <div className="pointer-events-none absolute inset-0 flex justify-around opacity-50">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className={`twinkle twinkle-delay-${(i % 5) as 0 | 1 | 2 | 3 | 4} mt-3 inline-block size-2 rounded-full bg-[var(--color-gold)]`}
                style={{ boxShadow: "0 0 8px 2px rgba(244,200,66,0.7)" }}
              />
            ))}
          </div>
          <p className="eyebrow relative text-[var(--color-gold)]">🪵 New customer offer</p>
          <h2 id="offer-popup-title" className="font-display relative mt-3 text-4xl font-bold leading-tight">
            Save <span className="text-[var(--color-gold)]">$15</span><br />
            on your first order
          </h2>
          <p className="relative mt-3 text-sm text-orange-100">
            Welcome to Ready Seal Direct. New here? Use this code at checkout:
          </p>
        </div>

        <div className="px-8 py-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-brand)] bg-[var(--color-brand-soft)] px-5 py-3">
            <span className="font-display text-2xl font-bold tracking-widest text-[var(--color-brand)]">
              SAVE15
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand)] underline-offset-2 hover:underline"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Valid on your first order over $75. One use per customer. Cannot be combined with
            contractor pricing. Online orders ship within Ontario.
          </p>
          <button
            type="button"
            onClick={dismissPopup}
            className="btn-primary mt-6 w-full justify-center"
          >
            Shop now →
          </button>
          <button
            type="button"
            onClick={dismissPopup}
            className="mt-2 text-xs text-slate-500 underline-offset-2 hover:underline"
          >
            No thanks, I&rsquo;ll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
