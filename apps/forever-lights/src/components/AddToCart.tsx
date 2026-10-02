'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { pushConversion } from '@/lib/gtm';
import type { CatalogColour } from '@/lib/shop';
import { Icon } from './icons';

export function AddToCart({
  slug,
  feet,
  priceLabel,
  colours,
}: {
  slug: string;
  feet: number;
  priceLabel: string;
  colours: CatalogColour[];
}) {
  const { add } = useCart();
  const [colour, setColour] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [needColour, setNeedColour] = useState(false);

  function addToCart() {
    if (!colour) { setNeedColour(true); return; }
    add(slug, colour, qty);
    setAdded(true);
    pushConversion('add_to_cart', `${feet} ft kit`);
  }

  return (
    <div className="card p-5 md:p-6">
      <fieldset>
        <legend className="label">Track colour</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {colours.map(c => {
            const on = colour === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => { setColour(c.key); setNeedColour(false); setAdded(false); }}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'}`}
              >
                <span className="w-4 h-4 rounded-full border border-black/15" style={{ background: c.hex ?? '#ccc' }} aria-hidden="true" />
                {c.label}
              </button>
            );
          })}
        </div>
        {needColour && <p className="mt-2 text-sm font-medium text-[var(--dot-red)]" role="alert">Choose a track colour first.</p>}
        <p className="mt-2 text-xs text-muted">
          Need a custom colour match? <a href="#request" className="underline">Ask us</a> and we will quote it.
        </p>
      </fieldset>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="label">Quantity</span>
          <select value={qty} onChange={e => { setQty(Number(e.target.value)); setAdded(false); }} className="input min-h-[52px] w-24">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <button type="button" onClick={addToCart} className="btn btn-primary btn-lg flex-1 px-5 whitespace-nowrap">
          <Icon.cart size={20} /> Add to cart<span className="hidden sm:inline"> · {priceLabel}</span>
        </button>
      </div>

      {added && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-tint px-4 py-3 text-sm" role="status">
          <span className="inline-flex items-center gap-2 font-medium text-ink"><Icon.check size={18} className="text-[var(--dot-green)]" /> Added to your cart.</span>
          <Link href="/cart" className="btn btn-dark btn-sm">Checkout <Icon.arrow size={16} /></Link>
        </div>
      )}
      <p className="mt-4 text-xs text-muted leading-relaxed">
        Free shipping within 200 km of our Belmont, Ontario shop. $200 flat rate anywhere else in Canada. GST/HST added at checkout.
      </p>
    </div>
  );
}
