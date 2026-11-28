'use client';
import { useRef, useState } from 'react';
import { TrackColourConfirm, needsTrackColourCheck } from '@/components/TrackColourConfirm';
import type { ColourSourceLine } from '@/lib/orders/track-colour';
import { Icon } from './icons';

/** Pay button (and the "stop reminders" button) on the saved-order page. */
export function ResumeCheckout({
  orderId, token, totalLabel, lines, stopMode, phone,
}: {
  orderId: string;
  token: string;
  totalLabel: string;
  lines: ColourSourceLine[];
  stopMode: boolean;
  phone: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stopped, setStopped] = useState(false);
  const [colourOk, setColourOk] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const needsColour = needsTrackColourCheck(lines);

  async function post(action: 'pay' | 'stop') {
    setError(null);
    if (action === 'pay' && needsColour && !colourOk) {
      setError('Please confirm your track colour before paying.');
      document.getElementById('track-colour')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/checkout/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ o: orderId, k: token, action, trackColourConfirmed: colourOk }),
      });
      const json = (await res.json().catch(() => ({}))) as { url?: string; stopped?: boolean; error?: string };
      if (json.url) { window.location.href = json.url; return; }
      if (json.stopped) { setStopped(true); setPending(false); return; }
      setError(json.error ?? 'Something went wrong. Please try again or call us.');
    } catch {
      setError('Network problem. Please check your connection and try again.');
    }
    setPending(false);
    setTimeout(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  }

  return (
    <div className="mt-4 space-y-4">
      {stopMode && (
        <div className="card p-5 text-sm" aria-live="polite">
          {stopped ? (
            <p className="font-medium text-ink">Done. We won&rsquo;t email you checkout reminders again.</p>
          ) : (
            <>
              <p className="text-ink-soft">We only send one reminder per order. To make sure you never get another:</p>
              <button type="button" onClick={() => post('stop')} disabled={pending} className="btn btn-dark btn-sm mt-3 disabled:opacity-60">
                {pending ? 'Processing…' : "Don't send me checkout reminders"}
              </button>
            </>
          )}
        </div>
      )}

      <TrackColourConfirm lines={lines} checked={colourOk} onChange={setColourOk} phone={phone} />

      <button type="button" onClick={() => post('pay')} disabled={pending} className="btn btn-primary btn-lg w-full disabled:opacity-60">
        <Icon.lock size={18} /> {pending ? 'Processing…' : `Continue to secure payment · ${totalLabel}`}
      </button>

      {error && <p ref={errorRef} role="alert" className="rounded-xl bg-[#fdecea] px-4 py-3 text-sm text-[#9b1c10]">{error}</p>}
    </div>
  );
}
