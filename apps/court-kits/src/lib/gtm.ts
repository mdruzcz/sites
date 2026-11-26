/** Fires on a successful quote request so GTM can count it as a conversion. */
export function trackFormSubmission(formName: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "form_submission", form_name: formName, ...extra });
}
