/* eslint-disable @typescript-eslint/no-explicit-any */
export function trackFormSubmission(formName: string) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "form_submission",
      form_name: formName,
    });
  }
}
