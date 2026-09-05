import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { site } from "@/lib/site";
import { ALL_PHOTOS, BEFORE_AFTER, PICKS, photo } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Before & After Gallery: Concrete Sealing Across SW Ontario",
  description: "Before and after photos of driveways, patios, stamped concrete and walkways sealed by TriCity across London, Woodstock, Brantford and St. Thomas, plus our process in action.",
  alternates: { canonical: `${site.url}/gallery` },
};

const GROUPS: { key: string; title: string; blurb: string }[] = [
  { key: "driveway", title: "Driveways", blurb: "Stamped, broom-finish and coloured driveways sealed in matte, semi-gloss and gloss." },
  { key: "stamped", title: "Stamped concrete", blurb: "Ashlar slate, flagstone, wood plank and seamless patterns with the colour brought back." },
  { key: "patio", title: "Patios", blurb: "Backyard patios restored and protected for the summer." },
  { key: "walkway", title: "Walkways and steps", blurb: "Front entrances, porches and paths sealed with a non-slip additive." },
  { key: "exposed-aggregate", title: "Exposed aggregate", blurb: "Stones locked in and colour deepened." },
  { key: "process", title: "The process", blurb: "Pressure washing, prep and spray-and-roll application in action." },
];

export default function GalleryPage() {
  const ld = { "@context": "https://schema.org", "@type": "ImageGallery", "@id": `${site.url}/gallery#gallery`, name: "TriCity Concrete Sealing gallery", url: `${site.url}/gallery`, image: ALL_PHOTOS.map((g) => ({ "@type": "ImageObject", contentUrl: `${site.url}${g.image}`, caption: g.alt })) };
  return (
    <>
      <Script id="gallery-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.heroGallery} eyebrow="Before & after" title="Real concrete, real results." intro="Browse before-and-after pairs, then driveways, patios, stamped concrete and walkways we have sealed across Southwestern Ontario." crumbs={[{ label: "Gallery" }]} compact />

      <section className="bg-white">
        <div className="shell section">
          <div className="max-w-2xl"><p className="eyebrow-pill moss">Real projects</p><h2 className="font-display h2-fluid mt-4">Before and after, one visit apart.</h2></div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER.map((p) => <BeforeAfter key={p.before} before={photo(p.before)} after={photo(p.after)} title={p.title} city={p.city} finish={p.finish} />)}
          </div>
        </div>
      </section>

      {GROUPS.map((g, gi) => {
        const items = ALL_PHOTOS.filter((p) => p.category === g.key);
        if (!items.length) return null;
        return (
          <section key={g.key} className={gi % 2 ? "bg-white" : "bg-[var(--stone)]"}>
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
      <CtaBand heading="Want your driveway in the next before and after?" />
      <Contact />
    </>
  );
}
