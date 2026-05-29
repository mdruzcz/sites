import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/services/", destination: "/#services", permanent: true },
      { source: "/service-areas", destination: "/#service-areas", permanent: true },
      { source: "/service-areas/", destination: "/#service-areas", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/contact/", destination: "/#contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Vary", value: "Accept-Encoding" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
