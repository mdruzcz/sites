import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "@/lib/supabase/server";

function splitName(full: string | null | undefined): { first: string | null; last: string | null } {
  if (!full) return { first: null, last: null };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: null };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

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
    const orderId = (event.data.object as Stripe.Checkout.Session).metadata?.order_id;
    const sessionId = (event.data.object as Stripe.Checkout.Session).id;
    if (orderId) {
      // Re-fetch the full session: the webhook event payload does not reliably
      // include collected_information / customer_details, which is why earlier
      // orders saved neither phone nor shipping address.
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Shipping moved to collected_information.shipping_details on the 2024-12-18
      // API version; fall back to the deprecated top-level field for safety.
      const shipping =
        session.collected_information?.shipping_details ?? session.shipping_details ?? null;
      const shipAddr = shipping?.address ?? null;

      const email = session.customer_details?.email ?? null;
      const phone = session.customer_details?.phone ?? shipping?.phone ?? null;
      const fullName = shipping?.name ?? session.customer_details?.name ?? null;
      const { first, last } = splitName(fullName);
      const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;

      // 1) Create or update the global customer record, keyed by email.
      //    Only non-null fields are written so a repeat purchase never blanks
      //    out an existing customer's details.
      let customerId: string | null = null;
      if (email) {
        const { data: tier } = await service
          .from("ecom_pricing_tiers")
          .select("id")
          .eq("slug", "public")
          .maybeSingle();

        const custPayload: Record<string, unknown> = { email };
        if (tier?.id) custPayload.tier_id = tier.id;
        if (first) custPayload.first_name = first;
        if (last) custPayload.last_name = last;
        if (phone) custPayload.phone = phone;
        if (stripeCustomerId) custPayload.stripe_customer_id = stripeCustomerId;

        const { data: cust, error: custErr } = await service
          .from("ecom_customers")
          .upsert(custPayload, { onConflict: "email" })
          .select("id")
          .single();
        if (custErr) console.error("[webhook] customer upsert failed", custErr);
        customerId = cust?.id ?? null;
      }

      // 2) Update the order with payment + contact details, linking the customer.
      const { error: orderErr } = await service
        .from("ecom_orders")
        .update({
          status: "paid",
          customer_id: customerId,
          email: email ?? "unknown@checkout",
          phone,
          paid_at: new Date().toISOString(),
          placed_at: new Date().toISOString(),
          stripe_payment_intent_id:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
          shipping_cad: (session.total_details?.amount_shipping ?? 0) / 100,
          tax_cad: (session.total_details?.amount_tax ?? 0) / 100,
          total_cad: (session.amount_total ?? 0) / 100
        })
        .eq("id", orderId);
      if (orderErr) console.error("[webhook] order update failed", orderErr);

      // 3) Persist the shipping address. Delete-then-insert keeps this idempotent
      //    if Stripe re-delivers the event.
      if (shipAddr) {
        await service.from("ecom_order_addresses").delete().eq("order_id", orderId).eq("type", "shipping");
        const { error: addrErr } = await service.from("ecom_order_addresses").insert({
          order_id: orderId,
          type: "shipping",
          recipient: fullName ?? "Customer",
          line1: shipAddr.line1 ?? "",
          line2: shipAddr.line2 ?? null,
          city: shipAddr.city ?? "",
          province: shipAddr.state ?? "",
          postal_code: shipAddr.postal_code ?? "",
          country: shipAddr.country ?? "CA",
          phone
        });
        if (addrErr) console.error("[webhook] address insert failed", addrErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
