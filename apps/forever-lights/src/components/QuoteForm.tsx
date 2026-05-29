'use client';
import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { pushConversion } from '@/lib/gtm';

export function QuoteForm({ city }: { city?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [token, setToken] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      address: fd.get('address'),
      message: fd.get('message'),
      city: city || fd.get('city'),
      token,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('success');
        pushConversion('quote_form_submit', city);
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} className="rounded-2xl bg-green-900/30 border border-green-500/30 p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-white mb-2">Quote Request Received!</h3>
        <p className="text-slate-300">We'll get back to you within 24 hours to schedule your free site visit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1" htmlFor="form-name">Your Name *</label>
          <input
            id="form-name"
            name="name"
            required
            autoComplete="name"
            placeholder="John Smith"
            className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F5A623]/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1" htmlFor="form-phone">Phone *</label>
          <input
            id="form-phone"
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(519) 555-0100"
            className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F5A623]/60 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1" htmlFor="form-email">Email *</label>
        <input
          id="form-email"
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F5A623]/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1" htmlFor="form-address">Property Address</label>
        <input
          id="form-address"
          name="address"
          autoComplete="street-address"
          placeholder="123 Main St, London, ON"
          className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F5A623]/60 transition-colors"
        />
      </div>

      {!city && (
        <div>
          <label className="block text-sm text-slate-400 mb-1" htmlFor="form-city">City</label>
          <input
            id="form-city"
            name="city"
            placeholder="London"
            className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F5A623]/60 transition-colors"
          />
        </div>
      )}

      <div>
        <label className="block text-sm text-slate-400 mb-1" htmlFor="form-msg">Anything else?</label>
        <textarea
          id="form-msg"
          name="message"
          rows={3}
          placeholder="Two-storey home, white soffit..."
          className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F5A623]/60 transition-colors resize-none"
        />
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={setToken}
        onError={() => {}}
        onExpire={() => setToken('')}
        options={{ theme: 'dark', retry: 'never' }}
      />

      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please call us directly at {' '}
          <a href="tel:5199143404" className="underline">(519) 914-3404</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !token}
        className="w-full min-h-[52px] rounded-full font-bold text-lg bg-[#F5A623] text-black hover:bg-[#FFD47A] disabled:opacity-50 disabled:cursor-not-allowed transition-all glow-pulse"
      >
        {status === 'loading' ? 'Sending…' : 'Get My Free Quote →'}
      </button>

      <p className="text-xs text-slate-500 text-center">No obligation · We reply within 24 hours · 100% free</p>
    </form>
  );
}
