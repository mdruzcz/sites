/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 70, 74, 78, 82],
    // Optimised variants are immutable content — cache them hard at the edge.
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      // The catalogue went from 4 lines to 10; keep the original URLs alive.
      { source: "/products/commercial-wreaths", destination: "/products/wreaths-garlands-pole-decor", permanent: true },
      { source: "/products/mega-trees", destination: "/products/commercial-christmas-trees", permanent: true },
      { source: "/products/large-displays", destination: "/products/holiday-displays", permanent: true }
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
