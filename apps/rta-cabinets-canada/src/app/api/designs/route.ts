import { NextResponse } from "next/server";
import { storeDesign } from "@/lib/planner/cloud";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { design?: unknown };
  try {
    body = (await req.json()) as { design?: unknown };
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
  if (!body?.design) return NextResponse.json({ error: "Missing design" }, { status: 400 });
  const result = await storeDesign(body.design);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 503 });
  return NextResponse.json({ code: result.code, url: `/planner/d/${result.code}` });
}
