'use client';

import { useState } from 'react';
import type { Faq } from '@/lib/content';

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 hover:bg-slate-50 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-ink text-[15px] sm:text-base">{faq.question}</span>
            <span
              className={`shrink-0 grid place-items-center w-8 h-8 rounded-full bg-accent-soft text-accent transition-transform ${
                open === i ? 'rotate-45' : ''
              }`}
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="px-5 sm:px-6 pb-5 -mt-1 text-slate-muted leading-relaxed text-[15px]">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
