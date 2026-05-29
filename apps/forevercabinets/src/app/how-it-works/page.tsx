import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "How It Works — Browse, Request a Quote, Pay, Ship",
  description:
    "Buying a cabinet from us is simple: build a request list, we confirm stock and freight by email, you approve the quote and pay, we ship in 2–3 weeks across Canada.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    n: "01",
    title: "Browse the catalog",
    body: "Find the cabinet (or cabinets) you need. Filter by type and width. Add each to your Request List.",
  },
  {
    n: "02",
    title: "Submit your request",
    body: "Fill in your name, email, phone, and postal code. No payment. No commitment. Takes 30 seconds.",
  },
  {
    n: "03",
    title: "We confirm by email",
    body: "Within one business day, you'll get back a confirmed total including freight to your postal code. If anything's out of stock we'll suggest alternatives.",
  },
  {
    n: "04",
    title: "Approve and pay",
    body: "Reply to confirm, and we'll send a secure payment link (e-transfer, credit card, or invoice).",
  },
  {
    n: "05",
    title: "We ship",
    body: `LTL freight across Canada in ${SITE.leadTime}. You'll get tracking and a delivery appointment.`,
  },
  {
    n: "06",
    title: "Easy assembly",
    body: "Each cabinet is RTA (ready-to-assemble). About 30 minutes per cabinet with a screwdriver. We can pre-assemble for an extra fee — ask in your request.",
  },
];

export default function HowItWorksPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why do you ask for a quote instead of letting me check out?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cabinets are heavy freight. Shipping cost depends on your postal code, and stock changes weekly. We confirm both before charging you so there are no surprises.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get cabinets shipped?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE.leadTime} from order confirmation to your door, anywhere in Canada.`,
        },
      },
      {
        "@type": "Question",
        name: "Are the cabinets ready-to-assemble?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. About 30 minutes per cabinet. Pre-assembled shipping available for an extra fee — request it in your quote.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="border-b border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
            How it works
          </p>
          <h1 className="mt-4 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
            Browse. Request. Approve. Ship.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            We don&rsquo;t take payment until we&rsquo;ve confirmed stock and shipping for your exact order. Here&rsquo;s every step.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20">
        <ol className="space-y-12">
          {STEPS.map((s) => (
            <li key={s.n} className="grid gap-4 sm:grid-cols-[80px_1fr]">
              <span className="font-display text-3xl text-[var(--color-brass)]">{s.n}</span>
              <div>
                <h2 className="font-display text-2xl text-[var(--color-navy)]">{s.title}</h2>
                <p className="mt-2 leading-relaxed text-[var(--color-ink-soft)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-16 flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-10">
          <Link href="/cabinets" className="btn-primary">Browse the catalog</Link>
          <Link href="/cabinets/sample-door" className="btn-secondary">Order a sample door</Link>
        </div>
      </section>
    </>
  );
}
