import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { UseCases } from "@/components/sections/use-cases";
import { FeaturedDisplays } from "@/components/sections/featured-displays";
import { PermanentLighting } from "@/components/sections/permanent-lighting";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonial } from "@/components/sections/testimonial";
import { ProjectsStrip } from "@/components/sections/projects-strip";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { ServiceAreas } from "@/components/sections/service-areas";
import { HomeFaq } from "@/components/sections/home-faq";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/ui";
import { getCategories, listProducts, productCategorySlugs } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";
import { VideoLoop } from "@/components/VideoLoop";
import videos from "@/content/xmas-videos.json";

export const metadata: Metadata = {
  title: "Commercial Christmas Lights & Décor Wholesale Canada | Holiday Light Supplies",
  description:
    "Commercial-grade Christmas lights, 3D LED displays, pole-mount décor, wreaths and garland for malls, BIAs, municipalities and installers. Shipped from Ontario across Canada.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Commercial Christmas Lights & Décor Wholesale Canada",
    description: "Commercial-grade C9 lighting, 3D LED displays, pole-mount décor and wreaths for malls, BIAs, municipalities and installers. Shipped from Ontario.",
    url: SITE_URL
  }
};

export const revalidate = 3600;

const heroClip = videos.reel ?? videos.clips[0];
const heroClipPoster = "/images/xmas-gallery/elegant-warm-white-christmas-trees-commercial-lobby-01.jpg";

/** Signature display slugs — big 3D pieces with real install photography. */
const SIGNATURE = ["tabora-walk-through-present-box", "otaki-archway", "kodiak-snowman", "waterloo-star-3d", "the-toque", "spokane-reindeer", "11-ornament-ring", "11-3d-led-candy-cane-red-and-warm-white-2"];

export default async function HomePage() {
  const [categories, all] = await Promise.all([getCategories(), listProducts()]);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const signature = SIGNATURE.map((s) => bySlug.get(s)).filter((p): p is NonNullable<typeof p> => !!p);
  const featured = all.filter((p) => p.featured);
  const bestSellers = (featured.length >= 4 ? featured : all).slice(0, 8);
  const c9 = all.filter((p) => productCategorySlugs(p, categories).includes("large-strawberry-lights-c9")).slice(0, 4);

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Commercial Christmas Light Installations — Holiday Light Supplies",
    description: "Warm-white LED Christmas trees with gold ribbon glowing in a commercial building lobby, decorated with commercial-grade holiday lighting shipped across Ontario by Holiday Light Supplies.",
    thumbnailUrl: [SITE_URL + heroClipPoster],
    uploadDate: "2026-08-25",
    contentUrl: SITE_URL + heroClip.src
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
      <Hero />
      <TrustStrip />
      <CategoryTiles categories={categories} />
      <UseCases />
      <FeaturedDisplays products={signature} />

      {/* Best sellers */}
      <section className="bg-warm">
        <div className="shell section">
          <SectionHeading eyebrow="Most ordered" title="This season's best sellers" sub="What installers and property teams reorder every year." action={{ href: "/shop", label: "Shop all products" }} />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {bestSellers.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <PermanentLighting />

      {/* C9 spotlight + video */}
      <section className="bg-white">
        <div className="shell section grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="The workhorse" title="C9 LED bulbs, socket spools and wire. Priced by the case." sub="One bulb per foot at 12-inch spacing. Twelve colours, 25-packs, 100 to 1,000 ft spools, SPT-1 and SPT-2 wire and vampire plugs — everything a roofline or a tree wrap needs." action={{ href: "/product-category/large-strawberry-lights-c9", label: "Shop C9" }} />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {c9.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs lg:ml-auto">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-night)] shadow-xl">
              <VideoLoop src={heroClip.src} poster={heroClipPoster} className="aspect-[9/16] w-full object-cover" />
            </div>
            <p className="mt-3 text-center text-xs text-[var(--color-muted)]">Warm-white trees and lit garland in an Ontario office lobby — <Link href="/gallery" className="font-semibold text-[var(--color-brand)] hover:underline">see the gallery</Link></p>
          </div>
        </div>
      </section>

      <ProcessSteps />
      <ProjectsStrip />
      <Testimonial />
      <SpecCallouts />
      <ServiceAreas />
      <HomeFaq />
      <CtaBand />
    </>
  );
}
