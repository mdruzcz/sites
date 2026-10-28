// Google Ads (Master Decker Inc. 981-100-8026) conversion tracking for
// weinstallchristmaslights.ca, set up 2026-10-27. Values are estimated gross
// profit per lead, so value-based bidding can later chase profit, not volume.
export const GOOGLE_ADS_ID = "AW-925089341";

const CONVERSIONS = {
  quote: { label: "z2g9CMuKl6wdEL38jrkD", value: 200 },
  phone: { label: "2eZSCM6Kl6wdEL38jrkD", value: 50 },
} as const;

type Gtag = (...args: unknown[]) => void;

function toE164(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
}

export function trackConversion(kind: keyof typeof CONVERSIONS, user?: { email?: string; phone?: string }) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  // Enhanced conversions for leads: gtag hashes these before sending.
  const phone = user?.phone ? toE164(user.phone) : undefined;
  if (user?.email || phone) {
    gtag("set", "user_data", {
      ...(user?.email ? { email: user.email.trim().toLowerCase() } : {}),
      ...(phone ? { phone_number: phone } : {}),
    });
  }
  const conv = CONVERSIONS[kind];
  gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${conv.label}`, value: conv.value, currency: "CAD" });
}

// ── Ad click attribution ────────────────────────────────────────────────
// gclid / utm params from the landing URL are kept for 90 days and sent
// with the lead, so booked and sold jobs can be uploaded back to Google Ads.
const ATTR_KEY = "wicl_attribution";
const ATTR_PARAMS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of ATTR_PARAMS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    if (!Object.keys(found).length) return;
    found.landing_page = window.location.pathname;
    localStorage.setItem(ATTR_KEY, JSON.stringify({ ...found, ts: Date.now() }));
  } catch {
    /* storage blocked */
  }
}

export function getAttribution(): Record<string, string> | undefined {
  try {
    const raw = localStorage.getItem(ATTR_KEY);
    if (!raw) return undefined;
    const { ts, ...rest } = JSON.parse(raw) as Record<string, string> & { ts: number };
    if (Date.now() - ts > NINETY_DAYS) return undefined;
    return rest;
  } catch {
    return undefined;
  }
}
