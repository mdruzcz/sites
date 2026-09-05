import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { AwardBadge } from "@/components/award-badge";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Restore My Deck, Kitchener, Ontario",
  description: "Restore My Deck is a Kitchener wood-restoration company founded by Cameron. Eco-friendly cleaning, 80-grit sanding and brush-applied oil-based stain for decks and fences across Southwestern Ontario.",
  alternates: { canonical: `${site.url}/about-us` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero photo={PICKS.heroAbout} photoAlt="Restore My Deck technician hand-sanding a deck railing before staining" eyebrow="About us" title="Craftsmen who would rather restore your deck than sell you a new one." intro="Founded by Cameron in Kitchener. A decade of pressure washing, sanding and brushing stain into Southwestern Ontario wood." crumbs={[{ label: "About" }]} compact />
      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <article className="prose-clean max-w-[66ch]">
            <h2>How it started</h2>
            <p>Cameron got into wood restoration in his early twenties, starting with pressure washing. He moved on to a deck staining crew, learned what worked and what did not, and kept running into the same frustration: cheap detergents, sprayed stain and rushed prep that looked fine in July and peeled by the following spring.</p>
            <h2>Why Restore My Deck exists</h2>
            <p>The company was built around doing the slow parts properly. Plant-safe cleaners instead of bleach. An 80-grit buff sand after every wash so the grain lies down and the stain absorbs evenly. Penetrating oil-based stains from Ready Seal and Penofin Verde, brushed in by hand rather than sprayed on top. It takes longer, and the finish lasts longer.</p>
            <h2>How we work now</h2>
            <p>A small, hand-picked crew with more than a decade of combined experience. We trade notes with other restoration companies we respect, keep testing products, and still finish most decks in about two days. Quotes are free, usually from photos, and we answer the phone ourselves.</p>
            <div className="not-prose mt-6"><AwardBadge /></div>
          </article>
          <div className="grid grid-cols-2 gap-4">
            <Photo name={PICKS.heroSanding} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroStaining} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
            <Photo name={PICKS.closeupWash} ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
            <Photo name={PICKS.pergola} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="shell section grid gap-5 md:grid-cols-4">
          {[["10+", "years restoring wood"], ["2 days", "for most projects, drying included"], ["100%", "brush-applied, never sprayed"], ["Eco", "plant-safe, VOC-compliant products"]].map(([n, l]) => (
            <div key={l} className="card p-6 text-center"><p className="font-display text-4xl text-[var(--accent-deep)]">{n}</p><p className="mt-2 text-sm text-[var(--ink-soft)]">{l}</p></div>
          ))}
        </div>
        <div className="shell pb-16"><div className="flex flex-wrap gap-3"><Link href="/services" className="btn-accent">See our services</Link><Link href="/projects" className="btn-outline">Before &amp; after</Link></div></div>
      </section>
      <CtaBand />
      <Contact />
    </>
  );
}
