"use client";

import { useState, useTransition } from "react";
import { setInventory } from "@/lib/actions/product";

export function InventoryRow({
  variantId,
  sku,
  productName,
  variantName,
  initialOnHand,
  initialThreshold
}: {
  variantId: string;
  sku: string;
  productName: string;
  variantName: string;
  initialOnHand: number;
  initialThreshold: number;
}) {
  const [onHand, setOnHand] = useState(initialOnHand);
  const [threshold, setThreshold] = useState(initialThreshold);
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      await setInventory(variantId, onHand, threshold);
    });
  }

  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="px-4 py-2 font-mono text-xs">{sku}</td>
      <td className="px-4 py-2">
        <div className="font-medium">{productName}</div>
        <div className="text-xs text-slate-500">{variantName}</div>
      </td>
      <td className="px-4 py-2 text-right">
        <input
          type="number"
          value={onHand}
          onChange={(e) => setOnHand(Number(e.target.value))}
          onBlur={save}
          disabled={pending}
          className={`w-24 rounded-md border px-2 py-1 text-right text-sm ${
            onHand < threshold ? "border-amber-400 bg-amber-50" : "border-slate-300"
          }`}
        />
      </td>
      <td className="px-4 py-2 text-right">
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          onBlur={save}
          disabled={pending}
          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
        />
      </td>
    </tr>
  );
}
