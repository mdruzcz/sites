import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FinishesSection } from "@/components/FinishesSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { WhyChoose } from "@/components/WhyChoose";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { featuredFaqs } from "@/lib/faqs";
import { ARTICLES, articlePhoto } from "@/lib/resources";
import { PICKS, photo } from "@/lib/photos";
import { getServices } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "TriCity Concrete Sealing | Concrete Sealing London ON & SW Ontario",
  description: site.description,
  alternates: { canonical: site.url },
};

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
    address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
    areaServed: site.serviceAreas.map((n) => ({ "@type": "City", name: n })),
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Concrete sealing services",
      itemListElement: [
        ...services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` } })),
        ...["matte", "semi-gloss", "gloss"].map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${f.replace("-", " ")} finish concrete sealing`, url: `${site.url}/finishes/${f}` } })),
      ],
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.googleRating, reviewCount: 40 },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: featuredFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <>
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema]) }} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FinishesSection />
      <BeforeAfterSection />
      <WhyChoose />
      <Process />

      <section className="bg-[var(--stone)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-pill">Our work</p>
              <h2 className="font-display h2-fluid mt-4">Driveways, patios and walkways we sealed this season.</h2>
            </div>
            <Link href="/gallery" className="btn-outline btn-sm">See the gallery</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Photo name={PICKS.heroDriveway} ratio="aspect-[4/3] col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto" rounded="rounded-2xl" sizes="(max-width: 768px) 100vw, 600px" />
            <Photo name={PICKS.heroPatio} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroAggregate} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.heroWalkway} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.sunset} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>

      <Testimonials />
      <ServiceAreas />

      <section className="bg-white">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Guides &amp; tips</p><h2 className="font-display h2-fluid mt-4">Read before you seal.</h2></div>
            <Link href="/resources" className="btn-outline btn-sm">All {ARTICLES.length} guides</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {guides.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={articlePhoto(a.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 380px" />
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
      <FAQ faqs={featuredFaqs} />
      <Contact />
    </>
  );
}
