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
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/concrete-sealing-faq", destination: "/faq", permanent: true },
      { source: "/concrete-sealing-faq/", destination: "/faq", permanent: true },
      { source: "/concrete-sealing-warranty-information", destination: "/warranty", permanent: true },
    ];
  },
};

export default nextConfig;
