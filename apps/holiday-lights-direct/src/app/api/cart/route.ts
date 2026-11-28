import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";
import { cardCheckoutEnabled } from "@/lib/card-checkout";

export async function GET() {
  const cart = await getCart();
  // card_checkout tells the mini-cart which wording to use: pay by card on
  // orders that ship free, or the request flow for everything.
  return NextResponse.json({ cart, card_checkout: cardCheckoutEnabled() });
}
