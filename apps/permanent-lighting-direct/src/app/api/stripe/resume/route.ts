import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { storeConfig } from "@/lib/store-brand";
import { resumeCheckout, stopReminders } from "@/lib/orders/recovery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Called from the saved-order page (/checkout/resume) the reminder email links
// to: reopen the order on a fresh Stripe page, or record "no more reminders".
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { o?: string; k?: string; action?: string; trackColourConfirmed?: boolean };
  const orderId = String(body.o ?? "");
  const token = String(body.k ?? "");
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });
  const service = getServiceSupabase();

  if (body.action === "stop") {
    const ok = await stopReminders(service, { id: store.id }, orderId, token);
    return ok ? NextResponse.json({ stopped: true }) : NextResponse.json({ error: "We couldn't update that. Please reply to the email instead." }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Card checkout isn't available right now. Please call us to order." }, { status: 503 });
  const stripe = new Stripe(secret, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const result = await resumeCheckout({
    service,
    stripe,
    store: storeConfig(store.id),
    orderId,
    token,
    trackColourConfirmed: body.trackColourConfirmed === true
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ url: result.url });
}
