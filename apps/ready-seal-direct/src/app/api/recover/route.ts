import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getServiceSupabase } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/utils";

export const runtime = "nodejs";

const CART_COOKIE = "rsd_cart_token";

// Restores an abandoned order's items into a fresh cart and drops the shopper
// back at checkout. Linked from the recovery email (/api/recover?o=<order_id>).
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("o");
  if (!orderId) return NextResponse.redirect(`${SITE_URL}/shop`);

  const service = getServiceSupabase();
  const { data: order } = await service
    .from("ecom_orders")
    .select("id, store_id, status, ecom_order_items(variant_id, quantity, unit_price_cad)")
    .eq("id", orderId)
    .maybeSingle();

  const items = (order?.ecom_order_items ?? []) as {
    variant_id: string;
    quantity: number;
    unit_price_cad: number;
  }[];
  if (!order || items.length === 0) {
    return NextResponse.redirect(`${SITE_URL}/cart`);
  }

  // Build a brand-new cart so we never clobber an existing session's items.
  const token = randomBytes(24).toString("hex");
  const { data: cart } = await service
    .from("ecom_carts")
    .insert({ store_id: order.store_id, cart_token: token })
    .select("id")
    .single();

  if (cart) {
    await service.from("ecom_cart_items").insert(
      items.map((it) => ({
        cart_id: cart.id,
        variant_id: it.variant_id,
        quantity: it.quantity,
        unit_price_cad: it.unit_price_cad
      }))
    );
  }

  const res = NextResponse.redirect(`${SITE_URL}/checkout`);
  res.cookies.set(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
  return res;
}
