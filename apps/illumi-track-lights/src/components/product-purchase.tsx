"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
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
  variants: Variant[];
  optionLabel?: string;
  /** Price maths spelled out under the price: "Works out to $X a foot." */
  perUnit?: { count: number; unit: string; extra?: string };
}

const SWATCH: Record<string, string> = { black: "#24262b", white: "#f3f1ec", wicker: "#c9b58f", brown: "#4b342a", beige: "#d8bd9a" };

export function ProductPurchase({ productName, variants, optionLabel = "Choose option", perUnit }: Props) {
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

  const step = "grid size-11 place-items-center text-lg transition hover:bg-[var(--color-bg-warm)]";

  return (
    <div className="mt-5">
      {shown && <p className="price text-[1.75rem] leading-none">{formatCad(shown.price_cad, 2)}</p>}
      <p className="mt-2 text-sm text-[var(--color-text-soft)]">
        <Link href="/shipping-returns" className="font-semibold text-[var(--color-green)] underline underline-offset-2">Free shipping</Link> anywhere in Canada, or{" "}
        <Link href="/shipping-returns#pickup" className="underline underline-offset-2">free pickup in Woodstock</Link>.
      </p>
      {variant && perUnit && perUnit.count > 0 && (
        <p className="note mt-4">
          <strong>Works out to {formatCad(variant.price_cad / perUnit.count, 2)} {perUnit.unit}.</strong>
          {perUnit.extra ? ` ${perUnit.extra}` : ""}
        </p>
      )}

      {variants.length > 1 && allColours && (
        <fieldset className="mt-5">
          <legend className="label">
            Track colour: <span className="normal-case tracking-normal text-[var(--color-text)]">{variant?.attribute_value ?? "choose one"}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVariantId(v.id);
                    setNeedColour(false);
                  }}
                  aria-pressed={active}
                  className={`flex min-h-[44px] items-center gap-2 border px-3 text-sm transition ${active ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] font-semibold outline outline-1 outline-[var(--color-accent)]" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-accent)]"}`}
                >
                  <span aria-hidden className="inline-block size-4 rounded-full border border-black/20" style={{ background: SWATCH[(v.attribute_value ?? "").toLowerCase()] }} />
                  {v.attribute_value}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-[var(--color-muted)]">Match the track to your soffit or fascia. It is the only part you see in daylight.</p>
          {needColour && (
            <p role="alert" className="note mt-2 font-semibold">Choose a track colour first.</p>
          )}
        </fieldset>
      )}
      {variants.length > 1 && !allColours && (
        <div className="mt-5">
          <label className="label" htmlFor="variant-select">{optionLabel}</label>
          <select id="variant-select" value={variantId} onChange={(e) => setVariantId(e.target.value)} className="input">
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} · {formatCad(v.price_cad, 2)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-5">
        <p className="label" id="qty-label">Quantity</p>
        <div className="inline-flex items-center border border-[var(--color-border-strong)]">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className={step}>−</button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            aria-labelledby="qty-label"
            className="h-11 w-14 border-x border-[var(--color-border-strong)] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className={step}>+</button>
        </div>
      </div>

      <button type="button" onClick={add} disabled={pending || outOfStock} className="btn-primary mt-4 min-h-[52px] w-full disabled:opacity-50" aria-label={outOfStock ? "Out of stock" : `Add ${productName} to cart`}>
        {pending ? "Adding…" : outOfStock ? "Out of stock" : "Add to cart"}
      </button>
      <button type="button" onClick={buyNow} disabled={pending || outOfStock} className="btn-secondary mt-2 w-full disabled:opacity-50">
        Buy now
      </button>

      {variant && (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {outOfStock ? (
            <span className="font-semibold text-[var(--color-red)]">Out of stock. Email us and we will tell you when it is due.</span>
          ) : lowStock ? (
            <span className="font-semibold text-[var(--color-gold-text)]">{variant.on_hand} left in stock.</span>
          ) : (
            <span className="font-semibold text-[var(--color-green)]">In stock.</span>
          )}{" "}
          {!outOfStock && "Packed within one to two business days."} <span className="whitespace-nowrap">SKU <span className="font-mono">{variant.sku}</span></span>
        </p>
      )}
    </div>
  );
}
