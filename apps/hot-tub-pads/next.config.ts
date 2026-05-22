import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
  },
  async redirects() {
    return [
      // WordPress trailing-slash redirects
      { source: "/contact/", destination: "/contact-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/post-1", destination: "/blog/post-1", permanent: true },
      { source: "/post-1/", destination: "/blog/post-1", permanent: true },
      { source: "/post-2", destination: "/blog/post-2", permanent: true },
      { source: "/post-2/", destination: "/blog/post-2", permanent: true },
      { source: "/post-3", destination: "/blog/post-3", permanent: true },
      { source: "/post-3/", destination: "/blog/post-3", permanent: true },
      { source: "/category/general", destination: "/blog", permanent: true },
      { source: "/category/general/", destination: "/blog", permanent: true },
      { source: "/author/:slug", destination: "/blog", permanent: true },
      { source: "/author/:slug/", destination: "/blog", permanent: true },
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
