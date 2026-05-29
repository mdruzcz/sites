import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NavBar, StatsStrip, Services, Testimonials, ServiceAreas, Contact, Footer, CityIntro, FAQ } from "../../../_components/sections";
import { CITY_SLUGS, getCity } from "../../../../content/cities";

type Params = { city: string };
export const revalidate = 3600;
export function generateStaticParams() { return CITY_SLUGS.map((city) => ({ city })); }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return { title: "Not Found" };
  const title = `Fence Contractor in ${city.name}, Ontario | Woodstock Deck & Fence`;
  const description = `Professional fence installation in ${city.name}, ON — vinyl, wood, ornamental steel & chain-link fencing with a 5-year workmanship warranty. Permits handled. Free quotes.`;
  const url = `/services/fence-building/${city.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { url, title, description } };
}

export default async function FenceCityPage({ params }: { params: Promise<Params> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org", "@type": "Service",
    serviceType: "Fence Installation",
    provider: { "@type": "LocalBusiness", name: "Woodstock Deck & Fence", telephone: "+1-519-914-5697", url: "https://woodstockdeckandfence.ca" },
    areaServed: { "@type": "City", name: `${city.name}, ${city.region}` },
    description: `Professional fence installation in ${city.name}, Ontario — vinyl, wood, ornamental steel and chain-link fencing with a 5-year workmanship warranty.`,
    url: `https://woodstockdeckandfence.ca/services/fence-building/${city.slug}`,
  };

  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woodstockdeckandfence.ca/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://woodstockdeckandfence.ca/services" },
      { "@type": "ListItem", position: 3, name: "Fence Building", item: "https://woodstockdeckandfence.ca/services/fence-building" },
      { "@type": "ListItem", position: 4, name: city.name, item: `https://woodstockdeckandfence.ca/services/fence-building/${city.slug}` },
    ],
  };

  return (
    <main>
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id="ld-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <NavBar homeHref="/" />
      <div className="pt-16 lg:pt-20">
        <CityIntro city={city} service="Fence Building" />
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
