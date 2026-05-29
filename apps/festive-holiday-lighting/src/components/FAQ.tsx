"use client";

import { useState } from "react";

export type FAQItem = { q: string; a: string };

export const homeFaqs: FAQItem[] = [
  {
    q: "Do you supply all the lighting materials?",
    a: "Yes, we supply everything — lights, clips, extension cords, timers, and all accessories. You don't need to buy a single thing. We use commercial-grade LED lights that are far brighter and more durable than anything available at hardware stores.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential installations are completed in a single day. Larger commercial or municipal projects may take 2-3 days. We'll give you a specific timeline during your free quote.",
  },
  {
    q: "What's the difference between seasonal and permanent lighting?",
    a: "Seasonal lighting is installed each November/December and removed in January — perfect for classic Christmas curb appeal. Permanent lighting is installed once and stays year-round: smart RGBW LEDs built into your roofline that you control with a phone app for any occasion. Many clients do both — permanent lights for year-round use plus a full seasonal program for Christmas.",
  },
  {
    q: "Are your services insured?",
    a: "Yes, we carry $5M liability insurance and all crews are WSIB compliant. You're fully protected on every project.",
  },
  {
    q: "Can I customize the lighting design?",
    a: "Absolutely. We work with you to create a design that complements your home's architecture and your personal style. Whether you prefer elegant white lights, bold multicolour displays, or something in between — we make it happen.",
  },
  {
    q: "Do you work with businesses and commercial properties?",
    a: "Yes! We serve storefronts, office buildings, plazas, hotels, restaurants, municipalities, and BIAs. Commercial displays are designed to attract customers and create an inviting atmosphere. We have the boom trucks and boom lifts to handle any commercial property.",
  },
  {
    q: "What happens if lights go out during the season?",
    a: "We include a mid-season maintenance check on all installations. If anything goes dark, call us and we'll return to fix it — usually within 1-2 business days. Your display stays bright all season.",
  },
  {
    q: "Do you offer interior decorating services?",
    a: "Yes! We can transform lobbies, event spaces, retail floors, and offices with stunning interior holiday décor and lighting. Ask about our interior decorating packages when you get your quote.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve all of Southern Ontario including Hamilton, Burlington, Oakville, Mississauga, Brampton, Milton, Ancaster, Grimsby, St. Catharines, and Niagara Falls. Not sure if we cover your area? Just call us at (289) 426-5764.",
  },
];

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
