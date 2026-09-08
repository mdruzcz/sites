import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { VideoLoop } from "@/components/VideoLoop";
import { WallTypes, Process, RepairSigns, Testimonials, WhyUs, AreasBand } from "@/components/Sections";
import { PhotoGrid } from "@/components/PhotoGrid";
import { FaqList } from "@/components/ArticleBody";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { PICKS, finished, gallery } from "@/lib/photos";
import { getGuides } from "@/lib/content";

export const revalidate = 3600;

const TITLE = "London Retaining Walls | Retaining Wall Contractor London ON";
const DESC = "Owner-led retaining wall contractor in London, Ontario. Block, concrete, timber and stone walls built with real drainage, permits handled. Free written quotes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: site.url },
  openGraph: { title: TITLE, description: DESC, url: site.url, type: "website", images: [{ url: PICKS.home.image, width: PICKS.home.width, height: PICKS.home.height, alt: PICKS.home.alt }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [PICKS.home.image] },
};

const faqs = [
  { q: "How much does a retaining wall cost in London, Ontario?", a: "Most residential walls land between $200 and $350 per linear foot installed for interlocking block, with timber usually coming in lower and poured concrete higher. Height, access for the excavator, soil conditions and drainage needs move the number. Every quote we give is written and broken out by line so you can see where the money goes." },
  { q: "Do I need a permit for a retaining wall in Ontario?", a: "Generally yes once the wall is over 1 metre high, and often when it supports a driveway, structure or a surcharge from a neighbouring property. Rules vary by municipality. We check with the city or township for you and arrange engineering when it is required." },
  { q: "Which retaining wall material lasts longest?", a: "Properly drained poured concrete and interlocking block walls routinely last 40 to 80 years in Ontario. Pressure-treated timber walls typically give 20 to 30 years. Drainage matters more than material: a block wall with no weeping tile can fail in 5 years while a well-built timber wall outlives it." },
  { q: "Can you repair a leaning retaining wall or does it need to be rebuilt?", a: "Minor lean with a sound base can sometimes be corrected by relieving water pressure and adding drainage. A wall that has bulged, stepped apart or rotated at the base is almost always cheaper and safer to rebuild correctly. Kyle will tell you honestly which case you have during the free site visit." },
  { q: "How long does it take to build a retaining wall?", a: "A typical residential wall of 30 to 60 feet is finished in two to four working days including excavation, base, drainage and backfill. Larger tiered systems and engineered walls run one to two weeks. We give you a schedule with the quote." },
  { q: "Where do you build retaining walls?", a: "London and everywhere within about 40 minutes: St. Thomas, Woodstock, Strathroy, Dorchester, Aylmer, Ilderton, Komoka, Mount Brydges, Lucan, Delaware and Brantford, plus the rural properties in between." },
];

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "London Retaining Walls project reel",
  description: "Block, concrete and timber retaining walls built by London Retaining Walls across London and Southwestern Ontario.",
  thumbnailUrl: `${site.url}/images/video/retaining-walls-reel-poster.webp`,
  contentUrl: `${site.url}/videos/retaining-walls-reel.mp4`,
  uploadDate: "2026-08-25",
};

