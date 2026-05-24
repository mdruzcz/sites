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
        className="size-7 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
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
        className="w-14 rounded-md border border-slate-300 px-2 py-1 text-center text-sm"
      />
      <button
        type="button"
        onClick={() => save(qty + 1)}
        disabled={pending}
        className="size-7 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => startTransition(async () => removeLineAction(lineId))}
        disabled={pending}
        className="ml-3 text-xs text-rose-700 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
