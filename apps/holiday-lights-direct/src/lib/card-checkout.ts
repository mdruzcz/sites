import "server-only";
import type { Cart, CartLine } from "@/lib/cart";
import { getServiceSupabase } from "@/lib/supabase/server";

// Which carts can pay by card.
//
// A cart that ships free (shipsFree in utils: $500 or more) is paid by card on the site.
// Anything smaller still goes through the shipping-quote request, because
// shipping on small parcels is quoted by hand. Until this deployment has a
// Stripe key, every cart uses the request flow, exactly as before card
// checkout existed.

/** True once STRIPE_SECRET_KEY is set for this deployment. */
export const cardCheckoutEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The cart re-priced from the live variant prices. A cart line keeps the price
 * it was added at, which can be weeks old; card checkout shows and charges
 * today's price. `unavailable` is the first line whose variant is no longer
 * sold (it keeps its saved price so the page can still render).
 */
export async function priceCartLive(cart: Cart): Promise<{ cart: Cart; unavailable: CartLine | null }> {
  const { data: variants } = await getServiceSupabase()
    .from("ecom_variants")
    .select("id, price_cad, is_active")
    .in("id", cart.items.map((l) => l.variant_id));
  const byId = new Map((variants ?? []).map((v) => [v.id as string, v]));
  let unavailable: CartLine | null = null;
  const items = cart.items.map((l) => {
    const v = byId.get(l.variant_id);
    if (!v?.is_active) {
      unavailable ??= l;
      return l;
    }
    return { ...l, unit_price_cad: Number(v.price_cad) };
  });
  const subtotal = round2(items.reduce((n, l) => n + l.unit_price_cad * l.quantity, 0));
  return { cart: { ...cart, items, subtotal_cad: subtotal }, unavailable };
}
