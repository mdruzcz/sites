/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/view-our-gallery', destination: '/gallery', permanent: true },
      { source: '/frequently-asked-questions-faq', destination: '/faq', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/service-areas', destination: '/service-areas', permanent: false },
      { source: '/govee-light-installation-in-london', destination: '/services/permanent-govee-lighting/london-ontario', permanent: true },
      { source: '/govee-light-installation-in-london-1', destination: '/services/permanent-govee-lighting/london-ontario', permanent: true },
      { source: '/govee-light-installation-in-london-middlesex-county', destination: '/services/permanent-govee-lighting/london-ontario', permanent: true },
      { source: '/govee-light-installation-in-woodstock', destination: '/services/permanent-govee-lighting/woodstock-oxford-county', permanent: true },
      { source: '/govee-light-installation-in-oxford-county', destination: '/services/permanent-govee-lighting/woodstock-oxford-county', permanent: true },
      { source: '/govee-light-installation-in-stratford', destination: '/services/permanent-govee-lighting/stratford-ontario', permanent: true },
      { source: '/govee-light-installation-in-ingersoll', destination: '/services/permanent-govee-lighting/woodstock-oxford-county', permanent: true },
      { source: '/govee-light-installation-in-tilsonburg', destination: '/services/permanent-govee-lighting/woodstock-oxford-county', permanent: true },
      { source: '/govee-light-installation-in-brantford', destination: '/services/permanent-govee-lighting/hamilton-niagara', permanent: true },
      { source: '/govee-light-installation-in-waterloo-region', destination: '/services/permanent-govee-lighting/kitchener-waterloo', permanent: true },
      { source: '/govee-light-installation-in-windsor', destination: '/services/permanent-govee-lighting/windsor-essex', permanent: true },
      { source: '/govee-light-installation-in-hamilton-niagara-region', destination: '/services/permanent-govee-lighting/hamilton-niagara', permanent: true },
      { source: '/govee-light-installation-in-peel-region', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-halton-region', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-durham-region', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-sarnia-lambton-county', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-kent-region', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-elgin-county', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-huron-perth-county', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-wellington-county', destination: '/service-areas', permanent: true },
      { source: '/govee-light-installation-in-tecumseh', destination: '/services/permanent-govee-lighting/windsor-essex', permanent: true },
      { source: '/govee-light-installation-in-st-thomas-2', destination: '/service-areas', permanent: true },
    ];
  },
};

export default nextConfig;
