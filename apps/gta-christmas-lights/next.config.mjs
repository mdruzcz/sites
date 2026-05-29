/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gtachristmaslighting.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/past-lighting-projects",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/service-areas/:city-christmas-light-installation",
        destination: "/services/christmas-light-installation/:city",
        permanent: true,
      },
      {
        source: "/service-areas/:city-christmas-light-installer",
        destination: "/services/christmas-light-installation/:city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
