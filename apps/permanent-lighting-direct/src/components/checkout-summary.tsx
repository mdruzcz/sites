"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Cart } from "@/lib/cart";
import { formatCad } from "@/lib/utils";

export function CheckoutSummary({ cart }: { cart: Cart }) {
  const [open, setOpen] = useState(true);
  const remaining = Math.max(0, 500 - cart.subtotal_cad);
  const progress = Math.min(100, (cart.subtotal_cad / 500) * 100);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      {/* Free-shipping bar */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
        {remaining > 0 ? (
          <>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-[var(--color-brand)]">Add {formatCad(remaining)}</span>{" "}
              for FREE Canada shipping.
            </p>
            <Link href="/shop" className="mt-1 inline-block text-xs text-[var(--color-brand)] hover:underline">
              Browse more →
            </Link>
          </>
        ) : (
          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]">
            <span>✓</span> You&rsquo;ve unlocked free shipping
          </p>
        )}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-[var(--color-brand)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

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
                  {l.image_url && (
                    <Image
                      src={l.image_url}
                      alt={l.product_name}
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
          <Row label="Subtotal" value={formatCad(cart.subtotal_cad)} />
          <Row
            label="Shipping"
            value={cart.subtotal_cad >= 500 ? "FREE" : "Calculated at next step"}
            valueColor={cart.subtotal_cad >= 500 ? "text-[var(--color-success)]" : undefined}
          />
          <Row label="Tax (GST/HST/PST)" value="Auto via Stripe Tax" small />
        </dl>
        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <div className="flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-display text-xl text-[var(--color-brand)]">
              {formatCad(cart.subtotal_cad)}
            </span>
          </div>
          <p className="mt-1 text-right text-[11px] text-slate-400">CAD · final at next step</p>
        </div>
      </div>

      {/* Trust footer */}
      <div className="rounded-xl bg-[var(--color-brand-soft)] p-4 text-xs text-[var(--color-brand)]">
        <p className="flex items-center gap-2 font-semibold">🔒 Secure checkout via Stripe</p>
        <p className="mt-2 text-[var(--color-brand-dark)]/80">
          Returns within 30 days · 5-year LED warranty · Customer service from London, Ontario.
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
