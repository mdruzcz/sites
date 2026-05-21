"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

type Props = {
  faqs: Faq[];
};

export function FaqAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--surface)] transition-colors"
          >
            <span className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] pr-4">{faq.question}</span>
            <svg
              className={`w-5 h-5 shrink-0 text-[var(--accent)] transition-transform ${open === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-[var(--concrete)] leading-relaxed border-t border-[var(--border)]">
              <p className="pt-3">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
