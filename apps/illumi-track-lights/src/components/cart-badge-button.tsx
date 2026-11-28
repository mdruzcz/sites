"use client";

import { useUI } from "@/components/ui-context";

export function CartBadgeButton({ count }: { count: number }) {
  const { openMiniCart } = useUI();
  return (
    <button
      type="button"
      onClick={openMiniCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 text-[0.72rem] text-[var(--color-text-soft)] transition hover:text-[var(--color-accent)]"
    >
      <span className="relative">
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 8h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="19.5" r="1.5" /><circle cx="17" cy="19.5" r="1.5" /></svg>
        {count > 0 && (
          <span className="absolute -right-2.5 -top-2 inline-flex min-w-[1.15rem] items-center justify-center rounded-full bg-[var(--color-gold)] px-1 text-[0.68rem] font-bold leading-[1.15rem] text-[var(--color-ink-deep)]">
            {count}
          </span>
        )}
      </span>
      <span className="hidden lg:inline">Cart</span>
    </button>
  );
}
