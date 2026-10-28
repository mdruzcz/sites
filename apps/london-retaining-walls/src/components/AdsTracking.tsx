"use client";
import { useEffect } from "react";
import { captureAttribution, trackConversion } from "@/lib/ads";

// Stores ad click IDs from the landing URL and counts taps on any tel: link
// (header, footer, sticky call bar) as a phone-click conversion.
export default function AdsTracking() {
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
