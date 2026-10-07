import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialLinePage } from "@/components/LinePages";
import { site } from "@/lib/site";
import { getServiceLine } from "@/lib/content";

export const revalidate = 3600;
const LINE_SLUG = "seasonal-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const line = getServiceLine(LINE_SLUG);
  if (!line) return {};
  const c = line.commercial;
  return {
    title: { absolute: `${c.metaTitle} | ${site.name}` },
    description: c.metaDescription,
    alternates: { canonical: `/${LINE_SLUG}/commercial` },
    openGraph: { title: `${c.metaTitle} | ${site.name}`, description: c.metaDescription, url: `${site.url}/${LINE_SLUG}/commercial`, images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-commercial-brick-building.jpg", alt: "Commercial building with holiday roofline lighting" }] },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
  };
}

export default function Page() {
  const line = getServiceLine(LINE_SLUG);
  if (!line) notFound();
  return <CommercialLinePage line={line} />;
}
