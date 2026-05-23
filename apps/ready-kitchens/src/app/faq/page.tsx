import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Cabinets, Pickup, Payment, Install",
  description: "Frequently asked questions about Ready Kitchens cabinet packages — construction, sizes, pickup, payment terms, and installation.",
};

const FAQ = [
  {
    q: "Are the cabinets really fully assembled?",
    a: "Yes. Every cabinet is built, hung, and adjusted at our Belmont warehouse before pickup. No flat-pack boxes — you load complete cabinets with doors and drawers in place.",
  },
  {
    q: "What are the boxes made of?",
    a: "All cabinet boxes are 1/2\" and 5/8\" Baltic-style plywood — no MDF, no particleboard. Doors and drawer fronts are solid maple painted White Shaker. Drawer boxes are dovetailed maple plywood.",
  },
  {
    q: "What are the standard sizes?",
    a: "Base cabinets are 34½\" tall × 24\" deep. Wall cabinets are 36\" tall × 12\" deep (over-range and over-fridge variants are 18\" tall). The 90\" tall pantry is 24\" deep × 24\" wide.",
  },
  {
    q: "Can I add or swap cabinets in a kit?",
    a: "Yes — additional cabinets may be ordered based on availability. Mention what you want to add or swap in the notes when you submit your order, and we'll quote it back to you.",
  },
  {
    q: "Do you charge me when I submit the order?",
    a: "No. Submitting an order is a request — we confirm stock, give you a final total, and only then send a secure payment link (e-transfer, credit card, or contractor terms).",
  },
  {
    q: "Can I just pick up — or do you deliver?",
    a: `Both. Pickup at ${SITE.address} is free. We can also quote delivery anywhere in Ontario after you submit your order.`,
  },
  {
    q: "Do you offer contractor / volume pricing?",
    a: "Yes. Contractors who buy multiple kits get tiered pricing — mention your business in the notes when you submit and we'll set up an account.",
  },
  {
    q: "What about countertops, sinks, and appliances?",
    a: "We sell the cabinet package only. We can recommend local fabricators for quartz/granite and we're happy to leave cut-outs unhung if you want a custom sink or oven configuration.",
  },
  {
    q: "What if I need help measuring or designing?",
    a: "Call us at " + SITE.phoneDisplay + ". We can talk you through which kit fits your space, and we can quote a full custom Forever Cabinets kitchen if a stock kit doesn't fit.",
  },
];

export default function FaqPage() {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">FAQ</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Frequently asked questions</h1>
      </header>

      <div className="mt-10 space-y-3">
        {FAQ.map((item) => (
          <details key={item.q} className="group rounded-lg border border-[var(--color-line)] bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-start justify-between gap-4 font-display text-lg">
              <span>{item.q}</span>
              <span className="mt-1 shrink-0 text-[var(--color-accent)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-[var(--color-ink-soft)]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
