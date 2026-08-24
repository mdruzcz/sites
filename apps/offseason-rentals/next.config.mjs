/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 70, 75, 80, 85],
    // Optimised variants are immutable content — cache them hard at the edge.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      // Owner-uploaded and Firecrawl-imported photos live in Supabase Storage.
      // Local files under public/images/ stay the default for seed imagery.
      {
        protocol: "https",
        hostname: "symgxmokposzjcgikgnz.supabase.co",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  },
  async redirects() {
    return [
      {
        // www and the apex both resolve to this deployment, and both were
        // answering 200 — two URLs for every page. Canonical tags cover the
        // SEO side; this makes the duplicate actually go away.
        source: "/:path*",
        has: [{ type: "host", value: "www.offseasonrentals.ca" }],
        destination: "https://offseasonrentals.ca/:path*",
        permanent: true
      }
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
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        // The admin is private working space — keep it out of every index.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
      }
    ];
  }
};

export default nextConfig;
