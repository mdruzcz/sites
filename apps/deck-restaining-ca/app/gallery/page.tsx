import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Gallery | Before & After Deck Transformations",
  description: `Before & after photos of deck and fence staining projects across Oakville, Burlington & the Halton Region — premium oil-based finishes.`,
  alternates: { canonical: "/gallery" },
};

const beforeAfterPairs = [
  { before: "/images/drc1.jpeg", after: "/images/drc2.jpeg", label: "Deck Restaining — Oakville" },
  { before: "/images/drc3.jpeg", after: "/images/drc4.jpeg", label: "Deck Restoration — Burlington" },
  { before: "/images/drc5.jpeg", after: "/images/drc6.jpeg", label: "Full Restoration — Milton" },
  { before: "/images/drc7.jpeg", after: "/images/drc8.jpeg", label: "Fence Staining — Halton Region" },
  { before: "/images/deck6.jpg", after: "/images/deck7.jpg", label: "Cedar Deck — Oakville" },
  { before: "/images/deck8.jpg", after: "/images/deck9.jpg", label: "Fence Restoration — Burlington" },
];

const galleryImages = [
  { src: "/images/deck1.jpeg", alt: "Professional deck staining project in Oakville, Ontario" },
  { src: "/images/deck2.jpeg", alt: "Freshly stained cedar deck in Burlington, Ontario" },
  { src: "/images/deck3.jpg", alt: "Fence staining project completed in Halton Region" },
  { src: "/images/deck4.jpg", alt: "Deck sealing and protection application in progress" },
  { src: "/images/deck5.jpg", alt: "Power washing deck preparation before staining" },
  { src: "/images/deck11.jpeg", alt: "Oil-based deck restaining residential project in Oakville" },
  { src: "/images/deck12.jpeg", alt: "Professional deck preparation and sanding in Burlington" },
  { src: "/images/deck13.jpeg", alt: "Completed backyard deck restoration in Milton" },
];

export default function GalleryPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Gallery", url: `${site.url}/gallery` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Work
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            Real transformations from real projects across the Halton Region and GTA.
            See the difference professional oil-based staining makes.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Before & After"
            title="Drag to Compare"
            description="Slide to see the transformation. Every project uses premium oil-based stains for lasting results."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beforeAfterPairs.map((pair) => (
              <BeforeAfterSlider
                key={pair.label}
                beforeSrc={pair.before}
                afterSrc={pair.after}
                label={pair.label}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--stone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Project Gallery"
            title="Recent Projects"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
