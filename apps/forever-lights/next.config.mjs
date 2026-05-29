/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'foreverlights.ca' }
    ]
  },
  async redirects() {
    return [
      { source: '/service-areas/', destination: '/locations', permanent: true },
      { source: '/service-areas', destination: '/locations', permanent: true },
      { source: '/frequently-asked-questions-faq/', destination: '/faq', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
    ];
  }
};

export default nextConfig;
