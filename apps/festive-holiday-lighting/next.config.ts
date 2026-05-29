import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
<<<<<<< HEAD
      { source: "/services", destination: "/services", permanent: false },
=======
>>>>>>> origin/main
      { source: "/hamilton", destination: "/service-areas/hamilton", permanent: true },
      { source: "/burlington", destination: "/service-areas/burlington", permanent: true },
      { source: "/oakville", destination: "/service-areas/oakville", permanent: true },
      { source: "/mississauga", destination: "/service-areas/mississauga", permanent: true },
      { source: "/brampton", destination: "/service-areas/brampton", permanent: true },
      { source: "/milton", destination: "/service-areas/milton", permanent: true },
      { source: "/ancaster", destination: "/service-areas/ancaster", permanent: true },
      { source: "/grimbsy", destination: "/service-areas/grimsby", permanent: true },
      { source: "/niagara-falls", destination: "/service-areas/niagara-falls", permanent: true },
      { source: "/st-catharines", destination: "/service-areas/st-catharines", permanent: true },
<<<<<<< HEAD
      { source: "/contact", destination: "/contact", permanent: false },
=======
>>>>>>> origin/main
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/holiday-lighting-installation", destination: "/services/christmas-light-installation", permanent: true },
      { source: "/residential-holiday-lighting", destination: "/services/residential-holiday-lighting", permanent: true },
      { source: "/commercial-holiday-lighting", destination: "/services/commercial-holiday-lighting", permanent: true },
      { source: "/commercial-municipal-lighting", destination: "/services/municipal-bia-lighting", permanent: true },
      { source: "/tree-lighting", destination: "/services/tree-lighting", permanent: true },
      { source: "/interior-holiday-decorating-services", destination: "/services/interior-holiday-decorating", permanent: true },
<<<<<<< HEAD
      { source: "/service-areas", destination: "/service-areas", permanent: false },
=======
>>>>>>> origin/main
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Vary", value: "Accept-Encoding" }],
      },
    ];
  },
};

export default nextConfig;
