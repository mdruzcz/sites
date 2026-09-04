'use client';
import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { pushConversion } from '@/lib/gtm';
import { site, phoneHref } from '@/lib/site-config';

const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then(m => m.Turnstile), { ssr: false });

const BUSINESS_TYPES = ['Electrical contractor', 'Holiday lighting company', 'Roofing / eavestrough / siding', 'Landscaping or deck builder', 'Other trade', 'New business'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function DealerForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [engaged, setEngaged] = useState(false);
  const [token, setToken] = useState('');
  const [type, setType] = useState('');
  const successRef = useRef<HTMLDivElement>(null);
  const engage = useCallback(() => setEngaged(true), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) { setEngaged(true); return; }
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    const note = String(fd.get('message') ?? '').trim();
    const body = {
      kind: 'dealer',
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      address: fd.get('company'),
      city: fd.get('territory'),
      message: [
        'DEALER INQUIRY',
        `Company: ${fd.get('company') || '-'}`,
        `Business type: ${type || '-'}`,
        `Years in business: ${fd.get('years') || '-'}`,
        `Territory of interest: ${fd.get('territory') || '-'}`,
        `Website: ${fd.get('url') || '-'}`,
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
        pushConversion('dealer_form_submit');
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
        <h3 className="text-xl font-bold text-ink mb-2">Application received. Thank you!</h3>
        <p className="text-ink-soft">
          We review every dealer inquiry personally and will call you within two business days to talk about your market, training dates and next steps.
          Want to talk sooner? <a href={phoneHref} className="font-semibold underline">Call {site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" onFocusCapture={engage}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="dealer-website">Website</label>
        <input id="dealer-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="dealer-name">Your name <span aria-hidden="true">*</span></label>
          <input id="dealer-name" name="name" required autoComplete="name" placeholder="Jordan Smith" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="dealer-company">Company <span aria-hidden="true">*</span></label>
          <input id="dealer-company" name="company" required autoComplete="organization" placeholder="Smith Electric Ltd." className="input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="dealer-phone">Phone <span aria-hidden="true">*</span></label>
          <input id="dealer-phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(519) 555-0100" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="dealer-email">Email <span aria-hidden="true">*</span></label>
          <input id="dealer-email" name="email" required type="email" autoComplete="email" placeholder="you@company.com" className="input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="dealer-territory">City or territory of interest <span aria-hidden="true">*</span></label>
          <input id="dealer-territory" name="territory" required placeholder="Kitchener-Waterloo, ON" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="dealer-years">Years in business</label>
          <input id="dealer-years" name="years" inputMode="numeric" placeholder="5" className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="dealer-url">Website or social page (optional)</label>
        <input id="dealer-url" name="url" type="url" inputMode="url" placeholder="https://" className="input" />
      </div>

      <fieldset>
        <legend className="label">What best describes your business?</legend>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map(opt => {
            const on = type === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={on}
                onClick={() => setType(on ? '' : opt)}
                className={`min-h-[44px] rounded-full px-4 text-sm font-medium border transition-colors ${on ? 'bg-accent border-accent text-ink' : 'border-line text-ink-soft hover:border-ink'}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className="label" htmlFor="dealer-msg">Tell us about your crew and your market</label>
        <textarea id="dealer-msg" name="message" rows={4} placeholder="Team size, lifts or ladders, current services, how many installs you could take on this season…" className="input resize-none" />
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
          Something went wrong sending your application. Please try again or call <a href={phoneHref} className="underline font-semibold">{site.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || (engaged && !token)}
        className="btn btn-primary btn-lg w-full disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : engaged && !token ? 'Checking you’re human…' : 'Apply to become a dealer'}
      </button>
      <p className="text-xs text-center text-muted">No franchise fee to apply · We reply within two business days · Your details stay private</p>
    </form>
  );
}
