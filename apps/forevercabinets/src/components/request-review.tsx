"use client";

import Link from "next/link";
import { useUI } from "./ui-context";
import { getCabinetBySku } from "@/lib/catalog";
import { formatCad, SITE } from "@/lib/utils";

export function RequestReview() {
  const { lines, setQty, remove, hydrated } = useUI();
  if (!hydrated) {
    return <div className="text-sm text-[var(--color-ink-soft)]">Loading your request list…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="border border-dashed border-[var(--color-line)] bg-[var(--color-sandstone-soft)] p-10 text-center">
        <p className="font-display text-2xl">Your request list is empty.</p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Browse the catalog and add cabinets to request a quote.
        </p>
        <Link href="/cabinets" className="btn-primary mt-5 inline-flex">
          Browse cabinets
        </Link>
      </div>
    );
  }

  const items = lines.map((l) => ({ line: l, cabinet: getCabinetBySku(l.sku) }));
  const subtotal = items.reduce(
    (s, { line, cabinet }) => s + (cabinet?.price_cad ?? 0) * line.qty,
    0,
  );

  return (
    <div className="border border-[var(--color-line)] bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--color-line)] text-left text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">
            <th className="px-4 py-3">Item</th>
            <th className="px-4 py-3 text-center">Qty</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map(({ line, cabinet }) => (
            <tr key={line.sku} className="border-b border-[var(--color-line)] last:border-b-0">
              <td className="px-4 py-4">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                  {line.sku}
                </p>
                <Link
                  href={cabinet ? `/cabinets/${cabinet.slug}` : "#"}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  {cabinet?.name ?? line.sku}
                </Link>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="inline-flex items-center border border-[var(--color-line)]">
                  <button
                    type="button"
                    onClick={() => setQty(line.sku, line.qty - 1)}
                    className="h-9 w-9 text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)]"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(line.sku, line.qty + 1)}
                    className="h-9 w-9 text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)]"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-4 py-4 text-right font-display">
                {cabinet ? formatCad(cabinet.price_cad * line.qty) : "—"}
              </td>
              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => remove(line.sku)}
                  className="text-xs text-[var(--color-ink-soft)] underline-offset-2 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr className="bg-[var(--color-sandstone-soft)]">
            <td colSpan={2} className="px-4 py-4 text-right text-sm uppercase tracking-widest text-[var(--color-ink-soft)]">
              Estimated subtotal
            </td>
            <td className="px-4 py-4 text-right font-display text-2xl">
              {formatCad(subtotal)}
            </td>
            <td />
          </tr>
        </tbody>
      </table>
      <p className="border-t border-[var(--color-line)] p-4 text-xs text-[var(--color-ink-soft)]">
        Final price &amp; shipping confirmed by email. Stock confirmed before charging. Lead time {SITE.leadTime}.
      </p>
    </div>
  );
}
