import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/GuidePage";
import { getGuides, getGuide, guidePhoto } from "@/lib/content";
import { photo } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getGuide(slug);
  if (!a) return { title: "Not found" };
  const url = `${site.url}/resources/${a.slug}`;
  return { title: a.metaTitle, description: a.metaDescription, alternates: { canonical: url }, openGraph: { type: "article", title: a.metaTitle, description: a.metaDescription, url, images: [photo(guidePhoto(a.slug)).image], publishedTime: a.updated, modifiedTime: a.updated }, twitter: { card: "summary_large_image", title: a.metaTitle, description: a.metaDescription } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getGuide(slug);
  if (!a) notFound();
  return <GuidePage a={a} />;
}
