import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { WhyChoose } from "@/components/WhyChoose";
import { Process } from "@/components/Process";
import { PricingBand } from "@/components/PricingBand";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ, homeFaqs } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { getGuides, getCoreServices, guidePhoto } from "@/lib/content";
import { PICKS, photo } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Deck & Fence Staining Kitchener-Waterloo | Restore My Deck" },
  description: "Deck and fence restoration in Kitchener-Waterloo, Cambridge, Guelph and Hamilton. Eco-friendly cleaning, 80-grit sanding and brush-applied oil-based stain. Most decks done in 2 days. Free quotes.",
  alternates: { canonical: site.url },
};

export default function HomePage() {
  const guides = getGuides().slice(0, 3);
  const services = getCoreServices();
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
    areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }],
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Deck and fence restoration services", itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/${s.slug}` } })) },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema]) }} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <BeforeAfterSection />
      <WhyChoose />
      <Process />

      <section className="bg-[var(--paper)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill cedar">Our work</p><h2 className="font-display h2-fluid mt-4">Decks and fences we brought back this season.</h2></div>
            <Link href="/projects" className="btn-outline btn-sm">See the projects</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Photo name={PICKS.heroStaining} ratio="aspect-[4/3] col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 600px" />
            <Photo name={PICKS.pergola} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.fenceCedar} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.guelph} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.stairs} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>

      <PricingBand />
      <ServiceAreas />

      <section className="bg-white">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Helpful tips</p><h2 className="font-display h2-fluid mt-4">Read before you stain.</h2></div>
            <Link href="/blog" className="btn-outline btn-sm">All guides</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {guides.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={guidePhoto(a.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 380px" />
                <div className="p-5">
                  <p className="text-xs text-[var(--muted)]">{a.category} · {a.readMinutes} min read</p>
                  <h3 className="font-display mt-2 text-lg leading-snug group-hover:text-[var(--accent-deep)]">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <FAQ />
      <Contact />
    </>
  );
}
