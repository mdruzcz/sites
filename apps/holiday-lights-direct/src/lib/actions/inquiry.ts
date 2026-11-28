"use server";

import { revalidatePath } from "next/cache";
import { clearCart, getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad, shipsFree } from "@/lib/utils";
import { checkCaptcha, sendLeadEmail, HELP, type LeadResult } from "@/lib/actions/lead-helpers";
import { colourList, distinctTrackColours, trackColourItems, trackColourSummary } from "@/lib/orders/track-colour";

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
  /** The customer ticked "this is the right track colour". Required whenever the
   *  cart has a kit, track or colour-matched screws. */
  track_colour_confirmed?: boolean;
}

export type ShippingInquiryResult = LeadResult;

/**
 * The request flow: no payment is taken. The customer sends their order +
 * delivery address and we reply by email with shipping cost and timeline.
 * Every cart under the free-shipping threshold comes through here; larger
 * carts normally pay by card (src/app/api/stripe/checkout) but can still choose
 * this to pay by e-transfer or invoice, or to use a discount code.
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

  // Customers have ordered the wrong track colour, so a cart with a
  // colour-matched part is not accepted until they have confirmed it.
  const colourItems = trackColourItems(
    cart.items.map((l) => ({ productName: l.product_name, variantName: l.variant_name, quantity: l.quantity }))
  );
  if (colourItems.length && !input.track_colour_confirmed) {
    return {
      ok: false,
      error: `Please confirm your track colour (${colourList(distinctTrackColours(colourItems))}) before sending your request.`
    };
  }

  const cartLines = cart.items.map(
    (l) => `${l.quantity} × ${l.product_name} — ${l.variant_name} (${l.sku}) @ ${formatCad(l.unit_price_cad)} = ${formatCad(l.unit_price_cad * l.quantity)}`
  );
  const free = shipsFree(cart.subtotal_cad);
  const messageBody = [
    free
      ? "ORDER REQUEST, FREE SHIPPING (over $500). No payment taken: reply to confirm the order + timeline"
      : "SHIPPING QUOTE REQUEST (no payment taken — reply with shipping cost + timeline)",
    "",
    `Deliver to: ${input.address}, ${input.city}, ${input.province} ${input.postal}`,
    "",
    "Requested order:",
    ...cartLines,
    "",
    `Product subtotal: ${formatCad(cart.subtotal_cad)} + ${free ? "tax (shipping is FREE, order is over $500)" : "shipping & tax"}`,
    colourItems.length ? `Track colour confirmed by customer: ${trackColourSummary(colourItems)}` : null,
    input.discount_code ? `Discount code entered: ${input.discount_code}` : null,
    input.notes?.trim() ? `\nCustomer notes:\n${input.notes.trim()}` : null
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const emailed = await sendLeadEmail({
    subject: free ? "Order request (free shipping)" : "Shipping quote request",
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

  // The request is with us, so empty the cart. A failure here must not turn a
  // delivered request into an error for the customer.
  try {
    await clearCart(cart.id);
    revalidatePath("/cart");
    revalidatePath("/", "layout");
  } catch (err) {
    console.error("cart clear after inquiry failed:", err);
  }
  return { ok: true };
}
