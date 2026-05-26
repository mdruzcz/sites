import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
  },
  async redirects() {
    return [
      // WordPress trailing-slash redirects
      { source: "/contact/", destination: "/contact-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      // Old placeholder blog slugs (post-N) → keyword-rich slugs
      { source: "/blog/post-1", destination: "/blog/hot-tub-pad-installation-mistakes", permanent: true },
      { source: "/blog/post-1/", destination: "/blog/hot-tub-pad-installation-mistakes", permanent: true },
      { source: "/blog/post-2", destination: "/blog/concrete-vs-gravel-hot-tub-pads", permanent: true },
      { source: "/blog/post-2/", destination: "/blog/concrete-vs-gravel-hot-tub-pads", permanent: true },
      { source: "/blog/post-3", destination: "/blog/hot-tub-pad-installation-checklist", permanent: true },
      { source: "/blog/post-3/", destination: "/blog/hot-tub-pad-installation-checklist", permanent: true },
      // Legacy WordPress top-level post URLs
      { source: "/post-1", destination: "/blog/hot-tub-pad-installation-mistakes", permanent: true },
      { source: "/post-1/", destination: "/blog/hot-tub-pad-installation-mistakes", permanent: true },
      { source: "/post-2", destination: "/blog/concrete-vs-gravel-hot-tub-pads", permanent: true },
      { source: "/post-2/", destination: "/blog/concrete-vs-gravel-hot-tub-pads", permanent: true },
      { source: "/post-3", destination: "/blog/hot-tub-pad-installation-checklist", permanent: true },
      { source: "/post-3/", destination: "/blog/hot-tub-pad-installation-checklist", permanent: true },
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
        headers: [
          { key: "Vary", value: "Accept-Encoding" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
