/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Without this cap Next offers a 3840 candidate and the optimizer stalls on full-bleed heroes.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [96, 160, 256, 320, 384, 520],
    qualities: [50, 60, 70, 75],
    minimumCacheTTL: 2678400,
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
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    // One canonical host: www goes to the bare domain.
    return [{ source: "/:path*", has: [{ type: "host", value: "www.courtkits.ca" }], destination: "https://courtkits.ca/:path*", permanent: true }];
  },
};

export default nextConfig;
