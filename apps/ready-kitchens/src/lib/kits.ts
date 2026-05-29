import { createServerSupabase } from "./supabase";
import codesData from "@/content/cabinet-codes.json";

export type KitItem = {
  sku: string;
  name: string;
  qty: number;
  note?: string | null;
  unit_cost_cad: number;
  unit_retail_cad: number;
  line_cost_cad: number;
  line_retail_cad: number;
  width_in: number | null;
};

export type Kit = {
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
  items: KitItem[];
  total_cost_cad: number;
  total_retail_cad: number;
  total_profit_cad: number;
  markup_pct: number;
  savings_vs_retail_cad: number;
};

export type Cabinet = {
  sku: string;
  name: string;
  type: string;
  width_in: number | null;
  cost_cad: number;
  retail_cad: number;
  in_stock: boolean;
};

export type CabinetCode = {
  code: string;
  label: string;
  description: string;
};

const CODES = codesData as CabinetCode[];

type RawItem = {
  position: number;
  sku: string;
  qty: number;
  note: string | null;
  kit_slug: string;
};

type RawKit = {
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

async function loadAll(): Promise<{ kits: Kit[]; cabinets: Cabinet[] }> {
  const sb = createServerSupabase();
  const [{ data: rawKits }, { data: rawItems }, { data: cabinets }] = await Promise.all([
    sb.from("readykitchens_kits").select("*").eq("is_active", true).order("price_cad"),
    sb.from("readykitchens_kit_items").select("*").order("position"),
    sb.from("readykitchens_cabinets").select("*"),
  ]);
  const cabs = (cabinets as Cabinet[]) ?? [];
  const cabMap = Object.fromEntries(cabs.map((c) => [c.sku, c]));
  const itemsByKit: Record<string, RawItem[]> = {};
  for (const it of (rawItems as RawItem[]) ?? []) {
    (itemsByKit[it.kit_slug] ||= []).push(it);
  }
  const kits = ((rawKits as RawKit[]) ?? []).map((k) => enrich(k, itemsByKit[k.slug] ?? [], cabMap));
  return { kits, cabinets: cabs };
}

function enrich(kit: RawKit, items: RawItem[], cabMap: Record<string, Cabinet>): Kit {
  let cost = 0;
  let retail = 0;
  const enrichedItems: KitItem[] = items.map((it) => {
    const cab = cabMap[it.sku];
    const unit_cost = Number(cab?.cost_cad ?? 0);
    const unit_retail = Number(cab?.retail_cad ?? 0);
    const lineCost = unit_cost * it.qty;
    const lineRetail = unit_retail * it.qty;
    cost += lineCost;
    retail += lineRetail;
    return {
      sku: it.sku,
      name: cab?.name ?? it.sku,
      qty: it.qty,
      note: it.note,
      unit_cost_cad: unit_cost,
      unit_retail_cad: unit_retail,
      line_cost_cad: lineCost,
      line_retail_cad: lineRetail,
      width_in: cab?.width_in ?? null,
    };
  });
  const price = Number(kit.price_cad);
  return {
    ...kit,
    price_cad: price,
    items: enrichedItems,
    total_cost_cad: cost,
    total_retail_cad: retail,
    total_profit_cad: price - cost,
    markup_pct: cost > 0 ? ((price - cost) / cost) * 100 : 0,
    savings_vs_retail_cad: retail - price,
  };
}

export async function getAllKits(): Promise<Kit[]> {
  const { kits } = await loadAll();
  return kits;
}

export async function getKitBySlug(slug: string): Promise<Kit | undefined> {
  const { kits } = await loadAll();
  return kits.find((k) => k.slug === slug);
}

export function getCabinetCodes(): CabinetCode[] {
  return CODES;
}

export async function getAllCabinets(): Promise<Cabinet[]> {
  const { cabinets } = await loadAll();
  return cabinets;
}
