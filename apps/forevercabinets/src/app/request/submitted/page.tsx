import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Thanks for your quote request. We'll get back to you within one business day.",
  robots: { index: false, follow: false },
};

export default async function SubmittedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brass)] text-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
        Got it — thanks!
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[var(--color-ink-soft)]">
        We&rsquo;ve received your request and a real person will get back to you within one business day. You should see a confirmation in your inbox already.
      </p>
      <div className="mx-auto mt-8 max-w-md border border-[var(--color-line)] bg-white p-6 text-left">
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-brass-dark)]">
          What happens next
        </h2>
        <ol className="mt-3 space-y-3 text-sm">
          <li><span className="font-medium">1.</span> We check stock for each item on your list.</li>
          <li><span className="font-medium">2.</span> We quote freight to your postal code.</li>
          <li><span className="font-medium">3.</span> You receive a final total — approve it to lock the order.</li>
          <li><span className="font-medium">4.</span> Pay your invoice and we ship within {SITE.leadTime}.</li>
        </ol>
      </div>
      {id && (
        <p className="mt-6 font-mono text-xs text-[var(--color-ink-soft)]">
          Reference: {id.slice(0, 8)}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-secondary">Back to home</Link>
        <Link href="/cabinets" className="btn-primary">Browse more cabinets</Link>
      </div>
    </div>
  );
}
