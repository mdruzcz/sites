import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { Photo } from "@/components/photo";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { PermanentLightsFeature } from "@/components/sections/permanent-lights-feature";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { Gallery } from "@/components/sections/gallery";
import { ProcessSteps } from "@/components/sections/process-steps";
import { UseCases } from "@/components/sections/use-cases";
import { Testimonial } from "@/components/sections/testimonial";
import { ServiceAreas } from "@/components/sections/service-areas";
import { CtaBand } from "@/components/sections/cta-band";
import { getCategories, listProducts } from "@/lib/catalog";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Permanent LED Track Lighting for Homes | Holiday Lights Direct",
  description:
    "Aluminum-tracked permanent LED house lighting, C9 bulbs, clips and wire, sold direct from London, Ontario. Free shipping over $500.",
  alternates: { canonical: SITE_URL }
};

export const revalidate = 3600;

/** Category slug → lifestyle photo. Falls back to a night shot when unmapped. */
const CATEGORY_PHOTOS: Record<string, PhotoKey> = {
  "permanent-lights": "detail-led-pucks",
  "christmas-light-bulbs": "home-christmas-warm-white",
  "mini-light-strands": "home-cottage-evening",
  "light-attachment-clips": "detail-track-mounting",
  "wires-plugs": "track-residential",
  "led-connectors": "track-daytime-discreet",
  "power-injection-cables": "home-side-elevation",
  "decor-other-lights": "home-rainbow"
};

export default async function HomePage() {
  const [categories, products, allProducts] = await Promise.all([
    getCategories(),
    listProducts({ limit: 8 }),
    listProducts({ limit: 200 })
  ]);

  // Category tiles show what you actually buy: the first product photo in that
  // category, with the lifestyle shot only as a fallback for empty categories.
  const categoryImage = new Map<string, { src: string; alt: string }>();
  for (const p of allProducts) {
    const img = (p.ecom_product_images ?? []).find((i) => i.is_primary) ?? (p.ecom_product_images ?? [])[0];
    if (!img?.public_url) continue;
    for (const j of p.ecom_product_categories ?? []) {
      if (!categoryImage.has(j.category_id)) {
        categoryImage.set(j.category_id, { src: img.public_url, alt: img.alt_text ?? p.name });
      }
    }
  }

  const housingPackages = products
    .filter((p) => p.slug.startsWith("led-housing-package-"))
    .sort((a, b) => {
      const n = (s: string) => parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
      return n(a.slug) - n(b.slug);
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Holiday Lights Direct",
    url: SITE_URL,
    image: `${SITE_URL}/images/photos/hero-warm-white-home.webp`,
    description:
      "Aluminum-tracked permanent LED lighting systems and professional Christmas lighting supplies, shipped direct from London, Ontario.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA"
    },
    areaServed: { "@type": "Country", name: "Canada" },
    priceRange: "$$"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero />
      <TrustStrip />
      <PermanentLightsFeature housingPackages={housingPackages.slice(0, 4)} />
      <Gallery />
      <SpecCallouts />

      {/* Categories */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">The catalog</p>
              <h2 className="font-display h2-fluid mt-6">Shop by category</h2>
            </div>
            <Link href="/shop" className="btn-secondary">
              See all products
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/product-category/${c.slug}`}
                className="reveal-sm group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[var(--shadow-lg)]"
              >
                {categoryImage.get(c.id) ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={categoryImage.get(c.id)!.src}
                      alt={categoryImage.get(c.id)!.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 280px"
                      className="object-contain p-4 transition duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                ) : (
                  <Photo
                    name={CATEGORY_PHOTOS[c.slug] ?? "home-nighttime-lit"}
                    alt={`${c.name} from Holiday Lights Direct`}
                    ratio="aspect-[4/3]"
                    sizes="(max-width: 768px) 50vw, 280px"
                    className="transition duration-500 group-hover:scale-[1.05]"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-sm font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-2 text-xs font-semibold text-[var(--color-muted)] transition group-hover:text-[var(--color-gold-text)]">
                    Shop →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UseCases />

      {/* Best sellers */}
      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Best sellers</p>
            <h2 className="font-display h2-fluid mt-6">What pros are ordering.</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="reveal-sm">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <Testimonial />
      <ServiceAreas />
      <CtaBand />
    </>
  );
}
