import { NextResponse } from "next/server";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { EMAIL_BRAND, storeConfig } from "@/lib/store-brand";
import { previewEmail } from "@/lib/orders/email-preview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Local review only: shows the order emails in the browser without sending
// anything. Returns 404 unless EMAIL_PREVIEW=1 is set (it is not on Vercel).
//   /api/email-preview?type=reminder | staff | confirmation  [&order=PLD-10031]
export async function GET(req: Request) {
  if (process.env.EMAIL_PREVIEW !== "1") return new NextResponse("Not found", { status: 404 });
  const url = new URL(req.url);
  const store = await getStore();
  const html = await previewEmail({
    service: getServiceSupabase(),
    store: storeConfig(store?.id ?? "00000000-0000-0000-0000-000000000000"),
    brand: EMAIL_BRAND,
    type: url.searchParams.get("type"),
    orderNumber: url.searchParams.get("order")
  });
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
