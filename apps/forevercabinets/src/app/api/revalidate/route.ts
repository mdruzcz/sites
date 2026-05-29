import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  const path = url.searchParams.get("path");
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: path });
  }
  // Default: refresh catalog + every PDP
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: "all" });
}

export async function GET(req: Request) {
  return POST(req);
}
