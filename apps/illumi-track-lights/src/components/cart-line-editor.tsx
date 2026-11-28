"use client";

import { useState, useTransition } from "react";
import { setLineQuantityAction, removeLineAction } from "@/lib/actions/cart";

export function CartLineEditor({ lineId, initialQty, maxQty }: { lineId: string; initialQty: number; maxQty: number }) {
  const [qty, setQty] = useState(initialQty);
  const [pending, startTransition] = useTransition();

  function save(next: number) {
    setQty(next);
    startTransition(async () => {
      await setLineQuantityAction(lineId, next);
    });
  }

  const step = "grid size-11 place-items-center text-lg text-[var(--color-text)] transition hover:bg-[var(--color-bg-warm)] disabled:opacity-50";

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <div className="inline-flex items-center border border-[var(--color-border-strong)]">
        <button type="button" aria-label="Decrease quantity" onClick={() => save(Math.max(1, qty - 1))} disabled={pending} className={step}>
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          aria-label="Quantity"
          min={1}
          max={maxQty || 999}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          onBlur={() => save(qty)}
          className="h-11 w-12 border-x border-[var(--color-border-strong)] text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="button" aria-label="Increase quantity" onClick={() => save(qty + 1)} disabled={pending} className={step}>
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => startTransition(async () => removeLineAction(lineId))}
        disabled={pending}
        className="min-h-11 text-sm text-[var(--color-red)] underline-offset-2 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
