import Link from "next/link";
import Script from "next/script";
import { Contact } from "./Contact";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { Testimonials } from "./Testimonials";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { FinishesSection } from "./FinishesSection";
import { servicePhoto } from "./ServicesGrid";
import { site } from "@/lib/site";
import { cities, type City } from "@/lib/cities";
import { getServices } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { CheckIcon, MapPinIcon } from "./icons";

const cityFaqs = (city: string) => [
  { q: `Do you serve all of ${city}?`, a: `Yes. We serve every neighbourhood in ${city} and the surrounding area from our London shop, with a free site assessment and no travel charge.` },
  { q: `Which finish do most ${city} homeowners choose?`, a: `Semi-gloss is the most popular for stamped and coloured concrete in ${city}; matte for broom-finish driveways and exposed aggregate; gloss for showcase patios. We bring samples so you can compare on your own concrete.` },
  { q: `When is the best time to seal concrete in ${city}?`, a: `Late spring through early fall, when the surface is dry and temperatures sit between roughly 10 and 30°C. Spring and fall dates in ${city} fill quickly, so book early.` },
  { q: `Do you seal commercial properties in ${city}?`, a: `Yes. Plazas, condo common areas, restaurant patios and parking pads in ${city}, scheduled off-hours with certificates of insurance on request.` },
  { q: `Is the warranty the same in ${city}?`, a: `Yes. Every project in ${city} is covered by our written ${site.warrantyYears}-year workmanship warranty.` },
];

const CITY_PHOTOS = [PICKS.heroHome, PICKS.heroDriveway, PICKS.gloss, PICKS.heroStamped, PICKS.heroAreas, PICKS.sunset, PICKS.heroContact, PICKS.wideLondon, PICKS.heroFaq, PICKS.heroWalkway];

export function CityPage({ city }: { city: City }) {
  const idx = Math.max(0, cities.findIndex((c) => c.slug === city.slug));
  const hero = CITY_PHOTOS[idx % CITY_PHOTOS.length];
  const url = `${site.url}/service-areas/${city.slug}`;
  const faqs = cityFaqs(city.name);
  const services = getServices();
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Concrete Sealing in ${city.name}`,
      serviceType: "Concrete sealing",
      url,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "City", name: `${city.name}, Ontario` },
      description: city.metaDescription,
      hasOfferCatalog: { "@type": "OfferCatalog", name: `Concrete sealing services in ${city.name}`, itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${s.title} in ${city.name}`, url: `${site.url}/services/${s.slug}/${city.slug}` } })) },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`city-${city.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={hero} photoAlt={`Sealed concrete driveway by TriCity Concrete Sealing in ${city.name}, Ontario`} eyebrow={`Serving ${city.name} · ${city.region}`} title={<>Concrete sealing in <span className="text-gradient-accent">{city.name}</span>.</>} intro={city.heroIntro} crumbs={[{ label: "Service areas", href: "/service-areas" }, { label: city.name }]} formCity={city.name} />

      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow-pill navy">Local crew</p>
            <h2 className="font-display h2-fluid mt-4">Why {city.name} homeowners book TriCity.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">{city.name} concrete faces the same enemies as the rest of Southwestern Ontario: road salt, freeze-thaw, summer UV and clay soil that moves. A high-quality solvent-based sealer, applied over properly prepped concrete, keeps water and salt out and colour in.</p>
            <p className="card mt-6 border-[var(--gold)] bg-[var(--gold-soft)] p-5 text-sm">{city.localFact}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Free site assessment and written quote", `${site.warrantyYears}-year workmanship warranty`, "High-quality solvent-based sealers", "Matte, semi-gloss or gloss finish", "Sprayed and back-rolled, no lap marks", "Fully insured, no travel charges"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--moss)] text-white"><CheckIcon className="w-3 h-3" /></span>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">Neighbourhoods and nearby</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {city.neighbourhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-3.5 py-2 text-sm font-semibold"><MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{n}</span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Photo name={CITY_PHOTOS[(idx + 3) % CITY_PHOTOS.length]} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />
              <Photo name={CITY_PHOTOS[(idx + 6) % CITY_PHOTOS.length]} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill">Services in {city.name}</p><h2 className="font-display h2-fluid mt-4">Everything we seal, right here.</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${city.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={servicePhoto(s.slug)} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 380px" />
                <div className="p-4"><h3 className="font-display text-base leading-snug group-hover:text-[var(--accent-deep)]">{s.title} in {city.name}</h3><p className="mt-1 text-xs text-[var(--muted)]">{s.shortDescription}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinishesSection compact />
      <Testimonials />
      <CtaBand heading={`Seal your ${city.name} concrete before the next winter.`} sub="Free site assessment and written quote. Spring and fall fill fast." />
      <FAQ faqs={faqs} title={`${city.name} questions`} />
      <section className="bg-[var(--navy-soft)]">
        <div className="shell py-10">
          <p className="eyebrow text-[var(--muted)]">Other areas we serve</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`} className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[var(--navy)] hover:text-[var(--navy)]">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>
      <Contact cityName={city.name} />
    </>
  );
}
