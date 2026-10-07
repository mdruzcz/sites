/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/:path*", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/:path*", destination: "/contact", permanent: true },
      { source: "/category/:slug*", destination: "/blog", permanent: true },

      // Retired / consolidated services → closest live page (preserve SEO equity)
      { source: "/cedar-shake-cleaning", destination: "/deck-cleaning", permanent: true },
      { source: "/boat-docks", destination: "/deck-staining-services", permanent: true },
      { source: "/patio-pressure-washing-services", destination: "/fence-pressure-washing-services", permanent: true },
      { source: "/custom-pergolas", destination: "/pergola-staining", permanent: true },
      { source: "/custom-gazebos", destination: "/gazebo-staining", permanent: true },
      { source: "/concrete-walkway-installation", destination: "/concrete-patios", permanent: true },
      { source: "/heated-driveway-installation", destination: "/concrete-driveways", permanent: true },
      { source: "/swim-spa-pad-installation", destination: "/hot-tub-swim-spa-shed-pads", permanent: true },
      { source: "/hot-tub-and-shed-pads", destination: "/hot-tub-swim-spa-shed-pads", permanent: true },
      { source: "/outdoor-privacy-screens", destination: "/fence-building", permanent: true },
      { source: "/railing-installation", destination: "/deck-building", permanent: true },
      { source: "/artificial-turf-installation", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
