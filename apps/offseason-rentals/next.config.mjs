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
