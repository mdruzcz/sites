import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutSummary } from "@/components/checkout-summary";

export const metadata = { title: "Submit an inquiry", robots: { index: false } };

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">Add items before checking out.</p>
        <Link href="/shop" className="btn-primary mt-6 inline-block">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-tight">Submit an inquiry</h1>
        <Link href="/cart" className="text-sm text-[var(--color-brand)] hover:underline">
          ← Edit cart
        </Link>
      </div>

      {/* Progress indicator */}
      <ol className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-4 text-center text-xs">
        {["Your details", "We email your quote", "Approve & we ship"].map((step, idx) => (
          <li key={step} className="flex flex-col items-center gap-2">
            <span
              className={`grid size-8 place-items-center rounded-full text-sm font-bold ${
                idx === 0
                  ? "bg-[var(--color-brand)] text-white"
                  : "border-2 border-[var(--color-border-strong)] text-slate-400"
              }`}
              aria-current={idx === 0 ? "step" : undefined}
            >
              {idx + 1}
            </span>
            <span className={idx === 0 ? "font-semibold text-[var(--color-brand)]" : "text-slate-400"}>
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
