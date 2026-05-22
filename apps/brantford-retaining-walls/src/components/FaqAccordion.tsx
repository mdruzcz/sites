"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="card overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-bold text-sm text-[var(--charcoal)]">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-[var(--accent)] shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5">
              <p className="text-sm text-[var(--concrete)] leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
