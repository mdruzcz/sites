"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
            aria-expanded={openIndex === i}
            style={{ minHeight: 44 }}
          >
            <span className="font-semibold text-[#1a2332] pr-4">
              {item.question}
            </span>
            <span
              className="text-[#F7931E] flex-shrink-0 transition-transform duration-200"
              style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-slate-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
