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
  title: "About Classic Christmas Lighting, Kitchener, Ontario",
  description: "Classic Christmas Lighting is a family-owned Kitchener company with 15 years of Christmas light installation across Waterloo Region, Guelph, Hamilton, Woodstock and Stratford. Meet the crew.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero photo={PICKS.heroAbout} photoAlt="Classic Christmas Lighting installer in a bucket lift hanging roofline Christmas lights on a Kitchener home" eyebrow="About us" title="A Kitchener family crew that treats every roofline like their own." intro="Family owned, fully insured, fifteen years of Christmas lights across Waterloo Region and Southern Ontario." crumbs={[{ label: "About" }]} compact />
      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <article className="prose-clean max-w-[66ch]">
            <h2>How it started</h2>
            <p>Classic Christmas Lighting started the way most good local businesses do: one house on a Kitchener street looked so good in December that the neighbours wanted the same thing. Fifteen years later, Ben and the crew hang lights on hundreds of homes and businesses every season, from Waterloo subdivisions to storefronts in downtown Guelph.</p>
            <h2>What we do</h2>
            <p>Full-service Christmas lighting. We design the display, supply commercial-grade LED lights, install with purpose-made clips, keep everything lit through the season and take it all down in January. Homes, businesses, trees, wreaths and garland, and seasonal rentals for BIAs, municipalities and events.</p>
            <h2>How we work</h2>
            <p>We are fully insured and there are never travel charges anywhere in our service area. Quotes are free, usually done from a photo and a phone call, and back within a business day. We answer the phone ourselves. If a section goes dark mid-season, we come back and fix it.</p>
            <div className="not-prose mt-6"><AwardBadge /></div>
          </article>
          <div className="grid grid-cols-2 gap-4">
            <Photo name={PICKS.install1} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroInstall} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
            <Photo name={PICKS.church} ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
            <Photo name={PICKS.install3} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>
      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-5 md:grid-cols-4">
          {[["15+", "years lighting Waterloo Region"], ["250+", "homes and businesses lit"], ["100%", "satisfaction, fully insured"], ["2026", "Service Excellence Award, Kitchener"]].map(([n, l]) => (
            <div key={n} className="card p-6 text-center"><p className="font-display text-4xl text-[var(--candy)]">{n}</p><p className="mt-2 text-sm text-[var(--ink-soft)]">{l}</p></div>
          ))}
        </div>
        <div className="shell pb-16"><div className="flex flex-wrap gap-3"><Link href="/services" className="btn-candy">See our services</Link><Link href="/gallery" className="btn-outline">Gallery</Link></div></div>
      </section>
      <CtaBand />
      <Contact />
    </>
  );
}
