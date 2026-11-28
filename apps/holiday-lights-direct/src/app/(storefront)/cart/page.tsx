import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CartLineEditor } from "@/components/cart-line-editor";
import { CheckoutBar } from "@/components/checkout-bar";
import { cardCheckoutEnabled } from "@/lib/card-checkout";
import { formatCad, shipsFree, toFreeShipping } from "@/lib/utils";

export const metadata = { title: "Your cart" };

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="shell py-20 text-center md:py-28">
        <h1 className="font-display text-[2rem] md:text-[2.6rem]">Your cart is empty</h1>
        <p className="mt-2 text-[var(--color-muted)]">Browse the shop to add lights, clips, wires and connectors.</p>
        <Link href="/shop" className="btn-primary mt-7">
          Start shopping
        </Link>
      </div>
    );
  }

  const free = shipsFree(cart.subtotal_cad);
  // A cart that ships free pays by card at checkout; a smaller one, or any cart
  // while card checkout is not switched on, sends a request and pays later.
  const card = free && cardCheckoutEnabled();

  return (
    <div className="shell py-10 md:py-14">
      <h1 className="font-display text-[2rem] md:text-[2.6rem]">Your cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="min-w-0 space-y-4 lg:col-span-2">
          {cart.items.map((l) => (
            <article
              key={l.id}
              // On a phone the line total drops under the item; beside it there is
              // no room for the quantity editor and the page scrolls sideways.
              className="surface flex flex-wrap gap-x-4 gap-y-2 p-4 sm:flex-nowrap"
            >
              <div className="size-24 shrink-0 overflow-hidden rounded-[10px] bg-[var(--color-bg-tint)]">
                <Image
                  src={l.image_url || "/images/products/placeholder.webp"}
                  alt={l.product_name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${l.product_slug}`}
                  className="font-semibold hover:text-[var(--color-accent)]"
                >
                  {l.product_name}
                </Link>
                <p className="text-xs text-[var(--color-muted)]">{l.variant_name}</p>
                <p className="font-mono text-xs text-[var(--color-muted)] [overflow-wrap:anywhere]">{l.sku}</p>
                <div className="mt-2 flex items-center gap-3">
                  <CartLineEditor lineId={l.id} initialQty={l.quantity} maxQty={l.on_hand} />
                </div>
              </div>
              <div className="w-full text-right sm:w-auto">
                <p className="text-sm font-semibold">{formatCad(l.unit_price_cad * l.quantity)}</p>
                <p className="text-xs text-[var(--color-muted)]">{formatCad(l.unit_price_cad)} each</p>
              </div>
            </article>
          ))}
        </div>

        <aside className="surface min-w-0 self-start p-5 lg:sticky lg:top-36">
          <h2 className="text-lg font-bold tracking-[-0.02em]">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Product subtotal" value={formatCad(cart.subtotal_cad)} />
            <Row label="Shipping" value={free ? "Free" : "Quoted by email"} />
            <Row label="Tax" value={card ? "GST/HST at checkout" : free ? "Confirmed by email" : "Included in your quote"} />
          </dl>
          <div className="mt-4 border-t border-[var(--color-border)] pt-4 text-sm">
            <Row label="Products" value={formatCad(cart.subtotal_cad)} bold />
          </div>
          <p className="mt-3 rounded-[10px] bg-[var(--color-accent-soft)] p-2 text-xs text-[var(--color-accent)]">
            {card
              ? "This order ships free anywhere in Canada. Pay securely by card at checkout."
              : free
                ? "This order ships free anywhere in Canada. No payment is taken online."
                : `Add ${formatCad(toFreeShipping(cart.subtotal_cad))} more for free shipping. Under $500, we email your shipping cost before any payment.`}
          </p>
          <CheckoutBar free={free} card={card} />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--color-muted)]">{label}</dt>
      <dd className={bold ? "font-semibold" : ""}>{value}</dd>
    </div>
  );
}
