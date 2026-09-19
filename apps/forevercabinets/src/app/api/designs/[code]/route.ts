import { NextResponse } from "next/server";
import { fetchDesignByCode } from "@/lib/planner/cloud";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  const design = await fetchDesignByCode(code);
  if (!design) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ design });
}
