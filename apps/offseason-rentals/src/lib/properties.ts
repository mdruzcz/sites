import "server-only";
import { publicClient, adminClient } from "@/lib/supabase";
import type { Property, PropertyPhoto } from "@/lib/types";

const TABLE = "osr_properties";
const PHOTO_TABLE = "osr_property_photos";

/** Columns we always want back, plus the joined photo rows. */
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
 * Every published listing, newest-featured first.
 *
 * Returns [] rather than throwing when Supabase is unreachable or not yet
 * configured — a listings page that renders an honest empty state beats a
 * 500 on the whole site.
 */
export async function getProperties(): Promise<Property[]> {
  const db = publicClient();
  if (!db) return [];
  // sort_rank is the paid ordering: Gold and house listings 10, Silver 20,
  // Bronze 30. Everything else is a tie-break inside a tier, so a Bronze
  // listing can never appear above a Silver one however it is priced.
  const { data, error } = await db
    .from(TABLE)
    .select(SELECT)
    .eq("status", "published")
    .order("sort_rank", { ascending: true })
    .order("featured", { ascending: false })
    .order("monthly_rate", { ascending: true, nullsFirst: false });
  if (error) {
    console.error("getProperties failed:", error.message);
    return [];
  }
  return (data ?? []).map(normalise);
}

/** One published listing by slug, or null. */
export async function getProperty(slug: string): Promise<Property | null> {
  const db = publicClient();
  if (!db) return null;
  const { data, error } = await db
    .from(TABLE)
    .select(SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error(`getProperty(${slug}) failed:`, error.message);
    return null;
  }
  return data ? normalise(data as Record<string, unknown>) : null;
}

/** Admin view — drafts included. Requires the service-role key. */
export async function getAllPropertiesForAdmin(): Promise<Property[]> {
  const db = adminClient();
  if (!db) return [];
  const { data, error } = await db
    .from(TABLE)
    .select(SELECT)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAllPropertiesForAdmin failed:", error.message);
    return [];
  }
  return (data ?? []).map(normalise);
}

/** Admin view of a single listing by id, draft or published. */
export async function getPropertyForAdmin(id: string): Promise<Property | null> {
  const db = adminClient();
  if (!db) return null;
  const { data, error } = await db.from(TABLE).select(SELECT).eq("id", id).maybeSingle();
  if (error) {
    console.error(`getPropertyForAdmin(${id}) failed:`, error.message);
    return null;
  }
  return data ? normalise(data as Record<string, unknown>) : null;
}

/** Listings tagged with an audience slug, e.g. "travel-nurses". */
export async function getPropertiesForAudience(audience: string): Promise<Property[]> {
  const all = await getProperties();
  return all.filter((p) => p.perfect_for.includes(audience));
}
