"use client";

import { useState, useEffect, useTransition } from "react";
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
}

const WISHLIST_KEY = "rsd_wishlist_v1";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeWishlist(list: string[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  } catch {}
}

interface BrushUpsell {
  variantId: string;
  name: string;
  price: number;
  image: string | null;
}

interface Props {
  productName: string;
  productSlug?: string;
  variants: Variant[];
  brushUpsell?: BrushUpsell;
}

export function ProductPurchase({ productSlug, variants, brushUpsell }: Props) {
  const router = useRouter();
  const { openMiniCart } = useUI();
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [pending, startTransition] = useTransition();
  const [wishlisted, setWishlisted] = useState(false);
  const [addBrush, setAddBrush] = useState(false);

  const variant = variants.find((v) => v.id === variantId);
  const outOfStock = !!variant && variant.on_hand <= 0;
  const lowStock = !!variant && variant.on_hand > 0 && variant.on_hand < 10;
  const wishKey = productSlug ?? variant?.id ?? "";

  // Bulk savings: a 5-gallon pail vs buying five 1-gallon cans
  const oneGal = variants.find((v) => /1\s*gallon/i.test(v.name));
  const isFiveGal = !!variant && /5\s*gallon/i.test(variant.name);
  const fiveGalSavings = oneGal && variant && isFiveGal ? oneGal.price_cad * 5 - variant.price_cad : 0;

  useEffect(() => {
    if (!wishKey) return;
    setWishlisted(readWishlist().includes(wishKey));
  }, [wishKey]);

  function add() {
    if (!variant) return;
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      if (addBrush && brushUpsell) await addToCartAction(brushUpsell.variantId, 1);
      openMiniCart();
    });
  }

  function buyNow() {
    if (!variant) return;
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      if (addBrush && brushUpsell) await addToCartAction(brushUpsell.variantId, 1);
      router.push("/checkout");
    });
  }

  function toggleWishlist() {
    if (!wishKey) return;
    const list = readWishlist();
    const next = wishlisted ? list.filter((s) => s !== wishKey) : [...list, wishKey];
    writeWishlist(next);
    setWishlisted(!wishlisted);
  }

  return (
    <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5">
      {variants.length > 1 && (
        <div className="mb-4">
          <label className="eyebrow text-slate-500" htmlFor="variant-picker">
            Choose option
          </label>
          <select
            id="variant-picker"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
          >
            {variants.map((v) => {
              const save = oneGal && /5\s*gallon/i.test(v.name) ? oneGal.price_cad * 5 - v.price_cad : 0;
              return (
                <option key={v.id} value={v.id}>
                  {v.name} — {formatCad(v.price_cad)}
                  {save > 0 ? ` (save ${formatCad(save)})` : ""}
                  {v.on_hand <= 0 ? " (Out of stock)" : ""}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {lowStock && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-dark)]">
          <span aria-hidden>🔥</span> Only {variant?.on_hand} left in stock
        </p>
      )}

      {fiveGalSavings > 0 && oneGal && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
          <p className="font-semibold text-emerald-800">
            💰 Save {formatCad(fiveGalSavings)} with the 5-gallon pail
          </p>
          <p className="mt-0.5 text-xs text-emerald-700">
            Five 1-gallon cans = {formatCad(oneGal.price_cad * 5)}. One 5-gallon pail = {formatCad(variant!.price_cad)}.
            That&rsquo;s {Math.round((fiveGalSavings / (oneGal.price_cad * 5)) * 100)}% off the per-gallon price.
          </p>
        </div>
      )}

      {brushUpsell && (
        <label className="mb-4 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[var(--color-brand)] bg-[var(--color-brand-soft)] p-3">
          <input
            type="checkbox"
            checked={addBrush}
            onChange={(e) => setAddBrush(e.target.checked)}
            className="size-4 accent-[var(--color-brand)]"
          />
          {brushUpsell.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={brushUpsell.image} alt="" className="size-10 rounded object-contain" />
          )}
          <span className="flex-1 text-xs text-[var(--color-brand-dark)]">
            <span className="font-semibold">Add the 5&Prime; stain brush</span> — the perfect applicator
            for a streak-free finish.
          </span>
          <span className="text-sm font-bold text-[var(--color-brand)]">+{formatCad(brushUpsell.price)}</span>
        </label>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="eyebrow text-slate-500" htmlFor="qty-input">Qty</label>
          <input
            id="qty-input"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            aria-label="Quantity"
            className="mt-2 w-20 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm"
          />
        </div>
        <button
          type="button"
          onClick={add}
          disabled={pending || outOfStock}
          className="btn-primary inline-flex h-11 flex-1 justify-center disabled:opacity-50"
          aria-label={outOfStock ? "Out of stock" : "Add to cart"}
        >
          {pending ? "Adding…" : outOfStock ? "Out of stock" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
          className={`grid size-11 place-items-center rounded-md border transition ${
            wishlisted
              ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
              : "border-[var(--color-border)] bg-white text-slate-600 hover:border-[var(--color-brand)]"
          }`}
        >
          <span aria-hidden className="text-lg">{wishlisted ? "♥" : "♡"}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={buyNow}
        disabled={pending || outOfStock}
        className="btn-green mt-3 w-full justify-center disabled:opacity-50"
      >
        Buy now &mdash; one click checkout
      </button>

      {variant && (
        <p className="mt-3 text-xs text-slate-500">
          SKU <span className="font-mono">{variant.sku}</span>
          {!outOfStock && !lowStock && (
            <span className="ml-3 text-[var(--color-success)]">✓ In stock</span>
          )}
        </p>
      )}

      <p className="mt-3 rounded-md bg-[var(--color-brand-soft)] px-3 py-2 text-xs text-[var(--color-brand-dark)]">
        <span aria-hidden>📦</span> <strong>2-gallon minimum order.</strong> We don&rsquo;t ship single
        gallons on their own — order 2+ gallons, or grab a 5-gallon pail (cheaper per gallon).
      </p>

      <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-border)] pt-3 text-xs text-slate-600">
        <span aria-hidden>🪵</span>
        <span>Professional-grade · Oil-based stain &amp; sealer in one · Goof-proof application</span>
      </div>
    </div>
  );
}
