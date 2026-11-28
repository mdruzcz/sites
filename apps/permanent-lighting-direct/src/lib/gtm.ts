// Google Ads (Master Decker Inc. 981-100-8026). PLD reports kit purchases to the
// same "purchase" conversion action Forever Lights uses (apps/forever-lights/src/lib/gtm.ts),
// so Shopping and Search campaigns that send clicks here can bid on real sales.
// Conversion value is estimated gross profit (subtotal x margin): tax and shipping
// pass-through never count, and a 250 ft kit is worth more to bidding than a connector.
export const GOOGLE_ADS_ID = "AW-925089341";
const PURCHASE_LABEL = "3fyJCJiamagdEL38jrkD";
const MARGIN = 0.35;

type Gtag = (...args: unknown[]) => void;

function toE164(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
}

export function pushPurchase(order: { number: string; subtotal: number; email?: string; phone?: string | null }) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag };
  if (typeof w.gtag !== "function") return;
  try {
    const key = `pld_purchase_${order.number}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {
    /* storage blocked: Google dedupes on transaction_id anyway */
  }
  if (order.email || order.phone) {
    // Enhanced conversions: gtag hashes these before they leave the browser.
    w.gtag("set", "user_data", {
      ...(order.email ? { email: order.email.trim().toLowerCase() } : {}),
      ...(order.phone && toE164(order.phone) ? { phone_number: toE164(order.phone) } : {})
    });
  }
  w.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${PURCHASE_LABEL}`,
    value: Math.round(order.subtotal * MARGIN * 100) / 100,
    currency: "CAD",
    transaction_id: order.number
  });
}
