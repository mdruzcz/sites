'use client';
import Link from 'next/link';
import {
  TRACK_COLOUR_HELP, colourList, distinctTrackColours, trackColourItems, type ColourSourceLine,
} from '@/lib/orders/track-colour';

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
  lines, checked, onChange, changeHref = null, changeLabel = 'Change it above', phone,
}: {
  lines: ColourSourceLine[];
  checked: boolean;
  onChange: (checked: boolean) => void;
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
    <section id="track-colour" className="scroll-mt-28 rounded-2xl border-2 border-accent bg-[#fff8e6] p-5 md:p-7" aria-labelledby="track-colour-heading">
      <h2 id="track-colour-heading" className="text-xl font-bold text-ink">Confirm your track colour</h2>
      <p className="text-sm text-ink-soft mt-1">{TRACK_COLOUR_HELP}</p>

      <ul className="mt-4 space-y-2">
        {items.map((it, i) => (
          <li key={`${it.productName}-${it.colour.key}-${i}`} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
            <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-full border border-black/25" style={{ background: it.colour.hex }} />
            <span className="text-sm leading-tight">
              <span className="block text-base font-bold text-ink">{it.colour.label}</span>
              <span className="text-muted">{it.productName}{it.quantity > 1 ? ` × ${it.quantity}` : ''}</span>
            </span>
          </li>
        ))}
      </ul>

      {colours.length > 1 && (
        <p className="mt-3 rounded-xl bg-[#fdeec2] px-4 py-3 text-sm font-medium text-ink" role="note">
          Heads up: this order has {colours.length} different track colours ({names}). That is fine for a two-tone home, but check it is what you meant.
        </p>
      )}

      <label className="mt-4 flex min-h-[44px] cursor-pointer items-start gap-3 rounded-xl border border-ink/20 bg-white px-4 py-3">
        <input type="checkbox" required checked={checked} onChange={e => onChange(e.target.checked)} className="mt-0.5 w-5 h-5 shrink-0 accent-[#201e1d]" />
        <span className="text-sm font-semibold text-ink">
          Yes, {names} {colours.length > 1 ? 'are the right track colours' : 'is the right track colour'} for my home.
        </span>
      </label>

      <p className="mt-3 text-xs text-muted leading-relaxed">
        Not sure, or picked the wrong one?{' '}
        {changeHref && (<><Link href={changeHref} className="font-semibold underline text-ink">{changeLabel}</Link>{phone ? ' or ' : '.'}</>)}
        {phone && (
          <>
            {changeHref ? 'call' : 'Call'} <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="font-semibold underline text-ink">{phone}</a> before you order. It is much easier to fix now than after the track ships.
          </>
        )}
      </p>
    </section>
  );
}
