import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { CityPage } from "@/components/CityPage";
import { GuidePage } from "@/components/GuidePage";
import { getServices, getCities, getGuides, getService, getCity, getGuide, servicePhoto, cityPhoto, guidePhoto } from "@/lib/content";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...getServices(), ...getCities(), ...getGuides()].map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const url = `${site.url}/${slug}`;
  const svc = getService(slug);
  if (svc) {
    return {
      title: { absolute: `${svc.metaTitle} | Restore My Deck` },
      description: svc.metaDescription,
      alternates: { canonical: url },
      openGraph: { title: svc.metaTitle, description: svc.metaDescription, url, siteName: site.name, type: "website", images: [{ url: photo(servicePhoto(slug)).image }] },
      twitter: { card: "summary_large_image", title: svc.metaTitle, description: svc.metaDescription },
    };
  }
  const city = getCity(slug);
  if (city) {
    return {
      title: { absolute: `${city.metaTitle} | Restore My Deck` },
      description: city.metaDescription,
      alternates: { canonical: url },
      openGraph: { title: city.metaTitle, description: city.metaDescription, url, siteName: site.name, type: "website", images: [{ url: photo(cityPhoto(slug)).image }] },
      twitter: { card: "summary_large_image", title: city.metaTitle, description: city.metaDescription },
    };
  }
  const guide = getGuide(slug);
  if (guide) {
    return {
      title: guide.metaTitle,
      description: guide.metaDescription,
      alternates: { canonical: url },
      openGraph: { type: "article", title: guide.metaTitle, description: guide.metaDescription, url, images: [photo(guidePhoto(slug)).image], publishedTime: guide.updated, modifiedTime: guide.updated },
      twitter: { card: "summary_large_image", title: guide.metaTitle, description: guide.metaDescription },
    };
  }
  return { title: "Not found" };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const svc = getService(slug);
  if (svc) return <ServicePage c={svc} />;
  const city = getCity(slug);
  if (city) return <CityPage c={city} />;
  const guide = getGuide(slug);
  if (guide) return <GuidePage a={guide} />;
  notFound();
}
