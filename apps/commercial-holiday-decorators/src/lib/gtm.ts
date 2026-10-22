declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackFormSubmission(formName: string) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: "form_submission", form_name: formName });
  }
}
