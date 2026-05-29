#!/usr/bin/env node
// Downloads images from the original WordPress site to /public/images
// Usage: node scripts/download-images.js
const fs = require("fs");
const path = require("path");
const https = require("https");

const OUT = path.join(__dirname, "..", "public", "images");
fs.mkdirSync(OUT, { recursive: true });

// Map of remote source -> local filename
const IMAGES = [
  // Logo + brand
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/09/We-Install-Hang-Christmas-Lights.png", "logo.png"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/09/We-Install-Hang-Christmas-Lights.png", "logo-light.png"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2024/06/We-install-Christmas-Lights-Light-installation.jpg", "og-default.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2024/06/We-install-Christmas-Lights-Light-installation.jpg", "hero-house.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7749-1-scaled.jpg", "pitch-house.jpg"],

  // Package grid
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/08/IMG_20201117_193514450-1.jpg", "package-design.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/07/image1.png", "package-install.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7749-1-scaled.jpg", "package-maintenance.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7742-1-scaled.jpg", "package-storage.jpg"],

  // Reviews
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/08/6881674796838220017.jpg", "review-john.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8251-1-scaled.jpg", "review-jonathan.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/08/image1.png", "review-mike.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8346-scaled.jpg", "review-philipe.jpg"],

  // 10 reasons + about
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7792-scaled.jpg", "why-choose.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/image0000011-1.jpg", "about-team.jpg"],

  // Service cards
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8241-1-scaled.jpg", "residential-lights.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8253-1-scaled.jpg", "residential-decor.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7749-1-scaled.jpg", "full-season.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7742-1-scaled.jpg", "takedown.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8346-scaled.jpg", "storage.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7792-scaled.jpg", "govee.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8251-1-scaled.jpg", "eufy.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/image0000011-1.jpg", "commercial-lights.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/11/126159195_1187209065032750_1616765422360259624_o.jpg", "commercial-decor.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/Bruce-Hotel-Inside.jpg", "commercial-trees.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/st-jacobs-sparkles.jpg", "commercial-holiday.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7749-1-scaled.jpg", "service-default.jpg"],

  // Industries
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/Christmas-Decorations-For-Offices-300x169.jpeg", "industry-bank.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/Christmas-Tree-Office-285x300.jpg", "industry-mall.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/Bruce-Hotel-Inside.jpg", "industry-casino.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/st-jacobs-sparkles.jpg", "industry-restaurant.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2016/11/126159195_1187209065032750_1616765422360259624_o.jpg", "industry-hotel.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8241-1-scaled.jpg", "industry-hoa.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8253-1-scaled.jpg", "industry-church.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/Christmas-Decorations-For-Offices-300x169.jpeg", "industry-office.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7792-scaled.jpg", "industry-municipality.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8251-1-scaled.jpg", "industry-event.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8346-scaled.jpg", "industry-production.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/08/Christmas-Tree-Office-285x300.jpg", "industry-retail.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_7749-1-scaled.jpg", "industry-dealership.jpg"],
  ["https://weinstallchristmaslights.ca/wp-content/uploads/2023/07/IMG_8241-1-scaled.jpg", "industry-default.jpg"],
];

function download(url, filename) {
  return new Promise((resolve) => {
    const outPath = path.join(OUT, filename);
    if (fs.existsSync(outPath)) {
      console.log(`✓ ${filename} already exists`);
      return resolve(true);
    }
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`✗ ${filename}: HTTP ${res.statusCode}`);
        res.resume();
        return resolve(false);
      }
      const file = fs.createWriteStream(outPath);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`✓ ${filename}`);
        resolve(true);
      });
    }).on("error", (err) => {
      console.warn(`✗ ${filename}: ${err.message}`);
      resolve(false);
    });
  });
}

(async () => {
  for (const [url, filename] of IMAGES) {
    await download(url, filename);
  }
  console.log("Done.");
})();
