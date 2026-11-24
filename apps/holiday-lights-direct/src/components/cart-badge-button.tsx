"use client";

import { useUI } from "@/components/ui-context";

export function CartBadgeButton({ count }: { count: number }) {
  const { openMiniCart } = useUI();
  return (
    <button
      type="button"
      onClick={openMiniCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="hdr-chip relative inline-flex"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-gold)] px-1.5 text-xs font-bold text-[#17130a]">
          {count}
        </span>
      )}
    </button>
  );
}
