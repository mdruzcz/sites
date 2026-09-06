import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPage } from "@/components/CityPage";
import { getCities, getCity, cityPhoto } from "@/lib/content";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;
type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return { title: "Not found" };
  const url = `${site.url}/service-areas/${city}`;
  return { title: { absolute: `${c.metaTitle.replace(/\s*\|\s*All-Seal.*$/i, "")} | All-Seal` }, description: c.metaDescription, alternates: { canonical: url }, openGraph: { title: c.metaTitle, description: c.metaDescription, url, siteName: site.name, type: "website", images: [{ url: photo(cityPhoto(city)).image }] }, twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription } };
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  return <CityPage c={c} />;
}
