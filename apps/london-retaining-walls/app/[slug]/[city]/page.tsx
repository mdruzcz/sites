import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceCities, getServiceCity } from "@/lib/content";
import { site, withBrand } from "@/lib/site";
import { SERVICE_HERO } from "@/lib/photos";
import ServiceCityTemplate from "@/components/templates/ServiceCityTemplate";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceCities().map((p) => { const [slug, city] = p.slug.split("/"); return { slug, city }; });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city } = await params;
  const page = getServiceCity(slug, city);
  if (!page) return {};
  const url = `${site.url}/${slug}/${city}`;
  const title = withBrand(page.metaTitle);
  const image = SERVICE_HERO[slug]?.image;
  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title, description: page.metaDescription, url, type: "website", images: image ? [{ url: image, width: 1600, height: 1200, alt: page.h1 }] : undefined },
    twitter: { card: "summary_large_image", title, description: page.metaDescription },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city } = await params;
  const page = getServiceCity(slug, city);
  if (!page) notFound();
  return <ServiceCityTemplate page={page} />;
}
