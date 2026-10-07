import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLinePage } from "@/components/LinePages";
import { site } from "@/lib/site";
import { getServiceLine } from "@/lib/content";

export const revalidate = 3600;
const LINE_SLUG = "permanent-lighting";
const OG = "/images/gallery/cool-white-permanent-roofline-lights-stone-home-wraparound-porch.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const line = getServiceLine(LINE_SLUG);
  if (!line) return {};
  return {
    title: { absolute: `${line.metaTitle} | ${site.name}` },
    description: line.metaDescription,
    alternates: { canonical: `/${LINE_SLUG}` },
    openGraph: { title: `${line.metaTitle} | ${site.name}`, description: line.metaDescription, url: `${site.url}/${LINE_SLUG}`, images: [{ url: OG, alt: "Permanent LED roofline lighting on a stone home" }] },
    twitter: { card: "summary_large_image", title: line.metaTitle, description: line.metaDescription },
  };
}

export default function PermanentLightingPage() {
  const line = getServiceLine(LINE_SLUG);
  if (!line) notFound();
  return <ServiceLinePage line={line} />;
}
