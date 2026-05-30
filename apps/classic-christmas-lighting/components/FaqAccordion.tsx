"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  dark?: boolean;
}

export function FaqAccordion({ faqs, dark = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`rounded-lg border overflow-hidden transition-colors ${
            dark
              ? "border-[var(--border-dark)] bg-[var(--dark-surface)]"
              : "border-[var(--border)] bg-[var(--surface)]"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`w-full flex items-center justify-between px-6 py-4 text-left min-h-[56px] gap-4 ${
              dark ? "text-white hover:bg-white/5" : "text-[var(--foreground)] hover:bg-[var(--border)]"
            } transition-colors`}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-sm leading-snug">{faq.question}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              } ${dark ? "text-[var(--accent-gold)]" : "text-[var(--accent)]"}`}
            />
          </button>
          {openIndex === i && (
            <div
              className={`px-6 pb-5 text-sm leading-relaxed ${
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
