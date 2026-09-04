"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { formatCad } from "@/lib/utils";

export interface ConfigOption {
  slug: string;
  name: string;
  footage: number;
  price: number;
  colors: string[];
  image: string | null;
  firstVariantId: string | null;
}

const COLOR_SWATCH: Record<string, string> = {
  Black: "#1f2937",
  White: "#f5f5f5",
  Wicker: "#c9b58f",
  Brown: "#5b3a29",
  Beige: "#d2b48c",
  "Custom Color": "repeating-linear-gradient(45deg,#e2e8f0,#e2e8f0 5px,#cbd5e1 5px,#cbd5e1 10px)"
};

export function PermanentLightsConfigurator({ options }: { options: ConfigOption[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string>(options[1]?.slug ?? options[0]?.slug ?? "");
  const selected = options.find((o) => o.slug === selectedSlug) ?? options[0];
  const colors = selected?.colors ?? [];
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  // When kit changes, refresh color default
  useMemo(() => {
    if (colors.length && !colors.includes(selectedColor)) {
      setSelectedColor(colors[0]);
    }
  }, [selectedSlug, colors, selectedColor]);

  function addKit() {
    if (!selected?.firstVariantId) return;
    setAdded(false);
    startTransition(async () => {
      await addToCartAction(selected.firstVariantId!, 1);
      setAdded(true);
    });
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      {/* Footage selector */}
      <div>
        <p className="eyebrow text-slate-500">Linear footage</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {options.map((o) => {
            const active = o.slug === selectedSlug;
            return (
              <button
                key={o.slug}
                type="button"
                onClick={() => setSelectedSlug(o.slug)}
                className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white shadow"
                    : "border-[var(--color-border)] bg-white text-slate-700 hover:border-[var(--color-brand)]"
                }`}
              >
                {o.footage}&prime;
              </button>
            );
          })}
        </div>

        {colors.length > 0 && (
          <>
            <p className="eyebrow mt-8 text-slate-500">Track color (matches soffit)</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {colors.map((c) => {
                const active = c === selectedColor;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                      active
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] font-semibold text-[var(--color-brand)]"
                        : "border-[var(--color-border)] bg-white text-slate-700 hover:border-[var(--color-brand)]"
                    }`}
                  >
                    <span
                      className="inline-block size-4 rounded-full border border-black/10"
                      style={{ background: COLOR_SWATCH[c] ?? "#cbd5e1" }}
                    />
                    {c}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="eyebrow text-slate-500">Your kit</p>
              <p className="font-display mt-1 text-xl">{selected?.footage}&prime; · {selectedColor || "Standard"}</p>
            </div>
            <p className="font-display text-3xl text-[var(--color-brand)]">{formatCad(selected?.price ?? 0)}</p>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            No payment online — we&rsquo;ll email your shipping cost. Ships from London, ON.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addKit}
              disabled={pending || !selected?.firstVariantId}
              className="btn-primary flex-1 justify-center disabled:opacity-50"
            >
              {pending ? "Adding…" : "Add kit to cart"}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/product/${selected?.slug}`)}
              className="btn-secondary"
            >
              See full kit details →
            </button>
            {added && (
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="text-sm font-semibold text-[var(--color-brand)] hover:underline"
              >
                Go to cart →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Visual preview */}
      <div className="overflow-hidden rounded-2xl bg-[var(--color-night)]">
        <Image
          src={selected?.image || "/images/products/placeholder.webp"}
          alt={`${selected?.name ?? "Permanent lights kit"} preview`}
          width={700}
          height={500}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="p-4 text-xs text-slate-400">
          Pictured: kit components &mdash; controller, tracks, pucks, connectors.
        </div>
      </div>
    </div>
  );
}
