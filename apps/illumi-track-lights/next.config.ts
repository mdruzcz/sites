import type { NextConfig } from "next";
import path from "node:path";

// WP → new-site redirect map. Preserves SEO; matches every URL in the old sitemap.
const wpRedirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/all-products", destination: "/shop", permanent: true },
  { source: "/all-products/", destination: "/shop", permanent: true },
  { source: "/shop/", destination: "/shop", permanent: true },
  { source: "/cart/", destination: "/cart", permanent: false },
  { source: "/checkout/", destination: "/checkout", permanent: false },
  { source: "/my-account/", destination: "/account", permanent: false },
  { source: "/my-account", destination: "/account", permanent: false },
  { source: "/contact-us/", destination: "/contact-us", permanent: true },
  { source: "/about/", destination: "/about", permanent: true },
  { source: "/faq/", destination: "/faq", permanent: true },
  { source: "/installers/", destination: "/installers", permanent: true },
  { source: "/how-they-work/", destination: "/how-it-works", permanent: true },
  { source: "/how-they-work", destination: "/how-it-works", permanent: true },
  { source: "/how-to-videos/", destination: "/how-it-works", permanent: true },
  { source: "/how-to-videos", destination: "/how-it-works", permanent: true },
  { source: "/gallery/", destination: "/gallery", permanent: true },
  // WP category → our category routes
  { source: "/soffit-track-lights", destination: "/product-category/diy-kits", permanent: true },
  { source: "/soffit-track-lights/", destination: "/product-category/diy-kits", permanent: true },
  { source: "/puck-style-lights", destination: "/product-category/lights", permanent: true },
  { source: "/puck-style-lights/", destination: "/product-category/lights", permanent: true },
  { source: "/power-supplies", destination: "/product-category/power-supplies", permanent: true },
  { source: "/power-supplies/", destination: "/product-category/power-supplies", permanent: true },
  { source: "/power-injection-cables", destination: "/product-category/connectors", permanent: true },
  { source: "/power-injection-cables/", destination: "/product-category/connectors", permanent: true },
  { source: "/misc-lights", destination: "/product-category/lights", permanent: true },
  { source: "/misc-lights/", destination: "/product-category/lights", permanent: true },
  { source: "/led-controllers", destination: "/product-category/controllers", permanent: true },
  { source: "/led-controllers/", destination: "/product-category/controllers", permanent: true },
  { source: "/led-connectors", destination: "/product-category/connectors", permanent: true },
  { source: "/led-connectors/", destination: "/product-category/connectors", permanent: true },
  // Sample/hello-world stub pages → 404 elegantly via /
  { source: "/sample-page", destination: "/", permanent: true },
  { source: "/hello-world", destination: "/", permanent: true }
];

const config: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "illumitracklights.ca" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  async redirects() {
    return wpRedirects;
  }
};

export default config;
