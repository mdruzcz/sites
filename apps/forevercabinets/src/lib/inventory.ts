import { createServerSupabase } from "./supabase";

export type StockInfo = {
  on_hand: number;
  in_stock: boolean;
  low_stock: boolean;
  status: "active" | "draft" | "archived";
};

let cache: { ts: number; data: Record<string, StockInfo> } | null = null;
const CACHE_TTL_MS = 60_000; // 1 minute server-side cache; ISR also handles caching

const STORE_ID = "c4fcc995-4fbe-4e01-9741-c07bcd8fa90b";

export async function getInventoryMap(): Promise<Record<string, StockInfo>> {
  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) return cache.data;

  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("ecom_variants")
      .select(
        "sku, ecom_products!inner(store_id, status), ecom_inventory(on_hand, low_stock_threshold, track_inventory)",
      );
    if (error || !data) {
      console.warn("Inventory fetch failed; defaulting to in-stock:", error?.message);
      cache = { ts: Date.now(), data: {} };
      return cache.data;
    }
    const map: Record<string, StockInfo> = {};
    for (const row of data as Array<{
      sku: string;
      ecom_products?: { store_id: string; status: string } | { store_id: string; status: string }[];
      ecom_inventory?:
        | { on_hand: number; low_stock_threshold: number; track_inventory: boolean }
        | { on_hand: number; low_stock_threshold: number; track_inventory: boolean }[];
    }>) {
      const prod = Array.isArray(row.ecom_products) ? row.ecom_products[0] : row.ecom_products;
      if (!prod || prod.store_id !== STORE_ID) continue;
      const inv = Array.isArray(row.ecom_inventory) ? row.ecom_inventory[0] : row.ecom_inventory;
      const on_hand = inv?.on_hand ?? 0;
      const threshold = inv?.low_stock_threshold ?? 5;
      const tracked = inv?.track_inventory ?? true;
      map[row.sku] = {
        on_hand,
        in_stock: !tracked || on_hand > 0,
        low_stock: tracked && on_hand > 0 && on_hand <= threshold,
        status: (prod.status as StockInfo["status"]) ?? "active",
      };
    }
    cache = { ts: Date.now(), data: map };
    return map;
  } catch (e) {
    console.warn("Inventory fetch threw:", e);
    return {};
  }
}

export async function getStockForSku(sku: string): Promise<StockInfo | undefined> {
  const map = await getInventoryMap();
  return map[sku];
}
