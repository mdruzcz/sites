import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase";
import { slugify } from "@/lib/format";

export const runtime = "nodejs";

/** Fields the admin form is allowed to write. Anything else is ignored. */
const WRITABLE = new Set([
  "slug", "name", "street_address", "unit", "city", "region", "postal_code", "country",
  "latitude", "longitude", "property_type", "headline", "summary", "description",
  "bedrooms", "bathrooms", "sleeps", "beds", "square_feet", "parking_spaces",
  "monthly_rate", "weekly_rate", "nightly_rate", "min_stay_nights", "security_deposit",
  "cleaning_fee", "utilities_included", "wifi_included", "pets_allowed", "pet_fee",
  "smoking_allowed", "available_from", "available_to", "status", "featured",
  "perfect_for", "amenities", "highlights", "house_rules", "source_url"
]);

export function pickWritable(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) if (WRITABLE.has(k)) out[k] = v;
  return out;
}

export async function POST(req: Request) {
  const db = adminClient();
  if (!db) {
    return Response.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured." }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  if (!name) return Response.json({ error: "A name is required." }, { status: 400 });

  const row = pickWritable(body);
  row.name = name;
  row.slug = slugify(String(body.slug ?? "") || name);
  if (!row.slug) return Response.json({ error: "Could not derive a URL slug." }, { status: 400 });

  const { data, error } = await db.from("osr_properties").insert(row).select("id, slug").single();
  if (error) {
    const conflict = error.code === "23505";
    return Response.json(
      { error: conflict ? "A listing with that URL slug already exists." : error.message },
      { status: conflict ? 409 : 500 }
    );
  }

  revalidatePath("/", "layout");
  return Response.json({ ok: true, id: data.id, slug: data.slug });
}

export async function GET() {
  const db = adminClient();
  if (!db) return Response.json({ error: "Not configured." }, { status: 503 });
  const { data, error } = await db
    .from("osr_properties")
    .select("id, slug, name, status, city, monthly_rate, updated_at")
    .order("updated_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, properties: data });
}
