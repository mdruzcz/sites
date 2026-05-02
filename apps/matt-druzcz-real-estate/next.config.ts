import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"],
};

export default nextConfig;
