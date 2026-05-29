"use client";

import Link from "next/link";
import { useUI } from "./ui-context";
import { getAllCabinets } from "@/lib/catalog";
import { formatCad, SITE } from "@/lib/utils";

export function RequestListDrawer() {
  const { drawerOpen, closeDrawer, lines, setQty, remove } = useUI();
  const cabinets = getAllCabinets();
  const items = lines.map((l) => {
    const cab = cabinets.find((c) => c.sku === l.sku);
    return { line: l, cabinet: cab };
  });
  const subtotal = items.reduce(
    (sum, { line, cabinet }) => sum + (cabinet?.price_cad ?? 0) * line.qty,
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
        aria-label="Request list"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[420px] bg-[var(--color-cream)] shadow-2xl transition-transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
            <h2 className="font-display text-xl">Request List</h2>
            <button
              type="button"
              onClick={closeDrawer}
              className="text-2xl leading-none"
              aria-label="Close request list"
            >
              ×
            </button>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <p className="font-display text-2xl">Your list is empty</p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Browse the catalog and add cabinets to request a quote. No payment is taken — we&apos;ll confirm pricing and shipping by email.
              </p>
              <Link
                href="/cabinets"
                onClick={closeDrawer}
                className="btn-primary mt-6"
              >
                Browse cabinets
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto scrollbar-thin">
                {items.map(({ line, cabinet }) => (
                  <li
                    key={line.sku}
                    className="flex gap-3 border-b border-[var(--color-line)] p-4"
                  >
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                        {line.sku}
                      </p>
                      <Link
                        href={cabinet ? `/cabinets/${cabinet.slug}` : "/cabinets"}
                        onClick={closeDrawer}
                        className="block text-sm font-medium leading-snug hover:underline underline-offset-4"
                      >
                        {cabinet?.name ?? line.sku}
                      </Link>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center border border-[var(--color-line)]">
                          <button
                            type="button"
                            onClick={() => setQty(line.sku, line.qty - 1)}
                            className="h-8 w-8 text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)]"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.sku, line.qty + 1)}
                            className="h-8 w-8 text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.sku)}
                          className="text-xs text-[var(--color-ink-soft)] underline-offset-2 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-base">
                        {cabinet ? formatCad(cabinet.price_cad * line.qty) : "—"}
                      </p>
                      {cabinet && line.qty > 1 && (
                        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
                          {formatCad(cabinet.price_cad)} ea
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <footer className="border-t border-[var(--color-line)] px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-widest text-[var(--color-ink-soft)]">
                    Estimated subtotal
                  </span>
                  <span className="font-display text-2xl">{formatCad(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  Final price confirmed by email. Shipping quoted separately.
                </p>
                <Link
                  href="/request"
                  onClick={closeDrawer}
                  className="btn-primary mt-4 w-full"
                >
                  Review &amp; request quote
                </Link>
                <p className="mt-3 text-center text-[11px] text-[var(--color-ink-soft)]">
                  🔒 No payment taken · {SITE.leadTime} lead time
                </p>
              </footer>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
