import type { Metadata } from "next";
import { CityPage } from "@/components/city-page";
import { getCityBySlug } from "@/lib/cities";

const CITY = getCityBySlug("woodstock")!;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: CITY.metaTitle,
  description: CITY.metaDescription,
  alternates: { canonical: `/cabinets-${CITY.slug}` },
  openGraph: {
    title: CITY.metaTitle,
    description: CITY.metaDescription,
    url: `/cabinets-${CITY.slug}`,
  },
};

export default function Page() {
  return <CityPage city={CITY} />;
}
