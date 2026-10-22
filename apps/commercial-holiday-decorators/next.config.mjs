/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
        source: "/videos/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // lobbydecorating.ca points at this project and lands on the condo lobby page.
      { source: "/", has: [{ type: "host", value: "(www\.)?lobbydecorating\.ca" }], destination: "https://commercialholidaydecorators.ca/condo-apartment-lobbies", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "(www\.)?lobbydecorating\.ca" }], destination: "https://commercialholidaydecorators.ca/:path*", permanent: true },
      { source: "/hotels", destination: "/hotels-hospitality", permanent: true },
      { source: "/hotel-lobbies", destination: "/hotels-hospitality", permanent: true },
      { source: "/condos", destination: "/condo-apartment-lobbies", permanent: true },
      { source: "/malls", destination: "/plazas-malls", permanent: true },
      { source: "/process", destination: "/about#process", permanent: false },
    ];
  },
};

export default nextConfig;
