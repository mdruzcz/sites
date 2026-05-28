import type { NextConfig } from "next";

const CITY_REDIRECTS = [
  "brampton", "etobicoke", "mississauga", "oakville", "georgetown", "milton",
  "guelph", "cambridge", "kitchener", "burlington", "hamilton", "ingersoll",
  "st-thomas", "strathroy", "waterloo", "woodstock", "ancaster",
].map((slug) => ({
  source: `/${slug}`,
  destination: `/cities/${slug}`,
  permanent: true,
}));

const SERVICE_REDIRECTS = [
  { source: "/residential-services-2", destination: "/residential-services", permanent: true },
  { source: "/oakville-copy", destination: "/cities/oakville", permanent: true },
  { source: "/christmas-light-installation-in-london-ontario", destination: "/cities/london-ontario", permanent: true },
  { source: "/london-ontario", destination: "/cities/london-ontario", permanent: true },
  { source: "/london-surrounding-areas", destination: "/cities/london-surrounding-areas", permanent: true },
  { source: "/kitchener-surrounding-areas", destination: "/cities/kitchener", permanent: true },
  { source: "/christmas-light-takedown-london-ontario", destination: "/services/christmas-light-takedown", permanent: true },
  { source: "/govee-light-installer", destination: "/services/govee-light-installer", permanent: true },
  { source: "/eufy-light-installer", destination: "/services/eufy-light-installer", permanent: true },
  { source: "/full-season-holiday-service", destination: "/services/full-season-holiday-service", permanent: true },
  { source: "/christmas-light-year-long-storage", destination: "/services/christmas-light-year-long-storage", permanent: true },
  { source: "/residential-christmas-light-installation", destination: "/services/residential-christmas-light-installation", permanent: true },
  { source: "/residential-christmas-decorators", destination: "/services/residential-christmas-decorators", permanent: true },
  { source: "/commercial-christmas-light-installation", destination: "/services/commercial-christmas-light-installation", permanent: true },
  { source: "/commercial-christmas-decorators", destination: "/services/commercial-christmas-decorators", permanent: true },
  { source: "/commercial-christmas-trees-and-decorations", destination: "/services/commercial-christmas-trees-and-decorations", permanent: true },
  { source: "/commercial-holiday-lighting-services", destination: "/services/commercial-holiday-lighting-services", permanent: true },
];

const INDUSTRY_SLUGS = [
  "christmas-decorators-for-banks",
  "christmas-decorator-for-malls",
  "christmas-decorators-for-municipalities",
  "christmas-decorators-for-special-events",
  "christmas-decorators-for-retail",
  "christmas-decorators-for-restaurants",
  "christmas-decorators-for-production-sets",
  "christmas-decorators-for-office-lobbies",
  "christmas-decorators-for-hotels",
  "christmas-decorators-for-hoas",
  "christmas-decorators-for-churches",
  "christmas-decorators-for-car-dealerships",
  "christmas-decorators-for-casinos",
];

const INDUSTRY_REDIRECTS = INDUSTRY_SLUGS.map((slug) => ({
  source: `/${slug}`,
  destination: `/industries/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...CITY_REDIRECTS,
      ...SERVICE_REDIRECTS,
      ...INDUSTRY_REDIRECTS,
      { source: "/category/uncategorized", destination: "/blog", permanent: true },
      { source: "/where-to-find-us-on-the-web", destination: "/contact-us", permanent: true },
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
