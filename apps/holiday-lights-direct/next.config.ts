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
  // 2026-09-04 catalogue clean-up: renamed / archived products and categories
  { source: "/product/24v-led-puck-lights-10-pack-bright-energy-efficient-low-profile-design", destination: "/product/12v-led-puck-lights-10-pack", permanent: true },
  { source: "/product/plain-wire-spt-2", destination: "/product/spt-2-wire-spool-250ft-white", permanent: true },
  { source: "/product/led-housing-package-125", destination: "/product/led-housing-package-150", permanent: true },
  { source: "/product/led-housing-package-175", destination: "/product/led-housing-package-200x", permanent: true },
  { source: "/product/c9-faceted-bulb-fuchsia", destination: "/product/c9-faceted-bulb-pink", permanent: true },
  { source: "/product-category/decor-other-lights", destination: "/product-category/permanent-lights", permanent: true },
  { source: "/product-category/power-injection-cables", destination: "/product-category/led-connectors", permanent: true }
];

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Our largest source photo is 2200px wide. Without this cap Next offers a
    // 3840px candidate, the browser picks it for any `sizes: 100vw` image, and
    // the optimizer stalls encoding several oversized AVIFs at once — the
    // images then never paint and sections render as blank bands.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [96, 160, 240, 320, 480, 640],
    remotePatterns: [
      { protocol: "https", hostname: "holidaylightsdirect.ca" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  async redirects() {
    return wpRedirects;
  }
};

export default config;
