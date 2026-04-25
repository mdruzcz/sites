import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "londondeckbuilder.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
