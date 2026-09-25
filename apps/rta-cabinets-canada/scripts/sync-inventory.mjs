// Pull cabinet stock + prices from the Master Decker command center (local SQLite) into
// src/content/inventory.json. Run about once a month (or after a count):
//
//   node --experimental-sqlite scripts/sync-inventory.mjs
//   node --experimental-sqlite scripts/sync-inventory.mjs "D:/path/to/accounting.db"
//
// Then commit + push; the site reads the snapshot at build/run time (no live database).

import { DatabaseSync } from "node:sqlite";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.argv[2] ?? "C:/Users/Matt/Documents/Claude/Projects/Erpnext Clone/data/accounting.db";
const OUT = path.join(HERE, "..", "src", "content", "inventory.json");
const CATALOG = path.join(HERE, "..", "src", "content", "cabinets.json");

// Command-center SKU -> website SKU(s)
const ALIASES = {
  "BBC42-45": ["BBC42", "BBC45"],
  WDCG243612: ["WDCG2463612"],
  "SAMPLE-DOOR": ["WHITE-SHAKER"],
  SPICE09: ["SR9"],
};

const db = new DatabaseSync(DB_PATH, { readOnly: true });
const rows = db
  .prepare(
    `select i.sku, i.item_name, i.lifecycle, i.on_order_qty,
            coalesce((select sum(qty) from stock_ledger s where s.item_id = i.id), 0) as on_hand,
            p.list_price, p.sale_price
       from item i left join item_price p on p.item_id = i.id
      where i.business_unit = 'Cabinets' and i.is_active = 1`,
  )
  .all();

const catalog = JSON.parse(readFileSync(CATALOG, "utf8"));
const siteSkus = new Set(catalog.map((c) => c.sku));
const items = {};
for (const r of rows) {
  const targets = ALIASES[r.sku] ?? [r.sku];
  for (const sku of targets) {
    items[sku] = {
      on_hand: Math.max(0, Math.round(r.on_hand ?? 0)),
      on_order: Math.max(0, Math.round(r.on_order_qty ?? 0)),
      list_price: r.list_price ?? null,
      lifecycle: r.lifecycle ?? "stocked",
      name: r.item_name,
      on_site: siteSkus.has(sku),
    };
  }
}
const snapshot = {
  generatedAt: new Date().toISOString(),
  source: "Master Decker command center (item + stock_ledger)",
  dbPath: DB_PATH,
  items,
};
writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + "\n");
const onSite = Object.entries(items).filter(([, v]) => v.on_site);
const missing = catalog.filter((c) => !items[c.sku]).map((c) => c.sku);
console.log(`wrote ${OUT}`);
console.log(`${onSite.length} site SKUs matched; out of stock: ${onSite.filter(([, v]) => v.on_hand === 0 && v.lifecycle === "stocked").map(([k]) => k).join(", ") || "none"}`);
if (missing.length) console.log(`site SKUs with no command-center row (treated as untracked/in stock): ${missing.join(", ")}`);
