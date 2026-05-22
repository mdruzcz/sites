import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/get-a-quote", destination: "/contact", permanent: true },
      { source: "/get-a-quote/", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
