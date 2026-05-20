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
      { source: "/services/installation", destination: "/services/concrete-driveway-installation", permanent: true },
      { source: "/services/repair", destination: "/services/concrete-driveway-repair", permanent: true },
      { source: "/services/decorative", destination: "/services/stamped-concrete-driveways", permanent: true },
      { source: "/oaksville-concrete-driveways.html", destination: "/service-areas/london", permanent: true },
      { source: "/burlington-concrete-driveways.html", destination: "/service-areas/london", permanent: true },
      { source: "/service-areas/oaksville", destination: "/service-areas/london", permanent: true },
      { source: "/service-areas/burlington", destination: "/service-areas/london", permanent: true },
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
