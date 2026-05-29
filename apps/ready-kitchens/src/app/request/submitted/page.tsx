import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Received — We&apos;ll Be in Touch",
  description: "Your Ready Kitchens order has been received. We'll confirm stock and pickup within one business day.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ id?: string }> };

export default async function SubmittedPage({ searchParams }: Props) {
  const { id } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center lg:px-8">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--color-sage)] text-white">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-4xl">Order received.</h1>
      <p className="mt-3 text-lg text-[var(--color-ink-soft)]">
        Thanks — we&rsquo;ve got your request and will reply within one business day with stock confirmation, final total, and pickup or delivery details. No payment has been taken.
      </p>
      {id && (
        <p className="mt-4 font-mono text-xs text-[var(--color-ink-soft)]">Reference: {id}</p>
      )}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href="/kits" className="btn-secondary">Browse more kits</Link>
        <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="btn-primary">
          Call {SITE.phoneDisplay}
        </a>
      </div>

      <div className="mt-10 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-5 text-left text-sm text-[var(--color-ink-soft)]">
        <p className="font-semibold text-[var(--color-ink)]">Pickup location</p>
        <p className="mt-1">50432 Yorke Line, Belmont, ON {SITE.postalCode}</p>
        <p className="mt-1">{SITE.pickupHours}</p>
      </div>
    </div>
  );
}
