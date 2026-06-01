import type { NextConfig } from "next";

// Source-site → new-site redirect map (preserves SEO from the WordPress URLs).
const wpRedirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/shop/", destination: "/shop", permanent: true },
  { source: "/product-category/single-gallon/", destination: "/shop?size=1-gallon", permanent: true },
  { source: "/product-category/5-gallon/", destination: "/shop?size=5-gallon", permanent: true },
  { source: "/product-category/staining-accessories/", destination: "/product-category/staining-accessories", permanent: true },
  { source: "/contractor-program-2/", destination: "/contractor-program", permanent: true },
  { source: "/calculator/", destination: "/calculator", permanent: true },
  { source: "/deck-stain-and-fence-staining-calculator/", destination: "/calculator", permanent: true },
  { source: "/refund_returns/", destination: "/shipping-returns", permanent: true },
  { source: "/contact/", destination: "/contact-us", permanent: true },
  { source: "/privacy-policy/", destination: "/privacy", permanent: true },
  { source: "/cart/", destination: "/cart", permanent: false },
  // Old per-color/size product URLs → new color product pages
  ...["redwood","pecan","natural-cedar","mission-brown","light-oak","golden-pine","burnt-hickory","mahogany","dark-walnut"].flatMap((c) => [
    { source: `/product/1-gallon-${c}/`, destination: `/product/${c}`, permanent: true },
    { source: `/product/5-gallon-${c}/`, destination: `/product/${c}`, permanent: true }
  ]),
  { source: "/product/5-gallon-natural-cedar-deck-stain/", destination: "/product/natural-cedar", permanent: true },
  { source: "/product/synthetic-stain-brush-threaded-handle-5-125mm/", destination: "/product/synthetic-stain-brush", permanent: true }
];

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "readysealdirect.ca" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  async redirects() {
    return wpRedirects;
  }
};

export default config;
