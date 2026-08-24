import "server-only";
import { adminClient, photoPublicUrl, PHOTO_BUCKET } from "@/lib/supabase";
import type { PropertyPhoto } from "@/lib/types";

const MAX_BYTES = 15 * 1024 * 1024;

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif"
};

/**
 * Some hosts (notably legacy WordPress and the big rental platforms) answer a
 * bare fetch with 403 or 415 and the same request with browser headers with a
 * 200. Sending them costs nothing and removes a whole class of "the import
 * silently got no photos" bug.
 */
const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  "Accept-Language": "en-CA,en;q=0.9"
};

function randomId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

/** Sensible, editable default alt text. Context is knowable; content is not. */
export function defaultAlt(propertyName: string, city: string, region: string, index: number): string {
  const suffix = index === 0 ? "" : ` (photo ${index + 1})`;
  return `${propertyName} — off-season rental in ${city}, ${region}${suffix}`;
}

async function measure(bytes: Uint8Array): Promise<{ width: number | null; height: number | null }> {
  try {
    const sharp = (await import("sharp")).default;
    const meta = await sharp(Buffer.from(bytes)).metadata();
    return { width: meta.width ?? null, height: meta.height ?? null };
  } catch {
    // Dimensions are a nice-to-have; a failed probe must not fail the upload.
    return { width: null, height: null };
  }
}

/** Put bytes in the bucket and record the row. Returns the stored photo. */
export async function storePhoto({
  propertyId,
  bytes,
  contentType,
  alt,
  position
}: {
  propertyId: string;
  bytes: Uint8Array;
  contentType: string;
  alt: string;
  position: number;
}): Promise<PropertyPhoto> {
  const db = adminClient();
  if (!db) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");

  if (bytes.byteLength > MAX_BYTES) throw new Error("That image is larger than 15 MB.");

  const ext = EXT_BY_TYPE[contentType.toLowerCase()] ?? "jpg";
  const path = `${propertyId}/${Date.now()}-${randomId()}.${ext}`;

  const { error: upErr } = await db.storage.from(PHOTO_BUCKET).upload(path, bytes, {
    contentType,
    cacheControl: "31536000",
    upsert: false
  });
  if (upErr) throw new Error(`Upload failed: ${upErr.message}`);

  const { width, height } = await measure(bytes);

  const { data, error } = await db
    .from("osr_property_photos")
    .insert({
      property_id: propertyId,
      url: photoPublicUrl(path),
      storage_path: path,
      alt,
      width,
      height,
      position
    })
    .select()
    .single();

  if (error) {
    // Do not leave an orphan file behind if the row could not be written.
    await db.storage.from(PHOTO_BUCKET).remove([path]);
    throw new Error(`Could not save the photo record: ${error.message}`);
  }

  return data as PropertyPhoto;
}

/** Download a remote photo and store it locally. Used by the URL importer. */
export async function storePhotoFromUrl({
  propertyId,
  url,
  alt,
  position
}: {
  propertyId: string;
  url: string;
  alt: string;
  position: number;
}): Promise<PropertyPhoto> {
  const res = await fetch(url, { headers: BROWSER_HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`Source returned ${res.status}`);

  const contentType = (res.headers.get("content-type") ?? "image/jpeg").split(";")[0].trim();
  if (!contentType.startsWith("image/")) throw new Error(`Not an image (${contentType})`);

  const bytes = new Uint8Array(await res.arrayBuffer());
  if (!bytes.byteLength) throw new Error("Empty response");
  // Tracking pixels and spacer GIFs slip past every URL filter; size does not.
  if (bytes.byteLength < 8 * 1024) throw new Error("Too small to be a listing photo");

  return storePhoto({ propertyId, bytes, contentType, alt, position });
}

/** Remove a photo row and its stored file. */
export async function deletePhoto(photoId: string): Promise<void> {
  const db = adminClient();
  if (!db) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");

  const { data, error } = await db
    .from("osr_property_photos")
    .select("id, storage_path")
    .eq("id", photoId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return;

  if (data.storage_path) {
    await db.storage.from(PHOTO_BUCKET).remove([data.storage_path as string]);
  }
  const { error: delErr } = await db.from("osr_property_photos").delete().eq("id", photoId);
  if (delErr) throw new Error(delErr.message);
}

/** The next free position for a property, so appends never collide. */
export async function nextPosition(propertyId: string): Promise<number> {
  const db = adminClient();
  if (!db) return 0;
  const { data } = await db
    .from("osr_property_photos")
    .select("position")
    .eq("property_id", propertyId)
    .order("position", { ascending: false })
    .limit(1);
  const top = data?.[0]?.position;
  return typeof top === "number" ? top + 1 : 0;
}
