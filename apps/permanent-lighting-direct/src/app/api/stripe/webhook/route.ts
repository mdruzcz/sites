import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "@/lib/supabase/server";
import { BRAND, SITE_URL, STORE_SLUG } from "@/lib/utils";
import { handleStripeEvent } from "@/lib/orders/checkout-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig, webhookSecret);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }

  const service = getServiceSupabase();
  const { data: store } = await service.from("ecom_stores").select("id").eq("slug", STORE_SLUG).single();
  if (!store) return NextResponse.json({ error: "store missing" }, { status: 500 });

  try {
    const outcome = await handleStripeEvent({
      service,
      stripe,
      event,
      store: { id: store.id, slug: STORE_SLUG, name: BRAND.name, prefix: "PLD", siteUrl: SITE_URL },
      brand: { name: BRAND.name, siteUrl: SITE_URL, accent: "#0f9488" },
      trackInventory: true
    });
    return NextResponse.json({ received: true, ...outcome });
  } catch (e) {
    // 500 → Stripe retries; the paid transition is idempotent.
    console.error("[stripe webhook]", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
