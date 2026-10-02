import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { BRAND, SITE_URL, STORE_SLUG } from "@/lib/utils";
import { createOrderAndSession, parseCustomer, type CheckoutLine } from "@/lib/orders/checkout-server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Card checkout isn't switched on yet. Please call us to order." }, { status: 503 });
  }
  const parsed = parseCustomer(await req.json().catch(() => ({})));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const cart = await getCart();
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });

  // Re-price every line from the live variant, never the price saved in the cart.
  const service = getServiceSupabase();
  const { data: variants } = await service
    .from("ecom_variants")
    .select("id, price_cad, is_active")
    .in("id", cart.items.map((l) => l.variant_id));
  const byId = new Map((variants ?? []).map((v) => [v.id as string, v]));
  const lines: CheckoutLine[] = [];
  for (const l of cart.items) {
    const v = byId.get(l.variant_id);
    if (!v?.is_active) {
      return NextResponse.json({ error: `${l.product_name} (${l.variant_name}) is no longer available. Please remove it from your cart.` }, { status: 409 });
    }
    lines.push({
      variantId: l.variant_id,
      productName: l.product_name,
      variantName: l.variant_name,
      sku: l.sku,
      quantity: l.quantity,
      unitPriceCad: Number(v.price_cad)
    });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const result = await createOrderAndSession({
    service,
    stripe,
    store: { id: store.id, slug: STORE_SLUG, name: BRAND.name, prefix: "PLD", siteUrl: SITE_URL },
    lines,
    customer: parsed.customer,
    cancelPath: "/checkout",
    metadata: { cart_id: cart.id }
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ url: result.url, order_number: result.orderNumber });
}
