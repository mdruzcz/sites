"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

interface FaqAccordionProps {
  faqs: Faq[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              isOpen ? "border-[var(--accent)] shadow-md" : "border-[var(--border)]"
            }`}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-[var(--surface)] transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-bold text-[var(--charcoal)] pr-4 text-sm md:text-base">
                {faq.question}
              </span>
              <span
                className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isOpen ? "bg-[var(--accent)] rotate-180" : "bg-[var(--concrete-200)]"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-[var(--concrete)]"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 bg-white border-t border-[var(--border)]">
                <p className="text-[var(--concrete)] text-sm md:text-base leading-relaxed pt-4 normal-case font-normal">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
