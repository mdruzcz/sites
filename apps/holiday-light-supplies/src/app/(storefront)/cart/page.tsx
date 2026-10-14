import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CartLineEditor } from "@/components/cart-line-editor";
import { CheckoutBar } from "@/components/checkout-bar";
import { Breadcrumbs } from "@/components/ui";
import { formatCad, imageSrc } from "@/lib/utils";
import { FREE_SHIPPING_OVER } from "@/lib/site";

export const metadata = { title: "Your quote list", robots: { index: false } };

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="font-display text-3xl">Your quote list is empty</h1>
        <p className="mt-2 text-[var(--color-muted)]">Add bulbs, displays and décor from the catalog, or describe the project and we&rsquo;ll build the list.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop" className="btn-primary">Browse the catalog</Link>
          <Link href="/request-a-quote" className="btn-secondary">Describe the project</Link>
        </div>
      </div>
    );
  }

  const quoteLines = cart.items.filter((l) => l.unit_price_cad <= 0).length;

  return (
    <div className="shell py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Quote list" }]} />
      <h1 className="font-display mt-3 text-3xl md:text-4xl">Your quote list</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((l) => (
            <article key={l.id} className="card flex gap-4 p-4">
              <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-warm)]">
                <Image src={imageSrc(l.image_url)} alt={l.product_name} width={120} height={120} className="h-full w-full object-contain p-1" />
              </div>
              <div className="flex-1">
                <Link href={`/product/${l.product_slug}`} className="font-semibold hover:text-[var(--color-brand)]">{l.product_name}</Link>
                <p className="text-xs text-[var(--color-muted)]">{l.variant_name} · <span className="font-mono">{l.sku}</span></p>
                <div className="mt-3 flex items-center gap-3">
                  <CartLineEditor lineId={l.id} initialQty={l.quantity} maxQty={l.on_hand > 0 ? l.on_hand : 999} />
                </div>
              </div>
              <div className="text-right">
                {l.unit_price_cad > 0 ? (
                  <>
                    <p className="font-semibold">{formatCad(l.unit_price_cad * l.quantity)}</p>
                    <p className="text-xs text-[var(--color-muted)]">{formatCad(l.unit_price_cad)} each</p>
                  </>
                ) : (
                  <p className="text-sm font-semibold text-[var(--color-brand)]">Quoted</p>
                )}
              </div>
            </article>
          ))}
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline">← Add more products</Link>
        </div>

        <aside className="card h-fit p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Priced products" value={formatCad(cart.subtotal_cad)} />
            {quoteLines > 0 && <Row label={`Quote-only lines (${quoteLines})`} value="Priced on quote" />}
            <Row label="Shipping" value={cart.subtotal_cad >= FREE_SHIPPING_OVER ? "Free courier (freight quoted)" : "Quoted by email"} />
            <Row label="Volume pricing" value="Applied on quote" />
            <Row label="Tax" value="Added on quote" />
          </dl>
          <CheckoutBar />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-[var(--color-muted)]">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
