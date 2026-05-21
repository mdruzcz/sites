"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.question}
            className={`card overflow-hidden transition-all ${isOpen ? "card-glow" : ""}`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white text-base sm:text-lg">{faq.question}</span>
              <span
                className={`w-7 h-7 rounded-full border border-accent/40 flex items-center justify-center text-accent shrink-0 transition-transform ${
                  isOpen ? "rotate-45 bg-accent/15" : ""
                }`}
                aria-hidden="true"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-muted-strong text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
