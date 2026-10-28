// Lightweight conversion tracking. Safely no-ops if GTM / dataLayer / gtag isn't present.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Ads (Master Decker Inc. 981-100-8026) conversions for
// masterdecker.com, using the shared "all sites" conversion actions.
// Values are estimated gross profit per lead so value-based bidding can
// chase profit, not volume.
export const GOOGLE_ADS_ID = "AW-925089341";

const CONVERSIONS = {
  quote: { label: "GDG-CJzG56wdEL38jrkD", value: 150 },
  phone: { label: "TbqJCJ_G56wdEL38jrkD", value: 40 },
} as const;

function toE164(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
}

export function trackConversion(kind: keyof typeof CONVERSIONS, user?: { email?: unknown; phone?: unknown }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // Enhanced conversions for leads: gtag hashes these before sending.
  const email = typeof user?.email === "string" ? user.email.trim().toLowerCase() : "";
  const phone = typeof user?.phone === "string" ? toE164(user.phone) : undefined;
  if (email || phone) {
    window.gtag("set", "user_data", { ...(email ? { email } : {}), ...(phone ? { phone_number: phone } : {}) });
  }
  const conv = CONVERSIONS[kind];
  window.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${conv.label}`, value: conv.value, currency: "CAD" });
}

/** Call only after the API confirms the lead was received. */
export function trackQuoteSubmit(services?: string, user?: { email?: unknown; phone?: unknown }) {
  trackConversion("quote", user);
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({
    event: "generate_lead",
    form: "quote_request",
    services: services || "",
  });
}

// ── Ad click attribution ────────────────────────────────────────────────
// gclid / utm params from the landing URL are kept for 90 days and sent
// with the lead, so booked and sold jobs can be uploaded back to Google Ads.
const ATTR_KEY = "md_attribution";
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
