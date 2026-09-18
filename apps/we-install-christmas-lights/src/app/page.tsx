import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Pitch } from "@/components/Pitch";
import { PackageGrid } from "@/components/PackageGrid";
import { Testimonials } from "@/components/Testimonials";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TenReasons } from "@/components/TenReasons";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FAQAccordion } from "@/components/FAQAccordion";
import { VideoLoop } from "@/components/VideoLoop";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar, PhotoGrid, CtaBand, CheckList } from "@/components/PageBlocks";
import { site, cities, industries } from "@/lib/site";
import { pickPhotos } from "@/lib/content";
import videosData from "@/content/xmas-videos.json";
import { StarIcon } from "@/components/icons";

export const revalidate = 3600;

type Clip = { src: string; alt: string; category: string };
type Videos = { reel: { src: string; poster: string } | null; clips: Clip[] };
const videos = videosData as Videos;

const VIDEO_POSTER = "/images/xmas-gallery/condo-building-blue-warm-white-christmas-lights-night-01.jpg";
const heroVideo = videos.reel ?? (videos.clips.length > 0 ? { src: videos.clips[0].src, poster: VIDEO_POSTER } : null);

const VIDEO_SCHEMA = heroVideo && {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "We Install Christmas Lights — Commercial & Residential Christmas Light Installation",
  description: "A Christmas light installation by We Install Christmas Lights: professional holiday lighting for homes and businesses across London Ontario, Kitchener-Waterloo, Hamilton and the GTA.",
  thumbnailUrl: `${site.url}${heroVideo.poster}`,
  contentUrl: `${site.url}${heroVideo.src}`,
  uploadDate: "2026-08-25",
};

