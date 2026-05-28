import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "londonconcreteforming.ca" },
    ],
  },
  async redirects() {
    return [
      { source: "/concrete-driveways/", destination: "/concrete-driveways", permanent: true },
      { source: "/concrete-patios/", destination: "/concrete-patios", permanent: true },
      { source: "/concrete-retaining-walls/", destination: "/concrete-retaining-walls", permanent: true },
      { source: "/stamped-concrete-driveway/", destination: "/stamped-concrete-driveway", permanent: true },
      { source: "/concrete-removal-services/", destination: "/concrete-removal-services", permanent: true },
      { source: "/concrete-shed-pad-installer/", destination: "/concrete-shed-pad-installer", permanent: true },
      { source: "/about-us/", destination: "/about-us", permanent: true },
      { source: "/contact-us/", destination: "/contact-us", permanent: true },
      { source: "/service-areas/", destination: "/service-areas", permanent: true },
      { source: "/concrete-finishes/", destination: "/concrete-finishes", permanent: true },
      { source: "/concrete-stamps/", destination: "/concrete-stamps", permanent: true },
      { source: "/woodstock-concrete-contractor/", destination: "/woodstock-concrete-contractor", permanent: true },
      { source: "/st-thomas-concrete-contractor/", destination: "/st-thomas-concrete-contractor", permanent: true },
      { source: "/sarnia-concrete-contractor/", destination: "/sarnia-concrete-contractor", permanent: true },
      { source: "/port-stanley-concrete-contractor/", destination: "/port-stanley-concrete-contractor", permanent: true },
      { source: "/chatham-concrete-contractor/", destination: "/chatham-concrete-contractor", permanent: true },
      { source: "/stratford-concrete-contractor/", destination: "/stratford-concrete-contractor", permanent: true },
      { source: "/blog/", destination: "/blog", permanent: true },
      { source: "/1-concrete-removal-services-in-london-st-thomas-and-woodstock", destination: "/concrete-removal-services", permanent: true },
      { source: "/1-concrete-removal-services-in-london-st-thomas-and-woodstock/", destination: "/concrete-removal-services", permanent: true },
    ];
  },
};

export default nextConfig;
