"use server";

import { revalidatePath } from "next/cache";
import { addToCart } from "@/lib/cart";

/** Adds the visualizer's kit + extras to the cart in one go. */
export async function addVisualizerLinesToCart(lines: { variantId: string; qty: number }[]): Promise<{ ok: boolean; error?: string; count?: number }> {
  const clean = (Array.isArray(lines) ? lines : [])
    .filter((l) => l && typeof l.variantId === "string" && /^[0-9a-f-]{36}$/i.test(l.variantId))
    .map((l) => ({ variantId: l.variantId, qty: Math.max(1, Math.min(99, Math.round(Number(l.qty) || 1))) }))
    .slice(0, 40);
  if (!clean.length) return { ok: false, error: "Nothing to add." };
  let count = 0;
  try {
    for (const l of clean) {
      await addToCart(l.variantId, l.qty);
      count++;
    }
  } catch (err) {
    return { ok: false, error: (err as Error).message, count };
  }
  revalidatePath("/cart");
  revalidatePath("/", "layout");
  return { ok: true, count };
}
