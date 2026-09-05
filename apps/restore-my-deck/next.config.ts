import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Canonical host: www → apex (both were serving 200 with no canonical)
      { source: "/:path*", has: [{ type: "host", value: "www.restoremydeck.ca" }], destination: "https://restoremydeck.ca/:path*", permanent: true },
      // Old WordPress URLs
      { source: "/service-locations", destination: "/service-areas", permanent: true },
      { source: "/repair-services", destination: "/deck-repair-and-maintenance", permanent: true },
      { source: "/repair-services-new", destination: "/deck-repair-and-maintenance", permanent: true },
      { source: "/repair-services-second", destination: "/deck-repair-and-maintenance", permanent: true },
      { source: "/uncategorized", destination: "/blog", permanent: true },
      { source: "/locations.kml", destination: "/", permanent: true },
      { source: "/thank-you", destination: "/", permanent: true },
      // Guides live at the root (existing ranking URLs); /blog/<slug> is an alias
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
