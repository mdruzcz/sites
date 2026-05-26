import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
