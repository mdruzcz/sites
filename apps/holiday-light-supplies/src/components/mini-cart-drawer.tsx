"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/components/ui-context";
import { setLineQuantityAction, removeLineAction } from "@/lib/actions/cart";
import type { Cart } from "@/lib/cart";

function formatCad(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
}

export function MiniCartDrawer() {
  const { miniCartOpen, closeMiniCart } = useUI();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();

  // Fetch cart whenever drawer opens
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
  const remaining = Math.max(0, 150 - subtotal);
  const progress = Math.min(100, (subtotal / 150) * 100);

  function setQty(lineId: string, qty: number) {
    startTransition(async () => {
      await setLineQuantityAction(lineId, qty);
      // Re-fetch
      const r = await fetch("/api/cart");
      const d = await r.json();
      setCart(d.cart ?? null);
    });
  }
  function remove(lineId: string) {
    startTransition(async () => {
      await removeLineAction(lineId);
      const r = await fetch("/api/cart");
      const d = await r.json();
      setCart(d.cart ?? null);
    });
  }

  return (
    <>
      <div className="drawer-overlay" onClick={closeMiniCart} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="drawer-panel"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
          <div>
            <p className="eyebrow text-slate-500">Your cart</p>
            <p className="font-display text-xl">
              {cart?.items.length ?? 0} item{cart && cart.items.length === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeMiniCart}
            aria-label="Close cart"
            className="grid size-9 place-items-center rounded-full border border-[var(--color-border)] hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="border-b border-[var(--color-border)] bg-[var(--color-brand-soft)] px-4 py-3">
          {remaining > 0 ? (
            <p className="text-sm text-[var(--color-brand-dark)]">
              <span className="font-semibold">Add {formatCad(remaining)}</span> for FREE Canada shipping
            </p>
          ) : (
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]">
              ✓ You&rsquo;ve unlocked free shipping
            </p>
          )}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-full bg-[var(--color-brand)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {loading && !cart && <p className="text-sm text-slate-500">Loading…</p>}
          {!loading && cart && cart.items.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-xl text-slate-700">Your cart is empty</p>
                <p className="mt-2 text-sm text-slate-500">
                  Add some lights to get started.
                </p>
                <Link
                  href="/shop"
                  onClick={closeMiniCart}
                  className="btn-primary mt-6 inline-flex"
                >
                  Start shopping →
                </Link>
              </div>
            </div>
          )}
          {cart && cart.items.length > 0 && (
            <ul className="space-y-4">
              {cart.items.map((l) => (
                <li key={l.id} className="flex gap-3">
                  <div className="size-16 shrink-0 overflow-hidden rounded-md bg-slate-50">
                    {l.image_url && (
                      <Image
                        src={l.image_url}
                        alt={l.product_name}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-sm">
                    <Link
                      href={`/product/${l.product_slug}`}
                      onClick={closeMiniCart}
                      className="line-clamp-2 font-medium leading-tight hover:text-[var(--color-brand)]"
                    >
                      {l.product_name}
                    </Link>
                    <p className="text-xs text-slate-500">{l.variant_name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center rounded-md border border-[var(--color-border)]">
                        <button
                          type="button"
                          onClick={() => setQty(l.id, Math.max(1, l.quantity - 1))}
                          aria-label="Decrease quantity"
                          className="px-2 text-sm hover:bg-slate-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{l.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQty(l.id, l.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2 text-sm hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.id)}
                        className="text-xs text-rose-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatCad(l.unit_price_cad * l.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="border-t border-[var(--color-border)] bg-white px-4 py-4 pb-safe">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-600">Subtotal</span>
              <span className="font-display text-2xl text-[var(--color-brand)]">
                {formatCad(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-slate-500">
              Shipping &amp; tax calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeMiniCart}
              className="btn-primary mt-4 w-full justify-center"
            >
              Checkout →
            </Link>
            <Link
              href="/cart"
              onClick={closeMiniCart}
              className="mt-2 block text-center text-xs text-slate-500 underline-offset-2 hover:underline"
            >
              View full cart page
            </Link>
            <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-slate-400">
              <span>🔒 SSL</span>
              <span>·</span>
              <span>Stripe-secured</span>
              <span>·</span>
              <span>30-day returns</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
