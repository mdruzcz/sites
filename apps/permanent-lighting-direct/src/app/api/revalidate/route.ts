import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/server";
import { STORE_SLUG } from "@/lib/utils";

/**
 * Storefront revalidate webhook. Admin app POSTs here when products/categories change.
 *
 *   POST /api/revalidate?secret=...
 *   { "paths": ["/shop", "/product/abc"], "tags": ["catalog"] }
 *
 * The secret is matched against ecom_stores.revalidate_secret for this store. Falls back
 * to the REVALIDATE_SECRET env var for backward compatibility.
 */
export async function POST(req: NextRequest) {
  const provided = req.nextUrl.searchParams.get("secret");
  if (!provided) {
    return NextResponse.json({ error: "missing secret" }, { status: 401 });
  }

  // Resolve the expected secret for this store
  let expected: string | null = null;
  try {
    const supabase = await getServerSupabase();
    const { data } = await supabase
      .from("ecom_stores")
      .select("revalidate_secret")
      .eq("slug", STORE_SLUG)
      .maybeSingle();
    expected = (data?.revalidate_secret as string | null) ?? null;
  } catch {
    // ignore — fall back to env
  }
  if (!expected) expected = process.env.REVALIDATE_SECRET ?? null;

  if (!expected || provided !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { paths?: string[]; tags?: string[] };
  const paths = body.paths ?? ["/", "/shop"];
  const tags = body.tags ?? [];
  for (const p of paths) revalidatePath(p, "page");
  // tags reserved for future Next.js 16 stable API
  return NextResponse.json({ revalidated: { paths, tags } });
}

// Allow GET for quick browser tests.
export async function GET(req: NextRequest) {
  return POST(req);
}
