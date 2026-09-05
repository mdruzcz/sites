import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_PAGES } from "@/content/service-pages";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = SERVICE_PAGES[slug];
  if (!c) return { title: "Service not found" };
  const url = `${site.url}/services/${c.slug}`;
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url, siteName: site.name, type: "website", images: [{ url: photo(c.hero).image, alt: c.heroAlt }] },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const c = SERVICE_PAGES[slug];
  if (!c) notFound();
  return <ServicePage c={c} />;
}
