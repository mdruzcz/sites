import sharp from "sharp";
import { writeFileSync } from "node:fs";

const W = 1200, H = 630;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="62%" stop-color="#fdf7f8"/>
      <stop offset="100%" stop-color="#f7eef0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>

  <!-- brand mark -->
  <rect x="80" y="72" width="56" height="56" rx="16" fill="#e1485e"/>
  <g fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round">
    <path d="M94 104c5 0 5 5 10 5s5-5 10-5 5 5 10 5"/>
    <path d="M94 114c5 0 5 5 10 5s5-5 10-5 5 5 10 5"/>
  </g>
  <text x="152" y="110" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="27" font-weight="700" fill="#222222">
    <tspan fill="#e1485e">Off Season</tspan> Rentals
  </text>

  <text x="80" y="248" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="66" font-weight="800" fill="#222222" letter-spacing="-2">The cottage you cannot</text>
  <text x="80" y="322" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="66" font-weight="800" fill="#222222" letter-spacing="-2">afford in July, rented</text>
  <text x="80" y="396" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="66" font-weight="800" fill="#e1485e" letter-spacing="-2">by the month.</text>

  <text x="80" y="464" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="27" fill="#717171">Furnished Port Stanley homes · September to May · Utilities included</text>

  <g font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="21" font-weight="600">
    <rect x="80" y="506" width="205" height="48" rx="24" fill="#ffffff" stroke="#dddddd"/>
    <text x="104" y="537" fill="#222222">1 month minimum</text>
    <rect x="301" y="506" width="230" height="48" rx="24" fill="#ffffff" stroke="#dddddd"/>
    <text x="325" y="537" fill="#222222">15 min to St. Thomas</text>
    <rect x="547" y="506" width="192" height="48" rx="24" fill="#ffffff" stroke="#dddddd"/>
    <text x="571" y="537" fill="#222222">35 min to London</text>
  </g>

  <!-- lake -->
  <g fill="none" stroke="#e1485e" stroke-opacity="0.16" stroke-width="10" stroke-linecap="round">
    <path d="M840 210c30 0 30 26 60 26s30-26 60-26 30 26 60 26 30-26 60-26"/>
    <path d="M840 268c30 0 30 26 60 26s30-26 60-26 30 26 60 26 30-26 60-26"/>
    <path d="M840 326c30 0 30 26 60 26s30-26 60-26 30 26 60 26 30-26 60-26"/>
  </g>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#e1485e"/>
</svg>`;

const buf = await sharp(Buffer.from(svg)).jpeg({ quality: 90, chromaSubsampling: "4:4:4" }).toBuffer();
writeFileSync("public/og.jpg", buf);
console.log("og.jpg written:", buf.length, "bytes");
