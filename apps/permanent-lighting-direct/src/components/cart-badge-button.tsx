"use client";

import { useUI } from "@/components/ui-context";

export function CartBadgeButton({ count }: { count: number }) {
  const { openMiniCart } = useUI();
  return (
    <button
      type="button"
      onClick={openMiniCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="relative inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 text-sm font-medium text-white transition hover:bg-white/20"
    >
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 8h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-accent-bright)] px-1.5 text-xs font-bold text-[var(--color-ink)]">
          {count}
        </span>
      )}
    </button>
  );
}
