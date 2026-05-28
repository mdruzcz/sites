import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Forever Cabinets",
  description:
    "Why we sell one cabinet style. Built for people who bought a kitchen elsewhere and need to fill a gap — without re-doing the whole thing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
        About
      </p>
      <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
        We sell the cabinet you forgot to order.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
        <p>
          Most cabinet companies want to sell you a whole kitchen. We&rsquo;re built for the opposite — the moment three months into your renovation when you realize you needed one more drawer base. Or your dishwasher slot is 30″ wide and you ordered 24″. Or you want to expand into the pantry.
        </p>
        <p>
          Every cabinet store treats those one-off orders like an annoyance. We treat them like the main event.
        </p>
        <p>
          We ship one door style: White Shaker. It&rsquo;s the most common cabinet in Canadian kitchens, so the match-rate is high. We back it with sample doors, real human confirmation on every order, and 30-day returns.
        </p>
        <p>
          You don&rsquo;t need a designer. You don&rsquo;t need a sales call. You need a 24-inch base cabinet in 2–3 weeks. That&rsquo;s us.
        </p>
      </div>

      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-[var(--color-navy)]">1</p>
            <p className="mt-1 text-sm uppercase tracking-widest text-[var(--color-ink-soft)]">Door style</p>
          </div>
          <div>
            <p className="font-display text-3xl text-[var(--color-navy)]">{SITE.leadTime}</p>
            <p className="mt-1 text-sm uppercase tracking-widest text-[var(--color-ink-soft)]">From order to door</p>
          </div>
          <div>
            <p className="font-display text-3xl text-[var(--color-navy)]">100%</p>
            <p className="mt-1 text-sm uppercase tracking-widest text-[var(--color-ink-soft)]">Of orders confirmed by a human</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-3">
        <Link href="/cabinets" className="btn-primary">Browse the catalog</Link>
        <Link href="/our-cabinets" className="btn-secondary">See how they&rsquo;re built</Link>
      </div>
    </div>
  );
}
