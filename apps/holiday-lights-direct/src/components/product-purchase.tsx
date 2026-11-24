"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { useUI } from "@/components/ui-context";
import { formatCad, shipsFree } from "@/lib/utils";

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
    <div className="surface mt-6 p-5 md:p-6">
      {variants.length > 1 && (
        <div className="mb-5">
          <label className="label" htmlFor="variant-picker">
            Choose an option
          </label>
          <select
            id="variant-picker"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="field mt-2"
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
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-soft)] px-3 py-1.5 text-xs font-bold text-[var(--color-gold-text)]">
          <span aria-hidden className="size-1.5 rounded-full bg-[var(--color-gold)]" />
          Only {variant?.on_hand} left in stock
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="label" htmlFor="qty-input">
            Qty
          </label>
          <input
            id="qty-input"
            type="number"
            inputMode="numeric"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            aria-label="Quantity"
            className="field mt-2 w-20 text-center"
          />
        </div>
        <button
          type="button"
          onClick={add}
          disabled={pending || outOfStock}
          className="btn-primary min-w-[10rem] flex-1 disabled:opacity-50"
          aria-label={outOfStock ? "Out of stock" : "Add to cart"}
        >
          {pending ? "Adding…" : outOfStock ? "Out of stock" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
          className={`round-btn ${wishlisted ? "border-[var(--color-gold)] bg-[var(--color-gold-soft)] text-[var(--color-gold-text)]" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} aria-hidden>
            <path
              d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={buyNow}
        disabled={pending || outOfStock}
        className="btn-green group mt-3 w-full disabled:opacity-50"
      >
        {variant && shipsFree(variant.price_cad * qty) ? "Order now, ships free" : "Request a shipping quote"}
        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {variant && (
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-muted)]">
          <span>
            SKU <span className="font-mono">{variant.sku}</span>
          </span>
          {!outOfStock && !lowStock && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-green)]">
              <span aria-hidden className="size-1.5 rounded-full bg-[var(--color-green-bright)]" />
              In stock
            </span>
          )}
        </p>
      )}
    </div>
  );
}
