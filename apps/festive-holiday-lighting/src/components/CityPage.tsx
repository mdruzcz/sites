import Link from "next/link";
import Script from "next/script";
import { NavBar } from "./NavBar";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { CallNowFab } from "./CallNowFab";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { Testimonials } from "./Testimonials";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { servicePhoto } from "./ServicesGrid";
import { services, site, cities } from "@/lib/site";
import type { City } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { CheckIcon, MapPinIcon } from "./icons";

const cityFaqs = (city: string) => [
  { q: `Do you serve all neighbourhoods in ${city}?`, a: `Yes. We serve every area in and around ${city}, from established older streets to new subdivisions. Our crews know the area.` },
  { q: `How far ahead should I book in ${city}?`, a: `Late September or early October for the best dates. ${city} is a busy area for us and the calendar fills quickly, but call even in November and we will do our best.` },
  { q: `Do you install permanent lighting in ${city}?`, a: `Yes. Permanent LED roofline lighting is available throughout ${city}: installed once, controlled from your phone, used for Christmas, Halloween, birthdays and game nights all year.` },
  { q: `Which commercial properties do you serve in ${city}?`, a: `Storefronts, plazas, offices, restaurants, hotels and businesses of every size in ${city}. Commercial programs are designed to the property and budget.` },
  { q: `Are your crews insured in ${city}?`, a: `Yes. $5M liability insurance and WSIB-compliant crews, fully covered on any property in ${city} and across Ontario.` },
];

const CITY_PHOTOS = [PICKS.heroHome, PICKS.heroResidential, PICKS.heroClassic, PICKS.heroGallery, PICKS.heroAreas, "warm-white-wrapped-evergreen-and-roofline-christmas-lights-home", PICKS.heroPermanentBlue, "modern-brick-home-tree-wrapped-warm-white-lights-roofline", PICKS.heroPermanent, PICKS.treeWrap];

export function CityPage({ city }: { city: City }) {
  const idx = Math.max(0, cities.findIndex((c) => c.slug === city.slug));
  const hero = CITY_PHOTOS[idx % CITY_PHOTOS.length];
  const url = `${site.url}/service-areas/${city.slug}`;
  const faqs = cityFaqs(city.name);
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: `Holiday Lighting in ${city.name}`, serviceType: "Christmas light installation and permanent LED lighting", url, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: `${city.name}, Ontario` }, description: city.metaDescription },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`city-${city.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <NavBar />
      <PageHero photo={hero} photoAlt={`Christmas lights installed by Festive Holiday Lighting on a home in ${city.name}, Ontario`} eyebrow={`Serving ${city.name}`} title={<>Holiday lighting in <span className="text-[var(--gold)]">{city.name}</span>, classic and permanent.</>} intro={city.heroIntro} crumbs={[{ label: "Service areas", href: "/service-areas" }, { label: city.name }]} formCity={city.name} />

      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow-pill pine">Local crew</p>
            <h2 className="font-display h2-fluid mt-4">Why {city.name} homes book Festive.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">{city.description}</p>
            <p className="card mt-6 border-[var(--gold)] bg-[var(--gold-soft)] p-5 text-sm">{city.localFact}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Free on-site design and quote", "$5M liability, WSIB-compliant crews", "Commercial-grade LED, supplied by us", "Mid-season maintenance included", "Boom trucks for tall rooflines and trees", "Takedown and storage every January"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--pine)] text-white"><CheckIcon className="w-3 h-3" /></span>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">Neighbourhoods we serve</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {city.neighbourhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-3.5 py-2 text-sm font-semibold"><MapPinIcon className="w-3.5 h-3.5 text-[var(--candy)]" />{n}</span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Photo name={CITY_PHOTOS[(idx + 3) % CITY_PHOTOS.length]} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />
              <Photo name={CITY_PHOTOS[(idx + 6) % CITY_PHOTOS.length]} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)]">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill">Services in {city.name}</p><h2 className="font-display h2-fluid mt-4">Everything we do, right here.</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={servicePhoto(s.slug)} ratio="aspect-[4/3]" sizes="280px" />
                <div className="p-4"><h3 className="font-display text-base leading-snug group-hover:text-[var(--candy)]">{s.name}</h3><p className="mt-1 text-xs text-[var(--muted)]">{s.tagline}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand heading={`Light up your ${city.name} home this season.`} sub="Free quote within 24 hours. Book early, October fills fast." />
      <FAQ faqs={faqs} title={`${city.name} questions`} />
      <section className="bg-[var(--mint)]">
        <div className="shell py-10">
          <p className="eyebrow text-[var(--muted)]">Other areas we serve</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`} className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[var(--pine)] hover:text-[var(--pine-deep)]">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>
      <Contact cityName={city.name} />
      <Footer />
      <CallNowFab />
    </>
  );
}
