import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { AreasMarquee } from "@/components/AreasMarquee";
import { ServicesRail } from "@/components/ServicesRail";
import { SheenSection } from "@/components/SheenSection";
import { CompareSlider } from "@/components/CompareSlider";
import { WhyAllSeal } from "@/components/WhyAllSeal";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { QuoteDock } from "@/components/QuoteDock";
import { FAQ, homeFaqs } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { getServices, getGuides, getCities, guidePhoto } from "@/lib/content";
import { PAIRS, photo } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Concrete Sealing Woodstock ON & SW Ontario | All-Seal" },
  description: "All-Seal seals driveways, patios, garage floors, pool decks and stamped concrete across Woodstock, St. Thomas, Brantford, Hamilton, Kitchener-Waterloo and Cambridge. High gloss, semi-gloss or matte. Free inspection.",
  alternates: { canonical: site.url },
};

export default function HomePage() {
  const services = getServices();
  const guides = getGuides().slice(0, 3);
  const lb = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    image: `${site.url}${photo(PAIRS[0].after).image}`,
    priceRange: "$$",
    slogan: site.tagline,
    address: { "@type": "PostalAddress", addressLocality: "Woodstock", addressRegion: "ON", addressCountry: "CA" },
    areaServed: getCities().map((c) => ({ "@type": "City", name: `${c.city}, Ontario` })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "14:00" },
    ],
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Concrete sealing services", itemListElement: [...services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` } })), ...site.sealerOptions.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${f} finish concrete sealing`, url: `${site.url}/finishes` } }))] },
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <Script id="lb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([lb, faqLd]) }} />
      <Hero />
      <AreasMarquee />
      <ServicesRail />
      <SheenSection />

      <section className="bg-white">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="kicker">Before &amp; after</p><h2 className="font-display h2-fluid mt-4">Drag. Same concrete, one visit apart.</h2></div><Link href="/gallery" className="btn-outline btn-sm">All comparisons</Link></div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">{PAIRS.slice(1, 3).map((p) => <CompareSlider key={p.before} before={photo(p.before)} after={photo(p.after)} title={p.title} city={p.city} sheen={p.sheen} />)}</div>
        </div>
      </section>

      <WhyAllSeal />
      <Process />
      <Testimonials />
      <QuoteDock />

      <section className="bg-white">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="kicker">Guides</p><h2 className="font-display h2-fluid mt-4">Read before you seal.</h2></div><Link href="/resources" className="btn-outline btn-sm">All guides</Link></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{guides.map((a) => <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group overflow-hidden"><Photo name={guidePhoto(a.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 380px" /><div className="p-5"><p className="text-xs uppercase tracking-wider text-[var(--muted)]">{a.category} · {a.readMinutes} min</p><h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-[var(--orange-deep)]">{a.title}</h3></div></Link>)}</div>
        </div>
      </section>

      <FAQ />
      <CtaBand />
    </>
  );
}
