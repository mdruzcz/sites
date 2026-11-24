import Link from "next/link";

export const metadata = { title: "Request received", robots: { index: false } };

export default function InquirySuccess() {
  return (
    <div className="shell py-16 md:py-24"><div className="surface mx-auto max-w-2xl p-8 text-center md:p-12">
      <div className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-green-soft)] text-2xl text-[var(--color-green)]">
        ✓
      </div>
      <h1 className="mt-4 font-display text-[2rem] md:text-[2.6rem]">Request received — check your inbox soon</h1>
      <p className="mt-3 text-[var(--color-text-soft)]">
        Thanks! We&rsquo;ve got your order details and delivery address. We&rsquo;ll email you to
        confirm your order, your delivery timeline and any shipping cost,{" "}
        <strong>usually within one business day</strong>. Shipping is free on orders over $500. No
        payment is taken until you approve.
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Nothing has been charged. Watch your inbox (and spam folder) for our reply.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/shop" className="btn-secondary">
          Keep browsing
        </Link>
      </div>
    </div></div>
  );
}
