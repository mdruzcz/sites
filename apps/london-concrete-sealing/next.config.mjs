/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirects from the previous Next rebuild's URL scheme to the original flat URLs
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/services', destination: '/our-services', permanent: true },
      { source: '/services/driveway-sealing', destination: '/driveway-sealing-service', permanent: true },
      { source: '/services/concrete-sealing', destination: '/concrete-sealing-services', permanent: true },
      { source: '/services/concrete-driveway-installation', destination: '/concrete-driveway-installation-contractor', permanent: true },
      { source: '/services/stamped-concrete-sealing', destination: '/stamped-concrete-sealing-services', permanent: true },
      { source: '/services/concrete-finishes', destination: '/concrete-finishes', permanent: true },
      { source: '/services/concrete-sealing/london', destination: '/concrete-sealing-in-london', permanent: true },
      { source: '/services/concrete-sealing/st-thomas', destination: '/st-thomas-concrete-sealing-services', permanent: true },
      { source: '/services/concrete-sealing/woodstock', destination: '/woodstock-concrete-sealing', permanent: true },
      { source: '/services/concrete-sealing/stratford', destination: '/concrete-sealing-in-stratford', permanent: true },
      { source: '/services/concrete-sealing/ingersoll', destination: '/concrete-sealing-ingersoll', permanent: true },
    ];
  },
};

export default nextConfig;
