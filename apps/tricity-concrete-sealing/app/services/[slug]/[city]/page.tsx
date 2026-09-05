import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCityPage } from "@/components/ServiceCityPage";
import { SERVICE_PAGES } from "@/content/service-pages";
import { cities, getCityBySlug } from "@/lib/cities";
import { getServiceBySlug } from "@/lib/content";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string; city: string }> };

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).flatMap((slug) => cities.map((c) => ({ slug, city: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const c = SERVICE_PAGES[slug];
  const svc = getServiceBySlug(slug);
  const cityData = getCityBySlug(city);
  if (!c || !svc || !cityData) return { title: "Not found" };
  const url = `${site.url}/services/${slug}/${city}`;
  const title = `${svc.title} ${cityData.name} ON | TriCity Concrete Sealing`;
  const description = `Professional ${svc.title.toLowerCase()} in ${cityData.name}, ${cityData.region}. High-quality solvent-based sealers in matte, semi-gloss or gloss, ${site.warrantyYears}-year workmanship warranty, free site assessment.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", images: [{ url: photo(c.hero).image, alt: c.heroAlt }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: Props) {
  const { slug, city } = await params;
  const c = SERVICE_PAGES[slug];
  const cityData = getCityBySlug(city);
  if (!c || !cityData) notFound();
  return <ServiceCityPage c={c} city={cityData} />;
}
