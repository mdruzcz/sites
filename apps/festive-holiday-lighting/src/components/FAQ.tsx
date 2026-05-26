"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/faqs";
import { homeFaqs } from "@/lib/faqs";

export type { FAQItem };
export { homeFaqs };

function FAQItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border transition-all"
      style={{
        borderColor: open ? "rgba(178,34,34,0.3)" : "rgba(255,255,255,0.08)",
        backgroundColor: open ? "rgba(178,34,34,0.06)" : "rgba(255,255,255,0.03)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left min-h-11"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white pr-4">{item.q}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180 text-[var(--crimson-bright)]" : "text-white/40"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-white/65 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ({ faqs = homeFaqs, title = "Frequently Asked Questions" }: { faqs?: FAQItem[]; title?: string }) {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--night)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            FAQs
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <FAQItem key={f.q} item={f} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-white/55 mb-4">Still have questions? We're happy to help.</p>
          <a
            href="tel:+12894265764"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition min-h-11 text-sm"
          >
            Call (289) 426-5764
          </a>
        </div>
      </div>
    </section>
  );
}
