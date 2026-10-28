"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only "Get my free quote" pill, bottom-left so it sits beside the
 * Call Now FAB. Hidden while any quote form is on screen.
 */
export function StickyQuoteCta({ label = "Get my free quote" }: { label?: string }) {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const forms = document.querySelectorAll("[data-quote-form]");
    if (!forms.length || typeof IntersectionObserver === "undefined") return;
    const showing = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) showing.add(e.target);
        else showing.delete(e.target);
      }
      setFormInView(showing.size > 0);
    }, { threshold: 0.2 });
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#quote"
      className={`fixed bottom-5 left-4 z-50 flex min-h-[44px] items-center rounded-full bg-[color:var(--brand-green)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xl transition-all lg:hidden ${formInView ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}
    >
      {label}
    </a>
  );
}
