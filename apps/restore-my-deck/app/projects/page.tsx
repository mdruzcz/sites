import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { BeforeAfterPair } from "@/components/BeforeAfterSection";
import { site } from "@/lib/site";
import { ALL_PHOTOS, BEFORE_AFTER, PICKS, photo } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects: Deck & Fence Before and After, Kitchener-Waterloo",
  description: "Before and after photos of decks and fences restored, cleaned and stained by Restore My Deck across Kitchener, Waterloo, Cambridge, Guelph and Southwestern Ontario.",
  alternates: { canonical: `${site.url}/projects` },
};

const GROUPS: { key: string; title: string; blurb: string }[] = [
  { key: "staining", title: "Stained decks", blurb: "Brush-applied Ready Seal and Penofin Verde on cedar and pressure-treated decks." },
  { key: "restoration", title: "Full restorations", blurb: "Cleaned, repaired, sanded and stained over two days." },
  { key: "fence", title: "Fences", blurb: "Privacy fences and screens cleaned and stained to match the deck." },
  { key: "cleaning", title: "Cleaning and prep", blurb: "Grey wood after washing, ready for sanding and stain." },
  { key: "process", title: "On the job", blurb: "Washing, sanding and brushing in progress." },
];

export default function ProjectsPage() {
  const ld = { "@context": "https://schema.org", "@type": "ImageGallery", "@id": `${site.url}/projects#gallery`, name: "Restore My Deck projects", url: `${site.url}/projects`, image: ALL_PHOTOS.map((g) => ({ "@type": "ImageObject", contentUrl: `${site.url}${g.image}`, caption: g.alt })) };
  return (
    <>
      <Script id="gallery-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.heroProjects} eyebrow="Projects" title="Real decks, real before and afters." intro="Fifty-plus decks and fences from around Kitchener-Waterloo, Cambridge, Guelph and Hamilton. Not stock photos." crumbs={[{ label: "Projects" }]} compact />
      <section className="bg-white">
        <div className="shell section">
          <div className="max-w-2xl"><p className="eyebrow-pill moss">Before &amp; after</p><h2 className="font-display h2-fluid mt-4">Same boards, two days later.</h2></div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER.map((p) => <BeforeAfterPair key={p.before} before={photo(p.before)} after={photo(p.after)} title={p.title} city={p.city} />)}
          </div>
        </div>
      </section>
      {GROUPS.map((g, gi) => {
        const items = ALL_PHOTOS.filter((p) => p.category === g.key);
        if (!items.length) return null;
        return (
          <section key={g.key} className={gi % 2 ? "bg-white" : "bg-[var(--paper)]"}>
            <div className="shell section">
              <div className="max-w-2xl"><p className="eyebrow-pill">{g.title}</p><p className="mt-4 text-[var(--ink-soft)]">{g.blurb}</p></div>
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                {items.map((p, i) => (
                  <figure key={p.image} className={`group overflow-hidden rounded-2xl ${i === 0 ? "col-span-2" : ""}`}>
                    <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                      <Image src={p.image} alt={p.alt} fill placeholder="blur" blurDataURL={p.blurDataURL} sizes="(max-width:768px) 100vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <figcaption className="sr-only">{p.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <CtaBand heading="Want your deck in the next before and after?" />
      <Contact />
    </>
  );
}
