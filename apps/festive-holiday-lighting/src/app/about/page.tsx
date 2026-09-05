import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { AwardBadge } from "@/components/award-badge";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About Festive Holiday Lighting, Hamilton, Ontario",
  description: "Festive Holiday Lighting is a family-owned Hamilton company installing classic Christmas lights and permanent LED systems across Southern Ontario for over ten years. Meet founder Cameron Blancher.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <PageHero photo={PICKS.heroAbout} eyebrow="About us" title="A Hamilton crew that treats every roofline like their own." intro="Founded by Cameron Blancher, family owned, ten-plus years of lights across Southern Ontario." crumbs={[{ label: "About" }]} compact />
      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <article className="prose-clean max-w-[66ch]">
            <h2>How it started</h2>
            <p>Cameron hung his own lights for years before neighbours started asking who did them. The answer became Festive: a small Hamilton crew doing classic Christmas installs properly, with commercial-grade product, real design and a maintenance visit built into every job.</p>
            <h2>What we do now</h2>
            <p>Two service lines. Classic seasonal lighting, where we design, install, maintain, take down and store everything each year. And permanent LED roofline systems, installed once and controlled from your phone for every holiday. On the commercial side we light storefronts, plazas, hotels, municipal streetscapes and lobbies, with boom trucks for the tall work.</p>
            <h2>How we work</h2>
            <p>Every crew is WSIB compliant and covered by $5M liability insurance. Quotes are free, itemized and back within a day. We answer the phone ourselves. If a section goes dark mid-season, we come back.</p>
            <div className="not-prose mt-6"><AwardBadge /></div>
          </article>
          <div className="grid grid-cols-2 gap-4">
            <Photo name={PICKS.install1} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroClassic} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
            <Photo name={PICKS.church} ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
            <Photo name={PICKS.install2} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>
      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-5 md:grid-cols-4">
          {[["10+", "years lighting Southern Ontario"], ["$5M", "liability insurance on every job"], ["5.0", "star rating across 47+ reviews"], ["2026", "Service Excellence Award, Hamilton"]].map(([n, l]) => (
            <div key={n} className="card p-6 text-center"><p className="font-display text-4xl text-[var(--candy)]">{n}</p><p className="mt-2 text-sm text-[var(--ink-soft)]">{l}</p></div>
          ))}
        </div>
        <div className="shell pb-16"><div className="flex flex-wrap gap-3"><Link href="/services" className="btn-candy">See our services</Link><Link href="/gallery" className="btn-outline">Gallery</Link></div></div>
      </section>
      <CtaBand />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
