import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  NavBar,
  Hero,
  StatsStrip,
  WhyUs,
  CityIntro,
  Services,
  Materials,
  Benefits,
  Testimonials,
  FAQ,
  ServiceAreas,
  RelatedTrades,
  Contact,
  Footer,
} from "../../_components/sections";
import { CITIES, CITY_SLUGS, getCity } from "../../../content/cities";

type Params = { city: string };

export const revalidate = 3600;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return { title: "Service Area Not Found" };
  // Title is appended with " | London Deck Builder" via layout template
  const title = `Deck Builder in ${city.name}, ${city.region}`;
  const description = city.blurb;
  const url = `/services/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description,
      type: "website",
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: `Deck builder in ${city.name}, ${city.region}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Deck Building",
    provider: {
      "@type": "LocalBusiness",
      name: "London Deck Builder",
      telephone: "+1-519-914-1663",
      address: {
        "@type": "PostalAddress",
        streetAddress: "50432 Yorke Line",
        addressLocality: "Belmont",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      url: "https://londondeckbuilder.ca",
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, ${city.region}`,
    },
    description: city.blurb,
    url: `https://londondeckbuilder.ca/services/${city.slug}`,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://londondeckbuilder.ca/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://londondeckbuilder.ca/#service-areas" },
      {
        "@type": "ListItem",
        position: 3,
        name: `Deck Builder in ${city.name}`,
        item: `https://londondeckbuilder.ca/services/${city.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <NavBar homeHref="/" />
      <Hero city={city.name} />
      <StatsStrip />
      <CityIntro city={city} />
      <WhyUs />
      <Services />
      <Materials />
      <Benefits />
      <Testimonials />
      <FAQ />
      <ServiceAreas activeCity={city.slug} />
      <RelatedTrades />
      <Contact presetCity={city.name} />
      <Footer />
    </main>
  );
}

// Static export of city list (used by other pages e.g. sitemap)
export { CITIES };
