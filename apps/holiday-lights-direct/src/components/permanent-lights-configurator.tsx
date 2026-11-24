"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { KitCoverage } from "@/components/kit-coverage";
import { formatCad } from "@/lib/utils";

export interface ConfigVariant {
  id: string;
  /** Track colour, e.g. "Black". Empty when the kit has a single option. */
  color: string;
  price: number;
}

export interface ConfigOption {
  slug: string;
  name: string;
  footage: number;
  variants: ConfigVariant[];
}

const COLOR_SWATCH: Record<string, string> = {
  Black: "#1f2937",
  White: "#f5f5f5",
  Wicker: "#c9b58f",
  Brown: "#5b3a29",
  Beige: "#d2b48c",
  "Custom Color": "repeating-linear-gradient(45deg,#e2e8f0,#e2e8f0 5px,#cbd5e1 5px,#cbd5e1 10px)"
};

/**
 * Kit builder: pick a footage, pick a track colour, see the example home that
 * footage covers, and add that exact variant to the cart.
 */
export function PermanentLightsConfigurator({ options }: { options: ConfigOption[] }) {
  const [slug, setSlug] = useState<string>(options[2]?.slug ?? options[0]?.slug ?? "");
  const selected = options.find((o) => o.slug === slug) ?? options[0];
  const colors = (selected?.variants ?? []).map((v) => v.color).filter(Boolean);
  const [color, setColor] = useState<string>(colors.includes("White") ? "White" : (colors[0] ?? ""));
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  // The colour the visitor picked carries across sizes when that size has it.
  const variant =
    selected?.variants.find((v) => v.color === color) ?? selected?.variants[0] ?? null;

  function chooseKit(next: string) {
    setSlug(next);
    setAdded(false);
  }

  function addKit() {
    if (!variant) return;
    setAdded(false);
    startTransition(async () => {
      await addToCartAction(variant.id, 1);
      setAdded(true);
    });
  }

  if (!selected) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-8">
      <div className="surface p-5 md:p-7">
        <p className="label" id="kit-footage-label">
          Roofline length
        </p>
        <div role="group" aria-labelledby="kit-footage-label" className="mt-3 flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.slug}
              type="button"
              className="chip"
              aria-pressed={o.slug === selected.slug}
              onClick={() => chooseKit(o.slug)}
            >
              {o.footage} ft
            </button>
          ))}
        </div>

        {colors.length > 0 && (
          <>
            <p className="label mt-7" id="kit-colour-label">
              Track colour
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Match it to your soffit so it disappears by day.</p>
            <div role="group" aria-labelledby="kit-colour-label" className="mt-3 flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip gap-2 pl-2.5"
                  aria-pressed={c === variant?.color}
                  onClick={() => {
                    setColor(c);
                    setAdded(false);
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block size-6 rounded-full border border-black/15"
                    style={{ background: COLOR_SWATCH[c] ?? "#cbd5e1" }}
                  />
                  {c}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow-plain">Your kit</p>
              <p className="mt-1.5 text-xl font-bold tracking-[-0.02em]">
                {selected.footage} ft{variant?.color ? `, ${variant.color.toLowerCase()} track` : ""}
              </p>
            </div>
            <p className="font-display text-[2rem] text-[var(--color-text)]" aria-live="polite">
              {formatCad(variant?.price ?? 0)}
            </p>
          </div>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Free shipping anywhere in Canada. No payment online: we email to confirm your order first.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={addKit}
              disabled={pending || !variant}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {pending ? "Adding…" : added ? "Added to cart" : "Add kit to cart"}
            </button>
            <Link href={`/product/${selected.slug}`} className="btn-secondary">
              Full kit details
            </Link>
          </div>
          {added && (
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-[var(--color-gold-text)] hover:underline"
            >
              Go to cart
            </button>
          )}
        </div>
      </div>

      <KitCoverage footage={selected.footage} />
    </div>
  );
}
