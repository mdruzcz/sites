import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServices, getCities, getGuides, getService, getCityByRoute, getGuide } from "@/lib/content";
import { site, withBrand } from "@/lib/site";
import { SERVICE_HERO, HERO_BY_MATERIAL, cityPhoto } from "@/lib/photos";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import CityTemplate from "@/components/templates/CityTemplate";
import GuideTemplate from "@/components/templates/GuideTemplate";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return [...getServices(), ...getCities(), ...getGuides()].map((p) => ({ slug: p.slug }));
}

function resolve(slug: string) {
  const s = getService(slug);
  if (s) return { kind: "service" as const, page: s, image: (SERVICE_HERO[slug] ?? HERO_BY_MATERIAL[s.photoMaterial]).image };
  const c = getCityByRoute(slug);
  if (c) return { kind: "city" as const, page: c, image: cityPhoto(getCities().indexOf(c)).image };
  const g = getGuide(slug);
  if (g) return { kind: "guide" as const, page: g, image: (HERO_BY_MATERIAL[g.photoMaterial] ?? HERO_BY_MATERIAL.mixed).image };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return {};
  const url = `${site.url}/${slug}`;
  const title = withBrand(r.page.metaTitle);
  return {
    title,
    description: r.page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title, description: r.page.metaDescription, url, type: r.kind === "guide" ? "article" : "website", images: [{ url: r.image, width: 1600, height: 1200, alt: r.page.h1 }] },
    twitter: { card: "summary_large_image", title, description: r.page.metaDescription, images: [r.image] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();
  if (r.kind === "service") return <ServiceTemplate page={r.page} />;
  if (r.kind === "city") return <CityTemplate page={r.page} index={getCities().indexOf(r.page)} />;
  return <GuideTemplate page={r.page} />;
}
