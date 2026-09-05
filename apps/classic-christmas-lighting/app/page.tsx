import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WhyChoose } from "@/components/WhyChoose";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { VideoLoop } from "@/components/VideoLoop";
import { Photo } from "@/components/Photo";
import { featuredFaqs } from "@/lib/faqs";
import { ARTICLES, articlePhoto } from "@/lib/resources";
import { PICKS, photo } from "@/lib/photos";
import { getServices } from "@/lib/content";
import videos from "@/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Classic Christmas Lighting | Christmas Light Installation Kitchener-Waterloo",
  description:
    "Professional Christmas light installation in Kitchener-Waterloo, Cambridge, Guelph, Hamilton, Woodstock and Stratford. Family-owned, 15 years, fully insured. Lights supplied, installed, maintained and taken down. Free quote.",
  alternates: { canonical: site.url },
};

const clips = (videos.clips as { src: string; alt: string; category: string }[]).slice(0, 2);
const CLIP_POSTERS = [PICKS.heroHome, PICKS.storefront];

export default function HomePage() {
  const services = getServices();
  const guides = ARTICLES.slice(0, 3);
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}${photo(PICKS.heroHome).image}`,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressLocality: "Kitchener", addressRegion: "ON", addressCountry: "CA" },
    areaServed: ["Kitchener", "Waterloo", "Cambridge", "Guelph", "Hamilton", "Woodstock", "Stratford"].map((n) => ({ "@type": "City", name: n })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" },
    ],
    sameAs: [site.facebookUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Christmas lighting services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` } })),
    },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: featuredFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const videoSchema = clips.map((c, i) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: c.alt,
    description: `${c.alt}. Installed by Classic Christmas Lighting.`,
    thumbnailUrl: `${site.url}${photo(CLIP_POSTERS[i]).image}`,
    contentUrl: `${site.url}${c.src}`,
    uploadDate: "2026-08-25",
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  }));

  return (
    <>
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema, ...videoSchema]) }} />
      <Hero />
      <TrustBar />
      <ServicesGrid />

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
            <Photo name={PICKS.snowHome} ratio="aspect-[4/3] col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 600px" />
            <Photo name={PICKS.treeWrap} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.storefront} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.wreath} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.colourRoofline} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>

      <WhyChoose />
      <Process />

      {clips.length > 0 && (
        <section className="bg-[var(--ice)]">
          <div className="shell section">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow-pill sky">See it in motion</p>
              <h2 className="font-display h2-fluid mt-4">A few seconds of December.</h2>
              <p className="lead mt-3 text-[var(--ink-soft)]">Warm white rooflines, wrapped trees and lit storefronts from around Waterloo Region.</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {clips.map((c, i) => (
                <div key={c.src} className="overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-lg)]">
                  <VideoLoop src={c.src} poster={photo(CLIP_POSTERS[i]).image} className="aspect-video w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Testimonials />
      <ServiceAreas />

      <section className="bg-[var(--snow)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Guides &amp; tips</p><h2 className="font-display h2-fluid mt-4">Read before you book.</h2></div>
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
      <FAQ faqs={featuredFaqs} />
      <Contact />
    </>
  );
}
