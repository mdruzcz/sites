"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";
import { ChevronDownIcon } from "./icons";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[var(--greige)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            Common Questions
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Frequently asked questions
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            Don&apos;t see your question? Call us at{" "}
            <a href="tel:+12264760604" className="text-[var(--terracotta-deep)] font-semibold underline">
              (226) 476-0604
            </a>{" "}
            or send a message below.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className="bg-[var(--cream)] rounded-xl border border-[var(--line)] shadow-warm overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 min-h-11"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[var(--driftwood-dark)] text-base lg:text-lg">
                  {f.q}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 flex-shrink-0 text-[var(--terracotta)] transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 pt-1 text-[var(--driftwood)]/80 leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
