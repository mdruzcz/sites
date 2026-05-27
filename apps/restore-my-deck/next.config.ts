import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/service-locations", destination: "/service-areas", permanent: true },
      { source: "/repair-services", destination: "/deck-repair-and-maintenance", permanent: true },
      { source: "/repair-services-new", destination: "/deck-repair-and-maintenance", permanent: true },
      { source: "/repair-services-second", destination: "/deck-repair-and-maintenance", permanent: true },
      { source: "/uncategorized", destination: "/blog", permanent: true },
      { source: "/locations.kml", destination: "/", permanent: true },
      { source: "/thank-you", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
