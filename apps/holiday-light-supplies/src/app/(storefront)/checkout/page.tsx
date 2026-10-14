import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutSummary } from "@/components/checkout-summary";

export const metadata = { title: "Request your quote", robots: { index: false } };

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="font-display text-3xl">Your quote list is empty</h1>
        <p className="mt-2 text-[var(--color-muted)]">Add products first, or describe the project and we&rsquo;ll build the list for you.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop" className="btn-primary">Browse the catalog</Link>
          <Link href="/request-a-quote" className="btn-secondary">Describe the project</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl md:text-4xl">Request your quote</h1>
        <Link href="/cart" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">← Edit list</Link>
      </div>

      <ol className="mx-auto mb-10 grid max-w-2xl grid-cols-3 gap-4 text-center text-xs">
        {["Your details", "We email your quote", "Approve & we ship"].map((step, idx) => (
          <li key={step} className="flex flex-col items-center gap-2">
            <span className={`grid size-8 place-items-center rounded-full text-sm font-bold ${idx === 0 ? "bg-[var(--color-brand)] text-white" : "border-2 border-[var(--color-border-strong)] text-[var(--color-muted)]"}`} aria-current={idx === 0 ? "step" : undefined}>
              {idx + 1}
            </span>
            <span className={idx === 0 ? "font-semibold text-[var(--color-brand)]" : "text-[var(--color-muted)]"}>{step}</span>
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
