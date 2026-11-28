"use client";

import { useEffect } from "react";
import { pushPurchase } from "@/lib/gtm";

/**
 * Fires the Google Ads purchase conversion once the order has loaded on the
 * success page. gtag loads afterInteractive, so retry briefly until it exists.
 */
export function PurchaseConversion({
  number,
  subtotal,
  email,
  phone
}: {
  number: string;
  subtotal: number;
  email?: string;
  phone?: string | null;
}) {
  useEffect(() => {
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (typeof (window as unknown as { gtag?: unknown }).gtag === "function") {
        pushPurchase({ number, subtotal, email, phone });
        clearInterval(timer);
      } else if (tries > 20) {
        clearInterval(timer);
      }
    }, 250);
    return () => clearInterval(timer);
  }, [number, subtotal, email, phone]);
  return null;
}
