import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { PermanentLightsSection } from "@/components/PermanentLightsSection";
import { WhyChoose } from "@/components/WhyChoose";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { VideoLoop } from "@/components/VideoLoop";
import { Photo } from "@/components/Photo";
import { homeFaqs } from "@/lib/faqs";
import { ARTICLES, articlePhoto } from "@/lib/resources";
import { PICKS } from "@/lib/photos";
import videos from "@/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Festive Holiday Lighting | Classic Christmas Lights & Permanent LED, Southern Ontario",
  description:
    "Classic Christmas light installation and permanent app-controlled LED roofline lighting for homes and businesses across Southern Ontario. Hamilton, Burlington, Oakville, Mississauga, Niagara. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://festiveholidaylighting.ca/#business",
  name: site.name,
  description: "Professional holiday lighting for homes and businesses in Southern Ontario: classic seasonal Christmas light installation and permanent app-controlled LED roofline systems.",
  url: site.url,
  telephone: site.phone,
  image: `${site.url}/images/xmas-gallery/upscale-brick-home-warm-white-roofline-christmas-lights-01.jpg`,
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Hamilton", addressRegion: "ON", addressCountry: "CA" },
  areaServed: ["Hamilton", "Burlington", "Oakville", "Mississauga", "Brampton", "Milton", "Ancaster", "Grimsby", "St. Catharines", "Niagara Falls"].map((n) => ({ "@type": "City", name: n })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" }],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Holiday lighting services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Classic Christmas Lights", url: `${site.url}/services/christmas-light-installation` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Holiday Lighting", url: `${site.url}/services/permanent-lighting` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Holiday Lighting", url: `${site.url}/services/commercial-holiday-lighting` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Municipal & BIA Lighting", url: `${site.url}/services/municipal-bia-lighting` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tree Lighting", url: `${site.url}/services/tree-lighting` } },
    ],
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.googleRating, reviewCount: site.reviewCount },
};

const reel = videos.reel;
const videoObjectSchema = reel && {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Festive Holiday Lighting — Christmas Light Show Highlight Reel",
  description: "A highlight reel of Festive Holiday Lighting's Christmas light shows and permanent LED installations across Southern Ontario.",
  thumbnailUrl: `${site.url}${reel.poster}`,
  contentUrl: `${site.url}${reel.src}`,
  uploadDate: "2026-08-25",
  publisher: { "@type": "Organization", name: site.name, url: site.url },
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

export default function HomePage() {
  const guides = ARTICLES.slice(0, 3);
  return (
    <>
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema]) }} />
      {videoObjectSchema && <Script id="video-object-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }} />}
      <NavBar />
      <Hero />
      <TrustBar />
      <ServicesGrid />

      {/* Photo band */}
      <section className="bg-[var(--paper)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-pill candy">Our work</p>
              <h2 className="font-display h2-fluid mt-4">Rooflines, trees and storefronts we lit last season.</h2>
            </div>
            <Link href="/gallery" className="btn-outline btn-sm">See the gallery</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Photo name={PICKS.heroClassic} ratio="aspect-[4/3] col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 600px" />
            <Photo name={PICKS.treeWrap} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroCommercial} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroPermanent} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.wreath} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>

      <PermanentLightsSection />
      <WhyChoose />
      <Process />

      {reel && (
        <section className="bg-[var(--ice)]">
          <div className="shell section">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow-pill sky">See it in motion</p>
              <h2 className="font-display h2-fluid mt-4">Watch the light show.</h2>
              <p className="lead mt-3 text-[var(--ink-soft)]">Music-synced pixel displays, glowing rooflines and mega trees from across Southern Ontario.</p>
            </div>
            <div className="mt-8 overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-lg)]">
              <VideoLoop src={reel.src} poster={reel.poster} className="aspect-video w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <Testimonials />
      <ServiceAreas />

      <section className="bg-[var(--snow)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Guides & tips</p><h2 className="font-display h2-fluid mt-4">Read before you book.</h2></div>
            <Link href="/resources" className="btn-outline btn-sm">All guides</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {guides.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={articlePhoto(a.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 380px" />
                <div className="p-5">
                  <p className="text-xs text-[var(--muted)]">{a.category} · {a.readMinutes} min read</p>
                  <h3 className="font-display mt-2 text-lg leading-snug group-hover:text-[var(--candy)]">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <FAQ />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
