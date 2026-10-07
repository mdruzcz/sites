// Lightweight conversion tracking. Safely no-ops if GTM / dataLayer isn't present.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackQuoteSubmit(services?: string) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({
    event: "generate_lead",
    form: "quote_request",
    services: services || "",
  });
}
