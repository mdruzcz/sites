"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={faq.question}
          className="card overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--surface)]/30 transition-colors"
          >
            <span className="font-semibold text-[var(--charcoal)] text-base sm:text-lg">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-[var(--accent)] shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-[var(--concrete)] leading-relaxed text-[15px] border-t border-[var(--border)] pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
