import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/services-3/", destination: "/services", permanent: true },
      { source: "/project-examples-2/", destination: "/work", permanent: true },
      { source: "/project-examples/", destination: "/work", permanent: true },
      { source: "/gallery/", destination: "/work", permanent: true },
      { source: "/areas-we-serve-3/", destination: "/areas", permanent: true },
      { source: "/areas-we-serve/", destination: "/areas", permanent: true },
      { source: "/contact-us-3/", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/about-us-3/", destination: "/about", permanent: true },
      { source: "/helpful-articles-and-tips/", destination: "/faq", permanent: true },
      { source: "/deck-staining-in-london-ontario/", destination: "/areas/london", permanent: true },
      { source: "/deck-staining-in-woodstock/", destination: "/areas/woodstock", permanent: true },
      { source: "/deck-staining-in-st-thomas/", destination: "/areas/st-thomas", permanent: true },
      { source: "/deck-staining-in-stratford-ontario/", destination: "/areas/stratford", permanent: true },
      { source: "/deck-staining-in-brantford/", destination: "/areas/brantford", permanent: true },
      { source: "/deck-staining-in-cambridge/", destination: "/areas/cambridge", permanent: true },
      { source: "/deck-staining-in-kitchener/", destination: "/areas/kitchener", permanent: true },
      { source: "/deck-staining-in-guelph/", destination: "/areas/guelph", permanent: true },
      { source: "/deck-staining-in-tillsonburg/", destination: "/areas/tillsonburg", permanent: true },
    ];
  },
};

export default nextConfig;
