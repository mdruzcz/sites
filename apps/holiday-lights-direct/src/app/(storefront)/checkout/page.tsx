import Link from "next/link";
import { getCart } from "@/lib/cart";
import { cardCheckoutEnabled, priceCartLive } from "@/lib/card-checkout";
import { CardCheckoutForm } from "@/components/card-checkout-form";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutSummary } from "@/components/checkout-summary";
import { shipsFree } from "@/lib/utils";

export const metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ request?: string }>;
}

/**
 * Two ways to check out:
 *  - a cart that ships free ($500 or more) pays by card on Stripe;
 *  - a smaller cart sends a shipping quote request, because shipping on small
 *    parcels is quoted by hand.
 * The request form is also what a $500+ cart gets with ?request=1 (e-transfer,
 * invoice or a discount code), and what every cart gets until this deployment
 * has a Stripe key.
 */
export default async function CheckoutPage({ searchParams }: PageProps) {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="shell py-20 text-center md:py-28">
        <h1 className="font-display text-[2rem] md:text-[2.6rem]">Your cart is empty</h1>
        <p className="mt-2 text-[var(--color-muted)]">Add items before checking out.</p>
        <Link href="/shop" className="btn-primary mt-7">
          Start shopping
        </Link>
      </div>
    );
  }

  const { request } = await searchParams;
  // Card checkout shows and charges today's prices, so eligibility is decided on
  // the re-priced cart. The request form keeps the cart exactly as it was saved.
  const live = cardCheckoutEnabled() ? await priceCartLive(cart) : null;
  const cardAvailable = !!live && shipsFree(live.cart.subtotal_cad);
  const payByCard = cardAvailable && request !== "1";
  const free = shipsFree(cart.subtotal_cad);

  const title = payByCard ? "Checkout" : free ? "Send your order request" : "Request a shipping quote";
  const steps = payByCard
    ? ["Details & shipping", "Secure payment", "Confirmation"]
    : ["Your details", free ? "We confirm by email" : "We email your quote", "Approve & we ship"];

  return (
    <div className="shell py-10 md:py-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-[2rem] md:text-[2.6rem]">{title}</h1>
        <Link href="/cart" className="shrink-0 text-sm text-[var(--color-brand)] hover:underline">
          ← Edit cart
        </Link>
      </div>

      {/* Progress indicator */}
      <ol className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-4 text-center text-xs">
        {steps.map((step, idx) => (
          <li key={step} className="flex flex-col items-center gap-2">
            <span
              className={`grid size-8 place-items-center rounded-full text-sm font-bold ${
                idx === 0
                  ? "bg-[var(--color-brand)] text-white"
                  : "border-2 border-[var(--color-border-strong)] text-[var(--color-muted)]"
              }`}
              aria-current={idx === 0 ? "step" : undefined}
            >
              {idx + 1}
            </span>
            <span className={idx === 0 ? "font-semibold text-[var(--color-brand)]" : "text-[var(--color-muted)]"}>
              {step}
            </span>
          </li>
        ))}
      </ol>

      {payByCard && live ? (
        <CardCheckoutForm cart={live.cart} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <CheckoutForm cart={cart} cardOption={cardAvailable} />
          <CheckoutSummary cart={cart} />
        </div>
      )}
    </div>
  );
}
