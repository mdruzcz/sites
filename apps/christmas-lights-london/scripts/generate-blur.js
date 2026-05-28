/**
 * Blur placeholder generator
 * Outputs a shimmer blurDataURL for use as placeholder="blur" blurDataURL
 * in Next.js <Image> components.
 *
 * Usage: node scripts/generate-blur.js
 */

const shimmerBlur =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1a2a1e" stop-opacity="1"/>
          <stop offset="50%" stop-color="#2a3a2e" stop-opacity="1"/>
          <stop offset="100%" stop-color="#1a2a1e" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#g)"/>
    </svg>`
  ).toString("base64");

console.log("shimmerBlur:", shimmerBlur);
console.log("\nPaste this into your component:");
console.log(`blurDataURL="${shimmerBlur}"`);
