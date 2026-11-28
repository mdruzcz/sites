import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { checkCaptcha } from "@/lib/actions/lead-helpers";
import { priceCartLive } from "@/lib/card-checkout";
import { getServiceSupabase } from "@/lib/supabase/server";
import { freeOrderShipping, storeConfig } from "@/lib/store-brand";
import { createOrderAndSession, parseCustomer, type CheckoutLine } from "@/lib/orders/checkout-server";
import { colourList, distinctTrackColours, trackColourItems } from "@/lib/orders/track-colour";
import { FREE_SHIPPING_THRESHOLD_DEFAULT, shipsFree } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Card checkout isn't switched on yet. Please send your order as a request and we'll reply by email." },
      { status: 503 }
    );
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const cart = await getCart();
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });

  // Re-price every line from the live variant, never the price saved in the cart.
  const live = await priceCartLive(cart);
  if (live.unavailable) {
    const l = live.unavailable;
    return NextResponse.json({ error: `${l.product_name} (${l.variant_name}) is no longer available. Please remove it from your cart.` }, { status: 409 });
  }

  // Card checkout is only for orders that ship free. Shipping on a smaller order
  // is quoted by hand, so it has to go through the quote request instead.
  if (!shipsFree(live.cart.subtotal_cad)) {
    return NextResponse.json(
      {
        error: `Card checkout is for orders of $${FREE_SHIPPING_THRESHOLD_DEFAULT} or more, which ship free. Your cart is under $${FREE_SHIPPING_THRESHOLD_DEFAULT}, so please request a shipping quote and we'll email your shipping cost.`
      },
      { status: 400 }
    );
  }

  const parsed = parseCustomer(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const lines: CheckoutLine[] = live.cart.items.map((l) => ({
    variantId: l.variant_id,
    productName: l.product_name,
    variantName: l.variant_name,
    sku: l.sku,
    quantity: l.quantity,
    unitPriceCad: l.unit_price_cad
  }));

  // createOrderAndSession refuses this too; it is repeated here so the spam
  // check below is only spent on a request that is otherwise ready to pay.
  const trackColourConfirmed = body.trackColourConfirmed === true;
  const colourItems = trackColourItems(lines);
  if (colourItems.length && !trackColourConfirmed) {
    return NextResponse.json(
      { error: `Please confirm your track colour (${colourList(distinctTrackColours(colourItems))}) before paying.` },
      { status: 400 }
    );
  }

  // Same spam check as the request form. Checked last of the refusals because a
  // token only verifies once; nothing has been written yet at this point.
  const captchaError = await checkCaptcha(typeof body.turnstileToken === "string" ? body.turnstileToken : null, "try");
  if (captchaError) return NextResponse.json({ error: captchaError }, { status: 400 });

  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const result = await createOrderAndSession({
    service: getServiceSupabase(),
    stripe,
    store: storeConfig(store.id),
    lines,
    customer: parsed.customer,
    cancelPath: "/checkout",
    metadata: { cart_id: cart.id },
    trackColourConfirmed,
    // This store's rule: the order is over the threshold, so it ships free anywhere in Canada.
    shipping: freeOrderShipping(parsed.customer.postal)
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ url: result.url, order_number: result.orderNumber });
}
