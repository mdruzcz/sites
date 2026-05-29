import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  transpilePackages: ["@sites/ui", "@sites/db", "@sites/cms"],
  images: {
<<<<<<< HEAD
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "woodstockdeckandfence.ca",
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "londondeckbuilder.ca",
>>>>>>> origin/main
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
<<<<<<< HEAD
        headers: [{ key: "Vary", value: "Accept-Encoding" }],
=======
        headers: [
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
>>>>>>> origin/main
      },
    ];
  },
};

export default nextConfig;
