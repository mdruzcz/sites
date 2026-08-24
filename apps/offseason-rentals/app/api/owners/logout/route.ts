import { clearOwnerCookies } from "@/lib/owner-auth";

export const runtime = "nodejs";

export async function POST() {
  await clearOwnerCookies();
  return Response.json({ ok: true });
}
