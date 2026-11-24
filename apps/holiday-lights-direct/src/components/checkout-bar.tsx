import Link from "next/link";

export function CheckoutBar({ free }: { free: boolean }) {
  return (
    <>
      <Link href="/checkout" className="btn-primary group mt-4 w-full">
        {free ? "Send order request" : "Request a shipping quote"}
        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
        {free
          ? "No payment is taken online. We email to confirm your order, usually within one business day."
          : "No payment is taken online. We email your shipping cost, usually within one business day."}
      </p>
    </>
  );
}
