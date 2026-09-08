'use client';
import { useEffect, useState, type RefObject } from 'react';
import { site, phoneHref } from '@/lib/site-config';

/**
 * Mounts the Turnstile widget as soon as the form scrolls into view rather than
 * waiting for the first keystroke. The Cloudflare script still stays off the
 * critical path for visitors who never reach the form, but by the time someone
 * finishes typing the challenge has usually already solved itself.
 */
export function useEngageOnVisible(ref: RefObject<HTMLElement | null>, engaged: boolean, engage: () => void) {
  useEffect(() => {
    if (engaged) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) { engage(); io.disconnect(); } },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, engaged, engage]);
}

/**
 * Watches the widget after it mounts. If no token arrives within `timeoutMs`,
 * or the widget reports an error, the form stops waiting so the submit button
 * can never sit permanently disabled on "Checking you're human".
 *
 * Verification stays fail-closed on the server. When the widget is unavailable
 * we surface a call fallback instead of silently swallowing the lead.
 */
export function useCaptchaWatchdog(engaged: boolean, token: string, timeoutMs = 15000) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (token) { setFailed(false); return; }
    if (!engaged) return;
    const id = setTimeout(() => setFailed(true), timeoutMs);
    return () => clearTimeout(id);
  }, [engaged, token, timeoutMs]);

  return { failed, markFailed: () => setFailed(true) };
}

export function CaptchaFallback({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`rounded-xl px-4 py-3 text-sm ${dark ? 'bg-white/10 text-white/90' : 'bg-tint border border-accent/40 text-ink'}`} role="alert">
      <p className="font-semibold">The spam check could not load.</p>
      <p className="mt-1">
        A browser extension or blocked script usually causes this. Reload the page to try again, or call us and we will take your details over the phone.
      </p>
      <a href={phoneHref} className="btn btn-primary btn-sm mt-3">Call {site.phone}</a>
    </div>
  );
}
