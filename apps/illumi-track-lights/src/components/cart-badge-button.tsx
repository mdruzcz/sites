"use client";

import { useUI } from "@/components/ui-context";

export function CartBadgeButton({ count }: { count: number }) {
  const { openMiniCart } = useUI();
  return (
    <button
      type="button"
      onClick={openMiniCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="relative inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-medium transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
    >
      <span aria-hidden>🛒</span>
      <span>Cart</span>
      {count > 0 && (
        <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-brand)] px-1.5 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
