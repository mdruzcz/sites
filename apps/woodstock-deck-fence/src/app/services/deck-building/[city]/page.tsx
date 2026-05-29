import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
<<<<<<< HEAD
import { NavBar, Hero, StatsStrip, Services, Testimonials, ServiceAreas, Contact, Footer, CityIntro, FAQ } from "../../../_components/sections";
import { CITIES, CITY_SLUGS, getCity } from "../../../../content/cities";

type Params = { city: string };

export const revalidate = 3600;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}
=======
import { NavBar, StatsStrip, Services, Testimonials, ServiceAreas, Contact, Footer, CityIntro, FAQ } from "../../../_components/sections";
import { CITY_SLUGS, getCity } from "../../../../content/cities";

type Params = { city: string };
export const revalidate = 3600;
export function generateStaticParams() { return CITY_SLUGS.map((city) => ({ city })); }
>>>>>>> origin/main

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
<<<<<<< HEAD
  if (!city) return { title: "Service Area Not Found" };
  const title = `Deck Builder in ${city.name}, Ontario | Woodstock Deck & Fence`;
  const description = `Custom deck building in ${city.name}, ON — pressure-treated, cedar & composite decks with a 5-year workmanship warranty. Permits handled. Free quotes. ${city.blurb}`;
  const url = `/services/deck-building/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function DeckBuildingCityPage({ params }: { params: Promise<Params> }) {
=======
  if (!city) return { title: "Not Found" };
  const title = `Deck Builder in ${city.name}, Ontario | Woodstock Deck & Fence`;
  const description = `Custom deck building in ${city.name}, ON — PT, cedar & composite decks with a 5-year workmanship warranty. Permits handled. Free quotes.`;
  const url = `/services/deck-building/${city.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { url, title, description } };
}

export default async function DeckCityPage({ params }: { params: Promise<Params> }) {
>>>>>>> origin/main
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

<<<<<<< HEAD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Deck Building",
    provider: {
      "@type": "LocalBusiness",
      name: "Woodstock Deck & Fence",
      telephone: "+1-519-914-5697",
      url: "https://woodstockdeckandfence.ca",
    },
    areaServed: { "@type": "City", name: `${city.name}, ${city.region}` },
    description: `Custom deck building in ${city.name}, Ontario — pressure-treated, cedar and composite decks with a 5-year workmanship warranty.`,
=======
  const schema = {
    "@context": "https://schema.org", "@type": "Service",
    serviceType: "Deck Building",
    provider: { "@type": "LocalBusiness", name: "Woodstock Deck & Fence", telephone: "+1-519-914-5697", url: "https://woodstockdeckandfence.ca" },
    areaServed: { "@type": "City", name: `${city.name}, ${city.region}` },
    description: `Custom deck building in ${city.name}, Ontario — PT, cedar and composite decks with a 5-year workmanship warranty.`,
>>>>>>> origin/main
    url: `https://woodstockdeckandfence.ca/services/deck-building/${city.slug}`,
  };

  const breadcrumbs = {
<<<<<<< HEAD
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
=======
    "@context": "https://schema.org", "@type": "BreadcrumbList",
>>>>>>> origin/main
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woodstockdeckandfence.ca/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://woodstockdeckandfence.ca/services" },
      { "@type": "ListItem", position: 3, name: "Deck Building", item: "https://woodstockdeckandfence.ca/services/deck-building" },
      { "@type": "ListItem", position: 4, name: city.name, item: `https://woodstockdeckandfence.ca/services/deck-building/${city.slug}` },
    ],
  };

  return (
    <main>
<<<<<<< HEAD
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
=======
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
>>>>>>> origin/main
      <Script id="ld-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <NavBar homeHref="/" />
      <div className="pt-16 lg:pt-20">
        <CityIntro city={city} service="Deck Building" />
      </div>
      <StatsStrip />
      <Services />
      <Testimonials />
      <FAQ />
      <ServiceAreas activeCity={city.slug} />
      <Contact presetCity={city.name} />
      <Footer />
    </main>
  );
}
