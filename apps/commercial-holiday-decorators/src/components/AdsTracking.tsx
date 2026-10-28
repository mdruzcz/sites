"use client";

import { useEffect } from "react";
import { captureAttribution, trackConversion } from "@/lib/gtm";

/** Stores ad click IDs from the landing URL and counts taps on any tel: link as a phone-click conversion. */
export function AdsTracking() {
  useEffect(() => {
    captureAttribution();
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) trackConversion("phone");
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
