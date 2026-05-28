import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/retainingwallservices", destination: "/services", permanent: true },
      { source: "/woodstock-contractor", destination: "/woodstock-retaining-wall-contractor", permanent: true },
      { source: "/londons-top-retaining-wall-contractor", destination: "/london-retaining-wall-contractor", permanent: true },
      { source: "/london-surrounding-areas-retaining-walls", destination: "/service-areas", permanent: true },
      { source: "/professional-retaining-wall-contractors-in-london-ontario", destination: "/london-retaining-wall-contractor", permanent: true },
      { source: "/dorchesters-top-retaining-wall-contractor", destination: "/dorchester-retaining-wall-contractor", permanent: true },
      { source: "/lucans-top-retaining-wall-contractor", destination: "/lucan-retaining-wall-contractor", permanent: true },
      { source: "/strathroys-top-retaining-wall-contractor", destination: "/strathroy-retaining-wall-contractor", permanent: true },
      { source: "/delawares-top-retaining-wall-contractor", destination: "/delaware-retaining-wall-contractor", permanent: true },
      { source: "/alymers-leading-retaining-wall-contractor", destination: "/aylmer-retaining-wall-contractor", permanent: true },
      { source: "/ildertons-top-retaining-wall-contractor", destination: "/ilderton-retaining-wall-contractor", permanent: true },
      { source: "/komokas-top-retaining-wall-contractor", destination: "/komoka-retaining-wall-contractor", permanent: true },
      { source: "/mount-bridgess-top-retaining-wall-contractor", destination: "/mount-brydges-retaining-wall-contractor", permanent: true },
    ];
  },
};

export default nextConfig;
