import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imgDir = join(__dirname, "..", "public", "images");
mkdirSync(imgDir, { recursive: true });

const images = [
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg", file: "drive.jpg" },
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/PXL_20230718_125644595.jpg", file: "PXL_20230718_125644595.jpg" },
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/PXL_20230718_125644595-1024x771.jpg", file: "PXL_20230718_125644595-1024x771.jpg" },
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/IMG-20231218-WA0003.jpg", file: "IMG-20231218-WA0003.jpg" },
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/IMG-20231218-WA0005.jpg", file: "IMG-20231218-WA0005.jpg" },
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/image-5.png", file: "image-5.png" },
  { url: "https://londonconcreteforming.ca/wp-content/uploads/2025/09/Concrete-Contractor-in-St.-Thomas.png", file: "Concrete-Contractor-in-St.-Thomas.png" },
];

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "*/*",
  "Accept-Language": "en-US,en;q=0.9",
};

for (const img of images) {
  process.stdout.write(`Downloading ${img.file}... `);
  try {
    const res = await fetch(img.url, { headers });
    if (!res.ok) { console.log(`HTTP ${res.status}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    // Check magic bytes
    const magic = buf.slice(0, 4).toString("hex");
    const isJpeg = magic.startsWith("ffd8");
    const isPng = magic.startsWith("89504e47");
    if (!isJpeg && !isPng) {
      console.log(`NOT an image (got HTML/redirect, magic=${magic})`);
      continue;
    }
    writeFileSync(join(imgDir, img.file), buf);
    console.log(`OK (${buf.length} bytes)`);
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
  }
}
