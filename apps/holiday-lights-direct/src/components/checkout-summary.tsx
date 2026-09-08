"use client";

import Image from "next/image";
import { useState } from "react";
import type { Cart } from "@/lib/cart";
import { formatCad } from "@/lib/utils";

export function CheckoutSummary({ cart }: { cart: Cart }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      {/* Items */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold lg:cursor-default"
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
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-slate-50">
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
                  <p className="text-xs text-slate-500">{l.variant_name}</p>
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
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
        <dl className="space-y-2 text-sm">
          <Row label="Product subtotal" value={formatCad(cart.subtotal_cad)} />
          <Row label="Shipping" value="Quoted by email" />
          <Row label="Tax" value="Included in your quote" small />
        </dl>
        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <div className="flex justify-between text-base">
            <span className="font-semibold">Products</span>
            <span className="font-display text-xl text-[var(--color-brand)]">
              {formatCad(cart.subtotal_cad)}
            </span>
          </div>
          <p className="mt-1 text-right text-[11px] text-slate-400">CAD · shipping &amp; tax quoted by email</p>
        </div>
      </div>

      {/* Trust footer */}
      <div className="rounded-xl bg-[var(--color-brand-soft)] p-4 text-xs text-[var(--color-brand)]">
        <p className="flex items-center gap-2 font-semibold">✉️ No payment taken online</p>
        <p className="mt-2 text-[var(--color-brand-dark)]/80">
          We reply with your shipping cost &amp; timeline, usually within one business day · 5-year
          LED warranty · Ships from London, Ontario.
        </p>
      </div>
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
    <div className={`flex justify-between ${small ? "text-xs text-slate-500" : ""}`}>
      <dt>{label}</dt>
      <dd className={`${valueColor ?? ""} font-medium`}>{value}</dd>
    </div>
  );
}
