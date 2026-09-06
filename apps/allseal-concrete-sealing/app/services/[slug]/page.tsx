import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { getServices, getService, servicePhoto } from "@/lib/content";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getService(slug);
  if (!c) return { title: "Not found" };
  const url = `${site.url}/services/${slug}`;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: url }, openGraph: { title: c.metaTitle, description: c.metaDescription, url, siteName: site.name, type: "website", images: [{ url: photo(servicePhoto(slug)).image }] }, twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = getService(slug);
  if (!c) notFound();
  return <ServicePage c={c} />;
}
