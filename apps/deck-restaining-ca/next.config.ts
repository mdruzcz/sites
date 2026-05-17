import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  transpilePackages: ["@sites/ui", "@sites/db"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
