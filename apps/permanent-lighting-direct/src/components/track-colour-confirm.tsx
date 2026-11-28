"use client";

import Link from "next/link";
import {
  TRACK_COLOUR_HELP,
  colourList,
  distinctTrackColours,
  trackColourItems,
  type ColourSourceLine
} from "@/lib/orders/track-colour";

/** True when the cart has a kit, track or colour-matched screws. */
export function needsTrackColourCheck(lines: ColourSourceLine[]): boolean {
  return trackColourItems(lines).length > 0;
}

/**
 * "Is this the right track colour?" Shown before payment whenever the order has
 * a colour-matched part. The checkbox is required; the server refuses the order
 * without it.
 */
export function TrackColourConfirm({
  lines,
  checked,
  onChange,
  heading = "Confirm your track colour",
  changeHref = "/cart",
  changeLabel = "Change it in your cart",
  phone
}: {
  lines: ColourSourceLine[];
  checked: boolean;
  onChange: (checked: boolean) => void;
  heading?: string;
  /** Where the customer goes to pick a different colour; null hides the link. */
  changeHref?: string | null;
  changeLabel?: string;
  phone?: string;
}) {
  const items = trackColourItems(lines);
  if (!items.length) return null;
  const colours = distinctTrackColours(items);
  const names = colourList(colours);

  return (
    <section
      id="track-colour"
      className="scroll-mt-28 rounded-xl border-2 border-amber-300 bg-amber-50/60 p-5"
      aria-labelledby="track-colour-heading"
    >
      <h2 id="track-colour-heading" className="font-display text-xl">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-slate-700">{TRACK_COLOUR_HELP}</p>

      <ul className="mt-4 space-y-2">
        {items.map((it, i) => (
          <li key={`${it.productName}-${it.colour.key}-${i}`} className="flex items-center gap-3 rounded-lg border border-amber-200 bg-white px-3 py-2">
            <span
              aria-hidden="true"
              className="size-9 shrink-0 rounded-full border border-slate-400 shadow-inner"
              style={{ background: it.colour.hex }}
            />
            <span className="text-sm leading-tight">
              <span className="block text-base font-bold text-slate-900">{it.colour.label}</span>
              <span className="text-slate-600">
                {it.productName}
                {it.quantity > 1 ? ` × ${it.quantity}` : ""}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {colours.length > 1 && (
        <p className="mt-3 rounded-md bg-amber-100 px-3 py-2 text-sm font-medium text-amber-900" role="note">
          Heads up: this order has {colours.length} different track colours ({names}). That is fine for a two-tone home, but
          check it is what you meant.
        </p>
      )}

      <label className="mt-4 flex min-h-[44px] cursor-pointer items-start gap-3 rounded-lg bg-white px-3 py-3 ring-1 ring-amber-300">
        <input
          type="checkbox"
          required
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]"
        />
        <span className="text-sm font-semibold text-slate-900">
          Yes, {names} {colours.length > 1 ? "are the right track colours" : "is the right track colour"} for my home.
        </span>
      </label>

      <p className="mt-3 text-xs text-slate-600">
        Not sure, or picked the wrong one?{" "}
        {changeHref && (
          <>
            <Link href={changeHref} className="font-semibold underline">
              {changeLabel}
            </Link>
            {phone ? " or " : "."}
          </>
        )}
        {phone && (
          <>
            call{" "}
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-semibold underline">
              {phone}
            </a>{" "}
            before you order. It is much easier to fix now than after the track ships.
          </>
        )}
      </p>
    </section>
  );
}
