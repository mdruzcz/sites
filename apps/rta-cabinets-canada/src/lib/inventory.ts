// Live inventory from the shared Supabase project.
// The RTA store has no product rows of its own yet; the physical stock is tracked on the
// Forever Cabinets store (same 58 White Shaker SKUs), so we read RTA rows first and fall
// back to Forever Cabinets rows for the same SKU. Matt edits counts in admin → Inventory.

import { createServerSupabase } from "./supabase";

export type StockInfo = {
  on_hand: number;
  in_stock: boolean;
  low_stock: boolean;
};

const RTA_STORE_ID = "16d7e92b-f929-4660-8214-77c32ed33f5f";
const FC_STORE_ID = "c4fcc995-4fbe-4e01-9741-c07bcd8fa90b";
const CACHE_TTL_MS = 60_000;

let cache: { ts: number; data: Record<string, StockInfo> } | null = null;

/** Match SKUs across the two catalogs: case/punctuation-insensitive plus a few explicit aliases. */
export function stockKey(sku: string): string {
  const alias: Record<string, string> = {
    BBC42: "BBC4245",
    BBC45: "BBC4245",
    WDCG2463612: "WDCG243612",
    WHITESHAKER: "SAMPLEDOORWS",
  };
  const k = sku.toUpperCase().replace(/×/g, "X").replace(/[^A-Z0-9]/g, "");
  return alias[k] ?? k;
}

type Row = {
  sku: string;
  ecom_products?: { store_id: string; status: string } | { store_id: string; status: string }[];
  ecom_inventory?:
    | { on_hand: number; low_stock_threshold: number; track_inventory: boolean }
    | { on_hand: number; low_stock_threshold: number; track_inventory: boolean }[];
};

export async function getInventoryMap(): Promise<Record<string, StockInfo>> {
  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) return cache.data;
  const supabase = createServerSupabase();
  if (!supabase) return {};
  try {
    const { data, error } = await supabase
      .from("ecom_variants")
      .select("sku, ecom_products!inner(store_id, status), ecom_inventory(on_hand, low_stock_threshold, track_inventory)")
      .in("ecom_products.store_id", [RTA_STORE_ID, FC_STORE_ID]);
    if (error || !data) {
      console.warn("Inventory fetch failed:", error?.message);
      return cache?.data ?? {};
    }
    const rta: Record<string, StockInfo> = {};
    const fc: Record<string, StockInfo> = {};
    for (const row of data as Row[]) {
      const prod = Array.isArray(row.ecom_products) ? row.ecom_products[0] : row.ecom_products;
      if (!prod || prod.status === "archived") continue;
      const inv = Array.isArray(row.ecom_inventory) ? row.ecom_inventory[0] : row.ecom_inventory;
      const on_hand = inv?.on_hand ?? 0;
      const threshold = inv?.low_stock_threshold ?? 5;
      const tracked = inv?.track_inventory ?? true;
      const info: StockInfo = { on_hand, in_stock: !tracked || on_hand > 0, low_stock: tracked && on_hand > 0 && on_hand <= threshold };
      (prod.store_id === RTA_STORE_ID ? rta : fc)[stockKey(row.sku)] = info;
    }
    const merged = { ...fc, ...rta };
    cache = { ts: Date.now(), data: merged };
    return merged;
  } catch (e) {
    console.warn("Inventory fetch threw:", e);
    return cache?.data ?? {};
  }
}

export async function getStockForSku(sku: string): Promise<StockInfo | undefined> {
  const map = await getInventoryMap();
  return map[stockKey(sku)];
}

/** Re-key an inventory map by the catalog's own SKUs so client code can look up directly. */
export function mapForSkus(map: Record<string, StockInfo>, skus: string[]): Record<string, StockInfo> {
  const out: Record<string, StockInfo> = {};
  for (const sku of skus) {
    const s = map[stockKey(sku)];
    if (s) out[sku] = s;
  }
  return out;
}
