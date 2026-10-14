"use client";

import { useUI } from "@/components/ui-context";
import { Icon } from "@/components/icons";

export function CartBadgeButton({ count }: { count: number }) {
  const { openMiniCart } = useUI();
  return (
    <button
      type="button"
      onClick={openMiniCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="relative inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 text-sm font-medium transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] md:px-4"
    >
      <Icon.cart size={18} />
      <span className="hidden md:inline">Quote list</span>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1.5 text-[11px] font-bold text-white md:static md:ml-1 md:bg-[var(--color-brand)]">
          {count}
        </span>
      )}
    </button>
  );
}
