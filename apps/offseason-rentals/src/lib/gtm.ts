declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push a conversion event to GTM. No-ops when GTM is not installed. */
export function trackConversion(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}

export const GTM_EVENTS = {
  inquiry: "rental_inquiry_submitted",
  listing: "owner_listing_submitted",
  contact: "contact_submitted"
} as const;
