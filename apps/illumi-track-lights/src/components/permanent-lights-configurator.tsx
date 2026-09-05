"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { formatCad } from "@/lib/utils";

export interface ConfigOption {
  slug: string;
  name: string;
  footage: number;
  price: number;
  colors: string[];
  /** colour label -> variant id (from Supabase) */
  variantIds: Record<string, string>;
  image: string | null;
  photo: PhotoKey;
  lights: number;
  trackFeet: number;
  suits: string;
  saving: number;
}

const COLOR_SWATCH: Record<string, string> = { Black: "#24262b", White: "#f3f1ec", Wicker: "#c9b58f", Brown: "#4b342a", Beige: "#d8bd9a" };

export function PermanentLightsConfigurator({ options }: { options: ConfigOption[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string>(options[2]?.slug ?? options[0]?.slug ?? "");
  const selected = options.find((o) => o.slug === selectedSlug) ?? options[0];
  const colors = selected?.colors ?? [];
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (colors.length && !colors.includes(selectedColor)) setSelectedColor(colors[0]);
  }, [selectedSlug, colors, selectedColor]);

  const variantId = selected?.variantIds[selectedColor] ?? Object.values(selected?.variantIds ?? {})[0] ?? null;

  function addKit() {
    if (!variantId) return;
    setAdded(false);
    startTransition(async () => {
      await addToCartAction(variantId, 1);
      setAdded(true);
    });
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="label">Linear footage</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {options.map((o) => {
            const active = o.slug === selectedSlug;
            return (
              <button
                key={o.slug}
                type="button"
                onClick={() => setSelectedSlug(o.slug)}
                aria-pressed={active}
                className={`min-h-[52px] rounded-xl border text-sm font-semibold transition ${active ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white shadow-[var(--shadow-md)]" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-ink)]"}`}
              >
                {o.footage} ft
                <span className={`block text-[11px] font-normal ${active ? "text-white/70" : "text-[var(--color-muted)]"}`}>{formatCad(o.price, 0)}</span>
              </button>
            );
          })}
        </div>

        {colors.length > 0 && (
          <>
            <p className="label mt-8">Track colour</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => {
                const active = c === selectedColor;
                return (
                  <button key={c} type="button" onClick={() => setSelectedColor(c)} aria-pressed={active} className={`flex min-h-[44px] items-center gap-2 rounded-full border px-3.5 text-sm transition ${active ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-ink)]"}`}>
                    <span className="inline-block size-4 rounded-full border border-black/15" style={{ background: COLOR_SWATCH[c] ?? "#cbd5e1" }} />
                    {c}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="card mt-8 p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="eyebrow text-[var(--color-muted)]">Your kit</p>
              <p className="font-display mt-1 text-2xl">{selected?.footage} ft · {selectedColor || "Standard"} track</p>
            </div>
            <p className="font-display text-3xl">{formatCad(selected?.price ?? 0, 2)}</p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-y-1 text-sm text-[var(--color-text-soft)]">
            <li>{selected?.lights} RGBW pucks</li>
            <li>{selected?.trackFeet} ft of aluminum track</li>
            <li>WiFi controller + power</li>
            <li>All connectors and screws</li>
          </ul>
          <p className="mt-3 text-sm text-[var(--color-text-soft)]">{selected?.suits}</p>
          <p className="mt-3 text-xs text-[var(--color-muted)]">Free Canadian shipping on this order. Saves about {formatCad(selected?.saving ?? 0, 0)} versus our installed price.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={addKit} disabled={pending || !variantId} className="btn-primary flex-1 disabled:opacity-50">
              {pending ? "Adding…" : "Add kit to cart"}
            </button>
            <button type="button" onClick={() => router.push(`/product/${selected?.slug}`)} className="btn-secondary">Full kit details</button>
          </div>
          {added && (
            <button type="button" onClick={() => router.push("/cart")} className="mt-3 text-sm font-semibold text-[var(--color-accent-dark)] hover:underline">
              Added. Go to your cart →
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[var(--color-ink)]">
        {selected && <Photo name={selected.photo} ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 560px" />}
        <p className="p-4 text-xs text-white/60">Real installs using the same 12V track-and-puck hardware included in every kit.</p>
      </div>
    </div>
  );
}
