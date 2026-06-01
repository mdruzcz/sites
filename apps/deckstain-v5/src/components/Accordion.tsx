"use client";

import { useState } from "react";
import type { Faq } from "@/lib/data";

export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button className="w-full flex items-center justify-between gap-4 py-4 text-left" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="font-semibold text-[var(--ink)] text-[1rem]" style={{ fontFamily: "var(--font-head)" }}>{f.q}</span>
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-[var(--green)] rotate-45" : "bg-[var(--bg-alt)]"}`}>
                <svg className={`w-4 h-4 ${isOpen ? "text-white" : "text-[var(--ink-2)]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden"><p className="muted leading-relaxed pr-10">{f.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
