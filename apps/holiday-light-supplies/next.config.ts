import type { NextConfig } from "next";

// Source-site → new-site redirect map (preserves SEO from the WordPress URLs).
// Every URL that was live before the 2026-10 rebuild still resolves: product,
// category and page slugs are unchanged; only additions were made.
const wpRedirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/professional-installer/", destination: "/professional-installer", permanent: true },
  { source: "/shipping-returns/", destination: "/shipping-returns", permanent: true },
  { source: "/warranty/", destination: "/warranty", permanent: true },
  { source: "/faq/", destination: "/faq", permanent: true },
  { source: "/contact-us/", destination: "/contact-us", permanent: true },
  { source: "/privacy-policy-2/", destination: "/privacy", permanent: true },
  { source: "/privacy-policy/", destination: "/privacy", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
  { source: "/terms-of-service/", destination: "/terms-of-service", permanent: true },
  { source: "/cart/", destination: "/cart", permanent: false },
  { source: "/checkout/", destination: "/checkout", permanent: false },
  { source: "/my-account", destination: "/account", permanent: true },
  { source: "/my-account/", destination: "/account", permanent: true },
  { source: "/product-category/:slug/", destination: "/product-category/:slug", permanent: true },
  { source: "/product/:slug/", destination: "/product/:slug", permanent: true },
  // Archived duplicate product slug that still ranks in Google — 301 to the live canonical product.
  { source: "/product/c9-faceted-bulb-warm-white-2", destination: "/product/c9-faceted-bulb-warm-white", permanent: true },
  // fuchsia is not carried; send the old URL to the closest colour
  { source: "/product/c9-faceted-bulb-fuchsia", destination: "/product/c9-faceted-bulb-pink", permanent: true },
  // Rebuild additions: friendly aliases
  { source: "/wholesale", destination: "/commercial", permanent: true },
  { source: "/commercial-christmas-lights", destination: "/commercial", permanent: true },
  { source: "/quote", destination: "/request-a-quote", permanent: true },
  { source: "/guides", destination: "/resources", permanent: true },
  { source: "/blog", destination: "/resources", permanent: true },
  { source: "/installers", destination: "/professional-installer", permanent: true },
  { source: "/permanent-lights", destination: "/product-category/permanent-lighting-kits", permanent: true },
  { source: "/kits", destination: "/product-category/permanent-lighting-kits", permanent: true }
];

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }]
  },
  async redirects() {
    return wpRedirects;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ]
      },
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      }
    ];
  }
};

export default config;
