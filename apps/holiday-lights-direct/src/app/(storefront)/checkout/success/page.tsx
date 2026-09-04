import Link from "next/link";

export const metadata = { title: "Request received", robots: { index: false } };

export default function InquirySuccess() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
        ✓
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Request received — check your inbox soon</h1>
      <p className="mt-3 text-slate-600">
        Thanks! We&rsquo;ve got your order details and delivery address. We&rsquo;ll email you your
        shipping cost and delivery timeline, <strong>usually within one business day</strong>. No
        payment is taken until you approve the quote.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Nothing has been charged. Watch your inbox (and spam folder) for your personalized shipping
        quote.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/shop" className="btn-secondary">
          Keep browsing
        </Link>
      </div>
    </div>
  );
}
