import "server-only";
import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import { getServerSupabase, getServiceSupabase } from "@/lib/supabase/server";
import { getStore } from "@/lib/catalog";

const CART_COOKIE = "itl_cart_token";

export interface CartLine {
  id: string;
  variant_id: string;
  product_slug: string;
  product_name: string;
  variant_name: string;
  sku: string;
  unit_price_cad: number;
  quantity: number;
  image_url: string | null;
  on_hand: number;
}

export interface Cart {
  id: string;
  cart_token: string;
  subtotal_cad: number;
  items: CartLine[];
}

async function readCartToken() {
  const jar = await cookies();
  return jar.get(CART_COOKIE)?.value ?? null;
}

async function writeCartToken(token: string) {
  const jar = await cookies();
  jar.set(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
}

/** Reads (does NOT create) the cart for this browser. Returns null if empty/none. */
export async function getCart(): Promise<Cart | null> {
  const token = await readCartToken();
  if (!token) return null;
  const supabase = await getServerSupabase();
  const { data: cart } = await supabase
    .from("ecom_carts")
    .select("id, cart_token")
    .eq("cart_token", token)
    .maybeSingle();
  if (!cart) return null;

  const { data: items } = await supabase
    .from("ecom_cart_items")
    .select(
      "id, variant_id, quantity, unit_price_cad, ecom_variants(sku, name, ecom_inventory(on_hand), ecom_products(slug, name, ecom_product_images(public_url, is_primary, sort_order)))"
    )
    .eq("cart_id", cart.id);

  const lines: CartLine[] = (items ?? []).map((it: Record<string, unknown>) => {
    const variant = it.ecom_variants as Record<string, unknown>;
    const product = variant?.ecom_products as Record<string, unknown>;
    const inv = variant?.ecom_inventory as { on_hand?: number } | { on_hand?: number }[] | undefined;
    const onHand = Array.isArray(inv) ? inv[0]?.on_hand ?? 0 : (inv?.on_hand ?? 0);
    const imgs = (product?.ecom_product_images as Array<{ public_url: string | null; is_primary: boolean; sort_order: number }>) ?? [];
    const primary = imgs.find((i) => i.is_primary) ?? imgs.sort((a, b) => a.sort_order - b.sort_order)[0];
    return {
      id: it.id as string,
      variant_id: it.variant_id as string,
      product_slug: product?.slug as string,
      product_name: product?.name as string,
      variant_name: variant?.name as string,
      sku: variant?.sku as string,
      unit_price_cad: Number(it.unit_price_cad),
      quantity: Number(it.quantity),
      image_url: primary?.public_url ?? null,
      on_hand: onHand
    };
  });

  const subtotal = lines.reduce((s, l) => s + l.unit_price_cad * l.quantity, 0);
  return { id: cart.id, cart_token: cart.cart_token, subtotal_cad: subtotal, items: lines };
}

/** Returns the cart, creating it if necessary. Uses service role to bypass RLS for writes. */
export async function ensureCart(): Promise<Cart> {
  const existing = await getCart();
  if (existing) return existing;
  const store = await getStore();
  if (!store) throw new Error("Store not configured");
  const token = randomBytes(24).toString("hex");
  const service = getServiceSupabase();
  const { data, error } = await service
    .from("ecom_carts")
    .insert({ store_id: store.id, cart_token: token })
    .select("id, cart_token")
    .single();
  if (error || !data) throw new Error(error?.message ?? "Could not create cart");
  await writeCartToken(token);
  return { id: data.id, cart_token: data.cart_token, subtotal_cad: 0, items: [] };
}

export async function addToCart(variantId: string, quantity = 1) {
  const cart = await ensureCart();
  const service = getServiceSupabase();
  const { data: variant } = await service
    .from("ecom_variants")
    .select("price_cad, is_active")
    .eq("id", variantId)
    .maybeSingle();
  if (!variant?.is_active) throw new Error("Variant not available");

  const { data: existing } = await service
    .from("ecom_cart_items")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("variant_id", variantId)
    .maybeSingle();

  if (existing) {
    const { error } = await service
      .from("ecom_cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await service.from("ecom_cart_items").insert({
      cart_id: cart.id,
      variant_id: variantId,
      quantity,
      unit_price_cad: Number(variant.price_cad)
    });
    if (error) throw new Error(error.message);
  }
}

export async function updateLineQuantity(lineId: string, quantity: number) {
  const service = getServiceSupabase();
  if (quantity <= 0) {
    await service.from("ecom_cart_items").delete().eq("id", lineId);
  } else {
    await service.from("ecom_cart_items").update({ quantity }).eq("id", lineId);
  }
}

export async function removeLine(lineId: string) {
  const service = getServiceSupabase();
  await service.from("ecom_cart_items").delete().eq("id", lineId);
}
