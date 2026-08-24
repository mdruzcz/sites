import "server-only";
import { adminClient } from "@/lib/supabase";
import { photoLimitFor, sortRankFor, getPackage } from "@/lib/content";
import { slugify } from "@/lib/format";
import type { Property, PropertyPhoto } from "@/lib/types";

const TABLE = "osr_properties";
const PHOTO_TABLE = "osr_property_photos";
const SELECT = `*, photos:${PHOTO_TABLE}(*)`;

function normalise(row: Record<string, unknown>): Property {
  const photos = ((row.photos as PropertyPhoto[] | null) ?? [])
    .slice()
    .sort((a, b) => a.position - b.position);
  return {
    ...(row as unknown as Property),
    perfect_for: (row.perfect_for as string[] | null) ?? [],
    amenities: (row.amenities as string[] | null) ?? [],
    highlights: (row.highlights as string[] | null) ?? [],
    house_rules: (row.house_rules as string[] | null) ?? [],
    photos
  };
}

/**
 * Fields an owner is allowed to write.
 *
 * Note what is absent: `status`, `package_status`, `package_expires_at`,
 * `featured`, `sort_rank`, `owner_id`. Those are the levers that decide whether
 * a listing is public and where it ranks, and they belong to Matt. An owner
 * posting any of them gets them silently dropped rather than an error, because
 * the honest answer to "can I publish myself" is simply no.
 */
const OWNER_WRITABLE = new Set([
  "name", "street_address", "unit", "city", "region", "postal_code",
  "latitude", "longitude", "property_type", "headline", "summary", "description",
  "bedrooms", "bathrooms", "sleeps", "beds", "square_feet", "parking_spaces",
  "monthly_rate", "weekly_rate", "nightly_rate", "min_stay_nights",
  "discount_monthly_rate", "discount_weekly_rate", "discount_note",
  "security_deposit", "cleaning_fee", "utilities_included", "wifi_included",
  "pets_allowed", "pet_fee", "smoking_allowed", "available_from", "available_to",
  "perfect_for", "amenities", "highlights", "house_rules", "source_url"
]);

export function pickOwnerWritable(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) if (OWNER_WRITABLE.has(k)) out[k] = v;
  return out;
}

/** Every listing belonging to this owner, newest first. */
export async function getOwnerProperties(ownerId: string): Promise<Property[]> {
  const db = adminClient();
  if (!db) return [];
  const { data, error } = await db
    .from(TABLE)
    .select(SELECT)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getOwnerProperties failed:", error.message);
    return [];
  }
  return (data ?? []).map(normalise);
}

/**
 * One listing, but only if this owner owns it.
 *
 * Ownership is checked in the query rather than after it, so a guessed id
 * returns null instead of leaking another owner's rates and address.
 */
export async function getOwnerProperty(ownerId: string, id: string): Promise<Property | null> {
  const db = adminClient();
  if (!db) return null;
  const { data, error } = await db
    .from(TABLE)
    .select(SELECT)
    .eq("id", id)
    .eq("owner_id", ownerId)
    .maybeSingle();
  if (error) {
    console.error("getOwnerProperty failed:", error.message);
    return null;
  }
  return data ? normalise(data as Record<string, unknown>) : null;
}

/** A slug that is free, derived from the name. Falls back to -2, -3 … */
async function uniqueSlug(base: string): Promise<string> {
  const db = adminClient();
  const root = slugify(base) || "listing";
  if (!db) return root;
  for (let i = 0; i < 25; i++) {
    const candidate = i === 0 ? root : `${root}-${i + 1}`;
    const { data } = await db.from(TABLE).select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
  }
  return `${root}-${Date.now().toString(36)}`;
}

export async function createOwnerProperty(
  ownerId: string,
  body: Record<string, unknown>
): Promise<{ id: string } | { error: string }> {
  const db = adminClient();
  if (!db) return { error: "The database is not configured." };

  const name = String(body.name ?? "").trim();
  if (!name) return { error: "Give the property a name." };

  const row = pickOwnerWritable(body);
  row.name = name;
  row.slug = await uniqueSlug(name);
  row.owner_id = ownerId;
  // A new owner listing starts invisible and unranked. Both change only when
  // Matt approves it.
  row.status = "draft";
  row.package_status = "draft";
  row.sort_rank = 30;

  const { data, error } = await db.from(TABLE).insert(row).select("id").single();
  if (error) return { error: error.message };
  return { id: data.id as string };
}

export async function updateOwnerProperty(
  ownerId: string,
  id: string,
  body: Record<string, unknown>
): Promise<{ ok: true } | { error: string }> {
  const db = adminClient();
  if (!db) return { error: "The database is not configured." };

  const existing = await getOwnerProperty(ownerId, id);
  if (!existing) return { error: "That listing does not exist." };

  const row = pickOwnerWritable(body);
  if (!Object.keys(row).length) return { error: "Nothing to update." };

  // An approved, live listing can still be edited — but a substantive edit
  // does not silently re-open the approval question, so status is untouched.
  const { error } = await db.from(TABLE).update(row).eq("id", id).eq("owner_id", ownerId);
  if (error) return { error: error.message };
  return { ok: true };
}

/**
 * Submit for review against a tier.
 *
 * This raises the invoice row and flips the listing into the queue. It does not
 * publish anything — Matt invoices, takes payment, and approves.
 */
export async function submitOwnerProperty(
  ownerId: string,
  id: string,
  tier: string
): Promise<{ ok: true; price: number } | { error: string }> {
  const db = adminClient();
  if (!db) return { error: "The database is not configured." };

  const pkg = getPackage(tier);
  if (!pkg) return { error: "Choose a package first." };

  const property = await getOwnerProperty(ownerId, id);
  if (!property) return { error: "That listing does not exist." };

  // Refuse to put a half-finished listing in front of Matt.
  const missing: string[] = [];
  if (!property.summary?.trim()) missing.push("a short summary");
  if (!property.description?.trim()) missing.push("a description");
  if (!property.street_address?.trim()) missing.push("the address");
  if (!property.monthly_rate) missing.push("a monthly rate");
  if (!property.photos.length) missing.push("at least one photograph");
  if (missing.length) {
    return { error: `Still needed before you can submit: ${missing.join(", ")}.` };
  }

  const overBy = property.photos.length - pkg.photoLimit;
  if (overBy > 0) {
    return {
      error: `${pkg.name} allows ${pkg.photoLimit} photographs and this listing has ${property.photos.length}. Remove ${overBy}, or choose a larger package.`
    };
  }

  const { error: upErr } = await db
    .from(TABLE)
    .update({
      package_tier: tier,
      package_status: "submitted",
      submitted_at: new Date().toISOString(),
      sort_rank: sortRankFor(tier),
      rejection_note: null
    })
    .eq("id", id)
    .eq("owner_id", ownerId);
  if (upErr) return { error: upErr.message };

  const { error: orderErr } = await db.from("osr_package_orders").insert({
    owner_id: ownerId,
    property_id: id,
    tier,
    price_cad: pkg.price,
    status: "invoiced"
  });
  if (orderErr) console.error("Could not raise the package order:", orderErr.message);

  return { ok: true, price: pkg.price };
}

/** How many more photographs this listing may hold under its chosen tier. */
export function photoHeadroom(property: Property): { limit: number; used: number; left: number } {
  const limit = photoLimitFor(property.package_tier);
  const used = property.photos.length;
  return { limit, used, left: Math.max(0, limit - used) };
}
