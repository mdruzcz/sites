"use client";

import { useState, useTransition } from "react";
import { setLineQuantityAction, removeLineAction } from "@/lib/actions/cart";

export function CartLineEditor({
  lineId,
  initialQty,
  maxQty
}: {
  lineId: string;
  initialQty: number;
  maxQty: number;
}) {
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
      <button
        type="button"
        onClick={() => save(Math.max(1, qty - 1))}
        disabled={pending}
        className="size-7 rounded-[10px] border border-[var(--color-border-strong)] text-sm hover:bg-[var(--color-bg-tint)]"
      >
        −
      </button>
      <input
        type="number"
        min={1}
        max={maxQty || 999}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
        onBlur={() => save(qty)}
        className="w-14 rounded-[10px] border border-[var(--color-border-strong)] px-2 py-1 text-center text-sm"
      />
      <button
        type="button"
        onClick={() => save(qty + 1)}
        disabled={pending}
        className="size-7 rounded-[10px] border border-[var(--color-border-strong)] text-sm hover:bg-[var(--color-bg-tint)]"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => startTransition(async () => removeLineAction(lineId))}
        disabled={pending}
        className="ml-3 text-xs text-[var(--color-red)] hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
