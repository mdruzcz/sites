/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  async redirects() {
    return [
      {
        source: "/professional-christmas-light-installation-in-london-ontario",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services/:slug*/",
        destination: "/services/:slug*",
        permanent: true,
      },
      {
        source: "/christmas-light-installation",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/residential-christmas-lights",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/commercial-christmas-lights",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/get-a-quote",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
