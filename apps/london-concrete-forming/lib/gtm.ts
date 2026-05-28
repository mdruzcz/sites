declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackFormSubmission(formName: string, service?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submission",
    form_name: formName,
    service_selected: service || "not_specified",
  });
}
