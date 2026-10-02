"use client";

import Image from "next/image";
import { useState } from "react";
import type { Cart } from "@/lib/cart";
import type { OrderTotals } from "@/lib/orders/policy";
import { FLAT_RATE_CAD, FREE_RADIUS_KM, SHOP } from "@/lib/orders/policy";
import { formatCad } from "@/lib/utils";

export function CheckoutSummary({ cart, totals }: { cart: Cart; totals: OrderTotals | null }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      {/* Shipping policy */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-4 text-sm text-slate-700">
        {totals?.shipping?.free ? (
          <p className="flex items-center gap-2 font-semibold text-[var(--color-success)]">
            <span>✓</span> Free shipping to {totals.shipping.postal}
          </p>
        ) : (
          <p>
            <span className="font-semibold text-[var(--color-brand)]">Free shipping</span> within {FREE_RADIUS_KM} km of our{" "}
            {SHOP.town}, ON shop. {formatCad(FLAT_RATE_CAD)} flat rate elsewhere in Canada.
          </p>
        )}
      </div>

      {/* Items */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-sm font-semibold lg:cursor-default"
        >
          <span>
            {cart.items.length} item{cart.items.length === 1 ? "" : "s"}
          </span>
          <span className="font-display text-lg text-[var(--color-brand)]">{formatCad(cart.subtotal_cad, 2)}</span>
        </button>
        {open && (
          <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {cart.items.map((l) => (
              <li key={l.id} className="flex gap-3 px-4 py-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-slate-50">
                  {l.image_url && (
                    <Image
                      src={l.image_url}
                      alt={`${l.product_name}${l.variant_name && l.variant_name !== "Default" ? `, ${l.variant_name}` : ""} from Permanent Lighting Direct`}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  )}
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[var(--color-brand)] text-[10px] font-bold text-white">
                    {l.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-2 font-medium leading-tight">{l.product_name}</p>
                  {l.variant_name !== "Default" && <p className="text-xs text-slate-500">{l.variant_name}</p>}
                </div>
                <p className="text-sm font-semibold">{formatCad(l.unit_price_cad * l.quantity, 2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Totals */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
        <dl className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatCad(cart.subtotal_cad, 2)} />
          <Row
            label="Shipping"
            value={totals?.shipping ? (totals.shipping.free ? "FREE" : formatCad(totals.shipping.amountCad, 2)) : "Enter postal code"}
            valueColor={totals?.shipping?.free ? "text-[var(--color-success)]" : undefined}
          />
          <Row label={totals?.tax ? totals.tax.display : "Tax (GST/HST)"} value={totals ? formatCad(totals.taxCad, 2) : "By province"} />
        </dl>
        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <div className="flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-display text-xl text-[var(--color-brand)]">
              {formatCad(totals ? totals.total : cart.subtotal_cad, 2)}
            </span>
          </div>
          <p className="mt-1 text-right text-[11px] text-slate-400">CAD{totals ? "" : " · before shipping and tax"}</p>
        </div>
      </div>

      {/* Trust footer */}
      <div className="rounded-xl bg-[var(--color-brand-soft)] p-4 text-xs text-[var(--color-brand)]">
        <p className="flex items-center gap-2 font-semibold">🔒 Secure checkout via Stripe</p>
        <p className="mt-2 text-[var(--color-brand-dark)]/80">
          Returns within 30 days · 5-year LED warranty · Invoiced by Master Decker Inc., {SHOP.town}, Ontario.
        </p>
      </div>
    </aside>
  );
}

function Row({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt>{label}</dt>
      <dd className={`${valueColor ?? ""} font-medium`}>{value}</dd>
    </div>
  );
}
