import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineCityPage } from "@/components/LinePages";
import { site } from "@/lib/site";
import { getServiceLine, getCities, getCityBySlug } from "@/lib/content";

export const revalidate = 3600;
const LINE_SLUG = "seasonal-lighting";

export async function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const title = `Christmas Light Installation in ${city.name}, ON`;
  return {
    title: { absolute: `${title} | ${site.name}` },
    description: city.meta.seasonal,
    alternates: { canonical: `/${LINE_SLUG}/${city.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description: city.meta.seasonal, url: `${site.url}/${LINE_SLUG}/${city.slug}`, images: [{ url: "/images/gallery/red-white-green-permanent-christmas-roofline-lights-blue-two-storey.jpg", alt: `Christmas roofline lights installed by Celebrate Lighting in ${city.name}, Ontario` }] },
    twitter: { card: "summary_large_image", title, description: city.meta.seasonal },
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const line = getServiceLine(LINE_SLUG);
  const city = getCityBySlug(slug);
  if (!line || !city) notFound();
  return <LineCityPage line={line} city={city} />;
}
