"use server";

import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/utils";

export interface ShippingInquiryInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal: string;
  notes: string | null;
  discount_code: string | null;
  turnstile_token: string | null;
}

/**
 * We don't take payment online. Instead the customer sends the products they
 * want + their delivery address and we reply by email with shipping cost and
 * timeline. The inquiry is stored in Supabase, emailed to
 * service@masterdecker.com; a central trigger (notify-inquiry) emails + texts Matt.
 */
export async function submitShippingInquiry(input: ShippingInquiryInput) {
  // Spam protection — enforced once a real Turnstile site key is configured.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaConfigured = !!siteKey && !siteKey.startsWith("1x000");
  if (captchaConfigured) {
    if (!input.turnstile_token) throw new Error("Please complete the captcha.");
    const verifyRes = await fetch(
      process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: input.turnstile_token, hostname: "holidaylightsupplies.ca" })
      }
    );
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) throw new Error("Captcha verification failed.");
  }

  if (!input.name.trim()) throw new Error("Please enter your name.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) throw new Error("Please enter a valid email.");
  if (!input.address.trim() || !input.city.trim() || !input.postal.trim())
    throw new Error("Please enter your full delivery address so we can quote shipping.");

  // The cart is read server-side so the inquiry always reflects what's really in it.
  const cart = await getCart();
  if (!cart || cart.items.length === 0) throw new Error("Your cart is empty.");

  const store = await getStore();
  if (!store) throw new Error("Store not found");

  const cartLines = cart.items.map(
    (l) => `${l.quantity} × ${l.product_name} — ${l.variant_name} (${l.sku}) @ ${formatCad(l.unit_price_cad)} = ${formatCad(l.unit_price_cad * l.quantity)}`
  );
  const messageBody = [
    "SHIPPING QUOTE REQUEST (no payment taken — reply with shipping cost + timeline)",
    "",
    `Deliver to: ${input.address}, ${input.city}, ${input.province} ${input.postal}`,
    "",
    "Requested order:",
    ...cartLines,
    "",
    `Product subtotal: ${formatCad(cart.subtotal_cad)} + shipping & tax`,
    input.discount_code ? `Discount code entered: ${input.discount_code}` : null,
    input.notes?.trim() ? `\nCustomer notes:\n${input.notes.trim()}` : null
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("ecom_contact_messages").insert({
    store_id: store.id,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    province: input.province,
    subject: "Holiday Light Supplies — Inquiry",
    message: messageBody,
    source: "shipping-inquiry"
  });
  if (error) throw new Error(error.message);

  // Email + SMS notifications are sent CENTRALLY by the Supabase `notify-inquiry` trigger
  // + edge function when this row is inserted into ecom_contact_messages (see the
  // project_order_notifications setup). No inline send here — that would double-notify.
}
