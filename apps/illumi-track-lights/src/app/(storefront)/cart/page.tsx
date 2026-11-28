import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/cart";
import { CartLineEditor } from "@/components/cart-line-editor";
import { CheckoutBar } from "@/components/checkout-bar";
import { BRAND, formatCad } from "@/lib/utils";

export const metadata = { title: "Your cart", robots: { index: false } };

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="font-display h1-fluid">Your cart is empty</h1>
        <p className="mt-2 text-[var(--color-text-soft)]">Start with a kit sized to your roofline, or pick the parts you need.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-primary">Shop the kits</Link>
          <Link href="/shop" className="btn-secondary">See every part</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-8 md:py-12">
      <h1 className="font-display h1-fluid border-b border-[var(--color-border)] pb-4">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] lg:col-span-2 lg:self-start">
          {cart.items.map((l) => (
            <li key={l.id} className="flex gap-4 py-5">
              <div className="size-24 shrink-0 border border-[var(--color-border)] bg-white">
                {l.image_url && (
                  <Image src={l.image_url} alt={`${l.product_name} from Illumi Track Lights`} width={120} height={120} className="h-full w-full object-contain" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/product/${l.product_slug}`} className="text-[1.0625rem] text-[var(--color-ink)] hover:underline">
                  {l.product_name}
                </Link>
                {l.variant_name !== "Default" && <p className="text-sm text-[var(--color-text-soft)]">{l.variant_name}</p>}
                <p className="font-mono text-xs text-[var(--color-muted)]">{l.sku}</p>
                <div className="mt-2">
                  <CartLineEditor lineId={l.id} initialQty={l.quantity} maxQty={l.on_hand} />
                </div>
              </div>
              <div className="text-right">
                <p className="price">{formatCad(l.unit_price_cad * l.quantity, 2)}</p>
                <p className="text-xs text-[var(--color-muted)]">{formatCad(l.unit_price_cad, 2)} each</p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="border border-[var(--color-border)] bg-white p-5 lg:self-start">
          <h2 className="font-display text-xl">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={formatCad(cart.subtotal_cad, 2)} />
            <Row label="Shipping or pickup" value="Free" good />
            <Row label="GST/HST" value="By province at checkout" />
          </dl>
          <div className="mt-4 border-t border-[var(--color-border)] pt-4">
            <Row label="Total before tax" value={formatCad(cart.subtotal_cad, 2)} bold />
          </div>
          <p className="note mt-4 text-[0.85rem]">
            <strong>This order ships free</strong> to any address in Canada. Prefer to collect it? Choose pickup at checkout: {BRAND.street}, {BRAND.city}.
          </p>
          <CheckoutBar />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold, good }: { label: string; value: string; bold?: boolean; good?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className={bold ? "font-semibold" : "text-[var(--color-text-soft)]"}>{label}</dt>
      <dd className={`${bold ? "price text-lg" : "font-semibold"} ${good ? "text-[var(--color-green)]" : ""}`}>{value}</dd>
    </div>
  );
}
