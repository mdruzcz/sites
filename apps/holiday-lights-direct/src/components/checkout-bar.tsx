import Link from "next/link";

/**
 * The cart's call to action.
 *  - `card`: the cart ships free and card checkout is on → pay by card.
 *  - `free` only: ships free, but card checkout is off → order request.
 *  - neither: under the free-shipping threshold → shipping quote request.
 */
export function CheckoutBar({ free, card = false }: { free: boolean; card?: boolean }) {
  return (
    <>
      <Link href="/checkout" className="btn-primary group mt-4 w-full">
        {card ? "Checkout" : free ? "Send order request" : "Request a shipping quote"}
        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
        {card
          ? "Secure card payment through Stripe. GST/HST for your province is added at checkout."
          : free
            ? "No payment is taken online. We email to confirm your order, usually within one business day."
            : "No payment is taken with a quote request. We email your shipping cost, usually within one business day."}
      </p>
    </>
  );
}
