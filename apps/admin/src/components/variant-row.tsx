"use client";

import { useState, useTransition } from "react";
import { setInventory, setTierPrice, updateVariant } from "@/lib/actions/product";
import { formatCad } from "@/lib/utils";

interface Variant {
  id: string;
  sku: string;
  name: string;
  price_cad: number;
  attribute_type: string | null;
  attribute_value: string | null;
  is_active: boolean;
  ecom_inventory: { on_hand: number; low_stock_threshold: number } | { on_hand: number; low_stock_threshold: number }[] | null;
}

interface Tier {
  id: string;
  slug: string;
  name: string;
}

export function VariantRow({
  variant,
  tiers,
  tierPrices
}: {
  variant: Variant;
  tiers: Tier[];
  tierPrices: Map<string, number>;
}) {
  const inv = Array.isArray(variant.ecom_inventory)
    ? variant.ecom_inventory[0]
    : variant.ecom_inventory;
  const [price, setPrice] = useState(Number(variant.price_cad));
  const [stock, setStock] = useState(inv?.on_hand ?? 0);
  const [pending, startTransition] = useTransition();

  function savePrice() {
    startTransition(async () => {
      await updateVariant(variant.id, { price_cad: price });
    });
  }
  function saveStock() {
    startTransition(async () => {
      await setInventory(variant.id, stock);
    });
  }

  return (
    <tr className="border-t border-slate-100 align-top">
      <td className="py-2">
        <div className="font-medium">{variant.name}</div>
        {variant.attribute_type && variant.attribute_value && (
          <div className="text-xs text-slate-500">
            {variant.attribute_type}: {variant.attribute_value}
          </div>
        )}
      </td>
      <td className="py-2 font-mono text-xs">{variant.sku}</td>
      <td className="py-2 text-right">
        <div className="flex items-center justify-end gap-1">
          <span className="text-xs text-slate-500">$</span>
          <input
            type="number"
            step="0.01"
            value={Number.isFinite(price) ? price : 0}
            onChange={(e) => setPrice(Number(e.target.value))}
            onBlur={savePrice}
            className="w-24 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
            disabled={pending}
          />
        </div>
      </td>
      <td className="py-2 text-right">
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          onBlur={saveStock}
          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
          disabled={pending}
        />
        {inv && stock < inv.low_stock_threshold && (
          <div className="text-[10px] text-amber-700">Low</div>
        )}
      </td>
      {tiers
        .filter((t) => t.slug !== "public")
        .map((t) => (
          <TierPriceCell
            key={t.id}
            variantId={variant.id}
            tierId={t.id}
            initial={tierPrices.get(t.id) ?? null}
            fallback={Number(variant.price_cad)}
          />
        ))}
    </tr>
  );
}

function TierPriceCell({
  variantId,
  tierId,
  initial,
  fallback
}: {
  variantId: string;
  tierId: string;
  initial: number | null;
  fallback: number;
}) {
  const [val, setVal] = useState<string>(initial !== null ? String(initial) : "");
  const [, startTransition] = useTransition();

  function save() {
    const trimmed = val.trim();
    const next = trimmed === "" ? null : Number(trimmed);
    startTransition(async () => {
      await setTierPrice(variantId, tierId, next);
    });
  }

  return (
    <td className="py-2 text-right">
      <input
        type="number"
        step="0.01"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={save}
        placeholder={formatCad(fallback)}
        className="w-24 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
      />
    </td>
  );
}
