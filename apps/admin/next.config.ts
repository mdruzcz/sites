import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
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
