// Google Ads account (Master Decker Inc. 981-100-8026) and the conversion
// actions created for Forever Lights on 2026-10-24. Values are estimated
// gross profit per lead, not job revenue, so value-based bidding chases profit.
export const GOOGLE_ADS_ID = 'AW-925089341';

const CONVERSIONS: Record<string, { label: string; value: number }> = {
  quote_form_submit: { label: 'MrxWCNTDmKgdEL38jrkD', value: 350 },
  kit_request_submit: { label: 'KPd7CNfDmKgdEL38jrkD', value: 200 },
  phone_click: { label: 'EKMcCNrDmKgdEL38jrkD', value: 75 },
};

// Online kit orders report estimated gross profit (subtotal x margin), so a
// big order is worth more to bidding than a small one, but tax and shipping
// pass-through never count as value.
const PURCHASE_LABEL = '3fyJCJiamagdEL38jrkD';
const KIT_MARGIN = 0.35;

type UserData = { email?: string; phone?: string };

type Gtag = (...args: unknown[]) => void;

function toE164(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return undefined;
}

export function pushConversion(event: string, value?: string, user?: UserData) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: Gtag };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, value });

  const conv = CONVERSIONS[event];
  if (!conv || typeof w.gtag !== 'function') return;
  // Enhanced conversions for leads: gtag hashes these before sending.
  if (user?.email || user?.phone) {
    w.gtag('set', 'user_data', {
      ...(user.email ? { email: user.email.trim().toLowerCase() } : {}),
      ...(user.phone && toE164(user.phone) ? { phone_number: toE164(user.phone) } : {}),
    });
  }
  w.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${conv.label}`,
    value: conv.value,
    currency: 'CAD',
  });
}

export function pushPurchase(order: { number: string; subtotal: number; email?: string; phone?: string | null }) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: Gtag };
  if (typeof w.gtag !== 'function') return;
  try {
    const key = `fl_purchase_${order.number}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
  } catch { /* storage blocked: Google dedupes on transaction_id anyway */ }
  if (order.email || order.phone) {
    w.gtag('set', 'user_data', {
      ...(order.email ? { email: order.email.trim().toLowerCase() } : {}),
      ...(order.phone && toE164(order.phone) ? { phone_number: toE164(order.phone) } : {}),
    });
  }
  w.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${PURCHASE_LABEL}`,
    value: Math.round(order.subtotal * KIT_MARGIN * 100) / 100,
    currency: 'CAD',
    transaction_id: order.number,
  });
}

// ── Ad click attribution ────────────────────────────────────────────────
// The landing URL's gclid / utm params are kept for 90 days so a lead that
// converts on a later visit can still be matched to the ad click (and later
// uploaded to Google Ads as a booked visit or closed sale).
const ATTR_KEY = 'fl_attribution';
const ATTR_PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

export type Attribution = Record<string, string>;

export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const k of ATTR_PARAMS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    if (!Object.keys(found).length) return;
    found.landing_page = window.location.pathname;
    localStorage.setItem(ATTR_KEY, JSON.stringify({ ...found, ts: Date.now() }));
  } catch { /* storage blocked */ }
}

export function getAttribution(): Attribution | undefined {
  try {
    const raw = localStorage.getItem(ATTR_KEY);
    if (!raw) return undefined;
    const { ts, ...rest } = JSON.parse(raw) as Attribution & { ts: number };
    if (Date.now() - ts > NINETY_DAYS) return undefined;
    return rest;
  } catch {
    return undefined;
  }
}
