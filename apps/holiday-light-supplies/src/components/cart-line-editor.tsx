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

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center rounded-lg border border-[var(--color-border-strong)] bg-white">
        <button type="button" onClick={() => save(Math.max(1, qty - 1))} disabled={pending} aria-label="Decrease quantity" className="grid size-10 place-items-center hover:bg-[var(--color-bg-warm)]">
          −
        </button>
        <input
          type="number"
          min={1}
          max={maxQty || 999}
          value={qty}
          inputMode="numeric"
          aria-label="Quantity"
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          onBlur={() => save(qty)}
          className="w-14 border-x border-[var(--color-border-strong)] bg-transparent py-2 text-center text-sm font-semibold outline-none"
        />
        <button type="button" onClick={() => save(qty + 1)} disabled={pending} aria-label="Increase quantity" className="grid size-10 place-items-center hover:bg-[var(--color-bg-warm)]">
          +
        </button>
      </div>
      <button type="button" onClick={() => startTransition(async () => removeLineAction(lineId))} disabled={pending} className="ml-2 text-xs text-[var(--color-berry)] hover:underline">
        Remove
      </button>
    </div>
  );
}
