import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";

interface QuoteRequest {
  postal_code: string;
}

interface ShippingOption {
  service_code: string;
  service_name: string;
  rate_cad: number;
  carrier: string;
  delivery_days?: number;
  is_free?: boolean;
}

export async function POST(req: Request) {
  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }
  const store = await getStore();
  if (!store) return NextResponse.json({ error: "Store missing" }, { status: 500 });

  const body = (await req.json()) as QuoteRequest;
  const dest = (body.postal_code ?? "").replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(dest)) {
    return NextResponse.json({ error: "Invalid Canadian postal code" }, { status: 400 });
  }

  const subtotal = cart.subtotal_cad;
  const threshold = Number(store.free_shipping_threshold_cad);

  // Free shipping short-circuit
  if (subtotal >= threshold) {
    const free: ShippingOption[] = [
      {
        service_code: "FREE",
        service_name: "Free Canada shipping",
        carrier: "canada-post",
        rate_cad: 0,
        delivery_days: 5,
        is_free: true
      }
    ];
    return NextResponse.json({ options: free, free_shipping: true });
  }

  // Estimate weight (default 200g/unit if no weight set).
  const totalWeight = Math.max(
    250,
    cart.items.reduce((s) => s + 200, 0) // placeholder; replace with sum of variant.weight_grams
  );

  const cpUser = process.env.CANADA_POST_API_USERNAME;
  const cpPass = process.env.CANADA_POST_API_PASSWORD;
  const cpCustomer = process.env.CANADA_POST_CUSTOMER_NUMBER;
  const origin = store.ship_from_postal_code?.replace(/\s+/g, "") ?? "";

  // Cache lookup first
  const service = getServiceSupabase();
  const { data: cached } = await service
    .from("ecom_shipping_quotes")
    .select("*")
    .eq("store_id", store.id)
    .eq("destination_postal_code", dest)
    .eq("total_weight_grams", totalWeight)
    .gt("expires_at", new Date().toISOString())
    .order("rate_cad", { ascending: true });
  if (cached?.length) {
    return NextResponse.json({
      options: cached.map((c) => ({
        service_code: c.service_code,
        service_name: c.service_name,
        rate_cad: Number(c.rate_cad),
        carrier: c.carrier
      })),
      cached: true
    });
  }

  // If Canada Post creds aren't set, fall back to estimated zone-rates.
  if (!cpUser || !cpPass || !cpCustomer || !origin) {
    const estimate: ShippingOption[] = [
      { service_code: "EXP", service_name: "Expedited Parcel (estimate)", carrier: "canada-post", rate_cad: 18.5 },
      { service_code: "XPRESS", service_name: "Xpresspost (estimate)", carrier: "canada-post", rate_cad: 29.0 },
      { service_code: "PRIORITY", service_name: "Priority (estimate)", carrier: "canada-post", rate_cad: 49.0 }
    ];
    return NextResponse.json({ options: estimate, estimate: true });
  }

  // Real Canada Post Get Rates v3
  const auth = Buffer.from(`${cpUser}:${cpPass}`).toString("base64");
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
  <customer-number>${cpCustomer}</customer-number>
  <parcel-characteristics><weight>${totalWeight / 1000}</weight></parcel-characteristics>
  <origin-postal-code>${origin}</origin-postal-code>
  <destination><domestic><postal-code>${dest}</postal-code></domestic></destination>
</mailing-scenario>`;

  let options: ShippingOption[] = [];
  try {
    const resp = await fetch(`${process.env.CANADA_POST_API_BASE ?? "https://soa-gw.canadapost.ca"}/rs/ship/price`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.cpc.ship.rate-v4+xml",
        "Content-Type": "application/vnd.cpc.ship.rate-v4+xml",
        Authorization: `Basic ${auth}`
      },
      body: xml
    });
    const text = await resp.text();
    // Light XML parse: pull each <price-quote>
    const quotes = [...text.matchAll(/<service-code>([^<]+)<\/service-code>[\s\S]*?<service-name>([^<]+)<\/service-name>[\s\S]*?<due>([^<]+)<\/due>/g)];
    options = quotes.map((m) => ({
      service_code: m[1],
      service_name: m[2],
      carrier: "canada-post",
      rate_cad: Number(m[3])
    }));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }

  // Cache results for 1 hour
  if (options.length) {
    await service.from("ecom_shipping_quotes").insert(
      options.map((o) => ({
        store_id: store.id,
        origin_postal_code: origin,
        destination_postal_code: dest,
        total_weight_grams: totalWeight,
        service_code: o.service_code,
        service_name: o.service_name,
        carrier: o.carrier,
        rate_cad: o.rate_cad,
        is_free_shipping: false
      }))
    );
  }

  return NextResponse.json({ options });
}
