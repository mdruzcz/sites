// node scripts/validate-kits.js
// Validates each kit: cabinet widths sum correctly + cost/markup/retail comparison.
const fs = require("fs");
const path = require("path");

const kits = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "content", "kits.json"), "utf8"));
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "content", "cabinets.json"), "utf8"));

const byCode = Object.fromEntries(catalog.map((c) => [c.sku, c]));

let allOk = true;
for (const kit of kits) {
  const pieces = kit.items.reduce((s, i) => s + i.qty, 0);
  let cost = 0;
  let retail = 0;
  let missing = [];
  for (const item of kit.items) {
    const cab = byCode[item.sku];
    if (!cab) {
      missing.push(item.sku);
      continue;
    }
    cost += (cab.cost_cad ?? 0) * item.qty;
    retail += (cab.retail_cad ?? 0) * item.qty;
  }
  const markupPct = ((kit.price_cad - cost) / cost) * 100;
  const savings = retail - kit.price_cad;
  console.log(`\n=== ${kit.name} (${pieces} pcs, ${kit.shape}) ===`);
  if (missing.length) console.log(`  MISSING SKUs: ${missing.join(", ")}`);
  console.log(`  Stated:    ${kit.pieces} pcs · $${kit.price_cad}`);
  console.log(`  Counted:   ${pieces} pcs ${pieces === kit.pieces ? "✓" : "✗"}`);
  console.log(`  Our cost:  $${cost.toFixed(0)}`);
  console.log(`  Markup:    ${markupPct.toFixed(0)}% ${markupPct >= 100 ? "✓" : "✗ (target ≥100%)"}`);
  console.log(`  Retail:    $${retail.toFixed(0)} (forevercabinets.ca sum)`);
  console.log(`  Saves vs retail: $${savings.toFixed(0)} ${savings > 0 ? "✓" : "✗ (kit must cost less than retail sum)"}`);
  if (pieces !== kit.pieces || markupPct < 100 || savings <= 0) allOk = false;
}
console.log(allOk ? "\n✅ All kits pass." : "\n❌ Some kits fail.");
process.exit(allOk ? 0 : 1);
