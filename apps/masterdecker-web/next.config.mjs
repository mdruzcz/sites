/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/project-examples", destination: "/projects", permanent: true },
      { source: "/project-examples/:path*", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
