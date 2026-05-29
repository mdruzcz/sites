/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/get-an-estimate",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/design-gallery",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/products-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/about#testimonials",
        permanent: true,
      },
      {
        source: "/service-areas/:city-christmas-light-installation-near-you",
        destination: "/services/christmas-light-installation/:city",
        permanent: true,
      },
      {
        source: "/interior-christmas-decorating-service-toronto-interior-holiday-decorator-near-you",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
