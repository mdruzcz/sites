import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CompareSlider } from "@/components/CompareSlider";
import { QuoteDock } from "@/components/QuoteDock";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { ALL_PHOTOS, PAIRS, PICKS, photo } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Before & After: Concrete Sealing Across Southwestern Ontario",
  description: "Drag-to-compare before and after photos of driveways, patios and walkways sealed by All-Seal in Woodstock, Brantford, St. Thomas and Southwestern Ontario, plus our process in action.",
  alternates: { canonical: `${site.url}/gallery` },
};

const GROUPS = [
  { key: "driveway", title: "Driveways" },
  { key: "stamped", title: "Stamped concrete" },
  { key: "patio", title: "Patios" },
  { key: "walkway", title: "Walkways and steps" },
  { key: "exposed-aggregate", title: "Exposed aggregate" },
  { key: "process", title: "The process" },
];

export default function GalleryPage() {
  const ld = { "@context": "https://schema.org", "@type": "ImageGallery", "@id": `${site.url}/gallery#gallery`, name: "All-Seal before and after gallery", url: `${site.url}/gallery`, image: ALL_PHOTOS.map((g) => ({ "@type": "ImageObject", contentUrl: `${site.url}${g.image}`, caption: g.alt })) };
  return (
    <>
      <Script id="gallery-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.gallery} kicker="Before & after" title={<>Drag the line. <span className="text-[var(--orange)]">Watch the colour come back.</span></>} intro="Six comparisons from our own jobs, shot from the same spot before and after, followed by more sealed surfaces from around the region." crumbs={[{ label: "Gallery" }]} />
      <section className="bg-white">
        <div className="shell section grid gap-10 md:grid-cols-2">{PAIRS.map((p, i) => <CompareSlider key={p.before} before={photo(p.before)} after={photo(p.after)} title={p.title} city={p.city} sheen={p.sheen} priority={i < 2} />)}</div>
      </section>
      {GROUPS.map((g, gi) => {
        const items = ALL_PHOTOS.filter((p) => p.category === g.key);
        if (!items.length) return null;
        return (
          <section key={g.key} className={gi % 2 ? "bg-white" : "bg-[var(--fog)]"}>
            <div className="shell section">
              <p className="kicker">{g.title}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {items.map((p, i) => (
                  <figure key={p.image} className={`group overflow-hidden rounded-lg ${i === 0 ? "col-span-2" : ""}`}>
                    <div className={`relative w-full ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}><Image src={p.image} alt={p.alt} fill placeholder="blur" blurDataURL={p.blurDataURL} sizes="(max-width:768px) 100vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                    <figcaption className="sr-only">{p.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <QuoteDock heading="Want your driveway in the next comparison?" />
      <CtaBand />
    </>
  );
}
