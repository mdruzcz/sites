import { NextResponse } from "next/server";
import { getCabinets } from "@/lib/catalog";
import { getInventoryMap, mapForSkus } from "@/lib/inventory";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

/** Stock by catalog SKU (monthly command-center snapshot) for the planner and other client views. */
export async function GET() {
  const map = await getInventoryMap();
  const bySku = mapForSkus(
    map,
    getCabinets().map((c) => c.sku),
  );
  return NextResponse.json(bySku, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
