import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/contact-us-2", destination: "/contact-us", permanent: true },
      { source: "/contact-us-2/", destination: "/contact-us", permanent: true },
      { source: "/Privacy-Policy", destination: "/privacy-policy", permanent: true },
      { source: "/Privacy-Policy/", destination: "/privacy-policy", permanent: true },
      { source: "/tos", destination: "/terms-of-service", permanent: true },
      { source: "/tos/", destination: "/terms-of-service", permanent: true },
      { source: "/category/fencing", destination: "/", permanent: true },
      { source: "/category/uncategorized", destination: "/", permanent: true },
      { source: "/locations.kml", destination: "/", permanent: true },
    ];
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
