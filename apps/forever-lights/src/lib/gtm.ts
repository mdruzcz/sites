export function pushConversion(event: string, value?: string) {
  if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({ event, value });
  }
}
