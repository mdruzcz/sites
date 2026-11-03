import { NextResponse } from "next/server";
import { estimateTotals, normalizePostal } from "@/lib/orders/policy";

// Shipping + tax preview for a postal code / province (same numbers checkout charges).
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { postal_code?: string; province?: string; subtotal?: number };
  const postal = normalizePostal(body.postal_code);
  if (!postal) return NextResponse.json({ error: "Invalid Canadian postal code" }, { status: 400 });
  const totals = estimateTotals(Number(body.subtotal ?? 0), postal, String(body.province ?? "ON"));
  return NextResponse.json(totals);
}
