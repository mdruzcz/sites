// Renders brand/logo.html to PNGs with the puppeteer install QuickQuote already has.
//   node brand/render-logo.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const require = createRequire("C:/Users/Matt/Documents/Claude/Projects/Quick Quote Calculator/package.json");
const puppeteer = require("puppeteer");
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "..", "public", "images");
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 3 });
await page.goto(pathToFileURL(path.join(here, "logo.html")).href);
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 400));
for (const [id, file] of [["logo", "logo.png"], ["logo-white", "logo-dark.png"], ["mark", "logo-mark.png"]]) {
  const el = await page.$("#" + id);
  await el.screenshot({ path: path.join(out, file), omitBackground: true });
  console.log("wrote", file);
}
await browser.close();
