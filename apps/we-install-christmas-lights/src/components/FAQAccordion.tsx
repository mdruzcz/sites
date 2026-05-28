"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";

export type FAQ = { question: string; answer: string };

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
      {faqs.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={f.question}>
            <button
              className="w-full text-left flex items-start gap-4 py-5"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="heading-display text-sm text-[color:var(--brand-red)] mt-0.5">Q:</span>
              <span className="flex-1 font-semibold text-[color:var(--ink-strong)]">
                {f.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[color:var(--brand-green)] mt-0.5 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="pl-10 pr-4 pb-6 -mt-1 text-[color:var(--ink-soft)] leading-relaxed">
                {f.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
