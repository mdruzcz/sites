'use client';
import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { pushConversion } from '@/lib/gtm';
import { site, phoneHref } from '@/lib/site-config';

// Turnstile (and its ~100KB Cloudflare script) is only loaded once the visitor
// actually starts filling in the form. Keeps it off the critical path.
const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then(m => m.Turnstile), { ssr: false });

const INTERESTS = ['Permanent Christmas lights', 'Year-round accent lighting', 'Commercial property', 'Repair or service'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function QuoteForm({ city, tone = 'light', compact = false }: { city?: string; tone?: 'light' | 'dark'; compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [engaged, setEngaged] = useState(false);
  const [token, setToken] = useState('');
  const [interest, setInterest] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const successRef = useRef<HTMLDivElement>(null);
  const engage = useCallback(() => setEngaged(true), []);

  const dark = tone === 'dark';
  const input = `input ${dark ? 'input-dark' : ''}`;
  const label = `label ${dark ? 'label-dark' : ''}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) { setEngaged(true); return; }
    setStatus('loading');
    setErrorMsg('');
    const fd = new FormData(e.currentTarget);
    const note = String(fd.get('message') ?? '').trim();
    const body = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      address: fd.get('address'),
      city: city || fd.get('city'),
      message: [interest ? `Interested in: ${interest}` : '', note].filter(Boolean).join('\n\n'),
      website: fd.get('website'),
      token,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
        pushConversion('quote_form_submit', city);
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      } else {
        setStatus('error');
        setErrorMsg(data.error === 'Captcha failed' ? 'The spam check expired. Please try again.' : '');
        setToken('');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} className={`rounded-2xl p-8 text-center ${dark ? 'bg-white/10' : 'bg-tint border border-accent/40'}`} role="status">
        <div className="mx-auto w-12 h-12 rounded-full bg-accent text-ink flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${dark ? 'text-white' : 'text-ink'}`}>Request received. Thank you!</h3>
        <p className={dark ? 'text-white/75' : 'text-ink-soft'}>
          We&apos;ll call or email you within 24 hours (Mon–Fri) to book your free site visit. Need us sooner?{' '}
          <a href={phoneHref} className="font-semibold underline">Call {site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" onFocusCapture={engage} noValidate={false}>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="form-website">Website</label>
        <input id="form-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="form-name">Your name <span aria-hidden="true">*</span></label>
          <input id="form-name" name="name" required autoComplete="name" placeholder="Jordan Smith" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="form-phone">Phone <span aria-hidden="true">*</span></label>
          <input id="form-phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(519) 555-0100" className={input} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="form-email">Email <span aria-hidden="true">*</span></label>
          <input id="form-email" name="email" required type="email" autoComplete="email" placeholder="you@example.com" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="form-address">Property address {city ? `(${city})` : ''}</label>
          <input id="form-address" name="address" autoComplete="street-address" placeholder="123 Main St" className={input} />
        </div>
      </div>

      {!city && (
        <div>
          <label className={label} htmlFor="form-city">City or town</label>
          <input id="form-city" name="city" autoComplete="address-level2" placeholder="London" className={input} />
        </div>
      )}

      <fieldset>
        <legend className={label}>What are you interested in?</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(opt => {
            const on = interest === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={on}
                onClick={() => setInterest(on ? '' : opt)}
                className={`min-h-[44px] rounded-full px-4 text-sm font-medium border transition-colors ${
                  on
                    ? 'bg-accent border-accent text-ink'
                    : dark ? 'border-white/20 text-white/85 hover:border-white/50' : 'border-line text-ink-soft hover:border-ink'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>

      {!compact && (
        <div>
          <label className={label} htmlFor="form-msg">Anything else we should know?</label>
          <textarea id="form-msg" name="message" rows={3} placeholder="Two-storey, white soffit, detached garage…" className={`${input} resize-none`} />
        </div>
      )}

      {engaged && (
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setToken}
          onError={() => setToken('')}
          onExpire={() => setToken('')}
          options={{ theme: dark ? 'dark' : 'light', retry: 'auto', size: 'flexible' }}
        />
      )}

      {status === 'error' && (
        <p className="text-sm rounded-xl px-4 py-3 bg-dot-red/10 text-dot-red" role="alert">
          {errorMsg || 'Something went wrong sending your request.'} Please try again or call us at{' '}
          <a href={phoneHref} className="underline font-semibold">{site.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || (engaged && !token)}
        className="btn btn-primary btn-lg w-full disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-ink/30 border-t-ink animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : engaged && !token ? 'Checking you’re human…' : 'Get My Free Quote'}
      </button>

      <p className={`text-xs text-center ${dark ? 'text-white/50' : 'text-muted'}`}>
        No obligation · Reply within 24 hours · We never share your details
      </p>
    </form>
  );
}
