import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getAbout, getAllFaqs, getGuides, getImage, getImages, getSectors, getServices, getVideo } from "@/lib/content";
import { JsonLd, faqSchema, localBusinessSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { SectionHeading, IconTile, FaqList, StatRow, Photo } from "@/components/ui";
import { ProcessTimeline, SplitFeature, VideoStrip, ClosingForm } from "@/components/sections";
import { VideoLoop } from "@/components/VideoLoop";

export const revalidate = 3600;

const TITLE = "Commercial Holiday Decorators | Hotels, Lobbies, Plazas & Offices in Ontario";
const DESC = "Turnkey commercial holiday decorating services across Ontario: lobby Christmas tree rental and setup, interior holiday decor, commercial Christmas light installation, maintenance, takedown and storage. Insured, WSIB-compliant crews.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, url: site.url, images: [{ url: "/images/gallery/corporate-lobby-christmas-tree-gold-ribbon-01.jpg", alt: "Decorated corporate lobby Christmas tree" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const ICONS: Record<string, React.ReactNode> = { shield: <Icon.Shield />, clock: <Icon.Clock />, wrench: <Icon.Wrench />, box: <Icon.Home /> };

export default function HomePage() {
  const sectors = getSectors();
  const services = getServices();
  const about = getAbout();
  const guides = getGuides().slice(0, 3);
  const heroVideo = getVideo("commercial-lobby-christmas-trees-warm-white-lights-gold-ribbon");
  const hero = getImage("corporate-lobby-christmas-tree-gold-ribbon-accent-trees");
  const faqs = getAllFaqs().filter((f) => /hotel|cost|lease|insured|storage|how early|when/i.test(f.question)).slice(0, 6);
  const teaser = ["mall-atrium-giant-red-christmas-tree", "commercial-storefront-columns-wrapped-christmas-lights-wreaths-night", "office-elevator-lobby-christmas-tree-lit-gift-boxes", "luxury-venue-warm-white-roofline-and-tree-christmas-lights", "downtown-street-trees-wrapped-warm-white-christmas-lights", "commercial-entrance-canopy-christmas-wreaths-and-string-lights", "mall-santa-cabin-christmas-photo-set-centrepiece", "commercial-lobby-potted-christmas-trees-gold-planters"].map(getImage);
  const sectorImages: Record<string, string> = {
    "hotels-hospitality": "corporate-marble-atrium-decorated-christmas-tree",
    "condo-apartment-lobbies": "commercial-building-lobby-entrance-christmas-trees",
    "plazas-malls": "large-commercial-christmas-tree-shopping-plaza-night",
    "office-buildings": "office-tower-lobby-christmas-tree-display",
    "property-management": "condo-building-blue-warm-white-christmas-lights-night",
    "restaurants-retail": "commercial-storefront-christmas-wreaths-and-lit-columns",
    "municipalities-bias": "giant-golden-cone-christmas-tree-city-plaza-night",
  };

  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema(faqs)]} />

      {/* ---------- Hero: video on the right, light left ---------- */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--surface) 0%, #fff 100%)" }}>
        <div className="wrap relative py-14 md:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <span className="pill mb-5">{site.bookingBanner}</span>
            <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-ink text-balance">
              Commercial holiday decorating, <span className="text-[var(--accent-ink)]">installed, maintained and stored</span> for you.
            </h1>
            <p className="mt-5 text-lg text-body leading-relaxed">
              Lobby trees, atrium displays, building lighting and street trees for hotels, condos, plazas, offices and municipalities across Ontario. One design, one crew, one invoice, and nothing left in your storage room in January.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">{site.quote.ctaLong} <Icon.Arrow width={18} height={18} /></Link>
              <Link href="/gallery" className="btn btn-outline btn-lg"><Icon.Camera width={18} height={18} /> See our work</Link>
            </div>
            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold text-body">
              {[[<Icon.Shield key="s" width={16} height={16} />, "Insured & WSIB"], [<Icon.Clock key="c" width={16} height={16} />, "Overnight installs"], [<Icon.Wrench key="w" width={16} height={16} />, "Maintenance included"], [<Icon.Pin key="p" width={16} height={16} />, "Ontario-wide"]].map(([icon, label]) => (
                <li key={String(label)} className="flex items-center gap-2"><span className="text-[var(--gold-ink)]">{icon}</span>{label}</li>
              ))}
            </ul>
          </div>
          <div className="relative lg:pb-10">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--deep)]" style={{ boxShadow: "var(--shadow-lift)" }}>
              {heroVideo ? (
                <VideoLoop src={heroVideo.src} poster={hero.src} label={heroVideo.alt} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" />
              )}
            </div>
            <div className="card-light mt-4 lg:mt-0 lg:absolute lg:bottom-0 lg:-left-8 lg:w-[22rem] p-5 flex items-start gap-4">
              <IconTile className="shrink-0"><Icon.Calendar /></IconTile>
              <div>
                <p className="font-bold text-slate-900 leading-tight">{site.quote.short}</p>
                <p className="text-sm text-slate-600 mt-1">{site.quote.promise}</p>
                <Link href="/contact" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)] hover:underline">Book a site visit <Icon.Arrow width={14} height={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust bar ---------- */}
      <section className="border-y" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="wrap py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-[var(--border)]">
          {site.trustBar.map((t) => (
            <div key={t.title} className="flex flex-col items-center text-center px-2">
              <IconTile className="mb-3">{ICONS[t.icon]}</IconTile>
              <h3 className="font-bold text-ink">{t.title}</h3>
              <p className="mt-1 text-xs md:text-sm text-[var(--muted)] leading-snug">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Sectors ---------- */}
      <section className="section" id="sectors" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Who we serve" title="Holiday decor for every kind of commercial property" sub="Each sector has its own page with the spaces we decorate, typical programs and the questions buyers ask." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => {
              const img = getImage(sectorImages[s.slug] ?? s.heroImage);
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="card card-lift overflow-hidden flex flex-col group">
                  <div className="relative aspect-[4/3]"><Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" blurDataURL={img.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl text-ink">{s.name}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{s.navDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">See how we work with {s.shortName.toLowerCase()} <Icon.Arrow width={16} height={16} /></span>
                  </div>
                </Link>
              );
            })}
            <div className="card card-static p-6 flex flex-col justify-center" style={{ background: "var(--deep)" }}>
              <p className="font-display text-2xl text-white">Not sure which fits?</p>
              <p className="mt-2 text-sm text-[#c9d3cf]">Send a photo of the space. We’ll tell you what suits it and what it typically costs.</p>
              <Link href="/contact" className="btn btn-gold mt-5 self-start">{site.quote.cta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Services" title="Everything from the first sketch to the storage shelf" sub="Interior and exterior, leased or purchased, one season or five." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-lift p-6 flex flex-col">
                <h3 className="font-bold text-ink text-lg">{s.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{s.navDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Details <Icon.Arrow width={14} height={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Interior split ---------- */}
      <SplitFeature
        eyebrow="Interior holiday decor"
        title={<>Lobby trees and atrium displays that <span className="text-[var(--accent-ink)]">match the building.</span></>}
        body={[
          "Pre-lit trees from 7 to over 20 feet, dressed in a scheme that matches your finishes or your brand, delivered and set up overnight so the lobby opens finished. Garland on railings and columns, wreaths at every entrance, planters at the doors.",
          "We lease the whole display, so there is nothing to buy, store or replace. It arrives in October or November, we service it all season, and it leaves in January.",
        ]}
        bullets={[{ icon: <Icon.Lamp width={18} height={18} />, label: "7 to 20+ ft pre-lit trees" }, { icon: <Icon.Palette width={18} height={18} />, label: "Colour schemes to match" }, { icon: <Icon.Clock width={18} height={18} />, label: "Overnight setup" }, { icon: <Icon.Home width={18} height={18} />, label: "Removed and stored by us" }]}
        image="commercial-lobby-gold-ribbon-christmas-tree-elevators"
        cta={{ label: "Lobby tree rental & setup", href: "/services/lobby-christmas-tree-rental" }}
      />

      {/* ---------- Exterior split ---------- */}
      <SplitFeature
        flip
        eyebrow="Commercial Christmas light installation"
        title={<>Building outlines, canopies and <span className="text-[var(--accent-ink)]">every tree on the property.</span></>}
        body={[
          "Commercial-grade LED strings and C9 bulbs on rooflines, porte-cochères, columns and signage. Trunk and canopy wraps on boulevard trees, lit cone trees in planters and medians, warm-white hedges along the walkways.",
          "Crews work from bucket trucks and lifts outside business hours with a traffic plan where one is needed. Timers and photocells are set by us, and any fault is fixed at no charge all season.",
        ]}
        bullets={[{ icon: <Icon.Bolt width={18} height={18} />, label: "Commercial-grade LED & C9" }, { icon: <Icon.Building width={18} height={18} />, label: "Lifts & bucket trucks" }, { icon: <Icon.Shield width={18} height={18} />, label: "Insured, WSIB, traffic plans" }, { icon: <Icon.Wrench width={18} height={18} />, label: "Season-long maintenance" }]}
        image="commercial-building-exterior-christmas-lights-entrance-drive"
        cta={{ label: "Exterior lighting service", href: "/services/commercial-christmas-light-installation" }}
      />

      <VideoStrip keys={["christmas-display-installation-shopping-mall-crew", "office-lobby-christmas-tree-blue-gold-ornaments", "blue-white-wrapped-tree-commercial-christmas-lights"]} sub="Crews setting up a mall display, a finished office lobby tree, and a wrapped tree outside a commercial building." />

      {/* ---------- Process ---------- */}
      <ProcessTimeline steps={about.process.map((p) => ({ title: p.title, desc: p.body }))} />

      {/* ---------- Why us ---------- */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Why property managers choose us" title="Built for buildings, not backyards" sub={`Decorating Ontario properties since ${site.since}. The commercial division of ${site.sisterBrand.name}.`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.whyUs.map((w, i) => (
              <div key={w.title} className="card card-static p-6">
                <IconTile className="mb-4">{[<Icon.Lamp key="a" />, <Icon.Shield key="b" />, <Icon.Clock key="c" />, <Icon.Wrench key="d" />, <Icon.Home key="e" />, <Icon.Users key="f" />][i % 6]}</IconTile>
                <h3 className="font-bold text-ink text-lg mb-1.5">{w.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><StatRow stats={about.stats} /></div>
        </div>
      </section>

      {/* ---------- Gallery teaser ---------- */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <span className="pill mb-4">Gallery</span>
              <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.05] text-ink">Lobbies, malls, storefronts and streets</h2>
              <p className="mt-3 text-[var(--muted)]">{getImages().length} photos and {getVideo("commercial-lobby-christmas-tree-gold-ribbon") ? "14" : "a dozen"} short clips of our own commercial work.</p>
            </div>
            <Link href="/gallery" className="btn btn-outline">Browse the gallery <Icon.Arrow width={16} height={16} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {teaser.map((p, i) => (
              <Link key={p.key} href="/gallery" className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 25vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Guides ---------- */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Planning guides" title="Read before you budget" sub="Timelines, lease-vs-buy math, tree sizing and the questions to ask any contractor." />
          <div className="grid gap-5 md:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card card-lift overflow-hidden flex flex-col group">
                <Photo img={getImage(g.heroImage)} ratio="aspect-[16/10]" className="!rounded-none" />
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-[var(--muted)]">{g.readingTime}</p>
                  <h3 className="mt-1 font-bold text-ink text-lg leading-snug">{g.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{g.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Read the guide <Icon.Arrow width={14} height={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap max-w-4xl">
          <SectionHeading eyebrow="Questions" title="What buyers ask first" />
          <FaqList items={faqs} name="home-faq" />
          <div className="text-center mt-8"><Link href="/faq" className="btn btn-outline btn-sm">All 40 questions answered <Icon.Arrow width={14} height={14} /></Link></div>
        </div>
      </section>

      <ClosingForm />
    </>
  );
}
