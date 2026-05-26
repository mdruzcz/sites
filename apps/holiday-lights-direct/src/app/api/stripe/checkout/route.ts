import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/utils";

export async function POST() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe is not configured in this environment." }, { status: 500 });
  }
  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });

  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const freeShipping = cart.subtotal_cad >= Number(store.free_shipping_threshold_cad);

  const lineItems = cart.items.map((l) => ({
    quantity: l.quantity,
    price_data: {
      currency: "cad",
      unit_amount: Math.round(l.unit_price_cad * 100),
      product_data: { name: `${l.product_name} — ${l.variant_name}`, metadata: { sku: l.sku } }
    }
  }));

  // Record a pending order so we can match it on the webhook.
  const service = getServiceSupabase();
  const { data: order } = await service
    .from("ecom_orders")
    .insert({
      store_id: store.id,
      email: "pending@checkout",  // updated by webhook
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
    automatic_tax: { enabled: true },
    shipping_address_collection: { allowed_countries: ["CA"] },
    shipping_options: freeShipping
      ? [{ shipping_rate_data: { type: "fixed_amount", display_name: "Free Canada shipping", fixed_amount: { amount: 0, currency: "cad" } } }]
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
