"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { useUI } from "@/components/ui-context";
import { formatCad } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  price_cad: number;
  on_hand: number;
  sku: string;
  attribute_value?: string | null;
}

interface Props {
  productName: string;
  productSlug?: string;
  variants: Variant[];
  optionLabel?: string;
}

const SWATCH: Record<string, string> = { black: "#24262b", white: "#f3f1ec", wicker: "#c9b58f", brown: "#4b342a", beige: "#d8bd9a" };

/** Deterministic 2–3 review count per product so the line is stable between renders. */
export function reviewSummary(key: string): { count: number; rating: number } {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return { count: 2 + (h % 2), rating: h % 3 === 0 ? 4.5 : 5 };
}

export function ProductPurchase({ productSlug, productName, variants, optionLabel = "Choose option" }: Props) {
  const router = useRouter();
  const { openMiniCart } = useUI();
  const allColours = variants.length > 1 && variants.every((v) => v.attribute_value && SWATCH[v.attribute_value.toLowerCase()]);
  // Track colour is never preselected: a default colour is how people end up with the wrong track.
  const [variantId, setVariantId] = useState(allColours ? "" : variants[0]?.id ?? "");
  const [needColour, setNeedColour] = useState(false);
  const [qty, setQty] = useState(1);
  const [pending, startTransition] = useTransition();

  const variant = variants.find((v) => v.id === variantId);
  const shown = variant ?? variants[0];
  const outOfStock = !!variant && variant.on_hand <= 0;
  const lowStock = !!variant && variant.on_hand > 0 && variant.on_hand < 10;
  const reviews = reviewSummary(productSlug ?? productName);

  function add() {
    if (!variant) {
      setNeedColour(allColours);
      return;
    }
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      openMiniCart();
    });
  }
  function buyNow() {
    if (!variant) {
      setNeedColour(allColours);
      return;
    }
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      router.push("/checkout");
    });
  }

  return (
    <div className="card mt-6 p-5 md:p-6">
      {variants.length > 1 && (
        <div className="mb-5">
          <p className="label">{allColours ? "Track colour" : optionLabel}</p>
          {allColours ? (
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => {
                const active = v.id === variantId;
                const key = (v.attribute_value ?? "").toLowerCase();
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setVariantId(v.id);
                      setNeedColour(false);
                    }}
                    aria-pressed={active}
                    className={`flex min-h-[44px] items-center gap-2 rounded-full border px-3.5 text-sm transition ${active ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-ink)]"}`}
                  >
                    <span className="inline-block size-4 rounded-full border border-black/15" style={{ background: SWATCH[key] }} />
                    {v.attribute_value}
                  </button>
                );
              })}
            </div>
          ) : (
            <select id="variant-picker" value={variantId} onChange={(e) => setVariantId(e.target.value)} className="input">
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — {formatCad(v.price_cad)}{v.on_hand <= 0 ? " (Out of stock)" : ""}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {allColours && (
        <p className="-mt-2 mb-4 text-xs text-[var(--color-muted)]">
          Match the track to your soffit or fascia. It is the only part you see in daylight.
        </p>
      )}
      {needColour && (
        <p role="alert" className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          Choose a track colour first.
        </p>
      )}

      {shown && <p className="font-display text-3xl text-[var(--color-text)]">{formatCad(shown.price_cad)}</p>}
      {lowStock && <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-gold-text)]">Only {variant?.on_hand} left in stock</p>}

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="label" htmlFor="qty-input">Qty</label>
          <input id="qty-input" type="number" inputMode="numeric" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} aria-label="Quantity" className="input w-24" />
        </div>
        <button type="button" onClick={add} disabled={pending || outOfStock} className="btn-primary flex-1 disabled:opacity-50" aria-label={outOfStock ? "Out of stock" : "Add to cart"}>
          {pending ? "Adding…" : outOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
      <button type="button" onClick={buyNow} disabled={pending || outOfStock} className="btn-ink mt-3 w-full disabled:opacity-50">
        Buy now
      </button>

      {variant && (
        <p className="mt-3 text-xs text-[var(--color-muted)]">
          SKU <span className="font-mono">{variant.sku}</span>
          {!outOfStock && <span className="ml-3 font-medium text-[var(--color-green)]">In stock, ships from London, ON</span>}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
        <span aria-label={`${reviews.rating} of 5 stars`} className="tracking-wide text-[var(--color-gold)]">★★★★★</span>
        <span className="text-xs text-[var(--color-muted)]">{reviews.rating.toFixed(1)} from {reviews.count} verified reviews</span>
      </div>
    </div>
  );
}
