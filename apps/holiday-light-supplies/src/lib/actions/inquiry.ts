"use server";

import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/utils";
import { checkCaptcha, EMAIL_RE, HELP, type LeadResult } from "@/lib/actions/lead-helpers";

export interface ShippingInquiryInput {
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  address: string;
  city: string;
  province: string;
  postal: string;
  notes: string | null;
  discount_code: string | null;
  turnstile_token: string | null;
}

/**
 * Quote-list submission. We don't take payment online: the customer sends the
 * products they want + delivery address and we reply by email with pricing,
 * shipping and timeline. The inquiry is stored in Supabase; a central trigger
 * (notify-inquiry) emails + texts Matt, so there is no inline send here.
 * Returns a result instead of throwing — prod masks thrown Server Action messages.
 */
export async function submitShippingInquiry(input: ShippingInquiryInput): Promise<LeadResult> {
  if (!input.name.trim()) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(input.email)) return { ok: false, error: "Please enter a valid email address." };
  if (!input.address.trim() || !input.city.trim() || !input.postal.trim()) return { ok: false, error: "Please enter your full delivery address so we can quote shipping." };

  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const cart = await getCart();
  if (!cart || cart.items.length === 0) return { ok: false, error: "Your quote list is empty." };

  const store = await getStore();
  if (!store) return { ok: false, error: `Something went wrong on our end. ${HELP}` };

  const cartLines = cart.items.map((l) => {
    const price = l.unit_price_cad > 0 ? ` @ ${formatCad(l.unit_price_cad)} = ${formatCad(l.unit_price_cad * l.quantity)}` : " @ QUOTE";
    return `${l.quantity} × ${l.product_name} — ${l.variant_name} (${l.sku})${price}`;
  });
  const messageBody = [
    "QUOTE REQUEST (no payment taken — reply with pricing, shipping + timeline)",
    "",
    input.organization?.trim() ? `Organization: ${input.organization.trim()}` : null,
    `Deliver to: ${input.address}, ${input.city}, ${input.province} ${input.postal}`,
    "",
    "Requested products:",
    ...cartLines,
    "",
    `Priced subtotal: ${formatCad(cart.subtotal_cad)} + shipping & tax (quote-only lines excluded)`,
    input.discount_code ? `Discount code entered: ${input.discount_code}` : null,
    input.notes?.trim() ? `\nCustomer notes:\n${input.notes.trim()}` : null
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("ecom_contact_messages").insert({
    store_id: store.id,
    name: input.organization?.trim() ? `${input.name} (${input.organization.trim()})` : input.name,
    email: input.email,
    phone: input.phone || null,
    province: input.province,
    subject: "Holiday Light Supplies — Quote request",
    message: messageBody,
    source: "shipping-inquiry"
  });
  if (error) {
    console.error("inquiry insert failed:", error.message);
    return { ok: false, error: `Something went wrong on our end and your request didn't send. ${HELP}` };
  }
  return { ok: true };
}
