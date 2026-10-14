"use client";

import Image from "next/image";
import { useUI } from "@/components/ui-context";
import { NewsletterForm } from "@/components/newsletter-form";
import { Icon } from "@/components/icons";

/**
 * Newsletter popup. Fires once per 21 days after 9 s, 45 % scroll or exit
 * intent (see ui-context). Captures an email + buyer segment and hands over
 * the FIRST10 welcome code on success.
 */
export function OfferPopup() {
  const { popupOpen, dismissPopup } = useUI();
  if (!popupOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
      className="drawer-overlay !flex !items-end !justify-center p-0 sm:!items-center sm:p-4"
      onClick={dismissPopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pop-in relative grid w-full max-w-3xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-[0.9fr_1.1fr]"
      >
        <button
          type="button"
          onClick={dismissPopup}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[var(--color-text)] shadow hover:bg-white"
        >
          <Icon.close size={16} />
        </button>

        <div className="relative hidden min-h-[420px] md:block">
          <Image
            src="/images/hero/plaza-tree-night.jpg"
            alt="Illuminated commercial Christmas tree in a plaza at night"
            fill
            sizes="360px"
            className="object-cover"
          />
          <div className="scrim-strong absolute inset-0" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="eyebrow text-[var(--color-gold-bright)]">Trade newsletter</p>
            <p className="font-display mt-2 text-2xl leading-tight">The season sells out early. Hear about it first.</p>
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-9">
          <p className="eyebrow text-[var(--color-accent)]">Welcome offer</p>
          <h2 id="offer-popup-title" className="font-display mt-2 text-3xl leading-tight text-[var(--color-text)] sm:text-4xl">
            10% off your first order, plus early-season pricing.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Join buyers at malls, BIAs, municipalities and installation crews. We send new displays, stock alerts and pre-season pricing a few times a year.
          </p>
          <div className="mt-5">
            <NewsletterForm variant="light" source="popup" showSegment onSuccess={() => setTimeout(dismissPopup, 4500)} />
          </div>
          <button type="button" onClick={dismissPopup} className="mt-4 text-xs text-[var(--color-muted)] underline-offset-2 hover:underline">
            No thanks, I&rsquo;ll browse without the code
          </button>
        </div>
      </div>
    </div>
  );
}
