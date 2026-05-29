import type { Metadata } from "next";
import Link from "next/link";
import { RequestReview } from "@/components/request-review";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Review your selected cabinets and submit a quote request. No payment is taken — we confirm stock and shipping by email within one business day.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/request" },
};

export default function RequestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-navy)]">Request a Quote</span>
      </nav>

      <header className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Request a quote
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
          Review &amp; request
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          We&rsquo;ll check stock, quote freight to your postal code, and confirm a final total by email within one business day. No payment is taken here.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="mb-3 font-display text-xl">Your list</h2>
          <RequestReview />
        </div>
        <div>
          <h2 className="mb-3 font-display text-xl">Your details</h2>
          <div className="border border-[var(--color-line)] bg-white p-5">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
