import type { Metadata } from "next";
import { StainCalculator } from "@/components/stain-calculator";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Deck & Fence Stain Calculator",
  description:
    "Estimate how much Ready Seal wood stain & sealer you need for your deck or fence. Enter your dimensions and get a gallon recommendation in seconds.",
  alternates: { canonical: `${SITE_URL}/calculator` }
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="eyebrow text-[var(--color-brand)]">Plan your project</p>
      <h1 className="font-display mt-2 text-3xl md:text-4xl">Deck &amp; fence stain calculator</h1>
      <p className="mt-3 text-slate-600">
        On the <strong>first coat</strong>, Ready Seal covers roughly <strong>125 sq ft per gallon on
        rough or weathered wood</strong> and up to <strong>250 sq ft per gallon on smooth, planed
        wood</strong>. A recommended <strong>second coat</strong> lands on sealed wood, so it behaves
        like a smooth deck and covers about <strong>250 sq ft per gallon</strong> — using noticeably
        less. Enter your dimensions below; remember to include railings, spindles, and both sides of a
        fence.
      </p>
      <StainCalculator />
    </div>
  );
}
