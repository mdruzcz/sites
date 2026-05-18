import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
