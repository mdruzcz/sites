/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      { source: '/broom-finish-concretes/', destination: '/services/broom-finish-concretes', permanent: true },
      { source: '/broom-finish-concretes', destination: '/services/broom-finish-concretes', permanent: true },
      { source: '/concrete-driveway-installation-2/', destination: '/services/concrete-driveway-installation', permanent: true },
      { source: '/concrete-driveway-installation-2', destination: '/services/concrete-driveway-installation', permanent: true },
      { source: '/concrete-patio-installation-2/', destination: '/services/concrete-patio-installation', permanent: true },
      { source: '/concrete-patio-installation-2', destination: '/services/concrete-patio-installation', permanent: true },
      { source: '/driveway-replacement/', destination: '/services/driveway-replacement', permanent: true },
      { source: '/driveway-replacement', destination: '/services/driveway-replacement', permanent: true },
      { source: '/stamped-concretes/', destination: '/services/stamped-concretes', permanent: true },
      { source: '/stamped-concretes', destination: '/services/stamped-concretes', permanent: true },
    ];
  },
};
export default nextConfig;
