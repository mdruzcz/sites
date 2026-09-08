import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { PhotoGrid } from "@/components/PhotoGrid";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { gallery, PICKS, MATERIAL_LABEL } from "@/lib/photos";

export const revalidate = 3600;
const TITLE = "Retaining Wall Gallery | 150+ Projects in London, Ontario";
const DESC = "Browse 150+ photos of block, concrete, timber, natural stone and armour stone retaining walls built by our crew across London and Southwestern Ontario.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${site.url}/gallery` }, openGraph: { title: TITLE, description: DESC, url: `${site.url}/gallery`, images: [{ url: PICKS.gallery.image, alt: PICKS.gallery.alt }] }, twitter: { card: "summary_large_image", title: TITLE, description: DESC } };

const GROUPS: { id: string; title: string; text: string; filter: (p: (typeof gallery)[number]) => boolean; href?: string }[] = [
  { id: "block", title: "Interlocking block walls", text: "Permacon, Allan Block and Unilock systems. Curves, corners, steps and raised beds.", filter: (p) => p.material === "segmental-block" && p.category === "retaining-wall", href: "/block-retaining-walls" },
  { id: "timber", title: "Timber walls and terraces", text: "6x6 pressure-treated timber with deadman anchors, from single walls to multi-tier hillsides.", filter: (p) => p.material === "timber" && p.category === "retaining-wall", href: "/wood-and-timber-retaining-walls" },
  { id: "concrete", title: "Poured concrete walls", text: "Formed, reinforced and parged. Driveways, walkouts and stairs.", filter: (p) => p.material === "poured-concrete" && p.category === "retaining-wall", href: "/concrete-retaining-walls" },
  { id: "stone", title: "Natural stone, armour stone and boulders", text: "Set with an excavator, drained like every other wall we build.", filter: (p) => ["natural-stone", "armour-stone", "boulder", "mixed"].includes(p.material) && p.category === "retaining-wall", href: "/natural-stone-retaining-walls" },
  { id: "construction", title: "Under construction: what is behind the wall", text: "Base courses, clear stone, weeping tile, filter fabric, deadman tiebacks and geogrid. The part you never see once it is backfilled.", filter: (p) => p.category === "construction", href: "/retaining-wall-drainage-explained" },
  { id: "repairs", title: "Failed walls we were called to fix", text: "Bulging, stepped, collapsed and rotted. Every one of these had a drainage or base problem.", filter: (p) => p.category === "repair", href: "/retaining-wall-repair" },
];

export default function GalleryPage() {
  const imageGallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "London Retaining Walls project gallery",
    url: `${site.url}/gallery`,
    associatedMedia: gallery.map((g) => ({ "@type": "ImageObject", contentUrl: `${site.url}${g.image}`, caption: g.alt, width: g.width, height: g.height })),
  };
  return (
    <>
      <JsonLd data={imageGallery} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }])} />
      <PageHero photo={PICKS.gallery} kicker="Project gallery" title={`${gallery.length} photos from real jobs`} intro="Nothing staged and nothing stock. Finished walls, walls in progress, and the failed walls we were called in to replace." crumbs={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]}>
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Gallery sections">
          {GROUPS.map((g) => <a key={g.id} href={`#${g.id}`} className="tag !border-white/20 !bg-white/10 !text-paper hover:!bg-accent hover:!text-ink">{g.title}</a>)}
        </nav>
      </PageHero>
      {GROUPS.map((g, i) => {
        const photos = gallery.filter(g.filter);
        if (!photos.length) return null;
        return (
          <section key={g.id} id={g.id} className={`scroll-mt-24 py-14 ${i % 2 ? "bg-paper-2" : "bg-paper"}`}>
            <div className="container-x">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl"><p className="kicker">{photos.length} photos</p><h2 className="display mt-2 text-2xl md:text-3xl">{g.title}</h2><p className="mt-2 text-[16px] text-ink-2">{g.text}</p></div>
                {g.href && <Link href={g.href} className="btn btn-outline shrink-0">Learn more</Link>}
              </div>
              <div className="mt-8"><PhotoGrid photos={photos} cols={4} /></div>
            </div>
          </section>
        );
      })}
      <p className="sr-only">{Object.values(MATERIAL_LABEL).join(", ")}</p>
      <CtaBand title="Want your yard in this gallery?" />
    </>
  );
}
