'use client';
import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { pushConversion } from '@/lib/gtm';
import { site, phoneHref } from '@/lib/site-config';

const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then(m => m.Turnstile), { ssr: false });

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
  'Quebec', 'Saskatchewan', 'Yukon',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

interface KitOption {
  slug: string;
  label: string;
  price: string;
}

export function KitRequestForm({
  kitOptions,
  colourOptions,
  defaultKit = '',
}: {
  kitOptions: KitOption[];
  colourOptions: { key: string; label: string }[];
  defaultKit?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [engaged, setEngaged] = useState(false);
  const [token, setToken] = useState('');
  const [kit, setKit] = useState(defaultKit);
  const [colour, setColour] = useState('');
  const successRef = useRef<HTMLDivElement>(null);
  const engage = useCallback(() => setEngaged(true), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) { setEngaged(true); return; }
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    const chosen = kitOptions.find(k => k.slug === kit);
    const province = String(fd.get('province') ?? '');
    const note = String(fd.get('message') ?? '').trim();
    const body = {
      kind: 'kit',
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      address: [fd.get('street'), fd.get('city'), province, fd.get('postal')].filter(Boolean).join(', '),
      city: province,
      message: [
        'DIY KIT REQUEST',
        `Kit: ${chosen ? `${chosen.label} (${chosen.price})` : kit || 'not selected'}`,
        `Track colour: ${colour || 'not selected'}`,
        `Ship to: ${fd.get('street') || '-'}, ${fd.get('city') || '-'}, ${province || '-'} ${fd.get('postal') || ''}`,
        'Needs: shipping estimate + provincial tax quote',
        '',
        note,
      ].join('\n'),
      website: fd.get('website'),
      token,
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
        pushConversion('kit_request_submit', chosen?.label);
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      } else {
        setStatus('error');
        setToken('');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} className="rounded-2xl p-8 text-center bg-tint border border-accent/40" role="status">
        <div className="mx-auto w-12 h-12 rounded-full bg-accent text-ink flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
        </div>
        <h3 className="text-xl font-bold text-ink mb-2">Kit request received. Thank you!</h3>
        <p className="text-ink-soft">
          We will email you a written total within one business day: the kit price, exact shipping to your address, and the tax for your province.
          Nothing is charged until you say yes. Questions in the meantime? <a href={phoneHref} className="font-semibold underline">Call {site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" onFocusCapture={engage}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="kit-website">Website</label>
        <input id="kit-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="label" htmlFor="kit-select">Which kit? <span aria-hidden="true">*</span></label>
        <select id="kit-select" name="kit" required value={kit} onChange={e => setKit(e.target.value)} className="input">
          <option value="">Choose a kit size…</option>
          {kitOptions.map(k => (
            <option key={k.slug} value={k.slug}>{k.label} — {k.price}</option>
          ))}
        </select>
        <p className="text-xs text-muted mt-1.5">Not sure? Tell us your roofline length in the notes and we will confirm the right size.</p>
      </div>

      <fieldset>
        <legend className="label">Track colour</legend>
        <div className="flex flex-wrap gap-2">
          {colourOptions.map(c => {
            const on = colour === c.key;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                onClick={() => setColour(on ? '' : c.key)}
                className={`min-h-[44px] rounded-full px-4 text-sm font-medium border transition-colors ${on ? 'bg-accent border-accent text-ink' : 'border-line text-ink-soft hover:border-ink'}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="kit-name">Your name <span aria-hidden="true">*</span></label>
          <input id="kit-name" name="name" required autoComplete="name" placeholder="Jordan Smith" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="kit-phone">Phone <span aria-hidden="true">*</span></label>
          <input id="kit-phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(519) 555-0100" className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="kit-email">Email <span aria-hidden="true">*</span></label>
        <input id="kit-email" name="email" required type="email" autoComplete="email" placeholder="you@example.com" className="input" />
      </div>

      <div>
        <label className="label" htmlFor="kit-street">Shipping address <span aria-hidden="true">*</span></label>
        <input id="kit-street" name="street" required autoComplete="address-line1" placeholder="123 Main St" className="input" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label" htmlFor="kit-city">City <span aria-hidden="true">*</span></label>
          <input id="kit-city" name="city" required autoComplete="address-level2" placeholder="London" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="kit-province">Province <span aria-hidden="true">*</span></label>
          <select id="kit-province" name="province" required autoComplete="address-level1" className="input" defaultValue="">
            <option value="">Select…</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="kit-postal">Postal code <span aria-hidden="true">*</span></label>
          <input id="kit-postal" name="postal" required autoComplete="postal-code" inputMode="text" placeholder="N6A 1A1" className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="kit-msg">Anything else we should know?</label>
        <textarea id="kit-msg" name="message" rows={3} placeholder="Roofline length, soffit type, questions about the install…" className="input resize-none" />
      </div>

      {engaged && (
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setToken}
          onError={() => setToken('')}
          onExpire={() => setToken('')}
          options={{ theme: 'light', retry: 'auto', size: 'flexible' }}
        />
      )}

      {status === 'error' && (
        <p className="text-sm rounded-xl px-4 py-3 bg-dot-red/10 text-dot-red" role="alert">
          Something went wrong sending your request. Please try again or call <a href={phoneHref} className="underline font-semibold">{site.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || (engaged && !token)}
        className="btn btn-primary btn-lg w-full disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : engaged && !token ? 'Checking you’re human…' : 'Request my kit quote'}
      </button>
      <p className="text-xs text-center text-muted">
        No payment now · We reply within one business day with shipping and tax for your province
      </p>
    </form>
  );
}
