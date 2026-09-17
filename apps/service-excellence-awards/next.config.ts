import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages aren't pre-built; let Next compile them.
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 2048],
  },
};

export default nextConfig;
