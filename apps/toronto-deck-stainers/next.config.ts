import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about/", destination: "/about", permanent: true },
      { source: "/services/", destination: "/services", permanent: true },
      { source: "/gallary", destination: "/gallery", permanent: true },
      { source: "/gallary/", destination: "/gallery", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      {
        source: "/choosing-the-right-approach-to-deck-cleaning-and-staining-in-canada",
        destination: "/blog/deck-cleaning-and-staining-canada",
        permanent: true,
      },
      {
        source: "/choosing-the-right-approach-to-deck-cleaning-and-staining-in-canada/",
        destination: "/blog/deck-cleaning-and-staining-canada",
        permanent: true,
      },
      {
        source: "/power-washing-vs-manual-deck-cleaning-which-pre-staining-method-is-right",
        destination: "/blog/power-washing-vs-manual-deck-cleaning",
        permanent: true,
      },
      {
        source: "/power-washing-vs-manual-deck-cleaning-which-pre-staining-method-is-right/",
        destination: "/blog/power-washing-vs-manual-deck-cleaning",
        permanent: true,
      },
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
