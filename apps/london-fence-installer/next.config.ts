import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
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
        headers: [
          { key: "Vary", value: "Accept-Encoding" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
