import "server-only";
import { cache } from "react";
import { getServerSupabase } from "@/lib/supabase/server";
import { getStore } from "@/lib/catalog";
import { kits, kitComponents, kitColours, TRACK_PIECE_FEET, LIGHTS_PER_STRAND } from "@/lib/kits";
import { BRAND } from "@/lib/utils";
import type { VzCatalog, VzVariant } from "./engine";

interface Row {
  slug: string;
  ecom_variants: { id: string; price_cad: number; attribute_value: string | null; is_active: boolean }[];
}

/** Permanent Lighting Direct → Light Visualizer catalog, with live prices + variant ids so extras can go straight into the cart. */
export const getVisualizerCatalog = cache(async (): Promise<VzCatalog> => {
  const slugs = [...kits.map((k) => k.slug), ...kitComponents.map((c) => c.productSlug)];
  let rows: Row[] = [];
  try {
    const store = await getStore();
    if (store) {
      const supabase = await getServerSupabase();
      const { data } = await supabase
        .from("ecom_products")
        .select("slug, ecom_variants(id, price_cad, attribute_value, is_active)")
        .eq("store_id", store.id)
        .eq("status", "active")
        .in("slug", slugs);
      rows = (data as Row[]) ?? [];
    }
  } catch (err) {
    console.error("Visualizer catalog lookup failed:", err);
  }
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const variantsFor = (slug: string): VzVariant[] =>
    (bySlug.get(slug)?.ecom_variants ?? [])
      .filter((v) => v.is_active)
      .map((v) => ({ id: v.id, label: v.attribute_value ?? "Standard", price: Number(v.price_cad) }));

  return {
    siteName: BRAND.name,
    domain: "permanentlightingdirect.ca",
    cart: true,
    trackPieceFeet: TRACK_PIECE_FEET,
    lightsPerStrand: LIGHTS_PER_STRAND,
    colours: kitColours.map((c) => ({ key: c.key, label: c.label, hex: c.hex })),
    components: kitComponents.map((c) => {
      const variants = variantsFor(c.productSlug);
      const prices = variants.map((v) => v.price).filter((p): p is number => p !== null);
      return {
        key: c.key,
        name: c.name,
        blurb: c.blurb,
        image: c.image,
        price: prices.length ? Math.min(...prices) : null,
        url: `/product/${c.productSlug}`,
        // Pucks come 10 to a pack (2 strands) and track 2 to a pack: 7 ft per unit.
        packFeet: c.key === "strand" || c.key === "track" ? TRACK_PIECE_FEET * 2 : undefined,
        variants: variants.length ? variants : undefined,
      };
    }),
    kits: kits.map((k) => ({ slug: k.slug, feet: k.feet, price: k.price, suits: k.suits, bom: k.bom, url: `/product/${k.slug}`, variants: variantsFor(k.slug) })),
  };
});
