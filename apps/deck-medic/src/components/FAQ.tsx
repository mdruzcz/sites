"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How often should I stain my deck in Ontario?",
    a: "Due to our harsh winters and humid summers, we recommend staining horizontal surfaces (floors) every 2–3 years and vertical surfaces (railings, fences) every 4–5 years.",
  },
  {
    q: "How long does the restoration process take?",
    a: "Most projects are completed in 2–3 visits. We first power wash the deck, let it dry for 48–72 hours, then return for sanding and staining.",
  },
  {
    q: "Do I need to be home while you work?",
    a: "No — as long as we have access to an outdoor water tap and power outlet for our sanding equipment, you don't need to be home.",
  },
  {
    q: "What is the difference between transparent, semi-transparent, and solid stains?",
    a: "Transparent stains show the most wood grain but need more frequent maintenance. Solid stains look like paint and hide imperfections best. We usually recommend semi-transparent for the perfect balance of beauty and UV protection.",
  },
  {
    q: "Do you sand the deck before staining?",
    a: "Yes — always. Sanding is a crucial step that many DIYers skip. It opens the wood grain, allowing the stain to penetrate deeper, which prevents peeling and ensures a smoother finish.",
  },
  {
    q: "What happens if it rains right after you stain?",
    a: "We monitor the weather closely. If unexpected rain occurs within 24 hours of application, we inspect the surface and perform any necessary touch-ups at no extra cost.",
  },
  {
    q: "How do I know if my deck needs a new coat of sealer?",
    a: "Try the Water Test — pour a small amount of water on your deck boards. If it beads up, protection is still active. If it soaks in and turns the wood dark, it's time to call Deck Medic.",
  },
  {
    q: "Can you fix loose boards or popped nails?",
    a: "Absolutely. Our restoration includes structural tune-ups where we secure loose boards and reset nails and screws before we start the staining process.",
  },
  {
    q: "Does your stain peel?",
    a: "We use high-quality penetrating stains that soak into the wood rather than sitting on top like a film. This significantly reduces the risk of peeling and makes future maintenance much easier.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--blue)" }}
          >
            Frequently Asked Questions
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ color: "var(--slate)" }}
          >
            Your Questions, Answered
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--light-grey)" }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left min-h-11"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-semibold text-base"
                  style={{ color: open === i ? "var(--blue)" : "var(--slate)" }}
                >
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                  style={{ color: "var(--blue)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="pb-5">
                  <p className="text-base leading-relaxed" style={{ color: "var(--slate-muted)" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
