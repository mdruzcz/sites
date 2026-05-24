import type { NextConfig } from "next";
import path from "node:path";

const wpRedirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/shop/", destination: "/shop", permanent: true },
  { source: "/cart/", destination: "/cart", permanent: false },
  { source: "/checkout/", destination: "/checkout", permanent: false },
  { source: "/contact-us/", destination: "/contact-us", permanent: true },
  { source: "/how-it-works/", destination: "/how-it-works", permanent: true },
  { source: "/professional-installer-program/", destination: "/professional-installer", permanent: true },
  { source: "/frequently-asked-questions-faq/", destination: "/faq", permanent: true },
  { source: "/installers/", destination: "/installers", permanent: true },
  { source: "/my-account/", destination: "/account", permanent: false }
];

const config: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "permanentlightingdirect.ca" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  async redirects() {
    return wpRedirects;
  }
};

export default config;
