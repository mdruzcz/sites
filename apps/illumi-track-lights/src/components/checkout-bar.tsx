import Link from "next/link";

export function CheckoutBar() {
  return (
    <>
      <Link href="/checkout" className="btn-primary mt-4 w-full">
        Checkout
      </Link>
      <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
        Secure payment by Stripe: all major cards, Apple Pay and Google Pay. Returns within 30 days.
      </p>
    </>
  );
}
