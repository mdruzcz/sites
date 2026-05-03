import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages aren't pre-built; let Next compile them.
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"]
};

export default nextConfig;
