import { revalidatePath } from "next/cache";
import { getOwnerSession } from "@/lib/owner-auth";
import { getOwnerProperty, photoHeadroom } from "@/lib/owner-listings";
import { storePhoto, nextPosition, defaultAlt } from "@/lib/photo-store";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Owner photo upload. Same storage path as the admin, with one addition: the
 * tier's photo cap is enforced here rather than only in the UI, so a listing
 * cannot exceed what was paid for by driving the endpoint directly.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getOwnerSession();
  if (!session) return Response.json({ error: "Please sign in." }, { status: 401 });

  const { id } = await params;
  const property = await getOwnerProperty(session.userId, id);
  if (!property) return Response.json({ error: "That listing does not exist." }, { status: 404 });

  const { limit, left } = photoHeadroom(property);
  if (left <= 0) {
    return Response.json(
      { error: `This listing is at its limit of ${limit} photographs. Remove one, or move up a package.` },
      { status: 400 }
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) return Response.json({ error: "No files received." }, { status: 400 });

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) return Response.json({ error: "No files received." }, { status: 400 });

  // Take only what fits, and say so, rather than failing the whole upload.
  const accepted = files.slice(0, left);
  const rejectedForSpace = files.length - accepted.length;

  let position = await nextPosition(id);
  let stored = 0;
  const failed: { source: string; reason: string }[] = [];

  for (const file of accepted) {
    try {
      if (!file.type.startsWith("image/")) throw new Error("Not an image file");
      const bytes = new Uint8Array(await file.arrayBuffer());
      await storePhoto({
        propertyId: id,
        bytes,
        contentType: file.type,
        alt: defaultAlt(property.name, property.city, property.region, position),
        position
      });
      position += 1;
      stored += 1;
    } catch (err) {
      failed.push({ source: file.name, reason: (err as Error).message });
    }
  }

  if (stored) revalidatePath("/", "layout");

  return Response.json(
    {
      ok: stored > 0,
      stored,
      failed,
      rejectedForSpace,
      limit,
      remaining: Math.max(0, left - stored)
    },
    { status: stored === 0 ? 502 : failed.length || rejectedForSpace ? 207 : 200 }
  );
}

/** Owners may delete their own photographs. */
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getOwnerSession();
  if (!session) return Response.json({ error: "Please sign in." }, { status: 401 });

  const { id } = await params;
  const property = await getOwnerProperty(session.userId, id);
  if (!property) return Response.json({ error: "That listing does not exist." }, { status: 404 });

  const { photoId } = (await req.json().catch(() => ({}))) as { photoId?: string };
  if (!photoId) return Response.json({ error: "Which photograph?" }, { status: 400 });

  // Ownership is established via the parent listing, so a photo id from
  // somebody else's property simply is not found here.
  if (!property.photos.some((p) => p.id === photoId)) {
    return Response.json({ error: "That photograph does not exist." }, { status: 404 });
  }

  const { deletePhoto } = await import("@/lib/photo-store");
  try {
    await deletePhoto(photoId);
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}

/** Reorder. The first photograph is the card image, so owners care about it. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getOwnerSession();
  if (!session) return Response.json({ error: "Please sign in." }, { status: 401 });

  const { id } = await params;
  const property = await getOwnerProperty(session.userId, id);
  if (!property) return Response.json({ error: "That listing does not exist." }, { status: 404 });

  const { order } = (await req.json().catch(() => ({}))) as { order?: string[] };
  if (!Array.isArray(order) || !order.length) {
    return Response.json({ error: "Send the new photo order." }, { status: 400 });
  }

  // Only ids that belong to this listing are honoured; anything else is
  // dropped rather than trusted.
  const own = new Set(property.photos.map((p) => p.id));
  const clean = order.filter((pid) => own.has(pid));

  const { adminClient } = await import("@/lib/supabase");
  const db = adminClient();
  if (!db) return Response.json({ error: "Not configured." }, { status: 503 });

  await Promise.all(
    clean.map((pid, i) => db.from("osr_property_photos").update({ position: i }).eq("id", pid))
  );

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
