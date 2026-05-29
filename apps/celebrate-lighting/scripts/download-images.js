const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const IMAGES_DIR = path.join(__dirname, "../public/images");
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

const images = [
  // Logo
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/09/cropped-Celebrate-Lighting.png", dest: "logo.png" },
  // Hero / project photos
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/09/IMG-20250831-WA0005.jpg", dest: "project-tillsonburg.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/09/IMG-20250831-WA0008.jpg", dest: "project-brantford.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/09/IMG-20250831-WA0004.jpg", dest: "project-london.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/09/Celebrate-Lighting-1024x770.jpg", dest: "hero-main.jpg" },
  // Gallery
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/11/IMG-20251103-WA0011-1024x770.jpg", dest: "gallery-1.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/11/IMG-20251103-WA0014-1024x770.jpg", dest: "gallery-2.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/11/IMG-20251103-WA0012-1024x770.jpg", dest: "gallery-3.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/11/IMG-20251103-WA0013-1024x770.jpg", dest: "gallery-4.jpg" },
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/11/IMG-20251103-WA0001-576x1024.jpg", dest: "gallery-5.jpg" },
  // Blog thumbnails
  { url: "https://celebratelighting.ca/wp-content/uploads/2025/09/Whisk_86ca8deae3-1024x559.jpg", dest: "blog-supplier.jpg" },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(IMAGES_DIR, dest);
    if (fs.existsSync(destPath)) { console.log(`  skip  ${dest}`); return resolve(); }
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); console.log(`  ✓  ${dest}`); resolve(); });
    }).on("error", (err) => { fs.unlinkSync(destPath); reject(err); });
  });
}

(async () => {
  console.log("Downloading images...");
  for (const img of images) {
    try { await download(img.url, img.dest); }
    catch (e) { console.error(`  ✗  ${img.dest}: ${e.message}`); }
  }
  console.log("Done.");
})();
