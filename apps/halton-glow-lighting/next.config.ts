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
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/frequently-asked-questions-faq", destination: "/faq", permanent: true },
      { source: "/frequently-asked-questions-faq/", destination: "/faq", permanent: true },
      { source: "/light-installer-in-burlington", destination: "/service-areas/burlington", permanent: true },
      { source: "/light-installer-in-burlington/", destination: "/service-areas/burlington", permanent: true },
      { source: "/light-installer-in-oaksville", destination: "/service-areas/oakville", permanent: true },
      { source: "/light-installer-in-oaksville/", destination: "/service-areas/oakville", permanent: true },
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
