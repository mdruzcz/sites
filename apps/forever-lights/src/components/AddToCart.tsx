'use client';
// The buy box on a kit page: price, track colour, quantity, add to cart, and a
// clear route to the cart once something is in it. On phones and tablets a
// slim bar pins the price and the buy button to the bottom of the screen
// whenever the main button has scrolled out of view.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { pushConversion } from '@/lib/gtm';
import type { CatalogColour } from '@/lib/shop';
import { Icon } from './icons';

const MAX_QTY = 10;

/** Which trim each stock track colour is meant for. Shown inside the swatch. */
const COLOUR_HINTS: Record<string, string> = {
  white: 'White soffit or fascia',
  black: 'Black or dark fascia',
  brown: 'Brown or wood-tone trim',
  beige: 'Cream, sand or tan trim',
};

const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

export function AddToCart({
  slug,
  feet,
  price,
  perFootLabel,
  shipLine,
  colours,
}: {
  slug: string;
  feet: number;
  price: number;
  /** e.g. "$19.89 per foot" */
  perFootLabel: string;
  /** One-line shipping summary, written on the server from the order policy. */
  shipLine: string;
  colours: CatalogColour[];
}) {
  const { add, items, ready } = useCart();
  const [colour, setColour] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState<{ qty: number; colourLabel: string } | null>(null);
  const [needColour, setNeedColour] = useState(false);
  const [buttonInView, setButtonInView] = useState(true);
  const [footerInView, setFooterInView] = useState(false);

  const coloursRef = useRef<HTMLFieldSetElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const chosen = colours.find(c => c.key === colour) ?? null;
  const inCart = ready ? items.filter(i => i.slug === slug).reduce((n, i) => n + i.qty, 0) : 0;

  // Show the pinned bar only while the real button is off screen, and get out
  // of the way of the footer.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const button = buttonRef.current;
    const footer = document.querySelector('footer');
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.target === button) setButtonInView(e.isIntersecting);
        else setFooterInView(e.isIntersecting);
      }
    });
    if (button) io.observe(button);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  const showBar = !buttonInView && !footerInView;

  // Tell the floating Call button to move clear of the bar (see FloatingCTA).
  useEffect(() => {
    document.documentElement.toggleAttribute('data-buybar', showBar);
    return () => document.documentElement.removeAttribute('data-buybar');
  }, [showBar]);

  function askForColour() {
    setNeedColour(true);
    coloursRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function addToCart() {
    if (!chosen) { askForColour(); return; }
    add(slug, chosen.key, qty);
    setAdded({ qty, colourLabel: chosen.label });
    pushConversion('add_to_cart', `${feet} ft kit`);
  }

  return (
    <>
      <div className="card p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-heading text-4xl font-bold text-ink tabular-nums">{money(price)}</p>
          <p className="text-sm text-muted">CAD, before tax · about {perFootLabel}</p>
        </div>

        <fieldset ref={coloursRef} className="mt-5 scroll-mt-28">
          <legend className="flex w-full items-baseline justify-between gap-3">
            <span className="text-sm font-semibold text-ink">Track colour</span>
            <span className={`text-sm ${needColour ? 'font-semibold text-[#9b1c10]' : 'text-muted'}`}>
              {chosen ? chosen.label : 'Choose one'}
            </span>
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {colours.map(c => {
              const on = colour === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => { setColour(c.key); setNeedColour(false); setAdded(null); }}
                  aria-pressed={on}
                  className={`flex min-h-[64px] items-center gap-3 rounded-xl border-2 px-3 py-2 text-left transition-colors ${on ? 'border-ink bg-ink text-white' : `bg-white text-ink hover:border-ink ${needColour ? 'border-[#e2a39c]' : 'border-line'}`}`}
                >
                  <span
                    className={`h-7 w-7 shrink-0 rounded-full border ${on ? 'border-white/60' : 'border-black/20'}`}
                    style={{ background: c.hex ?? '#ccc' }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-tight">{c.label}</span>
                    {COLOUR_HINTS[c.key] && (
                      <span className={`mt-0.5 block text-xs leading-snug ${on ? 'text-white/75' : 'text-muted'}`}>{COLOUR_HINTS[c.key]}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {needColour && (
            <p className="mt-2 text-sm font-medium text-[#9b1c10]" role="alert">Choose a track colour before adding the kit to your cart.</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">Match your soffit or fascia, not your siding.</strong>{' '}
            The track is the part you see in daylight, so pick the colour of the trim it screws to.
          </p>
          <details className="group mt-1">
            <summary className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
              Not sure which colour?
              <Icon.chevron size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <ul className="space-y-2 pb-2 text-sm leading-relaxed text-ink-soft">
              <li>Go outside in daylight and look at the fascia board or soffit edge where the track will sit. Your brick, siding, shingles and front door do not matter.</li>
              <li>Stuck between two colours? Pick the darker one. It sits in the shadow under the roofline, where a lighter track shows up as a bright line.</li>
              <li>Beige / tan is the warm tan track, the colour also sold as wicker.</li>
              <li>The track colour changes nothing about the light. Every colour uses the same lights and controller.</li>
              <li>
                Trim that is none of these? <a href="#request" className="font-semibold text-ink underline underline-offset-4">Ask about a custom colour match</a> or
                call us and we will help you pick.
              </li>
            </ul>
          </details>
        </fieldset>

        <div className="mt-4 flex items-stretch gap-3">
          <div className="inline-flex shrink-0 items-center rounded-full border-[1.5px] border-line bg-white" role="group" aria-label="Quantity">
            <button
              type="button"
              className="inline-flex h-14 w-12 items-center justify-center rounded-l-full text-ink disabled:opacity-35"
              onClick={() => { setQty(q => Math.max(1, q - 1)); setAdded(null); }}
              disabled={qty <= 1}
              aria-label="One fewer kit"
            >
              <Icon.minus size={18} />
            </button>
            <span className="w-7 text-center font-semibold tabular-nums text-ink" aria-live="polite" aria-label={`Quantity ${qty}`}>{qty}</span>
            <button
              type="button"
              className="inline-flex h-14 w-12 items-center justify-center rounded-r-full text-ink disabled:opacity-35"
              onClick={() => { setQty(q => Math.min(MAX_QTY, q + 1)); setAdded(null); }}
              disabled={qty >= MAX_QTY}
              aria-label="One more kit"
            >
              <Icon.plus size={18} />
            </button>
          </div>
          <button ref={buttonRef} type="button" onClick={addToCart} className="btn btn-primary btn-lg min-w-0 flex-1 px-4">
            <Icon.cart size={20} /> Add to cart
          </button>
        </div>
        {qty > 1 && (
          <p className="mt-2 text-right text-sm text-muted tabular-nums">{qty} kits · {money(price * qty)} before shipping and tax</p>
        )}

        {added && (
          <div className="mt-4 rounded-xl bg-[#e8f6ee] p-4" role="status">
            <p className="flex items-start gap-2 font-semibold text-[#0f6b3a]">
              <Icon.check size={20} className="mt-0.5 shrink-0" />
              <span>Added to your cart: {added.qty} × {feet} ft kit, {added.colourLabel} track</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/cart" className="btn btn-dark flex-1 px-5">View cart and check out <Icon.arrow size={18} /></Link>
              <a href="#add-ons" className="btn btn-light flex-1 border border-line px-5">Add extra parts</a>
            </div>
          </div>
        )}
        {!added && inCart > 0 && (
          <p className="mt-3 flex flex-wrap items-center justify-between gap-x-3 rounded-xl bg-tint px-4 text-sm text-ink-soft">
            <span>{inCart} of this kit in your cart.</span>
            <Link href="/cart" className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink underline underline-offset-4">
              View cart and check out <Icon.arrow size={16} />
            </Link>
          </p>
        )}

        <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm leading-snug text-ink-soft">
          <li className="flex gap-2.5"><Icon.truck size={18} className="mt-px shrink-0 text-ink" /><span>{shipLine}</span></li>
          <li className="flex gap-2.5"><Icon.lock size={18} className="mt-px shrink-0 text-ink" /><span>Secure card checkout on Stripe: credit card, debit, Apple Pay or Google Pay. GST/HST for your province is added there.</span></li>
        </ul>
      </div>

      {/* Pinned buy bar (phones and tablets). The Call button floats above it. */}
      {showBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-18px_rgba(0,0,0,0.45)] lg:hidden">
          <div className="wrap flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted">{feet} ft kit{chosen ? ` · ${chosen.label} track` : ''}</p>
              <p className="font-heading text-xl font-bold leading-tight text-ink tabular-nums">{money(price * qty)}</p>
            </div>
            {added ? (
              <Link href="/cart" className="btn btn-dark px-5">View cart <Icon.arrow size={18} /></Link>
            ) : chosen ? (
              <button type="button" onClick={addToCart} className="btn btn-primary px-5"><Icon.cart size={18} /> Add to cart</button>
            ) : (
              <button type="button" onClick={askForColour} className="btn btn-primary px-5">Choose colour</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
