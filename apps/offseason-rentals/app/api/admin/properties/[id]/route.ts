import { revalidatePath } from "next/cache";
import { adminClient, PHOTO_BUCKET } from "@/lib/supabase";
import { slugify } from "@/lib/format";
import { pickWritable } from "../route";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const db = adminClient();
  if (!db) {
    return Response.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured." }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const row = pickWritable(body);
  if (typeof row.slug === "string") row.slug = slugify(row.slug);
  if (!Object.keys(row).length) {
    return Response.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { data, error } = await db
    .from("osr_properties")
    .update(row)
    .eq("id", id)
    .select("slug")
    .single();

  if (error) {
    const conflict = error.code === "23505";
    return Response.json(
      { error: conflict ? "That URL slug is already taken." : error.message },
      { status: conflict ? 409 : 500 }
    );
  }

  // Publish the change immediately rather than waiting out the ISR window.
  revalidatePath("/", "layout");
  revalidatePath(`/rentals/${data.slug}`);
  return Response.json({ ok: true, slug: data.slug });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const db = adminClient();
  if (!db) return Response.json({ error: "Not configured." }, { status: 503 });

  // Clear the stored files first; the rows cascade with the property.
  const { data: photos } = await db
    .from("osr_property_photos")
    .select("storage_path")
    .eq("property_id", id);

  const paths = (photos ?? [])
    .map((p) => p.storage_path as string | null)
    .filter((p): p is string => Boolean(p));
  if (paths.length) await db.storage.from(PHOTO_BUCKET).remove(paths);

  const { error } = await db.from("osr_properties").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
