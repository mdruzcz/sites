import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
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
        headers: [{ key: "Vary", value: "Accept-Encoding" }],
      },
    ];
  },
};

export default nextConfig;