export default function HomePage() {
  const recent = finished(["segmental-block", "timber", "poured-concrete", "natural-stone"], 6, [PICKS.home, PICKS.homeTerrace, PICKS.block, PICKS.concrete, PICKS.timber, PICKS.stone, PICKS.terrace]);
  const guides = getGuides().slice(0, 4);
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={videoSchema} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Image src={PICKS.home.image} alt={PICKS.home.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={PICKS.home.blurDataURL} className="object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" aria-hidden />
        <div className="container-x relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="kicker text-accent">Owner-led · London, Ontario · {site.yearsLabel} years</p>
            <h1 className="display mt-4 text-[44px] leading-[0.92] sm:text-6xl lg:text-[76px]">
              Retaining walls<br />built for clay,<br /><span className="text-accent">frost and slopes.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85 md:text-xl">
              Interlocking block, poured concrete, timber and natural stone walls across London and Southwestern Ontario. Every wall gets a compacted base, weeping tile and filter fabric. That is why ours stay straight.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-paper/80">
              {["Free written quotes", "Permits and engineering handled", "Repairs of walls others built"].map((t) => <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 bg-accent" aria-hidden />{t}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn btn-accent">Request a free quote</a>
              <a href={site.phoneHref} className="btn btn-paper">Call {site.phone}</a>
            </div>
          </div>
          <div id="quote" className="scroll-mt-24 border border-white/10 bg-paper p-5 text-ink shadow-2xl md:p-6">
            <p className="font-display text-xl font-extrabold uppercase tracking-tight">Get your free quote</p>
            <p className="mt-1 text-[14px] text-stone">Kyle replies within one business day and books a site visit.</p>
            <div className="mt-4"><QuoteForm compact source="home-hero" /></div>
          </div>
        </div>
      </section>

      <AreasBand />
      <WallTypes />

      {/* Reel + intro */}
      <section className="section bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="kicker">London Retaining Walls</p>
            <h2 className="display mt-3 text-3xl md:text-4xl">The retaining wall contractor London homeowners call when the wall has to hold</h2>
            <div className="prose-lrw mt-5">
              <p>Kyle started London Retaining Walls after years of watching walls fail for the same three reasons: no compacted base, no drainage, and the wrong material for the load. Eight years and hundreds of walls later, the fix is still the same. Dig deeper than the frost line, put clear stone and weeping tile behind the wall, and compact the backfill in lifts.</p>
              <p>We build residential and commercial walls from a two-course garden bed to engineered walls holding up a driveway, and we are one of the few crews in the area that will take on <Link href="/retaining-wall-repair">repairing a wall someone else built</Link>. Read more <Link href="/about-us">about us</Link>, or browse the <Link href="/gallery">project gallery</Link>.</p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[["8+", "years building walls"], ["7", "wall types and services"], ["12", "towns served"]].map(([n, l]) => (
                <div key={l} className="border border-[var(--line)] bg-white p-4"><p className="font-display text-3xl font-extrabold text-accent-2">{n}</p><p className="text-[13px] text-ink-2">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden border border-[var(--line)] bg-black">
            <VideoLoop src="/videos/retaining-walls-reel.mp4" poster="/images/video/retaining-walls-reel-poster.webp" className="aspect-video w-full object-cover" />
          </div>
        </div>
      </section>

      <Process />
      <RepairSigns />
      <Testimonials />
      <WhyUs />

      {/* Recent work */}
      <section className="section bg-paper-2">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="kicker">Recent work</p><h2 className="display mt-3 text-3xl md:text-4xl">Straight from the crew's camera roll</h2></div>
            <Link href="/gallery" className="btn btn-outline">All {gallery.length} project photos</Link>
          </div>
          <div className="mt-10"><PhotoGrid photos={recent} /></div>
        </div>
      </section>

      {/* Guides */}
      <section className="section bg-paper">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="kicker">Guides</p><h2 className="display mt-3 text-3xl md:text-4xl">Read this before you get three quotes</h2></div>
            <Link href="/resources" className="btn btn-outline">All guides</Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <li key={g.slug} className="flex flex-col border border-[var(--line)] bg-white p-5">
                <p className="tag">{g.category}</p>
                <Link href={`/${g.slug}`} className="mt-3 font-display text-lg font-bold leading-snug hover:text-accent-2">{g.h1}</Link>
                <p className="mt-2 flex-1 text-[14px] text-ink-2">{g.summary}</p>
                <p className="mt-3 text-[12px] text-stone">{g.readMinutes} min read</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-white">
        <div className="container-x max-w-4xl py-16"><FaqList faqs={faqs} title="Retaining wall questions, answered plainly" /></div>
      </section>

      <CtaBand />
    </>
  );
}
