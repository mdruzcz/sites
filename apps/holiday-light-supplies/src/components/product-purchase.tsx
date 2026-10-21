"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { useUI } from "@/components/ui-context";
import { formatCad } from "@/lib/utils";
import { Icon } from "@/components/icons";

interface Variant {
  id: string;
  name: string;
  price_cad: number;
  compare_at_price_cad?: number | null;
  on_hand: number;
  /** With on_hand at 0: true is a special order, false is sold out. */
  allow_backorder?: boolean;
  sku: string;
  attribute_type: string | null;
  attribute_value: string | null;
}

const WISHLIST_KEY = "hls_wishlist_v1";

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
  productSlug: string;
  variants: Variant[];
  quoteOnly: boolean;
}

/** Groups variants by their first attribute so a 24-variant bow becomes a few pickers instead of one giant select. */
function groupVariants(variants: Variant[]) {
  const types = Array.from(new Set(variants.map((v) => v.attribute_type).filter((t): t is string => !!t)));
  return { types, hasAttributes: types.length > 0 };
}

export function ProductPurchase({ productName, productSlug, variants, quoteOnly }: Props) {
  const router = useRouter();
  const { openMiniCart } = useUI();
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [pending, startTransition] = useTransition();
  const [wishlisted, setWishlisted] = useState(false);
  const { hasAttributes } = groupVariants(variants);

  const variant = variants.find((v) => v.id === variantId);
  const stockOf = (v: Variant) => (v.on_hand > 0 ? "in" : v.allow_backorder ? "special" : "out");
  const stock = variant ? stockOf(variant) : "in";
  const outOfStock = stock === "out";
  const specialOrder = stock === "special";
  const lowStock = !!variant && variant.on_hand > 0 && variant.on_hand < 10 && !quoteOnly;

  useEffect(() => {
    setWishlisted(readWishlist().includes(productSlug));
  }, [productSlug]);

  function add() {
    if (!variant) return;
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      openMiniCart();
    });
  }
  function inquireNow() {
    if (!variant) return;
    startTransition(async () => {
      await addToCartAction(variant.id, qty);
      router.push("/checkout");
    });
  }
  function toggleWishlist() {
    const list = readWishlist();
    const next = wishlisted ? list.filter((s) => s !== productSlug) : [...list, productSlug];
    writeWishlist(next);
    setWishlisted(!wishlisted);
  }

  const lineTotal = variant ? variant.price_cad * qty : 0;

  return (
    <div className="card mt-6 p-5 md:p-6">
      {variants.length > 1 && (
        <div className="mb-4">
          <label className="label" htmlFor="variant-picker">
            {hasAttributes ? "Choose option" : "Option"}
          </label>
          {variants.length <= 6 ? (
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={v.id === variantId}
                  className={`chip min-h-[40px] transition ${v.id === variantId ? "!border-[var(--color-brand)] !bg-[var(--color-brand-soft)] !text-[var(--color-brand)]" : ""} ${
                    stockOf(v) === "out" ? "opacity-50" : ""
                  }`}
                >
                  {v.name}
                  {!quoteOnly && variants.some((o) => o.price_cad !== v.price_cad) && <span className="text-[var(--color-muted)]"> · {formatCad(v.price_cad)}</span>}
                </button>
              ))}
            </div>
          ) : (
            <select id="variant-picker" value={variantId} onChange={(e) => setVariantId(e.target.value)} className="input">
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                  {!quoteOnly ? ` — ${formatCad(v.price_cad)}` : ""}
                  {stockOf(v) === "out" ? " (Sold out)" : stockOf(v) === "special" ? " (Special order)" : ""}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {variant && !quoteOnly && (
        <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-display text-3xl text-[var(--color-text)]">{formatCad(variant.price_cad)}</p>
          {variant.compare_at_price_cad && variant.compare_at_price_cad > variant.price_cad && (
            <p className="text-sm text-[var(--color-muted)] line-through">{formatCad(variant.compare_at_price_cad)}</p>
          )}
          <p className="text-xs text-[var(--color-muted)]">CAD · plus shipping &amp; tax</p>
        </div>
      )}

      {specialOrder && (
        <div className="mb-4 rounded-xl bg-[var(--color-gold-soft)] p-4 text-sm text-[var(--color-brand-dark)]">
          <p className="font-semibold">Special order for this season.</p>
          <p className="mt-1">This one is made for you once you order. Add it to your quote list and we confirm the lead time and delivery date on your quote.</p>
        </div>
      )}
      {outOfStock && (
        <div className="mb-4 rounded-xl bg-[var(--color-bg-warm)] p-4 text-sm text-[var(--color-text-soft)]">
          <p className="font-semibold">Sold out for this season.</p>
          <p className="mt-1">Ask us about availability. We can suggest a similar display or reserve one for next season.</p>
        </div>
      )}
      {quoteOnly ? (
        <div className="mb-4 rounded-xl bg-[var(--color-brand-soft)] p-4 text-sm text-[var(--color-brand-dark)]">
          <p className="font-semibold">Priced per project.</p>
          <p className="mt-1">Large displays are quoted with freight, lead time and any multi-piece or public-sector pricing. Add it to your quote list and we reply within one business day.</p>
        </div>
      ) : (
        <>
          {lowStock && (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-dark)]">
              <Icon.bolt size={14} /> Only {variant?.on_hand} left — order soon
            </p>
          )}
          {qty >= 10 && (
            <p className="mb-3 rounded-xl bg-[var(--color-accent-soft)] px-4 py-2.5 text-sm text-[var(--color-accent-dark)]">
              Ordering {qty}? We&rsquo;ll apply volume pricing on your quote automatically.
            </p>
          )}
        </>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="label" htmlFor="qty-input">Qty</label>
          <div className="flex items-center rounded-xl border border-[var(--color-border-strong)] bg-white">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center text-lg hover:bg-[var(--color-bg-warm)]">−</button>
            <input
              id="qty-input"
              type="number"
              min={1}
              inputMode="numeric"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="w-14 border-x border-[var(--color-border-strong)] bg-transparent py-2 text-center text-sm font-semibold outline-none"
            />
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="grid size-11 place-items-center text-lg hover:bg-[var(--color-bg-warm)]">+</button>
          </div>
        </div>
        <button
          type="button"
          onClick={add}
          disabled={pending || outOfStock}
          className="btn-primary h-11 flex-1 disabled:opacity-50"
        >
          <Icon.cart size={18} /> {pending ? "Adding…" : outOfStock ? "Sold out" : "Add to quote list"}
        </button>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={wishlisted ? "Remove from saved items" : "Save for later"}
          aria-pressed={wishlisted}
          className={`grid size-11 place-items-center rounded-xl border transition ${
            wishlisted ? "border-[var(--color-berry)] bg-[var(--color-berry-soft)] text-[var(--color-berry)]" : "border-[var(--color-border-strong)] bg-white text-[var(--color-muted)] hover:border-[var(--color-brand)]"
          }`}
        >
          <span aria-hidden className="text-lg leading-none">{wishlisted ? "♥" : "♡"}</span>
        </button>
      </div>

      <button type="button" onClick={inquireNow} disabled={pending} className="btn-accent mt-3 w-full disabled:opacity-50">
        {outOfStock ? "Ask about availability" : quoteOnly ? "Request a quote for this display" : "Request pricing & shipping"} <Icon.arrow size={16} />
      </button>
      <p className="mt-2 text-center text-xs text-[var(--color-muted)]">
        No payment online. We email a quote within one business day{!quoteOnly && lineTotal > 0 ? ` · product subtotal ${formatCad(lineTotal)}` : ""}.
      </p>

      {variant && (
        <p className="mt-4 flex flex-wrap items-center gap-x-3 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-muted)]">
          <span>
            SKU <span className="font-mono">{variant.sku}</span>
          </span>
          {stock === "in" && !quoteOnly && <span className="text-[var(--color-success)]">✓ In stock in Ontario</span>}
          {specialOrder && <span>Special order · lead time confirmed on quote</span>}
          {outOfStock && <span>Sold out for this season</span>}
          {stock === "in" && quoteOnly && <span>Lead time confirmed on quote</span>}
        </p>
      )}

      <p className="mt-3 text-xs text-[var(--color-muted)]">
        Buying for a municipality, BIA or mall?{" "}
        <Link href="/request-a-quote" className="font-semibold text-[var(--color-brand)] hover:underline">
          Send the whole project
        </Link>{" "}
        and we&rsquo;ll quote it together.
      </p>
    </div>
  );
}
