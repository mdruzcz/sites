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
    ];
  },
  async redirects() {
    return [
      // Old WordPress-style city pages → new service-areas
      { source: "/permanent-light-installer-in-london", destination: "/service-areas/london", permanent: true },
      { source: "/permanent-light-installer-in-waterloo", destination: "/service-areas/waterloo", permanent: true },
      { source: "/permanent-light-installer-in-guelph", destination: "/service-areas/guelph", permanent: true },
      { source: "/permanent-light-installer-in-brantford", destination: "/service-areas/brantford", permanent: true },
      { source: "/permanent-light-installer-in-st-thomas", destination: "/service-areas/st-thomas", permanent: true },
      { source: "/permanent-light-installer-in-stratford", destination: "/service-areas/stratford", permanent: true },
      { source: "/permanent-light-installer-in-tilsonburg", destination: "/service-areas/tillsonburg", permanent: true },
      // Old WordPress blog URL patterns
      { source: "/category/helpful-tips", destination: "/blog", permanent: true },
      { source: "/category/recommendations", destination: "/blog", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
