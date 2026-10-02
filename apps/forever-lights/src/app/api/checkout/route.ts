import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { site } from '@/lib/site-config';
import { priceCart, kitProductName, kitSku } from '@/lib/shop';
import { getServiceSupabase, getStoreId, STORE_SLUG } from '@/lib/supabase-admin';
import { createOrderAndSession, parseCustomer } from '@/lib/orders/checkout-server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: `Card checkout isn't switched on yet. Please call ${site.phone} to order.` }, { status: 503 });
  }
  const body = (await req.json().catch(() => ({}))) as { items?: unknown; customer?: unknown };
  const cart = priceCart(body.items);
  if (!cart.ok) return NextResponse.json({ error: cart.error }, { status: 400 });
  const parsed = parseCustomer(body.customer);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const storeId = await getStoreId();
  if (!storeId) return NextResponse.json({ error: 'Store is not set up for online orders.' }, { status: 500 });

  const stripe = new Stripe(secret, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion });
  const result = await createOrderAndSession({
    service: getServiceSupabase(),
    stripe,
    store: { id: storeId, slug: STORE_SLUG, name: site.name, prefix: 'FL', siteUrl: `https://${site.domain}` },
    lines: cart.lines.map(l => ({
      variantId: null,
      productName: kitProductName(l.kit),
      variantName: l.colourLabel,
      sku: kitSku(l.kit, l.colourKey),
      quantity: l.qty,
      unitPriceCad: l.kit.price,
    })),
    customer: parsed.customer,
    cancelPath: '/cart',
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ url: result.url, order_number: result.orderNumber });
}
