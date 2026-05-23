"use client";

import Link from "next/link";
import { useUI } from "./ui-context";
import { getAllKits } from "@/lib/kits";
import { formatCad, SITE } from "@/lib/utils";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, setQty, remove } = useUI();
  const kits = getAllKits();
  const items = lines.map((l) => {
    const kit = kits.find((k) => k.slug === l.slug);
    return { line: l, kit };
  });
  const subtotal = items.reduce(
    (sum, { line, kit }) => sum + (kit?.price_cad ?? 0) * line.qty,
    0,
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[440px] bg-[var(--color-paper)] shadow-2xl transition-transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
            <div>
              <h2 className="font-display text-xl leading-tight">Your Cart</h2>
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">No payment required</p>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              className="text-2xl leading-none"
              aria-label="Close cart"
            >
              ×
            </button>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <p className="font-display text-2xl">Your cart is empty</p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Browse our complete kitchen kits — fully assembled and ready for pickup.
              </p>
              <Link href="/kits" onClick={closeDrawer} className="btn-primary mt-6">
                Shop kitchen kits
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto scrollbar-thin">
                {items.map(({ line, kit }) => (
                  <li
                    key={line.slug}
                    className="flex gap-3 border-b border-[var(--color-line)] p-4"
                  >
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                        {kit?.shape ?? "Kit"} · {kit?.pieces ?? line.qty} pieces
                      </p>
                      <Link
                        href={kit ? `/kits/${kit.slug}` : "/kits"}
                        onClick={closeDrawer}
                        className="block text-sm font-semibold leading-snug hover:underline underline-offset-4"
                      >
                        {kit?.name ?? line.slug}
                      </Link>
                      {kit && (
                        <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                          {kit.layout_fits}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center border border-[var(--color-line)] bg-white">
                          <button
                            type="button"
                            onClick={() => setQty(line.slug, line.qty - 1)}
                            className="h-9 w-9 text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-warm)]"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-9 text-center text-sm font-medium">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.slug, line.qty + 1)}
                            className="h-9 w-9 text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-warm)]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.slug)}
                          className="text-xs text-[var(--color-ink-soft)] underline-offset-2 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg">
                        {kit ? formatCad(kit.price_cad * line.qty) : "—"}
                      </p>
                      {kit && line.qty > 1 && (
                        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
                          {formatCad(kit.price_cad)} ea
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <footer className="border-t border-[var(--color-line)] px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-widest text-[var(--color-ink-soft)]">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl">{formatCad(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  Submit your order — we&rsquo;ll confirm stock, total, and pickup details before any payment.
                </p>
                <Link
                  href="/request"
                  onClick={closeDrawer}
                  className="btn-primary mt-4 w-full"
                >
                  Submit Order Request →
                </Link>
                <p className="mt-3 text-center text-[11px] text-[var(--color-ink-soft)]">
                  🔒 No payment now · Pickup in Belmont · {SITE.leadTime}
                </p>
              </footer>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
