import type { Metadata } from "next";

import CityPage from "@/components/CityPage";
import { site, getCityBySlug } from "@/lib/site";

export const revalidate = 3600;

const city = getCityBySlug("hot-tub-pad-installation-in-kitchener")!;
const cityPath = `/${city.slug}`;

export const metadata: Metadata = {
  title: { absolute: `${city.metaTitle} | Hot Tub Pads` },
  description: city.metaDescription,
  alternates: { canonical: cityPath },
  openGraph: {
    title: `${city.metaTitle} | Hot Tub Pads`,
    description: city.metaDescription,
    url: `${site.url}${cityPath}`,
    images: [
      {
        url: "/images/hot-tub-pad-1.jpg",
        width: 1024,
        height: 683,
        alt: `Hot tub pad installation in ${city.name}, Ontario by Hot Tub Pads`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${city.metaTitle} | Hot Tub Pads`,
    description: city.metaDescription,
    images: ["/images/hot-tub-pad-1.jpg"],
  },
};

export default function KitchenerPage() {
  return <CityPage city={city} />;
}
