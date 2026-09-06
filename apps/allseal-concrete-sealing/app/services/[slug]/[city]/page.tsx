import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCityPage } from "@/components/ServiceCityPage";
import { getServices, getCities, getService, getCity, servicePhoto } from "@/lib/content";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string; city: string }> };

export function generateStaticParams() {
  return getServices().flatMap((s) => getCities().map((c) => ({ slug: s.slug, city: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const s = getService(slug);
  const c = getCity(city);
  if (!s || !c) return { title: "Not found" };
  const url = `${site.url}/services/${slug}/${city}`;
  const title = `${s.title} ${c.city} ON | All-Seal Concrete Sealing`;
  const description = `${s.title} in ${c.city}, ${c.region}. Premium sealers in high gloss, semi-gloss or matte, anti-slip available, free on-site inspection. Protect. Preserve. Seal.`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName: site.name, type: "website", images: [{ url: photo(servicePhoto(slug)).image }] }, twitter: { card: "summary_large_image", title, description } };
}

export default async function Page({ params }: Props) {
  const { slug, city } = await params;
  const s = getService(slug);
  const c = getCity(city);
  if (!s || !c) notFound();
  return <ServiceCityPage s={s} c={c} />;
}
