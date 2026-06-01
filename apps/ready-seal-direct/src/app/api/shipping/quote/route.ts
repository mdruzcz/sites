import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { estimateShipping } from "@/lib/shipping/estimate";

interface QuoteRequest {
  postal_code: string;
}

// Distance + weight shipping estimate from Belmont, ON. Ontario-only online ordering.
export async function POST(req: Request) {
  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });

  const body = (await req.json().catch(() => ({}))) as QuoteRequest;
  const dest = (body.postal_code ?? "").replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(dest)) {
    return NextResponse.json({ error: "Invalid Canadian postal code" }, { status: 400 });
  }

  const est = estimateShipping({
    items: cart.items.map((l) => ({ name: l.variant_name, quantity: l.quantity })),
    postal: dest,
    subtotalCad: cart.subtotal_cad,
    freeThresholdCad: Number(store.free_shipping_threshold_cad)
  });

  if (!est.deliverable) {
    return NextResponse.json(
      { deliverable: false, error: "We currently ship online within Ontario only. Please request a quote for your province." },
      { status: 200 }
    );
  }

  return NextResponse.json({
    deliverable: true,
    free: est.free,
    amount_cad: est.amountCad,
    zone: est.zone,
    zone_label: est.zoneLabel,
    weight_kg: Math.round(est.totalKg * 10) / 10
  });
}
