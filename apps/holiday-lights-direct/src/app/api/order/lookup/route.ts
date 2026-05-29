import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";

interface Body {
  order_number?: string;
  email?: string;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  if (!body.order_number || !body.email) {
    return NextResponse.json({ order: null }, { status: 400 });
  }
  const service = getServiceSupabase();
  const { data } = await service
    .from("ecom_orders")
    .select(
      "order_number, status, email, total_cad, shipping_carrier, tracking_number, tracking_url, placed_at, shipped_at"
    )
    .eq("order_number", body.order_number)
    .ilike("email", body.email)
    .maybeSingle();
  return NextResponse.json({ order: data ?? null });
}
