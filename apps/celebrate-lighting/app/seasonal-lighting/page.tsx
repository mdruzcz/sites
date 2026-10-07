import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLinePage } from "@/components/LinePages";
import { site } from "@/lib/site";
import { getServiceLine } from "@/lib/content";

export const revalidate = 3600;
const LINE_SLUG = "seasonal-lighting";
const OG = "/images/gallery/red-green-white-permanent-roofline-lights-stone-home-steep-gables.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const line = getServiceLine(LINE_SLUG);
  if (!line) return {};
  return {
    title: { absolute: `${line.metaTitle} | ${site.name}` },
    description: line.metaDescription,
    alternates: { canonical: `/${LINE_SLUG}` },
    openGraph: { title: `${line.metaTitle} | ${site.name}`, description: line.metaDescription, url: `${site.url}/${LINE_SLUG}`, images: [{ url: OG, alt: "Red, green and white Christmas roofline lights on a stone home" }] },
    twitter: { card: "summary_large_image", title: line.metaTitle, description: line.metaDescription },
  };
}

export default function SeasonalLightingPage() {
  const line = getServiceLine(LINE_SLUG);
  if (!line) notFound();
  return <ServiceLinePage line={line} />;
}
