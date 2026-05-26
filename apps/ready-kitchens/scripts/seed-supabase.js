// node scripts/seed-supabase.js
// Loads cabinets.json + kits.json into Supabase tables.
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and (preferably) SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
const sb = createClient(url, key);

(async () => {
  const cabinets = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "content", "cabinets.json"), "utf8"));
  const kits = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "content", "kits.json"), "utf8"));

  console.log(`Upserting ${cabinets.length} cabinets…`);
  const { error: e1 } = await sb.from("readykitchens_cabinets").upsert(
    cabinets.map((c) => ({
      sku: c.sku,
      name: c.name,
      type: c.type,
      width_in: c.width_in,
      cost_cad: c.cost_cad,
      retail_cad: c.retail_cad,
      in_stock: c.in_stock !== false,
      updated_at: new Date().toISOString(),
    })),
    { onConflict: "sku" },
  );
  if (e1) { console.error("Cabinet upsert failed", e1); process.exit(1); }

  for (const k of kits) {
    console.log(`Upserting kit ${k.slug}…`);
    const { error: e2 } = await sb.from("readykitchens_kits").upsert(
      {
        slug: k.slug,
        name: k.name,
        tagline: k.tagline,
        shape: k.shape,
        pieces: k.pieces,
        price_cad: k.price_cad,
        layout_fits: k.layout_fits,
        wall_a_inches: k.wall_a_inches ?? null,
        wall_b_inches: k.wall_b_inches ?? null,
        wall_c_inches: k.wall_c_inches ?? null,
        island_inches: k.island_inches ?? null,
        range_inches: k.range_inches ?? 30,
        fridge_inches: k.fridge_inches ?? null,
        best_for: k.best_for,
        summary: k.summary,
        hero_image: k.hero_image,
        highlights: k.highlights,
        gallery: k.gallery,
        is_active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (e2) { console.error(`Kit ${k.slug} upsert failed`, e2); process.exit(1); }

    await sb.from("readykitchens_kit_items").delete().eq("kit_slug", k.slug);
    const items = k.items.map((i, idx) => ({
      kit_slug: k.slug,
      position: idx,
      sku: i.sku,
      qty: i.qty,
      note: i.note ?? null,
    }));
    const { error: e3 } = await sb.from("readykitchens_kit_items").insert(items);
    if (e3) { console.error(`Kit items insert failed`, e3); process.exit(1); }
  }

  console.log("✅ Seed complete.");
})();
