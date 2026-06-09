import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { SITE_URL, MIN_ORDER_GALLONS, cartGallons } from "@/lib/utils";
import { estimateShipping } from "@/lib/shipping/estimate";

// Get-or-create a single reusable 13% Ontario HST tax rate (avoids duplicates per checkout).
async function getOrCreateHstRate(stripe: Stripe): Promise<string> {
  if (process.env.STRIPE_TAX_RATE_ID) return process.env.STRIPE_TAX_RATE_ID;
  const existing = await stripe.taxRates.list({ active: true, limit: 100 });
  const found = existing.data.find((r) => r.metadata?.key === "rsd_hst_13");
  if (found) return found.id;
  const created = await stripe.taxRates.create({
    display_name: "HST",
    description: "Ontario HST (13%)",
    percentage: 13,
    inclusive: false,
    country: "CA",
    state: "ON",
    metadata: { key: "rsd_hst_13" }
  });
  return created.id;
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe is not configured in this environment." }, { status: 500 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    phone?: string;
    province?: string;
    postal?: string;
    discountCode?: string;
  };

  // A real email lets us recover the order if the customer abandons checkout.
  const validEmail = body.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email) ? body.email : null;

  // Ontario-only online ordering (server-side enforcement).
  if (body.province && body.province !== "ON") {
    return NextResponse.json(
      { error: "Online checkout is available within Ontario only. Please request a shipping quote for your province." },
      { status: 400 }
    );
  }

  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Minimum order: we don't ship single gallons. Enforced server-side so the
  // rule can't be bypassed by skipping the cart-page UI.
  if (cartGallons(cart.items) < MIN_ORDER_GALLONS) {
    return NextResponse.json(
      { error: `Our minimum order is ${MIN_ORDER_GALLONS} gallons of stain — please add more before checking out.` },
      { status: 400 }
    );
  }
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });

  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });

  // Distance + weight shipping estimate from Belmont, ON (free over the store threshold).
  const ship = estimateShipping({
    items: cart.items.map((l) => ({ name: l.variant_name, quantity: l.quantity })),
    postal: body.postal ?? "",
    subtotalCad: cart.subtotal_cad,
    freeThresholdCad: Number(store.free_shipping_threshold_cad)
  });
  // Fallback if postal didn't resolve to a zone (shouldn't happen for valid ON codes).
  const shippingCad = ship.free ? 0 : ship.deliverable ? ship.amountCad : 25;

  // First-order discount (e.g. SAVE15). Only applied when the email has no prior order.
  const service0 = getServiceSupabase();
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (body.discountCode) {
    const { data: disc } = await service0
      .from("ecom_discounts")
      .select("id, code, type, value, min_subtotal_cad, is_active")
      .eq("store_id", store.id)
      .ilike("code", body.discountCode)
      .eq("is_active", true)
      .maybeSingle();
    const meetsMin = disc && cart.subtotal_cad >= Number(disc.min_subtotal_cad ?? 0);
    let firstOrder = true;
    if (disc && body.email) {
      const { count } = await service0
        .from("ecom_orders")
        .select("id", { count: "exact", head: true })
        .eq("store_id", store.id)
        .eq("email", body.email)
        .neq("status", "pending_payment");
      firstOrder = (count ?? 0) === 0;
    }
    if (disc && meetsMin && firstOrder) {
      const coupon = await stripe.coupons.create(
        disc.type === "percent"
          ? { percent_off: Number(disc.value), name: `${disc.code} (first order)`, duration: "once" }
          : { amount_off: Math.round(Number(disc.value) * 100), currency: "cad", name: `${disc.code} (first order)`, duration: "once" }
      );
      discounts = [{ coupon: coupon.id }];
    }
  }

  // Flat 13% Ontario HST. Reuse a single tax rate so we don't create duplicates.
  const hstRateId = await getOrCreateHstRate(stripe);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((l) => ({
    quantity: l.quantity,
    tax_rates: [hstRateId],
    price_data: {
      currency: "cad",
      unit_amount: Math.round(l.unit_price_cad * 100),
      product_data: { name: `${l.product_name} — ${l.variant_name}`, metadata: { sku: l.sku } }
    }
  }));

  // Paid shipping is HST-taxable in Ontario, so add it as a taxed line item.
  if (shippingCad > 0) {
    lineItems.push({
      quantity: 1,
      tax_rates: [hstRateId],
      price_data: {
        currency: "cad",
        unit_amount: Math.round(shippingCad * 100),
        product_data: { name: `Shipping — ${ship.zoneLabel || "Ontario"}` }
      }
    });
  }

  // Record a pending order so we can match it on the webhook.
  const service = getServiceSupabase();
  const { data: order } = await service
    .from("ecom_orders")
    .insert({
      store_id: store.id,
      email: validEmail ?? "pending@checkout",  // captured for abandoned-cart recovery; webhook overwrites with Stripe's email on success
      phone: body.phone || null,
      status: "pending_payment",
      payment_method: "card",
      subtotal_cad: cart.subtotal_cad,
      total_cad: cart.subtotal_cad,
      currency: "CAD"
    })
    .select("id, order_number")
    .single();

  if (order) {
    await service.from("ecom_order_items").insert(
      cart.items.map((l) => ({
        order_id: order.id,
        variant_id: l.variant_id,
        product_name_snapshot: l.product_name,
        variant_name_snapshot: l.variant_name,
        sku_snapshot: l.sku,
        quantity: l.quantity,
        unit_price_cad: l.unit_price_cad,
        line_subtotal_cad: l.unit_price_cad * l.quantity
      }))
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    discounts,
    phone_number_collection: { enabled: true },
    shipping_address_collection: { allowed_countries: ["CA"] },
    // Free shipping shows as a $0 option; paid shipping is a taxed line item (above).
    shipping_options:
      shippingCad === 0
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                display_name: "Free shipping (orders over $750)",
                fixed_amount: { amount: 0, currency: "cad" }
              }
            }
          ]
        : undefined,
    success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/cart`,
    metadata: { cart_id: cart.id, order_id: order?.id ?? "", order_number: order?.order_number ?? "" }
  });

  if (order && session.id) {
    await service.from("ecom_orders").update({ stripe_checkout_session_id: session.id }).eq("id", order.id);
  }

  return NextResponse.json({ url: session.url });
}
