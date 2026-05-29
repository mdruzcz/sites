"use client";

import { useState } from "react";
import { useUI } from "./ui-context";

export function PdpActions({ sku }: { sku: string }) {
  const { addItem } = useUI();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="inline-flex items-center border border-[var(--color-line)] bg-white">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-11 w-11 text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)]"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-10 text-center text-base">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          className="h-11 w-11 text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)]"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => addItem(sku, qty)}
        className="btn-primary flex-1 min-w-[200px]"
      >
        Add to Quote
      </button>
    </div>
  );
}
