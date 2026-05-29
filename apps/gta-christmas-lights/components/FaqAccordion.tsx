"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  dark?: boolean;
}

export function FaqAccordion({ faqs, dark = false }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`rounded-lg border overflow-hidden ${
            dark
              ? "border-[var(--border-dark)] bg-[var(--dark-surface)]"
              : "border-[var(--border)] bg-white"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`w-full flex items-center justify-between px-5 py-4 text-left min-h-[44px] ${
              dark ? "text-white" : "text-[var(--foreground)]"
            }`}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-sm pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              } ${dark ? "text-[var(--accent-gold)]" : "text-[var(--accent)]"}`}
            />
          </button>
          {openIndex === i && (
            <div
              className={`px-5 pb-5 text-sm leading-relaxed ${
                dark ? "text-white/70" : "text-[var(--muted)]"
              }`}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
