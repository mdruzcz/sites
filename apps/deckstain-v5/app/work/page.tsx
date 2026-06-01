import type { Metadata } from "next";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { PageHead } from "@/components/PageHead";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { BLUR } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Work — Deck Staining Project Gallery",
  description: "Real before-and-after deck staining, sealing, restoration, and fence staining projects across Southwestern Ontario. See the DeckStain.ca difference.",
};

export default function WorkPage() {
  return (
    <>
      <PageHead eyebrow="Our work" title="Real decks. Real transformations."
        intro="Every project below is a real DeckStain.ca job finished with READY Seal® oil-based stain. Drag the slider to see a transformation up close."
        image="/images/hero-work.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Our Work", href: "/work" }]} />

      <section className="sec bg-white">
        <div className="wrap">
          <Reveal before="/images/before-after-cleaning.jpg" after="/images/after-deck-cleaning-staining.jpg"
            beforeAlt="Weathered gray deck before staining by DeckStain.ca" afterAlt="The same deck after cleaning and READY Seal staining by DeckStain.ca" />
        </div>
      </section>

      <section className="pb-14 md:pb-20 bg-white">
        <div className="wrap">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
            {PROJECTS.map((p, i) => (
              <div key={i} className="relative break-inside-avoid rounded-[var(--r-lg)] overflow-hidden group">
                <div className={`relative ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                  <Image src={p.image} alt={`${p.title} — ${p.tag} by DeckStain.ca in ${p.place}, Ontario`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <span className="inline-block bg-[var(--green)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1">{p.tag}</span>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-head)" }}>{p.title}</p>
                  <p className="text-white/70 text-xs">{p.place}, ON</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
