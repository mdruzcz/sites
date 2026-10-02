'use client';
import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import type { CatalogColour, CatalogKit } from '@/lib/shop';
import {
  FLAT_RATE_CAD, FREE_RADIUS_KM, PROVINCES, SHOP,
  estimateTotals, normalizePostal, postalMatchesProvince, provinceName,
} from '@/lib/orders/policy';
import { pushConversion } from '@/lib/gtm';
import { Icon } from './icons';

const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

type Field = 'email' | 'phone' | 'firstName' | 'lastName' | 'company' | 'line1' | 'line2' | 'city' | 'province' | 'postal' | 'note';

export function CartView({ kits, colours }: { kits: CatalogKit[]; colours: CatalogColour[] }) {
  const { items, ready, setQty, remove } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [f, setF] = useState<Record<Field, string>>({
    email: '', phone: '', firstName: '', lastName: '', company: '',
    line1: '', line2: '', city: '', province: 'ON', postal: '', note: '',
  });
  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF(prev => ({ ...prev, [k]: k === 'postal' ? e.target.value.toUpperCase() : e.target.value }));

  const lines = useMemo(
    () => items
      .map(i => ({ item: i, kit: kits.find(k => k.slug === i.slug), colour: colours.find(c => c.key === i.colour) }))
      .filter((l): l is { item: typeof l.item; kit: CatalogKit; colour: CatalogColour } => !!l.kit && !!l.colour),
    [items, kits, colours],
  );
  const subtotal = lines.reduce((n, l) => n + l.kit.price * l.item.qty, 0);
  const postal = normalizePostal(f.postal);
  const mismatch = postal ? !postalMatchesProvince(postal, f.province) : false;
  const totals = postal && !mismatch ? estimateTotals(subtotal, postal, f.province) : null;

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines.map(l => l.item), customer: f }),
      });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (json.url) {
        pushConversion('begin_checkout', money(totals?.total ?? subtotal));
        window.location.href = json.url;
        return;
      }
      setError(json.error ?? 'Could not start checkout. Please try again.');
    } catch {
      setError('Network problem. Please check your connection and try again.');
    }
    setPending(false);
    setTimeout(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  }

  if (!ready) {
    return <div className="card p-10 text-center text-muted">Loading your cart…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="card p-10 text-center">
        <Icon.cart size={40} className="mx-auto text-muted" />
        <h2 className="mt-4 text-2xl font-bold text-ink">Your cart is empty</h2>
        <p className="mt-2 text-muted">Pick a DIY kit size and track colour to get started.</p>
        <Link href="/kits" className="btn btn-primary mt-6">Shop DIY kits</Link>
      </div>
    );
  }

  return (
    <form onSubmit={checkout} className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-7 space-y-6">
        {/* Lines */}
        <section className="card divide-y divide-line">
          {lines.map(({ item, kit, colour }) => (
            <article key={`${item.slug}-${item.colour}`} className="flex gap-4 p-5">
              <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-white border border-line">
                {kit.image && (
                  <Image src={kit.image} alt={`Forever Lights ${kit.feet} ft DIY permanent lighting kit with ${colour.label.toLowerCase()} track`} fill sizes="80px" className="object-contain p-1.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/kits/${kit.slug}`} className="font-bold text-ink hover:underline">{kit.title}</Link>
                <p className="text-sm text-muted">{colour.label} track · {kit.lights} lights · {kit.trackFeet} ft of track</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button type="button" className="w-11 h-11 inline-flex items-center justify-center text-ink disabled:opacity-40" onClick={() => setQty(item.slug, item.colour, item.qty - 1)} aria-label={`One fewer ${kit.title}`} disabled={item.qty <= 1}>
                      <Icon.minus size={18} />
                    </button>
                    <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{item.qty}</span>
                    <button type="button" className="w-11 h-11 inline-flex items-center justify-center text-ink disabled:opacity-40" onClick={() => setQty(item.slug, item.colour, item.qty + 1)} aria-label={`One more ${kit.title}`} disabled={item.qty >= 20}>
                      <Icon.plus size={18} />
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(item.slug, item.colour)} className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm text-muted hover:text-ink">
                    <Icon.trash size={16} /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-ink tabular-nums">{money(kit.price * item.qty)}</p>
                {item.qty > 1 && <p className="text-xs text-muted">{money(kit.price)} each</p>}
              </div>
            </article>
          ))}
        </section>

        {/* Contact + address */}
        <section className="card p-5 md:p-7">
          <h2 className="text-xl font-bold text-ink">Where are we shipping it?</h2>
          <p className="text-sm text-muted mt-1">Your receipt, invoice and tracking number go to this email.</p>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" autoComplete="email" inputMode="email" required value={f.email} onChange={set('email')} />
            <Input label="Phone" type="tel" autoComplete="tel" inputMode="tel" required value={f.phone} onChange={set('phone')} />
            <Input label="First name" autoComplete="given-name" required value={f.firstName} onChange={set('firstName')} />
            <Input label="Last name" autoComplete="family-name" required value={f.lastName} onChange={set('lastName')} />
            <Input label="Company (optional)" autoComplete="organization" value={f.company} onChange={set('company')} className="sm:col-span-2" />
            <Input label="Street address" autoComplete="address-line1" required value={f.line1} onChange={set('line1')} className="sm:col-span-2" />
            <Input label="Apartment, suite, etc. (optional)" autoComplete="address-line2" value={f.line2} onChange={set('line2')} className="sm:col-span-2" />
            <Input label="City" autoComplete="address-level2" required value={f.city} onChange={set('city')} />
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="label">Province</span>
                <select className="input min-h-[52px]" autoComplete="address-level1" value={f.province} onChange={set('province')}>
                  {PROVINCES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                </select>
              </label>
              <Input label="Postal code" autoComplete="postal-code" required maxLength={7} placeholder="A1A 1A1" value={f.postal} onChange={set('postal')} />
            </div>
          </div>
          <div aria-live="polite" className="mt-4 text-sm">
            {mismatch && postal && (
              <p className="rounded-xl bg-[#fdecea] px-4 py-3 text-[#9b1c10]">{postal} isn&rsquo;t a {provinceName(f.province)} postal code. Please check the province.</p>
            )}
            {totals?.shipping?.free && (
              <p className="rounded-xl bg-[#e8f6ee] px-4 py-3 font-medium text-[#0f6b3a]">Free shipping. You&rsquo;re about {totals.shipping.km} km from our {SHOP.town}, Ontario shop.</p>
            )}
            {totals?.shipping && !totals.shipping.free && (
              <p className="rounded-xl bg-tint px-4 py-3 text-ink-soft">
                Flat-rate shipping to {totals.shipping.postal}: <strong className="text-ink">{money(FLAT_RATE_CAD)}</strong>. Free shipping applies within {FREE_RADIUS_KM} km of our {SHOP.town}, ON shop.
              </p>
            )}
          </div>
          <label className="block mt-4">
            <span className="label">Delivery notes (optional)</span>
            <textarea className="input" rows={2} maxLength={1000} value={f.note} onChange={set('note')} placeholder="Gate code, best place to leave boxes, roofline questions…" />
          </label>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-ink">Order summary</h2>
          <dl className="mt-4 space-y-2.5 text-[15px]">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Shipping" value={totals?.shipping ? (totals.shipping.free ? 'Free' : money(totals.shipping.amountCad)) : 'Enter postal code'} />
            <Row label={totals?.tax ? totals.tax.display : 'GST/HST'} value={totals ? money(totals.taxCad) : 'By province'} />
          </dl>
          <div className="mt-4 border-t border-line pt-4 flex items-baseline justify-between">
            <span className="font-bold text-ink">Total</span>
            <span className="font-heading text-3xl font-bold text-ink tabular-nums">{money(totals?.total ?? subtotal)}</span>
          </div>
          <p className="text-right text-xs text-muted mt-1">CAD{totals ? '' : ', before shipping and tax'}</p>

          <button type="submit" disabled={pending || mismatch} className="btn btn-primary btn-lg w-full mt-6 disabled:opacity-60">
            <Icon.lock size={18} /> {pending ? 'Processing…' : 'Continue to secure payment'}
          </button>
          {error && <p ref={errorRef} role="alert" className="mt-3 rounded-xl bg-[#fdecea] px-4 py-3 text-sm text-[#9b1c10]">{error}</p>}
          <p className="mt-4 text-xs text-muted leading-relaxed">
            You pay on Stripe&rsquo;s secure page by credit card, debit, Apple Pay or Google Pay. Forever Lights kits are invoiced
            by our billing company, Master Decker Inc.; your card statement shows MASTER DECKER and your invoice is emailed the
            moment payment goes through.
          </p>
        </div>
        <ul className="card-soft p-5 space-y-2 text-sm text-ink-soft">
          {[
            `Free shipping within ${FREE_RADIUS_KM} km of ${SHOP.town}, ON · ${money(FLAT_RATE_CAD)} flat elsewhere in Canada`,
            'Ships within one to two business days',
            '5-year parts warranty on every kit',
            'Phone support while you install',
          ].map(t => <li key={t} className="flex gap-2"><Icon.check size={18} className="shrink-0 text-[var(--dot-green)]" />{t}</li>)}
        </ul>
      </aside>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink tabular-nums">{value}</dd>
    </div>
  );
}

function Input({ label, className = '', ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      <input className="input min-h-[52px]" {...rest} />
    </label>
  );
}
