"use server";

import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/utils";
import { checkCaptcha, sendLeadEmail, HELP, type LeadResult } from "@/lib/actions/lead-helpers";

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

export type ShippingInquiryResult = LeadResult;

/**
 * We don't take payment online. Instead the customer sends their order +
 * delivery address and we reply by email with shipping cost and timeline.
 *
 * This is an order, so it is emailed directly to service@masterdecker.com as
 * well as stored in ecom_contact_messages — a missed order costs far more than
 * a duplicate notification if the central `notify-inquiry` trigger also fires.
 * Only both halves failing is an error for the customer.
 */
export async function submitShippingInquiry(input: ShippingInquiryInput): Promise<ShippingInquiryResult> {
  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const name = input.name.trim();
  const email = input.email.trim();
  if (!name) return { ok: false, error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!input.address.trim() || !input.city.trim() || !input.postal.trim()) {
    return { ok: false, error: "Please enter your full delivery address so we can quote shipping." };
  }

  // The cart is read server-side so the inquiry always reflects what's really in it.
  const cart = await getCart();
  if (!cart || cart.items.length === 0) return { ok: false, error: "Your cart is empty." };

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

  const emailed = await sendLeadEmail({
    subject: "Shipping quote request",
    replyTo: email,
    lines: [`Name: ${name}`, `Email: ${email}`, `Phone: ${input.phone || "-"}`, "", messageBody]
  });

  let stored = false;
  try {
    const store = await getStore();
    if (!store) {
      console.error("ecom_contact_messages insert skipped: store not found");
    } else {
      const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({
        store_id: store.id,
        name,
        email,
        phone: input.phone || null,
        province: input.province,
        subject: "Shipping quote request",
        message: messageBody,
        source: "shipping-inquiry"
      });
      if (error) console.error("ecom_contact_messages insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("ecom_contact_messages insert threw:", err);
  }

  if (!emailed && !stored) {
    return { ok: false, error: `Something went wrong on our end and your request didn't send. ${HELP}` };
  }
  return { ok: true };
}
