import { NextResponse } from "next/server";
import { getCabinets } from "@/lib/catalog";
import { getInventoryMap, mapForSkus } from "@/lib/inventory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Stock by catalog SKU for the planner and other client views. */
export async function GET() {
  const map = await getInventoryMap();
  const bySku = mapForSkus(
    map,
    getCabinets().map((c) => c.sku),
  );
  return NextResponse.json(bySku, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
