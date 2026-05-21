import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  { src: "/images/Deck-after-cleaning-1.jpeg", alt: "Deck after professional deep cleaning by Deck Medic, Toronto ON" },
  { src: "/images/Deck-Restoration-before-washing-2.jpeg", alt: "Weathered deck before Deck Medic restoration treatment" },
  { src: "/images/Deck-Stains-after-washing-1.webp", alt: "Deck boards with stain after professional washing by Deck Medic" },
  { src: "/images/side-Fence-Staining-1.jpeg", alt: "Cedar fence after professional staining by Deck Medic in Toronto" },
  { src: "/images/Deck-Refinishing-2.webp", alt: "Deck refinishing and restoration result by Deck Medic" },
  { src: "/images/Power-Washing-vs.-Manual-Deck-Cleaning-Which-Pre-Staining-Method-Is-Right-1.jpeg", alt: "Professional power washing of deck before staining, Toronto ON" },
];

export function Gallery() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--blue)" }}
            >
              Project Showcase
            </p>
            <h2
              className="font-display text-4xl font-extrabold leading-tight"
              style={{ color: "var(--slate)" }}
            >
              Our Recent Work
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--blue-dark)] flex-shrink-0"
            style={{ color: "var(--blue)" }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "16/9" : "1/1" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
