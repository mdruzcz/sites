"use server";

import { revalidatePath } from "next/cache";
import { addToCart as add, updateLineQuantity, removeLine } from "@/lib/cart";

export async function addToCartAction(variantId: string, quantity: number) {
  await add(variantId, quantity);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function setLineQuantityAction(lineId: string, quantity: number) {
  await updateLineQuantity(lineId, quantity);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeLineAction(lineId: string) {
  await removeLine(lineId);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}