const TITLE = "Christmas Light Installation London ON & GTA";
const DESC = "Professional Christmas light installation for homes and businesses across London Ontario, Kitchener-Waterloo, Hamilton and the GTA. Designed, installed, maintained and removed. Free 24-hour quote.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: site.url },
  openGraph: { title: TITLE, description: DESC, url: site.url, type: "website", images: [{ url: "/images/og-default.jpg" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const FAQS = [
  { question: "How much does professional Christmas light installation cost?", answer: "Most homes land between $700 and $3,500 all-in. Classic roofline programs start at $700, Festive (roofline plus trees, shrubs and a wreath) from $1,400, and full-property Griswold programs from $2,800. Every quote is custom to your home and includes the lights, install, maintenance and takedown." },
  { question: "Do you supply the lights?", answer: "Yes. We install only commercial-grade LED lighting that we supply and custom-cut to your roofline, which is how we can guarantee it all season. We cannot install or store lights you have bought elsewhere." },
  { question: "How far in advance should I book?", answer: "As early as you can. Installs run from early October and the calendar is usually full by mid-November. We can install early and leave the display off until you want it on." },
  { question: "What happens if a strand goes out?", answer: "Call or email and we fix it at no charge. Mid-season maintenance is included in every program, residential and commercial." },
  { question: "When do the lights come down?", answer: "Takedowns run through January into early February, as soon as roofs and trees are safe to access. Unplug the timer whenever you are done with the display and we handle the rest, including storage if you want it." },
  { question: "Do you work with businesses?", answer: "Yes. Plazas, offices, hotels, restaurants, dealerships, banks, malls, condo corporations, churches and municipalities. Commercial installs run after hours with insured, WSIB-compliant crews and are custom quoted from a site visit." },
];

export default function HomePage() {
  const heroPhoto = pickPhotos("residential-exterior", 1, "home-hero")[0] ?? null;
  const homePhotos = pickPhotos("residential-exterior", 5, "home-grid").filter((p) => p.file !== heroPhoto?.file);
  const commercialPhotos = pickPhotos(["commercial-exterior", "commercial-indoor"], 4, "home-commercial");
  const featuredIndustries = industries.filter((i) => ["christmas-decorators-for-retail", "christmas-decorators-for-office-lobbies", "christmas-decorators-for-hotels", "christmas-decorators-for-car-dealerships", "christmas-decorator-for-malls", "christmas-decorators-for-hoas"].includes(i.slug));

  return (
    <>
      {VIDEO_SCHEMA && <script id="video-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_SCHEMA) }} />}

      {/* Hero: photo + quote form */}
      <section className="relative isolate overflow-hidden bg-[color:var(--ink-strong)] text-white">
        {heroPhoto && <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={heroPhoto.blurDataURL} className="object-cover opacity-60" />}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70 motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPhoto?.src}
          aria-hidden="true"
        >
          <source src="/videos/warm-white-roofline-christmas-lights-large-home-wrapped-trees-01.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#022B1A]/90 via-[#022B1A]/70 to-[#022B1A]/25" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/90">
              <StarIcon className="h-3.5 w-3.5 text-[#FFD43B]" /> 2026 Service Excellence Award winner
            </p>
            <h1 className="heading-display mt-5 text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Christmas Lights, Installed.<br />Homes and Businesses.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90 lg:text-xl">
              Custom-designed, professionally installed, maintained all season and taken down in January. Serving London, Kitchener-Waterloo, Hamilton and the GTA since 2016.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="flex items-center gap-1.5"><StarIcon className="h-4 w-4 text-[#FFD43B]" /> 5.0 on Google · 80+ reviews</span>
              <span>Fully insured · WSIB</span>
              <span>Installed in as little as 1 day</span>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-red)] px-4 py-1.5 text-sm font-bold text-white shadow-lg">
              <span aria-hidden>🎁</span> {site.earlyBird.headline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn btn-red lg:hidden">Get a Free Quote</a>
              <Link href="/commercial-christmas-lighting" className="btn btn-outline-white">Commercial lighting →</Link>
              <a href={site.phoneHref} className="btn btn-green">Call {site.phone}</a>
            </div>
          </div>
          <div className="hidden lg:block">
            <QuoteForm variant="hero" source="home-hero" heading="Get your free quote" subheading="Residential or commercial. Reply within 24 hours." />
          </div>
        </div>
      </section>
      <TrustBar />

      <Pitch />
      <PackageGrid />

      {/* Commercial band */}
      <section className="section bg-[color:var(--ink-strong)] text-white" id="commercial">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Commercial Christmas lighting</p>
              <h2 className="heading-display mt-3 text-3xl text-white sm:text-4xl">Plazas, offices, hotels, dealerships, malls. Lit after hours, maintained all season.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/85">
                Property managers hire us because nobody on their team has to touch a ladder. We design from a site visit, install with our own lifts outside business hours, fix any fault at no charge, then remove and store everything in January. One contractor, one invoice, multi-year pricing available.
              </p>
              <div className="mt-6">
                <CheckList dark columns={2} items={["Building outlines and rooflines", "Tree wraps and lit cone trees", "Giant indoor and outdoor trees", "Lobby, atrium and entrance décor", "Insured, WSIB-compliant crews", "Multi-property programs"]} />
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/commercial-christmas-lighting" className="btn btn-red">See commercial services</Link>
                <a href="#quote" className="btn btn-outline-white">Request a site visit</a>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {commercialPhotos.map((p) => (
                <li key={p.file} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 300px, 50vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {featuredIndustries.map((i) => (
              <li key={i.slug}><Link href={`/industries/${i.slug}`} className="inline-block rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/90 hover:border-[color:var(--brand-red)] hover:text-white">{i.shortName}</Link></li>
            ))}
            <li><Link href="/commercial-christmas-lighting" className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white">All property types →</Link></li>
          </ul>
        </div>
      </section>

      <PhotoGrid photos={homePhotos} title="Homes we lit last season" caption="Roofline, trees, shrubs and entrances across South-Western Ontario and the GTA. Every photo is our own install." />
      <Testimonials />
      <ProcessSteps />
      <TenReasons />
      <ServicesGrid />

      {heroVideo && (
        <section className="section bg-[color:var(--brand-green)] text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">See our work</p>
              <h2 className="heading-display mt-3 text-3xl text-white sm:text-4xl">Christmas light installations in motion</h2>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <VideoLoop src={heroVideo.src} poster={heroVideo.poster} className="aspect-video w-full rounded-2xl object-cover" />
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/gallery" className="btn btn-outline-white">View full gallery</Link>
              <a href="#quote" className="btn btn-red">Get a free quote</a>
            </div>
          </div>
        </section>
      )}

      {/* Service areas */}
      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Service areas</p>
              <h2 className="heading-display mt-2 text-3xl">From London to the GTA</h2>
            </div>
            <Link href="/service-areas" className="text-sm font-bold text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]">All areas →</Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {cities.map((c) => (
              <li key={c.slug}><Link href={`/cities/${c.slug}`} className="inline-block rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--ink-strong)] hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]">{c.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote */}
      <section className="section bg-[color:var(--bg-cream)]" id="quote">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <p className="eyebrow">Free quote · 24-hour reply</p>
            <h2 className="heading-display mt-2 text-3xl sm:text-4xl">Tell us about your home or property</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[color:var(--ink-soft)]">Pick residential or commercial, send the address and what you have in mind. You get a custom design and a firm all-in price, and we hold a date for you.</p>
            <div className="mt-8">
              <FAQAccordion faqs={FAQS} />
              <Link href="/faq" className="mt-4 inline-block text-sm font-bold text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]">All questions answered →</Link>
            </div>
          </div>
          <QuoteForm variant="full" source="home-quote" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
