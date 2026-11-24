import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutSummary } from "@/components/checkout-summary";
import { shipsFree } from "@/lib/utils";

export const metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage() {
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

  const free = shipsFree(cart.subtotal_cad);

  return (
    <div className="shell py-10 md:py-14">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-[2rem] md:text-[2.6rem]">
          {free ? "Send your order request" : "Request a shipping quote"}
        </h1>
        <Link href="/cart" className="text-sm text-[var(--color-brand)] hover:underline">
          ← Edit cart
        </Link>
      </div>

      {/* Progress indicator */}
      <ol className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-4 text-center text-xs">
        {["Your details", free ? "We confirm by email" : "We email your quote", "Approve & we ship"].map((step, idx) => (
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

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <CheckoutForm cart={cart} />
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  );
}
