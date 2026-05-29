import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/services-3/", destination: "/services", permanent: true },
      { source: "/project-examples-2/", destination: "/projects", permanent: true },
      { source: "/project-examples/", destination: "/projects", permanent: true },
      { source: "/areas-we-serve-3/", destination: "/service-areas", permanent: true },
      { source: "/areas-we-serve/", destination: "/service-areas", permanent: true },
      { source: "/contact-us-3/", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/about-us-3/", destination: "/about", permanent: true },
      { source: "/deck-staining-in-london-ontario/", destination: "/service-areas/london-on", permanent: true },
      { source: "/deck-staining-in-woodstock/", destination: "/service-areas/woodstock-on", permanent: true },
      { source: "/deck-staining-in-st-thomas/", destination: "/service-areas/st-thomas-on", permanent: true },
      { source: "/deck-staining-in-stratford-ontario/", destination: "/service-areas/stratford-on", permanent: true },
      { source: "/deck-staining-in-brantford/", destination: "/service-areas/brantford-on", permanent: true },
      { source: "/deck-staining-in-cambridge/", destination: "/service-areas/cambridge-on", permanent: true },
      { source: "/deck-staining-in-kitchener/", destination: "/service-areas/kitchener-on", permanent: true },
      { source: "/deck-staining-in-guelph/", destination: "/service-areas/guelph-on", permanent: true },
      { source: "/deck-staining-in-tillsonburg/", destination: "/service-areas/tillsonburg-on", permanent: true },
      { source: "/helpful-articles-and-tips/", destination: "/blog", permanent: true },
      { source: "/gallery/", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
