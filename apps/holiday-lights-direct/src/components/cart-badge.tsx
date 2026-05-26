import { getCart } from "@/lib/cart";
import { CartBadgeButton } from "@/components/cart-badge-button";

export async function CartBadge() {
  const cart = await getCart();
  const count = cart?.items.reduce((s, i) => s + i.quantity, 0) ?? 0;
  return <CartBadgeButton count={count} />;
}
