import { getOwnerSession } from "@/lib/owner-auth";
import { createOwnerProperty } from "@/lib/owner-listings";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getOwnerSession();
  if (!session) return Response.json({ error: "Please sign in." }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const result = await createOwnerProperty(session.userId, body);
  if ("error" in result) return Response.json({ error: result.error }, { status: 400 });
  return Response.json({ ok: true, id: result.id });
}
