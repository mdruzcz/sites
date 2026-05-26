/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
      { source: "/service-areas", destination: "/service-areas", permanent: false },
    ];
  },
};

export default nextConfig;
