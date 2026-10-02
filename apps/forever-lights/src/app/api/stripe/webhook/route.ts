import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { site } from '@/lib/site-config';
import { getServiceSupabase, getStoreId, STORE_SLUG } from '@/lib/supabase-admin';
import { handleStripeEvent } from '@/lib/orders/checkout-server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });

  const stripe = new Stripe(secret, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion });
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'missing signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig, webhookSecret);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }

  const storeId = await getStoreId();
  if (!storeId) return NextResponse.json({ error: 'store missing' }, { status: 500 });
  const siteUrl = `https://${site.domain}`;

  try {
    const outcome = await handleStripeEvent({
      service: getServiceSupabase(),
      stripe,
      event,
      store: { id: storeId, slug: STORE_SLUG, name: site.name, prefix: 'FL', siteUrl },
      brand: { name: site.name, siteUrl: `${siteUrl}/kits`, accent: '#201e1d', phone: site.phone },
      trackInventory: false,
    });
    return NextResponse.json({ received: true, ...outcome });
  } catch (e) {
    // 500 → Stripe retries; the paid transition is idempotent.
    console.error('[stripe webhook]', e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
