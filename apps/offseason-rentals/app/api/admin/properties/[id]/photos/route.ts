import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase";
import { storePhoto, storePhotoFromUrl, nextPosition, defaultAlt } from "@/lib/photo-store";

export const runtime = "nodejs";
// Importing a dozen photographs from a remote host takes longer than the
// default serverless budget allows.
export const maxDuration = 120;

type Ctx = { params: Promise<{ id: string }> };

interface Result {
  ok: boolean;
  stored: number;
  failed: { source: string; reason: string }[];
}

async function propertyContext(id: string) {
  const db = adminClient();
  if (!db) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  const { data, error } = await db
    .from("osr_properties")
    .select("id, name, city, region, slug")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("That listing does not exist.");
  return data as { id: string; name: string; city: string; region: string; slug: string };
}

/**
 * Accepts either a multipart form of files (drag and drop) or a JSON body of
 * remote URLs (the VRBO/Airbnb importer). Photos are stored one at a time and
 * a failure on one never abandons the rest — a partial import with a clear
 * list of what did not make it is far more useful than an all-or-nothing error.
 */
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;

  let property: Awaited<ReturnType<typeof propertyContext>>;
  try {
    property = await propertyContext(id);
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }

  let position = await nextPosition(id);
  const result: Result = { ok: true, stored: 0, failed: [] };
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const files = form.getAll("files").filter((f): f is File => f instanceof File);
    if (!files.length) return Response.json({ error: "No files received." }, { status: 400 });

    for (const file of files) {
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
        result.stored += 1;
      } catch (err) {
        result.failed.push({ source: file.name, reason: (err as Error).message });
      }
    }
  } else {
    const body = (await req.json().catch(() => ({}))) as { urls?: string[] };
    const urls = (body.urls ?? []).filter((u) => typeof u === "string" && u.startsWith("http"));
    if (!urls.length) return Response.json({ error: "No photo URLs received." }, { status: 400 });

    for (const url of urls) {
      try {
        await storePhotoFromUrl({
          propertyId: id,
          url,
          alt: defaultAlt(property.name, property.city, property.region, position),
          position
        });
        position += 1;
        result.stored += 1;
      } catch (err) {
        result.failed.push({ source: url, reason: (err as Error).message });
      }
    }
  }

  if (result.stored) {
    revalidatePath("/", "layout");
    revalidatePath(`/rentals/${property.slug}`);
  }

  // 207 signals "some worked, some did not" so the UI can say exactly that.
  const status = result.stored === 0 ? 502 : result.failed.length ? 207 : 200;
  return Response.json(result, { status });
}
