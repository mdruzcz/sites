import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getProjects, galleryCategories } from "@/lib/content";
import imagesData from "@/content/images.json";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Gallery - Event Lighting & Holiday Decor",
  description:
    "Photos of our wedding lighting, Edison string light canopies, tent lighting, holiday party decor, corporate lobby trees and mall Christmas displays across London, ON and Southwestern Ontario.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Bright Event Lighting",
    description: "Real weddings, corporate events, holiday parties and commercial displays lit by Bright Event Lighting.",
    url: `${site.url}/gallery`,
    images: [{ url: "/images/tent-string-light-canopy-wedding-reception.jpg", alt: "Wedding tent string light canopy by Bright Event Lighting" }],
  },
};

export const revalidate = 3600;

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const initial = galleryCategories.some((g) => g.slug === c) ? (c as string) : "all";
  const projects = getProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Gallery", url: `${site.url}/gallery` }])) }} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader as="h1" eyebrow="Our Work" headline="Event Lighting & Holiday Decor Gallery" description="Weddings, corporate events, holiday parties, backyard celebrations and commercial displays we have lit across Southwestern Ontario." />
          <GalleryGrid projects={projects} meta={imagesData} initial={initial} />
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">Start Planning Your Lighting</Link>
          </div>
        </div>
      </section>
    </>
  );
}
