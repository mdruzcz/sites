import type { NextConfig } from "next";

const redirects: { source: string; destination: string; permanent: boolean }[] = [
  // WordPress-era paths
  { source: "/shop/", destination: "/shop", permanent: true },
  { source: "/cart/", destination: "/cart", permanent: false },
  { source: "/checkout/", destination: "/checkout", permanent: false },
  { source: "/contact-us/", destination: "/contact-us", permanent: true },
  { source: "/how-it-works/", destination: "/how-it-works", permanent: true },
  { source: "/professional-installer-program/", destination: "/professional-installer", permanent: true },
  { source: "/frequently-asked-questions-faq/", destination: "/faq", permanent: true },
  { source: "/installers/", destination: "/installers", permanent: true },
  { source: "/my-account/", destination: "/account", permanent: false },
  { source: "/product-category/permanent-lighting-kits", destination: "/diy-kits", permanent: true },
  { source: "/product-category/diy-kits", destination: "/diy-kits", permanent: true },
  // 2026-09 catalogue clean-up: everything is 12V, kits match Forever Lights sizes
  { source: "/product/led-housing-package-125", destination: "/product/led-housing-package-150", permanent: true },
  { source: "/product/led-housing-package-175", destination: "/product/led-housing-package-200", permanent: true },
  { source: "/product/24v-led-puck-lights-10-qty", destination: "/product/12v-led-puck-lights-10-pack", permanent: true },
  { source: "/product/24v-led-strip", destination: "/product-category/lights", permanent: true },
  { source: "/product/24v-showcone-lights-10-qty", destination: "/product/12v-showcone-lights-10-pack", permanent: true },
  { source: "/product/24v-150w-power-supply", destination: "/product/12v-150w-power-supply", permanent: true },
  { source: "/product/24v-300w-power-supply", destination: "/product/12v-300w-power-supply", permanent: true },
  { source: "/product/24v-60w-power-supply", destination: "/product/12v-60w-pwr-supply-for-power-inj", permanent: true },
  { source: "/product/12v-60w-pwr-supply-for-power-in", destination: "/product/12v-60w-pwr-supply-for-power-inj", permanent: true },
  { source: "/product/20ft-pwr-inj-cable-for-controller-2", destination: "/product/20ft-pwr-inj-cable-for-controller", permanent: true },
  { source: "/product/2-channel-12-24v-led-controller", destination: "/product/2-channel-12v-led-controller", permanent: true },
  { source: "/product/4-channel-12-24v-controller", destination: "/product/4-channel-12v-controller", permanent: true },
  { source: "/product/aluminum-track-for-12-24v-led-lights-2-qty", destination: "/product/aluminum-track-12v-led-lights-2-pack", permanent: true },
  { source: "/product/black-track-for-24v-showcone-lights", destination: "/product/black-track-for-12v-showcone-lights", permanent: true },
  { source: "/product/white-track-for-24v-showcone-lights", destination: "/product/white-track-for-12v-showcone-lights", permanent: true }
];

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1800],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }]
  },
  async redirects() {
    return redirects;
  }
};

export default config;
