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

const WISHLIST_KEY = "hld_wishlist_v1";

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

interface Props {
  productName: string;
  productSlug?: string;
  variants: Variant[];
}

export function ProductPurchase({ productSlug, variants }: Props) {
  const router = useRouter();
  const { openMiniCart } = useUI();
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [pending, startTransition] = useTransition();
  const [wishlisted, setWishlisted] = useState(false);

  const variant = variants.find((v) => v.id === variantId);
  const outOfStock = !!variant && variant.on_hand <= 0;
  const lowStock = !!variant && variant.on_hand > 0 && variant.on_hand < 10;
  const wishKey = productSlug ?? variant?.id ?? "";

  useEffect(() => {
    if (!wishKey) return;
    setWishlisted(readWishlist().includes(wishKey));
  }, [wishKey]);

  function add() {
    if (!variant) return;
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      openMiniCart();
    });
  }

  function buyNow() {
    if (!variant) return;
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
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
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {formatCad(v.price_cad)}
                {v.on_hand <= 0 ? " (Out of stock)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {lowStock && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-dark)]">
          <span aria-hidden>🔥</span> Only {variant?.on_hand} left in stock
        </p>
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
        className="btn-accent mt-3 w-full justify-center disabled:opacity-50"
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

      <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
        <span aria-label="4.8 of 5 stars" className="text-[var(--color-gold)] tracking-wide">
          ★★★★<span className="text-[var(--color-gold-dark)]">★</span>
        </span>
        <span className="text-xs text-slate-600">
          4.8 from 47 verified reviews
        </span>
      </div>
    </div>
  );
}
