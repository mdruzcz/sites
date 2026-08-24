import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase";
import { deletePhoto } from "@/lib/photo-store";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

/** Edit alt text or reorder. Both are cheap row updates. */
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const db = adminClient();
  if (!db) return Response.json({ error: "Not configured." }, { status: 503 });

  const body = (await req.json().catch(() => ({}))) as { alt?: string; position?: number };
  const patch: Record<string, unknown> = {};
  if (typeof body.alt === "string") patch.alt = body.alt.trim();
  if (typeof body.position === "number" && Number.isFinite(body.position)) {
    patch.position = Math.max(0, Math.floor(body.position));
  }
  if (!Object.keys(patch).length) {
    return Response.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { error } = await db.from("osr_property_photos").update(patch).eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    await deletePhoto(id);
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
