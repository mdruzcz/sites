/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/services/christmas-lighting-installation", destination: "/services/christmas-lighting-installation", permanent: false },
      { source: "/services/:slug*/", destination: "/services/:slug*", permanent: true },
      { source: "/service-areas/:slug*/", destination: "/service-areas/:slug*", permanent: true },
      { source: "/christmas-lighting-installation", destination: "/services/christmas-lighting-installation", permanent: true },
      { source: "/tree-lighting-services", destination: "/services/tree-lighting-services", permanent: true },
      { source: "/christmas-lighting-for-homes", destination: "/services/christmas-lighting-for-homes", permanent: true },
      { source: "/christmas-lighting-for-businesses", destination: "/services/christmas-lighting-for-businesses", permanent: true },
      { source: "/christmas-light-rental", destination: "/services/christmas-light-rental", permanent: true },
      { source: "/christmas-decoration-services", destination: "/services/christmas-decoration-services", permanent: true },
    ];
  },
};

export default nextConfig;
