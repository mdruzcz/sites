import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { ProcessSteps } from "@/components/sections/process-steps";
import { UseCases } from "@/components/sections/use-cases";
import { Testimonial } from "@/components/sections/testimonial";
import { ServiceAreas } from "@/components/sections/service-areas";
import { CtaBand } from "@/components/sections/cta-band";
import { CategoryTiles } from "@/components/sections/category-tiles";
import type { Metadata } from "next";
import { getCategories, listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";
import { VideoLoop } from "@/components/VideoLoop";
import videos from "@/content/xmas-videos.json";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export const revalidate = 3600;

// reel is null on this site — feature the first commercial-indoor clip.
const heroClip = videos.reel ?? videos.clips[0];
const heroClipPoster = "/images/xmas-gallery/elegant-warm-white-christmas-trees-commercial-lobby-01.jpg";

export default async function HomePage() {
  const [categories, featured, newest] = await Promise.all([
    getCategories(),
    listProducts({ featuredOnly: true, limit: 8 }),
    listProducts({ limit: 4 })
  ]);

  const bestSellers = (featured.length ? featured : newest).slice(0, 8);

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Commercial Christmas Light Installations — Holiday Light Supplies",
    description:
      "Warm-white LED Christmas trees with gold ribbon glowing in a commercial building lobby, decorated with commercial-grade holiday lighting shipped across Ontario by Holiday Light Supplies.",
    thumbnailUrl: [SITE_URL + heroClipPoster],
    uploadDate: "2026-08-25",
    contentUrl: SITE_URL + heroClip.src
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
      <Hero />
      <TrustStrip />

      {/* Shop by category — circular photo tiles */}
      <CategoryTiles categories={categories} />

      {/* Best sellers — high-intent products */}
      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[var(--color-accent)]">Most popular</p>
              <h2 className="font-display mt-3 text-4xl md:text-5xl">This season&rsquo;s best sellers</h2>
            </div>
            <Link href="/shop" className="hidden text-sm font-semibold text-[var(--color-accent)] hover:underline sm:inline">
              Shop all products →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {bestSellers.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <SpecCallouts />
      <UseCases />

      {/* See our work — portrait installation clip */}
      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">See our work</p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl">Real installs, glowing after dark.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              Warm-white LED trees, gold-ribbon detail and lit garland &mdash; decorated in commercial
              lobbies and entrances across Ontario with the exact product we ship to your door. Watch it
              come to life, then build your own look from the catalog.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/gallery" className="btn-primary">View the full gallery →</Link>
              <Link
                href="/shop"
                className="text-base font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
              >
                Shop the catalog
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm md:ml-auto">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-night)] shadow-xl ring-1 ring-black/5">
              <VideoLoop
                src={heroClip.src}
                poster={heroClipPoster}
                className="aspect-[9/16] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* More to load up on */}
      {bestSellers.length > 4 && (
        <section className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="mb-10">
            <p className="eyebrow text-[var(--color-accent)]">Stock up</p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl">More crowd favourites</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {bestSellers.slice(4, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <ProcessSteps />
      <Testimonial />
      <ServiceAreas />
      <CtaBand />
    </>
  );
}
