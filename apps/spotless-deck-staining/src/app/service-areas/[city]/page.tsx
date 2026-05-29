import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug, site, services } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { CityHero } from "@/components/CityHero";
import { TrustBar } from "@/components/TrustBar";
import { CityOverview } from "@/components/CityOverview";
import { WhyChoose } from "@/components/WhyChoose";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { OtherCitiesNav } from "@/components/OtherCitiesNav";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

type Params = { city: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const url = `${site.url}/service-areas/${city.slug}`;
  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url,
      type: "website",
      images: [
        {
          url: "/images/hero-deck.jpg",
          width: 1200,
          height: 800,
          alt: `Deck staining in ${city.name}, ${city.region} by Spotless Deck Staining`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: ["/images/hero-deck.jpg"],
    },
  };
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const url = `${site.url}/service-areas/${city.slug}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#business`,
    name: `${site.name} — ${city.name}`,
    description: city.metaDescription,
    url,
    telephone: site.phone,
    image: `${site.url}/images/hero-deck.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: "CA",
    },
    areaServed: [{ "@type": "City", name: city.name }],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "12",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Deck and Fence Staining",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: { "@type": "City", name: city.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Deck and fence staining services in ${city.name}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.blurb },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${site.url}/#service-areas` },
      { "@type": "ListItem", position: 3, name: city.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />
        <CityHero city={city} />
        <TrustBar />
        <CityOverview city={city} />
        <WhyChoose />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <OtherCitiesNav currentSlug={city.slug} />
        <FAQ />
        <Contact />
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
