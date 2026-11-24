import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { toTileData } from "@/components/product-card";
import { Photo } from "@/components/photo";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProductRail, type RailGroup } from "@/components/sections/product-rail";
import { Audiences } from "@/components/sections/audiences";
import { ProjectHub, type HubItem } from "@/components/sections/project-hub";
import { PermanentLightsFeature } from "@/components/sections/permanent-lights-feature";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { Gallery } from "@/components/sections/gallery";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonial } from "@/components/sections/testimonial";
import { ServiceAreas } from "@/components/sections/service-areas";
import { CtaBand } from "@/components/sections/cta-band";
import { getCategories, listProducts, priceRange, type CatalogProduct } from "@/lib/catalog";
import { photo, type PhotoKey } from "@/lib/photos";
import { SITE_URL, formatCad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Permanent LED Track Lighting for Homes | Holiday Lights Direct",
  description:
    "Aluminum-tracked permanent LED house lighting, C9 bulbs, clips and wire, sold direct from London, Ontario. Free shipping over $500.",
  alternates: { canonical: SITE_URL }
};

export const revalidate = 3600;

/** The six small tiles in the category grid, in display order. */
const TILE_CATEGORIES = [
  "christmas-light-bulbs",
  "mini-light-strands",
  "wires-plugs",
  "aluminum-tracks",
  "led-connectors",
  "light-attachment-clips"
];

/** Lifestyle fallback when a category has no real product photography yet. */
const CATEGORY_PHOTOS: Record<string, PhotoKey> = {
  "light-attachment-clips": "track-night-glow",
  "mini-light-strands": "home-cottage-evening"
};

/** Short tile labels (the catalogue names are longer than a tile wants). */
const TILE_LABELS: Record<string, string> = {
  "christmas-light-bulbs": "C9 Bulbs",
  "mini-light-strands": "Mini Lights",
  "wires-plugs": "Wire + Plugs",
  "aluminum-tracks": "Tracks",
  "led-connectors": "Connectors",
  "light-attachment-clips": "Clips + Stakes"
};

const footage = (slug: string) => parseInt(slug.replace(/[^0-9]/g, ""), 10) || 0;

