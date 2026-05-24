import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "holidaylightsdirect.ca" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  experimental: {
    serverActions: { bodySizeLimit: "10mb" }
  }
};

export default config;
