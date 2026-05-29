import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kmkitchenrenovations.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/our-services/", destination: "/services", permanent: true },
      { source: "/service-areas", destination: "/service-areas", permanent: false },
      { source: "/kitchen-renovation-contractor", destination: "/services/kitchen-renovations", permanent: true },
      { source: "/kitchen-remodel-contractor", destination: "/services/kitchen-remodels", permanent: true },
      { source: "/bathroom-remodel-contractor", destination: "/services/bathroom-remodels", permanent: true },
      { source: "/white-shaker-kitchen-cabinets", destination: "/services/white-shaker-cabinets", permanent: true },
      { source: "/custom-kitchen-cabinets", destination: "/services/custom-kitchen-cabinets", permanent: true },
      { source: "/basement-finishing", destination: "/services/basement-finishing", permanent: true },
      { source: "/basement-kitchens", destination: "/services/basement-kitchens", permanent: true },
      { source: "/basement-bathrooms", destination: "/services/basement-bathrooms", permanent: true },
      { source: "/kitchen-contractor-london", destination: "/service-areas/london", permanent: true },
      { source: "/kitchen-contractor-st-thomas", destination: "/service-areas/st-thomas", permanent: true },
      { source: "/kithen-contractor-woodstock", destination: "/service-areas/woodstock", permanent: true },
      { source: "/kitchen-renovation-financing", destination: "/financing", permanent: true },
    ];
  },
};

export default nextConfig;