function ArrowNE({ size = 14 }: { size?: number }) {
  return (
    <svg className="arrow-ne" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function HomePage() {
  const [categories, allProducts] = await Promise.all([getCategories(), listProducts({ limit: 200 })]);

  const catBySlug = new Map(categories.map((c) => [c.slug, c]));
  const inCategory = (slug: string) => {
    const id = catBySlug.get(slug)?.id;
    return id ? allProducts.filter((p) => (p.ecom_product_categories ?? []).some((j) => j.category_id === id)) : [];
  };

  // Category tiles show what you actually buy: the first real product photo in
  // the category (never the branded placeholder).
  const categoryImage = (slug: string) => {
    for (const p of inCategory(slug)) {
      const imgs = p.ecom_product_images ?? [];
      const img = imgs.find((i) => i.is_primary) ?? imgs[0];
      if (img?.public_url && !img.public_url.includes("placeholder")) {
        return { src: img.public_url, alt: img.alt_text || p.name };
      }
    }
    return null;
  };

  const kits = allProducts
    .filter((p) => p.slug.startsWith("led-housing-package-"))
    .sort((a, b) => footage(a.slug) - footage(b.slug));
  const kitFrom = kits.length ? priceRange(kits[0])?.min : null;

  const withPhoto = (list: CatalogProduct[]) =>
    [...list].sort((a, b) => {
      const ph = (p: CatalogProduct) => ((p.ecom_product_images ?? []).some((i) => i.public_url && !i.public_url.includes("placeholder")) ? 0 : 1);
      return ph(a) - ph(b);
    });

  const railGroups: RailGroup[] = [
    { key: "kits", label: "Permanent lighting kits", href: "/permanent-lights", products: kits.map(toTileData) },
    {
      key: "c9",
      label: "C9 bulbs",
      href: "/product-category/christmas-light-bulbs",
      products: withPhoto(inCategory("christmas-light-bulbs")).map(toTileData)
    },
    {
      key: "wire",
      label: "Wire and plugs",
      href: "/product-category/wires-plugs",
      products: withPhoto(inCategory("wires-plugs")).map(toTileData)
    },
    {
      key: "parts",
      label: "Tracks and connectors",
      href: "/product-category/permanent-lights",
      products: withPhoto([
        ...inCategory("aluminum-tracks"),
        ...inCategory("led-puck-lights"),
        ...inCategory("led-connectors")
      ])
        .filter((p, i, arr) => arr.findIndex((q) => q.id === p.id) === i)
        .map(toTileData)
    }
  ].filter((g) => g.products.length > 0);

  const hubPhoto = (key: PhotoKey) => {
    const p = photo(key);
    return { src: p.src, alt: p.alt, blurDataURL: p.blurDataURL };
  };
  const hubItems: HubItem[] = [
    {
      key: "builder",
      title: "Kit builder",
      note: "Pick a footage and a track colour",
      description: "Choose the length of your roofline and a track colour, and see exactly what ships in the box.",
      href: "/permanent-lights",
      cta: "Open the builder",
      image: hubPhoto("home-nighttime-lit")
    },
    {
      key: "measure",
      title: "Roofline measuring guide",
      note: "Work out how many feet you need",
      description: "A plain walk-through for measuring eaves, gables and peaks so you order the right kit the first time.",
      href: "/resources/how-to-measure-your-roofline-for-lights",
      cta: "Read the guide",
      image: hubPhoto("home-side-elevation")
    },
    {
      key: "circuit",
      title: "Circuit load guide",
      note: "How many lights one circuit can carry",
      description: "How to add up the load on a 15 amp circuit before you plug in a whole display.",
      href: "/resources/how-many-christmas-lights-can-you-run-on-one-circuit",
      cta: "Read the guide",
      image: hubPhoto("home-example-3")
    }
  ];

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

      {/* Category grid: six small tiles beside one large feature tile */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell pb-[4.5rem] md:pb-28">
          <h2 className="sr-only">Shop by category</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 self-start sm:grid-cols-3">
              {TILE_CATEGORIES.map((slug) => {
                const c = catBySlug.get(slug);
                if (!c) return null;
                const img = categoryImage(slug);
                const label = TILE_LABELS[slug] ?? c.name;
                return (
                  <Link key={slug} href={`/product-category/${slug}`} className="tile group reveal-sm aspect-square">
                    {img && !/\/permanent-led-/.test(img.src) ? (
                      <>
                        <Image
                          src={img.src}
                          alt={`${c.name} from Holiday Lights Direct`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 190px"
                          className="object-contain p-5 pb-12 transition duration-500 group-hover:scale-[1.06]"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-white via-white/95 to-white/0 px-4 pb-3.5 pt-9 text-sm font-bold text-[var(--color-text)]">
                          {label}
                          <ArrowNE />
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0">
                          {img ? (
                            <>
                              <Image
                                src={img.src}
                                alt={`${c.name} from Holiday Lights Direct`}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 190px"
                                className="object-cover transition duration-500 group-hover:scale-[1.06]"
                              />
                              <div className="photo-scrim-soft" aria-hidden />
                            </>
                          ) : (
                            <Photo
                              name={CATEGORY_PHOTOS[slug] ?? "home-nighttime-lit"}
                              alt={`${c.name} from Holiday Lights Direct`}
                              ratio="h-full w-full"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 190px"
                              scrim="soft"
                              className="transition duration-500 group-hover:scale-[1.06]"
                            />
                          )}
                        </div>
                        <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-4 pb-3.5 text-sm font-bold text-white">
                          {label}
                          <ArrowNE />
                        </span>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="tile reveal-sm group relative isolate flex min-h-[420px] flex-col justify-between p-5 text-white lg:min-h-0">
              <div className="absolute inset-0 -z-10">
                <Photo
                  name="track-night-glow"
                  alt="Home at dusk with a rainbow scene running along its permanent LED roofline track"
                  ratio="h-full w-full"
                  sizes="(max-width: 1024px) 100vw, 590px"
                  scrim="soft"
                  className="transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <span className="tag-pill self-start">Permanent lighting</span>
              <div>
                <h3 className="font-display text-[1.9rem] md:text-[2.3rem]">
                  <Link href="/permanent-lights" className="after:absolute after:inset-0">
                    One system, every holiday.
                  </Link>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                  Warm white for everyday evenings, any colour for the days that matter.
                  {kitFrom ? ` Complete kits from ${formatCad(kitFrom)}.` : ""}
                </p>
                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {[
                    ["Kits by size", "/product-category/permanent-lighting-kits"],
                    ["Aluminum tracks", "/product-category/aluminum-tracks"],
                    ["RGBW puck lights", "/product-category/led-puck-lights"]
                  ].map(([label, href]) => (
                    <Link key={href} href={href} className="scene-pill px-4">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductRail groups={railGroups} />
      <Audiences />
      <PermanentLightsFeature housingPackages={kits} />
      <Gallery />
      <ProjectHub items={hubItems} />
      <SpecCallouts />
      <ProcessSteps />
      <Testimonial />
      <ServiceAreas />
      <CtaBand />
    </>
  );
}
