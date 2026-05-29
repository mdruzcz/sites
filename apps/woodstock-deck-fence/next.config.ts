import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "woodstockdeckandfence.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Vary", value: "Accept-Encoding" }],
      },
    ];
  },
};

export default nextConfig;
