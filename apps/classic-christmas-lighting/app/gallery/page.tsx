import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { ALL_PHOTOS, PICKS } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery: Real Installs in Kitchener-Waterloo",
  description: "Browse real Christmas light installations by Classic Christmas Lighting across Kitchener, Waterloo, Cambridge, Guelph and Hamilton: rooflines, wrapped trees, storefronts and crews at work.",
  alternates: { canonical: `${site.url}/gallery` },
};

const GROUPS: { key: string; title: string; blurb: string }[] = [
  { key: "residential-exterior", title: "Homes", blurb: "Rooflines, wrapped trees, wreaths and lit driveways on homes across Waterloo Region." },
  { key: "commercial-exterior", title: "Storefronts, plazas and public spaces", blurb: "Commercial rooflines, entrance garland, park trees and community displays." },
  { key: "install-action", title: "On the lift", blurb: "The bucket trucks and crews that make tall rooflines and big trees safe work." },
];

export default function GalleryPage() {
  const ld = { "@context": "https://schema.org", "@type": "ImageGallery", "@id": `${site.url}/gallery#gallery`, name: "Classic Christmas Lighting gallery", url: `${site.url}/gallery`, image: ALL_PHOTOS.map((g) => ({ "@type": "ImageObject", contentUrl: `${site.url}${g.image}`, caption: g.alt })) };
  return (
    <>
      <Script id="gallery-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.heroGallery} eyebrow="Gallery" title="Real installs, not stock photos." intro="Fifty-plus rooflines, trees, storefronts and crews at work from around Kitchener-Waterloo and Southern Ontario." crumbs={[{ label: "Gallery" }]} compact />
      {GROUPS.map((g, gi) => {
        const items = ALL_PHOTOS.filter((p) => p.category === g.key);
        if (!items.length) return null;
        return (
          <section key={g.key} className={gi % 2 ? "bg-[var(--paper)]" : "bg-[var(--snow)]"}>
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
      <CtaBand heading="Want your house in next year's gallery?" />
      <Contact />
    </>
  );
}
