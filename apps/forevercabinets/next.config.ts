import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["clsx", "tailwind-merge"],
  },
  async redirects() {
    return [{ source: "/visualizer", destination: "/planner", permanent: true }];
  },
};

export default nextConfig;
