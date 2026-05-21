import type { Metadata } from "next";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery | Deck Restoration & Staining Photos | Deck Medic",
  description:
    "Browse Deck Medic's project gallery — before & after deck restorations, staining, power washing, and fence refinishing across Toronto, Mississauga, Oakville & Burlington.",
  alternates: { canonical: "https://deckmedic.ca/gallery" },
};

const galleryItems = [
  { src: "/images/Deck-Medic-Banner.png", alt: "Restored deck showcasing Deck Medic's premium staining work in Toronto, ON", category: "Restoration" },
  { src: "/images/Deck-after-cleaning-1.jpeg", alt: "Deck boards after professional deep cleaning by Deck Medic in Toronto", category: "Cleaning" },
  { src: "/images/Deck-Restoration-before-washing-2.jpeg", alt: "Weathered deck before Deck Medic restoration treatment — grey, splintered wood", category: "Before" },
  { src: "/images/Deck-Stains-after-washing-1.webp", alt: "Deck with premium stain applied after professional washing by Deck Medic", category: "Staining" },
  { src: "/images/side-Fence-Staining-1.jpeg", alt: "Cedar fence after professional staining and restoration by Deck Medic in Toronto", category: "Fence" },
  { src: "/images/Deck-Refinishing-2.webp", alt: "Complete deck refinishing result showing rich wood colour by Deck Medic", category: "Restoration" },
  { src: "/images/Power-Washing-vs.-Manual-Deck-Cleaning-Which-Pre-Staining-Method-Is-Right-1.jpeg", alt: "Professional power washing of deck boards before staining by Deck Medic, Toronto ON", category: "Cleaning" },
  { src: "/images/Deck-Stains-after-washing.webp", alt: "Deck boards showing deep stain penetration after proper preparation by Deck Medic", category: "Staining" },
  { src: "/images/Deck-Restoration-after-washing.jpeg", alt: "Deck after professional washing and restoration prep by Deck Medic", category: "Restoration" },
  { src: "/images/Power-Washing-vs.-Manual-Deck-Cleaning-Which-Pre-Staining-Method-Is-Right.jpeg", alt: "Power washing deck boards prior to Deck Medic professional staining service", category: "Cleaning" },
  { src: "/images/Deck-after-cleaning.jpeg", alt: "Clean deck boards ready for staining after Deck Medic's professional deep clean", category: "Cleaning" },
  { src: "/images/Deck-Refinishing-1.webp", alt: "Deck refinishing in progress showing smooth sanded surface by Deck Medic", category: "Restoration" },
  { src: "/images/Deck-Refinishing.png", alt: "Completed deck refinishing showing vibrant natural wood colour, Deck Medic", category: "Restoration" },
  { src: "/images/Deck-Refinish-after-washing.jpeg", alt: "Deck surface after washing showing natural wood ready for Deck Medic staining", category: "Cleaning" },
  { src: "/images/Deck-Staining-Sealing-2.png", alt: "Professional deck staining and sealing service result by Deck Medic in Southern Ontario", category: "Staining" },
  { src: "/images/Deck-Restoration-Refinishing-2.png", alt: "Full-service deck restoration and refinishing completed by Deck Medic", category: "Restoration" },
  { src: "/images/Power-Washing-Deep-Cleaning-2.png", alt: "Power washing and deep cleaning service by Deck Medic, Toronto area", category: "Cleaning" },
  { src: "/images/Fence-Staining-Restoration-2.png", alt: "Fence staining and restoration service result by Deck Medic in Toronto, ON", category: "Fence" },
];

export default function GalleryPage() {
  return (
    <main>
      <NavBar />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Project Showcase</p>
            <h1 className="font-display text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
              Our Work Speaks{" "}
              <span className="text-gradient-blue">For Itself</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: "var(--slate-muted)" }}>
              Browse our portfolio of deck restorations, staining projects, power washing, and fence refinishing across
              Toronto, Mississauga, Oakville, and Burlington.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((img, i) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-2xl group ${i === 0 || i === 5 ? "col-span-2 row-span-2" : ""}`}
                style={{ aspectRatio: i === 0 || i === 5 ? "16/9" : "1/1" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-[var(--blue)]">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <CallNowFab />
    </main>
  );
}
