"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { addToCartAction } from "@/lib/actions/cart";
import { useUI } from "@/components/ui-context";
import { KitHomeDiagram, kitHomeInfo } from "@/components/kit-home-diagram";
import { formatCad } from "@/lib/utils";

export interface ConfigOption {
  slug: string;
  footage: number;
  price: number;
  colors: string[];
  /** colour label -> variant id (from Supabase) */
  variantIds: Record<string, string>;
  lights: number;
  trackFeet: number;
  supplies: number;
  suits: string;
}

const COLOR_SWATCH: Record<string, string> = { Black: "#24262b", White: "#f3f1ec", Wicker: "#c9b58f", Brown: "#4b342a", Beige: "#d8bd9a" };

/** Pick a length and a track colour, see the example home and the maths, add it to the cart. */
export function PermanentLightsConfigurator({ options }: { options: ConfigOption[] }) {
  const { openMiniCart } = useUI();
  const [selectedSlug, setSelectedSlug] = useState<string>(options[2]?.slug ?? options[0]?.slug ?? "");
  const selected = options.find((o) => o.slug === selectedSlug) ?? options[0];
  const colors = selected?.colors ?? [];
  // Track colour is never preselected: a default colour is how people end up with the wrong track.
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [needColour, setNeedColour] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (selectedColor && colors.length && !colors.includes(selectedColor)) setSelectedColor("");
  }, [selectedSlug, colors, selectedColor]);

  if (!selected) return null;
  // Only the chosen colour's variant is ever added; never fall back to another colour.
  const variantId = selected.variantIds[selectedColor] ?? null;
  const info = kitHomeInfo(selected.footage);

  function addKit() {
    if (!variantId) {
      setNeedColour(true);
      return;
    }
    startTransition(async () => {
      await addToCartAction(variantId, 1);
      openMiniCart();
    });
  }

  const chip = (active: boolean) =>
    `border transition ${active ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] font-semibold outline outline-1 outline-[var(--color-accent)]" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-accent)]"}`;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
      <div>
        <fieldset>
          <legend className="label">1. Length of roofline</legend>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
            {options.map((o) => {
              const active = o.slug === selectedSlug;
              return (
                <button key={o.slug} type="button" onClick={() => setSelectedSlug(o.slug)} aria-pressed={active} className={`min-h-[56px] px-1 text-[0.95rem] ${chip(active)}`}>
                  {o.footage} ft
                  <span className="block text-xs font-normal text-[var(--color-muted)]">{formatCad(o.price, 0)}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {colors.length > 0 && (
          <fieldset className="mt-6">
            <legend className="label">2. Track colour</legend>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => {
                const active = c === selectedColor;
                return (
                  <button key={c} type="button" onClick={() => { setSelectedColor(c); setNeedColour(false); }} aria-pressed={active} className={`flex min-h-[44px] items-center gap-2 px-3 text-sm ${chip(active)}`}>
                    <span aria-hidden className="inline-block size-4 rounded-full border border-black/20" style={{ background: COLOR_SWATCH[c] ?? "#cbd5e1" }} />
                    {c}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Match your soffit. Every colour is the same price.</p>
          </fieldset>
        )}

        <div className="mt-6 border border-[var(--color-border)] p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-[1.35rem]">Track Lighting Kit, {selected.footage} ft</h3>
            <p className="price text-[1.6rem] leading-none">{formatCad(selected.price, 2)}</p>
          </div>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{selectedColor ? `${selectedColor} track` : "Choose a track colour"} · free shipping in Canada</p>
          {needColour && <p role="alert" className="note mt-2 font-semibold">Choose a track colour first.</p>}
          <p className="note mt-4">
            <strong>Works out to {formatCad(selected.price / selected.footage, 2)} a foot.</strong> {selected.lights} lights, {selected.trackFeet} ft of track, a WiFi controller, {selected.supplies} power {selected.supplies === 1 ? "supply" : "supplies"}, every connector and the screws.
          </p>
          <p className="mt-3 text-sm text-[var(--color-text-soft)]">Suits: {selected.suits}</p>
          <button type="button" onClick={addKit} disabled={pending} className="btn-primary mt-5 min-h-[52px] w-full disabled:opacity-50">
            {pending ? "Adding…" : selectedColor && !variantId ? "Unavailable in this colour" : "Add kit to cart"}
          </button>
          <Link href={`/product/${selected.slug}`} className="text-link mt-2 flex min-h-[44px] items-center justify-center text-sm">Full parts list for the {selected.footage} ft kit</Link>
        </div>
      </div>

      <figure className="border border-[var(--color-border)]">
        <div className="bg-[var(--color-ink-deep)]">
          <KitHomeDiagram footage={selected.footage} className="aspect-[16/9]" />
        </div>
        {info && (
          <figcaption className="p-5">
            <p className="eyebrow text-[var(--color-gold-text)]">Example layout</p>
            <p className="font-display mt-1 text-[1.2rem]">{selected.footage} ft covers a {info.title.toLowerCase()}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--color-text-soft)]">
              {info.runs.map((r) => (
                <li key={r.name}>
                  {r.name} <strong className="text-[var(--color-text)]">{r.feet} ft</strong>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.8rem] text-[var(--color-muted)]">A guide to scale, not a measurement of your house. Add up your own edges before you order.</p>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
