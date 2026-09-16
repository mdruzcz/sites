/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Old package-named service URLs (and their city variants) now live on /packages.
    const oldPackages = ["romantic-glow", "modern-gala", "epic-afterparty"];
    return [
      ...oldPackages.map((slug) => ({ source: `/services/${slug}`, destination: `/packages#${slug}`, permanent: true })),
      ...oldPackages.map((slug) => ({ source: `/services/${slug}/:city`, destination: `/packages#${slug}`, permanent: true })),
      { source: "/services/outdoor-lighting", destination: "/services/tent-lighting", permanent: true },
      { source: "/services/outdoor-lighting/:city", destination: "/services/tent-lighting/:city", permanent: true },
      { source: "/commercial", destination: "/services/commercial-holiday-lighting", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
