import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPage } from "@/components/CityPage";
import { cities, getCityBySlug } from "@/lib/cities";
import { site } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Area not found" };
  const url = `${site.url}/service-areas/${city.slug}`;
  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: city.metaTitle, description: city.metaDescription, url, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title: city.metaTitle, description: city.metaDescription },
  };
}

export default async function CitySlugPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  return <CityPage city={city} />;
}
