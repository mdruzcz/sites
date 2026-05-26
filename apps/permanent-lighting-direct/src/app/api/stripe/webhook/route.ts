import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }

  const service = getServiceSupabase();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    if (orderId) {
      await service
        .from("ecom_orders")
        .update({
          status: "paid",
          email: session.customer_details?.email ?? "unknown@checkout",
          phone: session.customer_details?.phone ?? null,
          paid_at: new Date().toISOString(),
          placed_at: new Date().toISOString(),
          stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
          shipping_cad: (session.total_details?.amount_shipping ?? 0) / 100,
          tax_cad: (session.total_details?.amount_tax ?? 0) / 100,
          total_cad: (session.amount_total ?? 0) / 100
        })
        .eq("id", orderId);

      const ship = session.shipping_details?.address;
      if (ship) {
        await service.from("ecom_order_addresses").insert({
          order_id: orderId,
          type: "shipping",
          recipient: session.shipping_details?.name ?? "Customer",
          line1: ship.line1 ?? "",
          line2: ship.line2 ?? null,
          city: ship.city ?? "",
          province: ship.state ?? "",
          postal_code: ship.postal_code ?? "",
          country: ship.country ?? "CA"
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
