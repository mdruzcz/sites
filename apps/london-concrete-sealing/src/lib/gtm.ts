export function gtmEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({ event, ...data });
  }
}
