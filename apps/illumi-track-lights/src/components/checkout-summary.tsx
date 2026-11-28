"use client";

import Image from "next/image";
import { useState } from "react";
import type { Cart } from "@/lib/cart";
import type { FulfilmentMethod, OrderTotals } from "@/lib/orders/policy";
import { SHOP } from "@/lib/orders/policy";
import { formatCad } from "@/lib/utils";

export function CheckoutSummary({ cart, totals, method }: { cart: Cart; totals: OrderTotals | null; method: FulfilmentMethod }) {
  const [open, setOpen] = useState(true);
  const pickup = method === "pickup";
  const box = "border border-[var(--color-border)] bg-white";

  return (
    <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
      {/* Items */}
      <div className={box}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-sm font-semibold"
        >
          <span>
            {cart.items.length} item{cart.items.length === 1 ? "" : "s"} in your order
          </span>
          <span className="price">{formatCad(cart.subtotal_cad, 2)}</span>
        </button>
        {open && (
          <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {cart.items.map((l) => (
              <li key={l.id} className="flex gap-3 px-4 py-3">
                <div className="relative size-16 shrink-0 border border-[var(--color-border)] bg-white">
                  {l.image_url && (
                    <Image
                      src={l.image_url}
                      alt={`${l.product_name}${l.variant_name && l.variant_name !== "Default" ? `, ${l.variant_name}` : ""} from Illumi Track Lights`}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-2 leading-snug">{l.product_name}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {l.variant_name !== "Default" ? `${l.variant_name} · ` : ""}Qty {l.quantity}
                  </p>
                </div>
                <p className="price text-sm">{formatCad(l.unit_price_cad * l.quantity, 2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Totals */}
      <div className={`${box} p-4`}>
        <dl className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatCad(cart.subtotal_cad, 2)} />
          <Row label={pickup ? "Pickup in Woodstock" : "Shipping"} value={pickup ? "No charge" : "Free"} good />
          <Row label={totals?.tax ? totals.tax.display : "Tax (GST/HST)"} value={totals ? formatCad(totals.taxCad, 2) : "Enter postal code"} />
        </dl>
        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Total</span>
            <span className="price font-display text-2xl">{formatCad(totals ? totals.total : cart.subtotal_cad, 2)}</span>
          </div>
          <p className="mt-1 text-right text-xs text-[var(--color-muted)]">CAD{totals ? "" : ", before tax"}</p>
        </div>
      </div>

      <p className="note text-[0.85rem]">
        <strong>{pickup ? `Pickup at ${SHOP.street}, ${SHOP.town}.` : "Ships free anywhere in Canada."}</strong>{" "}
        {pickup ? "Wait for our email before you come by." : "Nothing is added for delivery, whatever the size of the order."} Secure payment by Stripe. Returns within 30 days.
      </p>
    </aside>
  );
}

function Row({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-[var(--color-text-soft)]">{label}</dt>
      <dd className={`font-semibold ${good ? "text-[var(--color-green)]" : ""}`}>{value}</dd>
    </div>
  );
}
