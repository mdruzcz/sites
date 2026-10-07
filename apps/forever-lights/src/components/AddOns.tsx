'use client';
// Upsell strip for a-la-carte parts: extra strands, jumpers, power. Used on the
// kit page (below the price) and in the cart. Colour-matched parts pick up the
// track colour of the kit already in the cart when there is exactly one.
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import { pushConversion } from '@/lib/gtm';
import type { CatalogAddon, CatalogColour } from '@/lib/shop';
import { Icon } from './icons';

const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

/** The parts most people end up needing, in the order we want to pitch them. */
export const FEATURED_ADDONS = ['strand', 'conn20', 'powerT', 'amplifier', 'track', 'powerExt20'];

export function AddOns({
  addons,
  colours,
  keys,
  title = 'Complete your install',
  intro,
  compact = false,
  stockNote,
}: {
  addons: CatalogAddon[];
  colours: CatalogColour[];
  /** Which add-ons to show, in order. Defaults to the full list. */
  keys?: string[];
  title?: string;
  intro?: string;
  compact?: boolean;
  stockNote?: string;
}) {
  const { items, add } = useCart();
  const kitColours = useMemo(() => Array.from(new Set(items.filter(i => !i.slug.startsWith('addon:')).map(i => i.colour))), [items]);
  const defaultColour = kitColours.length === 1 ? kitColours[0] : '';
  const list = keys ? keys.map(k => addons.find(a => a.key === k)).filter((a): a is CatalogAddon => !!a) : addons;

  return (
    <section className={compact ? '' : 'card p-5 md:p-7'}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Add-on parts</span>
          <h2 className={`mt-2 font-bold text-ink ${compact ? 'text-lg' : 'text-2xl'}`}>{title}</h2>
          {intro && <p className="mt-2 text-[15px] text-ink-soft leading-relaxed max-w-2xl">{intro}</p>}
        </div>
      </div>
      <ul className={`mt-5 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {list.map(a => (
          <AddOnCard key={a.key} addon={a} colours={colours} defaultColour={defaultColour} onAdd={(colour, qty) => { add(a.slug, colour, qty); pushConversion('add_to_cart', a.name); }} compact={compact} />
        ))}
      </ul>
      {stockNote && (
        <p className="mt-4 text-xs text-muted leading-relaxed"><Icon.bolt size={14} className="inline -mt-0.5 mr-1" />{stockNote}</p>
      )}
    </section>
  );
}

function AddOnCard({
  addon, colours, defaultColour, onAdd, compact,
}: {
  addon: CatalogAddon;
  colours: CatalogColour[];
  defaultColour: string;
  onAdd: (colour: string, qty: number) => void;
  compact: boolean;
}) {
  const [colour, setColour] = useState(defaultColour);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [needColour, setNeedColour] = useState(false);
  const chosen = addon.needsColour ? (colour || defaultColour) : '-';

  function addIt() {
    if (addon.needsColour && !chosen) { setNeedColour(true); return; }
    onAdd(chosen, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <li className="flex flex-col rounded-2xl border border-line bg-white p-4">
      <div className="flex gap-3">
        <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-soft border border-line">
          {addon.image ? (
            <Image src={addon.image} alt={addon.name} fill sizes="64px" className="object-contain p-1.5" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-muted"><Icon.wrench size={24} /></span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-ink leading-tight text-[15px]">{addon.name}</h3>
          <p className="mt-1 font-heading text-lg font-bold text-ink tabular-nums">{money(addon.price)} <span className="text-xs font-normal text-muted">/ {addon.unit}</span></p>
        </div>
      </div>
      {!compact && <p className="mt-3 text-sm text-ink-soft leading-relaxed">{addon.pitch}</p>}
      {addon.needsColour && (
        <div className="mt-3">
          <select
            aria-label={`Colour for ${addon.name}`}
            value={colour || defaultColour}
            onChange={e => { setColour(e.target.value); setNeedColour(false); }}
            className="input min-h-[44px] text-sm w-full"
          >
            <option value="">Track colour…</option>
            {colours.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          {needColour && <p className="mt-1 text-xs font-medium text-[var(--dot-red)]" role="alert">Pick a colour first.</p>}
        </div>
      )}
      <div className="mt-auto pt-3 flex items-center gap-2">
        <select aria-label={`Quantity of ${addon.name}`} value={qty} onChange={e => setQty(Number(e.target.value))} className="input min-h-[44px] w-[4.5rem] text-sm">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button type="button" onClick={addIt} className={`btn btn-sm flex-1 min-h-[44px] ${added ? 'btn-dark' : 'btn-primary'}`}>
          {added ? <><Icon.check size={16} /> Added</> : <><Icon.plus size={16} /> Add</>}
        </button>
      </div>
    </li>
  );
}
