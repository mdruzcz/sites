"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/components/ui-context";
import { setLineQuantityAction, removeLineAction } from "@/lib/actions/cart";
import type { Cart } from "@/lib/cart";
import { formatCad } from "@/lib/utils";

/** Slide-in cart. The panel is nested inside the overlay on purpose: as a sibling
 *  it lands under the page and the cart appears to freeze. */
export function MiniCartDrawer() {
  const { miniCartOpen, closeMiniCart } = useUI();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();

  // Fetch the cart whenever the drawer opens
  useEffect(() => {
    if (!miniCartOpen) return;
    setLoading(true);
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => setCart(data.cart ?? null))
      .finally(() => setLoading(false));
  }, [miniCartOpen]);

  // Close on Escape
  useEffect(() => {
    if (!miniCartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMiniCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [miniCartOpen, closeMiniCart]);

  if (!miniCartOpen) return null;

  const subtotal = cart?.subtotal_cad ?? 0;
  const count = cart?.items.reduce((n, l) => n + l.quantity, 0) ?? 0;

  async function refresh() {
    const r = await fetch("/api/cart");
    const d = await r.json();
    setCart(d.cart ?? null);
  }
  function setQty(lineId: string, qty: number) {
    startTransition(async () => {
      await setLineQuantityAction(lineId, qty);
      await refresh();
    });
  }
  function remove(lineId: string) {
    startTransition(async () => {
      await removeLineAction(lineId);
      await refresh();
    });
  }

  const step = "grid size-11 place-items-center text-lg transition hover:bg-[var(--color-bg-warm)]";

  return (
    <div className="drawer-overlay" onClick={closeMiniCart}>
      <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <p className="font-display text-xl">
            Your cart <span className="text-base font-normal text-[var(--color-muted)]">({count})</span>
          </p>
          <button type="button" onClick={closeMiniCart} aria-label="Close cart" className="grid size-11 place-items-center text-[var(--color-text)] hover:bg-[var(--color-bg-warm)]">
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <p className="border-b border-[var(--color-border)] bg-[var(--color-bg-warm)] px-4 py-2.5 text-sm text-[var(--color-text-soft)]">
          <strong className="text-[var(--color-ink)]">This order ships free.</strong> Or choose free pickup in Woodstock at checkout.
        </p>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {loading && !cart && <p className="text-sm text-[var(--color-muted)]">Loading…</p>}
          {!loading && cart && cart.items.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-xl">Your cart is empty</p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">Start with a kit sized to your roofline.</p>
                <Link href="/diy-kits" onClick={closeMiniCart} className="btn-primary mt-6">Shop the kits</Link>
              </div>
            </div>
          )}
          {cart && cart.items.length > 0 && (
            <ul className="divide-y divide-[var(--color-border)]">
              {cart.items.map((l) => (
                <li key={l.id} className="flex gap-3 py-4 first:pt-0">
                  <div className="size-16 shrink-0 border border-[var(--color-border)] bg-white">
                    {l.image_url && <Image src={l.image_url} alt={`${l.product_name} from Illumi Track Lights`} width={80} height={80} className="h-full w-full object-contain" />}
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <Link href={`/product/${l.product_slug}`} onClick={closeMiniCart} className="line-clamp-2 leading-snug text-[var(--color-ink)] hover:underline">
                      {l.product_name}
                    </Link>
                    {l.variant_name !== "Default" && <p className="text-xs text-[var(--color-muted)]">{l.variant_name}</p>}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3">
                      <div className="inline-flex items-center border border-[var(--color-border-strong)]">
                        <button type="button" onClick={() => setQty(l.id, Math.max(1, l.quantity - 1))} aria-label="Decrease quantity" className={step}>−</button>
                        <span className="w-9 text-center text-sm">{l.quantity}</span>
                        <button type="button" onClick={() => setQty(l.id, l.quantity + 1)} aria-label="Increase quantity" className={step}>+</button>
                      </div>
                      <button type="button" onClick={() => remove(l.id)} className="min-h-11 text-xs text-[var(--color-red)] underline-offset-2 hover:underline">Remove</button>
                    </div>
                  </div>
                  <p className="price text-sm">{formatCad(l.unit_price_cad * l.quantity, 2)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="border-t border-[var(--color-border)] bg-white px-4 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-[var(--color-text-soft)]">Subtotal</span>
              <span className="price font-display text-2xl">{formatCad(subtotal, 2)}</span>
            </div>
            <p className="mt-1 text-right text-xs text-[var(--color-muted)]">Free shipping. Tax is added at checkout.</p>
            <Link href="/checkout" onClick={closeMiniCart} className="btn-primary mt-4 w-full">Checkout</Link>
            <Link href="/cart" onClick={closeMiniCart} className="mt-1 flex min-h-11 items-center justify-center text-sm text-[var(--color-accent)] underline underline-offset-2">
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
