import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CartLineEditor } from "@/components/cart-line-editor";
import { CheckoutBar } from "@/components/checkout-bar";
import { formatCad } from "@/lib/utils";

export const metadata = { title: "Your cart" };

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">Browse the shop to add lights, clips, wires and connectors.</p>
        <Link href="/shop" className="btn-primary mt-6 inline-block">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((l) => (
            <article
              key={l.id}
              className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="size-24 shrink-0 overflow-hidden rounded-md bg-slate-50">
                <Image
                  src={l.image_url || "/images/products/placeholder.webp"}
                  alt={l.product_name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/product/${l.product_slug}`}
                  className="font-semibold hover:text-[var(--color-accent)]"
                >
                  {l.product_name}
                </Link>
                <p className="text-xs text-slate-500">{l.variant_name}</p>
                <p className="text-xs text-slate-400 font-mono">{l.sku}</p>
                <div className="mt-2 flex items-center gap-3">
                  <CartLineEditor lineId={l.id} initialQty={l.quantity} maxQty={l.on_hand} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatCad(l.unit_price_cad * l.quantity)}</p>
                <p className="text-xs text-slate-500">{formatCad(l.unit_price_cad)} each</p>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Product subtotal" value={formatCad(cart.subtotal_cad)} />
            <Row label="Shipping" value="Quoted by email" />
            <Row label="Tax" value="Included in your quote" />
          </dl>
          <div className="mt-4 border-t border-slate-200 pt-4 text-sm">
            <Row label="Products" value={formatCad(cart.subtotal_cad)} bold />
          </div>
          <p className="mt-3 rounded-md bg-[var(--color-accent-soft)] p-2 text-xs text-[var(--color-accent)]">
            No payment is taken online — we&rsquo;ll email your shipping cost, usually within one business day.
          </p>
          <CheckoutBar />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className={bold ? "font-semibold" : ""}>{value}</dd>
    </div>
  );
}
