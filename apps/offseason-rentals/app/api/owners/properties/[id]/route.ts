import { getOwnerSession } from "@/lib/owner-auth";
import { updateOwnerProperty } from "@/lib/owner-listings";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getOwnerSession();
  if (!session) return Response.json({ error: "Please sign in." }, { status: 401 });

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const result = await updateOwnerProperty(session.userId, id, body);
  if ("error" in result) return Response.json({ error: result.error }, { status: 400 });

  // A live listing being edited should show the edit, not wait out the hour.
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
