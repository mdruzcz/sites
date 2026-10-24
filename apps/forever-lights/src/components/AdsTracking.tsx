'use client';
import { useEffect } from 'react';
import { captureAttribution, pushConversion } from '@/lib/gtm';

// Stores ad click IDs from the landing URL and counts taps on any tel: link
// (navbar, hero, floating call button) as a phone-click conversion.
export function AdsTracking() {
  useEffect(() => {
    captureAttribution();
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) pushConversion('phone_click');
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
