import { getServiceSupabase } from "@/lib/supabase/server";

export type RkCabinet = {
  sku: string;
  name: string;
  type: string;
  width_in: number | null;
  cost_cad: number;
  retail_cad: number;
  in_stock: boolean;
};

export type RkKit = {
  slug: string;
  name: string;
  tagline: string | null;
  shape: string | null;
  pieces: number;
  price_cad: number;
  layout_fits: string | null;
  wall_a_inches: number | null;
  wall_b_inches: number | null;
  wall_c_inches: number | null;
  island_inches: number | null;
  range_inches: number | null;
  fridge_inches: number | null;
  best_for: string | null;
  summary: string | null;
  hero_image: string | null;
  highlights: string[];
  gallery: string[];
  is_active: boolean;
};

export type RkKitItem = {
  id: number;
  kit_slug: string;
  position: number;
  sku: string;
  qty: number;
  note: string | null;
};

export type RkKitWithCalc = RkKit & {
  items: Array<RkKitItem & { cabinet: RkCabinet | null; line_cost: number; line_retail: number }>;
  total_cost: number;
  total_retail: number;
  total_profit: number;
  markup_pct: number;
  savings_vs_retail: number;
  is_profitable: boolean;
};

export async function getAllCabinets(): Promise<RkCabinet[]> {
  const sb = getServiceSupabase();
  const { data } = await sb.from("readykitchens_cabinets").select("*").order("type").order("width_in");
  return (data as RkCabinet[]) ?? [];
}

export async function getCabinetBySku(sku: string): Promise<RkCabinet | null> {
  const sb = getServiceSupabase();
  const { data } = await sb.from("readykitchens_cabinets").select("*").eq("sku", sku).maybeSingle();
  return data as RkCabinet | null;
}

function enrichKit(kit: RkKit, items: RkKitItem[], cabMap: Record<string, RkCabinet>): RkKitWithCalc {
  let totalCost = 0;
  let totalRetail = 0;
  const enrichedItems = items.map((it) => {
    const cab = cabMap[it.sku] ?? null;
    const lineCost = (cab?.cost_cad ?? 0) * it.qty;
    const lineRetail = (cab?.retail_cad ?? 0) * it.qty;
    totalCost += lineCost;
    totalRetail += lineRetail;
    return { ...it, cabinet: cab, line_cost: lineCost, line_retail: lineRetail };
  });
  const profit = Number(kit.price_cad) - totalCost;
  return {
    ...kit,
    items: enrichedItems,
    total_cost: totalCost,
    total_retail: totalRetail,
    total_profit: profit,
    markup_pct: totalCost > 0 ? (profit / totalCost) * 100 : 0,
    savings_vs_retail: totalRetail - Number(kit.price_cad),
    is_profitable: profit > 0,
  };
}

export async function getAllKitsWithCalc(): Promise<RkKitWithCalc[]> {
  const sb = getServiceSupabase();
  const [{ data: kits }, { data: items }, { data: cabinets }] = await Promise.all([
    sb.from("readykitchens_kits").select("*").order("price_cad"),
    sb.from("readykitchens_kit_items").select("*").order("position"),
    sb.from("readykitchens_cabinets").select("*"),
  ]);
  const cabMap = Object.fromEntries(((cabinets as RkCabinet[]) ?? []).map((c) => [c.sku, c]));
  const itemsByKit: Record<string, RkKitItem[]> = {};
  for (const it of (items as RkKitItem[]) ?? []) {
    (itemsByKit[it.kit_slug] ||= []).push(it);
  }
  return ((kits as RkKit[]) ?? []).map((k) => enrichKit(k, itemsByKit[k.slug] ?? [], cabMap));
}

export async function getKitBySlugWithCalc(slug: string): Promise<RkKitWithCalc | null> {
  const sb = getServiceSupabase();
  const { data: kit } = await sb.from("readykitchens_kits").select("*").eq("slug", slug).maybeSingle();
  if (!kit) return null;
  const [{ data: items }, { data: cabinets }] = await Promise.all([
    sb.from("readykitchens_kit_items").select("*").eq("kit_slug", slug).order("position"),
    sb.from("readykitchens_cabinets").select("*"),
  ]);
  const cabMap = Object.fromEntries(((cabinets as RkCabinet[]) ?? []).map((c) => [c.sku, c]));
  return enrichKit(kit as RkKit, (items as RkKitItem[]) ?? [], cabMap);
}

export function formatCad(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
