import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream, existsSync } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { extname, basename } from "node:path";
import manifest from "./image-manifest.json" with { type: "json" };

const OUT_DIR = "public/images/migrated";
await mkdir(OUT_DIR, { recursive: true });

const used = new Set();

function uniqueName(url, source) {
  const raw = basename(new URL(url).pathname);
  const ext = (extname(raw) || ".jpg").toLowerCase();
  let stem = raw.replace(ext, "").replace(/[^a-z0-9-_]+/gi, "-").toLowerCase();
  let name = `${source}-${stem}${ext}`;
  let i = 1;
  while (used.has(name)) name = `${source}-${stem}-${i++}${ext}`;
  used.add(name);
  return name;
}

const downloaded = [];

for (const item of manifest) {
  try {
    const name = uniqueName(item.src, item.source);
    const dest = `${OUT_DIR}/${name}`;
    if (existsSync(dest)) {
      downloaded.push({ ...item, file: name, local: `/images/migrated/${name}` });
      console.log("→ exists", name);
      continue;
    }
    const res = await fetch(item.src, {
      headers: { "user-agent": "Mozilla/5.0 (image-migrator)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
    downloaded.push({ ...item, file: name, local: `/images/migrated/${name}` });
    console.log("✓", name);
  } catch (err) {
    console.warn("✗", item.src, err.message);
  }
}

await writeFile(
  "scripts/download-results.json",
  JSON.stringify(downloaded, null, 2),
);
console.log(`\nDownloaded ${downloaded.length}/${manifest.length} images.`);
