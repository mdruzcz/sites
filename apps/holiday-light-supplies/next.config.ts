import type { NextConfig } from "next";

// Source-site → new-site redirect map (preserves SEO from the WordPress URLs).
const wpRedirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/professional-installer/", destination: "/professional-installer", permanent: true },
  { source: "/shipping-returns/", destination: "/shipping-returns", permanent: true },
  { source: "/warranty/", destination: "/warranty", permanent: true },
  { source: "/faq/", destination: "/faq", permanent: true },
  { source: "/contact-us/", destination: "/contact-us", permanent: true },
  { source: "/privacy-policy-2/", destination: "/privacy", permanent: true },
  { source: "/terms-of-service/", destination: "/terms-of-service", permanent: true },
  { source: "/cart/", destination: "/cart", permanent: false },
  // Archived duplicate product slug that still ranks in Google — 301 to the live canonical product.
  { source: "/product/c9-faceted-bulb-warm-white-2", destination: "/product/c9-faceted-bulb-warm-white", permanent: true },
  // fuchsia is not carried; send the old URL to the closest colour
  { source: "/product/c9-faceted-bulb-fuchsia", destination: "/product/c9-faceted-bulb-pink", permanent: true }
];

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  async redirects() {
    return wpRedirects;
  }
};

export default config;
