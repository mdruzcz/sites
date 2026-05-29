import type { Metadata } from "next";
import Image from "next/image";
import { NavBar, Contact, Footer } from "../_components/sections";

export const metadata: Metadata = {
  title: "Project Gallery | Decks & Fences Built in Woodstock, ON | Woodstock Deck & Fence",
  description:
    "Browse our gallery of completed deck and fence projects in Woodstock, Ingersoll, Tillsonburg, Brantford and Oxford County, Ontario. Custom PT, cedar, composite decks and vinyl, wood, steel fences.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", title: "Project Gallery | Woodstock Deck & Fence", description: "Deck and fence projects built across Woodstock and Oxford County, Ontario." },
};

export const revalidate = 3600;

const photos = [
  { src: "/images/legacy/Custom-Deck-Design-Installation.png", alt: "Custom composite deck installation in Woodstock, Ontario", category: "Decks" },
  { src: "/images/legacy/Professional-Fencing-Solutions.png", alt: "Professional vinyl privacy fence installed in Oxford County, Ontario", category: "Fences" },
  { src: "/images/legacy/Deck-Restoration-Refinishing-2.png", alt: "Deck restoration and refinishing service in Woodstock, ON", category: "Restoration" },
  { src: "/images/legacy/Fence-Staining-Restoration-2.png", alt: "Wood fence staining and restoration by Woodstock Deck and Fence", category: "Restoration" },
  { src: "/images/legacy/Deck-Staining-Sealing-2-1.png", alt: "Deck staining and sealing service in Oxford County, Ontario", category: "Restoration" },
  { src: "/images/legacy/Specialized-Outdoor-Structures.png", alt: "Custom pergola and outdoor structure built in Woodstock, Ontario", category: "Structures" },
  { src: "/images/legacy/Power-Washing-Deep-Cleaning-2.png", alt: "Professional deck power washing service in Woodstock, ON", category: "Restoration" },
  { src: "/images/legacy/Deck-Restoration-before-washing-2.jpeg", alt: "Deck restoration project before and after in Oxford County", category: "Restoration" },
  { src: "/images/legacy/Deck-after-cleaning-1.jpeg", alt: "Cedar deck after professional cleaning in Woodstock, Ontario", category: "Restoration" },
  { src: "/images/legacy/Deck-Stains-after-washing-1.webp", alt: "Premium deck staining after washing in Woodstock, ON", category: "Restoration" },
  { src: "/images/legacy/side-Fence-Staining-1.jpeg", alt: "Wood fence staining service in Oxford County, Ontario", category: "Fences" },
  { src: "/images/legacy/Built-for-the-Woodstock-Climate.png", alt: "Deck built for Woodstock, Ontario climate with galvanized hardware", category: "Decks" },
  { src: "/images/legacy/Deck-Stains-after-washing.webp", alt: "Deck after professional staining in Woodstock, Ontario", category: "Restoration" },
  { src: "/images/legacy/Deck-Restoration-after-washing.jpeg", alt: "Deck restoration complete after washing in Oxford County", category: "Restoration" },
];

export default function GalleryPage() {
  return (
    <main>
      <NavBar homeHref="/" />

      <section className="pt-32 pb-12 lg:pt-40" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Our Work</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">Project Gallery</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Decks and fences built across Woodstock, Ingersoll, Tillsonburg, Brantford and Oxford County, Ontario.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {photos.map((p, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl ${i % 7 === 0 ? "col-span-2 row-span-2" : ""} aspect-square`}>
                <Image src={p.src} alt={p.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor: "var(--cedar)", opacity: 0.9 }}>{p.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 mb-6">Want to see your project here? Get a free estimate today.</p>
            <a href="#contact" className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-white" style={{ backgroundColor: "var(--cedar)" }}>
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
