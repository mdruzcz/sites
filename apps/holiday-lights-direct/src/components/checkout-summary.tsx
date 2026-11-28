"use client";

import Image from "next/image";
import { useState } from "react";
import type { Cart } from "@/lib/cart";
import type { OrderTotals } from "@/lib/orders/policy";
import { formatCad, shipsFree } from "@/lib/utils";

/**
 * Order summary beside the checkout form.
 *
 * With `totals` it is the card checkout summary (free shipping, GST/HST by
 * province, a real total). Without it, it is the request summary: shipping and
 * tax are confirmed by email and no payment is taken.
 */
export function CheckoutSummary({ cart, totals }: { cart: Cart; totals?: OrderTotals | null }) {
  const [open, setOpen] = useState(true);
  const free = shipsFree(cart.subtotal_cad);
  const card = totals !== undefined;

  return (
    <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
      {card && (
        <div className="rounded-[14px] border border-[var(--color-border)] bg-white p-4 text-sm">
          <p className="flex items-center gap-2 font-semibold text-[var(--color-green)]">
            <span aria-hidden>✓</span> Free shipping on this order, anywhere in Canada
          </p>
        </div>
      )}

      {/* Items */}
      <div className="rounded-[14px] border border-[var(--color-border)] bg-white">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-sm font-semibold lg:cursor-default"
        >
          <span>{cart.items.length} item{cart.items.length === 1 ? "" : "s"}</span>
          <span className="font-display text-lg text-[var(--color-brand)]">
            {formatCad(cart.subtotal_cad)}
          </span>
        </button>
        {open && (
          <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {cart.items.map((l) => (
              <li key={l.id} className="flex gap-3 px-4 py-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-[10px] bg-[var(--color-bg-tint)]">
                  <Image
                    src={l.image_url || "/images/products/placeholder.webp"}
                    alt={l.product_name}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[var(--color-brand)] text-[10px] font-bold text-white">
                    {l.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-2 font-medium leading-tight">{l.product_name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{l.variant_name}</p>
                </div>
                <p className="text-sm font-semibold">
                  {formatCad(l.unit_price_cad * l.quantity)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Totals */}
      {card ? (
        <div className="rounded-[14px] border border-[var(--color-border)] bg-white p-4">
          <dl className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatCad(cart.subtotal_cad)} />
            <Row label="Shipping" value="Free" valueColor="text-[var(--color-green)]" />
            <Row
              label={totals?.tax ? totals.tax.display : "Tax (GST/HST)"}
              value={totals ? formatCad(totals.taxCad) : "By province"}
            />
          </dl>
          <div className="mt-4 border-t border-[var(--color-border)] pt-4">
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-display text-xl text-[var(--color-brand)]" aria-live="polite">
                {formatCad(totals ? totals.total : cart.subtotal_cad)}
              </span>
            </div>
            <p className="mt-1 text-right text-[11px] text-[var(--color-muted)]">CAD{totals ? "" : " · before tax"}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] border border-[var(--color-border)] bg-white p-4">
          <dl className="space-y-2 text-sm">
            <Row label="Product subtotal" value={formatCad(cart.subtotal_cad)} />
            <Row label="Shipping" value={free ? "Free" : "Quoted by email"} valueColor={free ? "text-[var(--color-green)]" : undefined} />
            <Row label="Tax" value={free ? "Confirmed by email" : "Included in your quote"} small />
          </dl>
          <div className="mt-4 border-t border-[var(--color-border)] pt-4">
            <div className="flex justify-between text-base">
              <span className="font-semibold">Products</span>
              <span className="font-display text-xl text-[var(--color-brand)]">
                {formatCad(cart.subtotal_cad)}
              </span>
            </div>
            <p className="mt-1 text-right text-[11px] text-[var(--color-muted)]">
              {free ? "CAD · free shipping · tax confirmed by email" : "CAD · shipping and tax quoted by email"}
            </p>
          </div>
        </div>
      )}

      {/* Trust footer */}
      {card ? (
        <div className="rounded-[14px] bg-[var(--color-brand-soft)] p-4 text-xs text-[var(--color-brand)]">
          <p className="font-semibold">Secure card payment through Stripe</p>
          <p className="mt-2 text-[var(--color-brand-dark)]/80">
            Free shipping over $500 · 5-year LED warranty · Ships from London, Ontario · Invoiced by Master Decker Inc.
          </p>
        </div>
      ) : (
        <div className="rounded-[14px] bg-[var(--color-brand-soft)] p-4 text-xs text-[var(--color-brand)]">
          <p className="font-semibold">No payment taken with this request</p>
          <p className="mt-2 text-[var(--color-brand-dark)]/80">
            {free ? "This order ships free. We reply to confirm it and your delivery timeline" : "We reply with your shipping cost and timeline"}, usually
            within one business day · Free shipping over $500 · 5-year LED warranty · Ships from London, Ontario.
          </p>
        </div>
      )}
    </aside>
  );
}

function Row({
  label,
  value,
  small,
  valueColor
}: {
  label: string;
  value: string;
  small?: boolean;
  valueColor?: string;
}) {
  return (
    <div className={`flex justify-between gap-3 ${small ? "text-xs text-[var(--color-muted)]" : ""}`}>
      <dt>{label}</dt>
      <dd className={`${valueColor ?? ""} font-medium`}>{value}</dd>
    </div>
  );
}
