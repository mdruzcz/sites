/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.archive.org',
      },
      {
        protocol: 'https',
        hostname: 'londonconcretesealing.ca',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/driveway-sealing-service', destination: '/services/driveway-sealing', permanent: true },
      { source: '/concrete-sealing-services', destination: '/services/concrete-sealing', permanent: true },
      { source: '/concrete-driveway-installation-contractor', destination: '/services/concrete-driveway-installation', permanent: true },
      { source: '/stamped-concrete-sealing-services', destination: '/services/stamped-concrete-sealing', permanent: true },
      { source: '/concrete-finishes', destination: '/services/concrete-finishes', permanent: true },
      { source: '/st-thomas-concrete-sealing-services', destination: '/services/concrete-sealing/st-thomas', permanent: true },
      { source: '/woodstock-concrete-sealing', destination: '/services/concrete-sealing/woodstock', permanent: true },
    ];
  },
};

export default nextConfig;
