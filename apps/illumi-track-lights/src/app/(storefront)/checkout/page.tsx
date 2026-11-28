import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="font-display h1-fluid">Your cart is empty</h1>
        <p className="mt-2 text-[var(--color-text-soft)]">Add a kit or a part before checking out.</p>
        <Link href="/diy-kits" className="btn-primary mt-6">Shop the kits</Link>
      </div>
    );
  }

  return (
    <div className="shell py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <h1 className="font-display h1-fluid">Checkout</h1>
        <Link href="/cart" className="text-link text-sm">Edit cart</Link>
      </div>
      <ol className="mb-8 flex flex-wrap gap-x-6 gap-y-1 text-[0.8rem]">
        {["Your details", "Secure payment", "Confirmation"].map((step, idx) => (
          <li key={step} aria-current={idx === 0 ? "step" : undefined} className={idx === 0 ? "font-bold text-[var(--color-ink)]" : "text-[var(--color-muted)]"}>
            {idx + 1}. {step}
          </li>
        ))}
      </ol>
      <CheckoutForm cart={cart} />
    </div>
  );
}
