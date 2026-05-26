import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cities, getCityBySlug, services, site } from "@/lib/site";
import { CityPage } from "@/components/CityPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `${site.url}/service-areas/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${site.url}/service-areas/${city.slug}`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: city.metaTitle, description: city.metaDescription },
  };
}

export default async function CitySlugPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Holiday Lighting in ${city.name}`,
    description: city.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: city.region,
      addressCountry: "CA",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Holiday Lighting Services",
      itemListElement: services.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.name,
          description: svc.description,
          url: `${site.url}/services/${svc.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityPage city={city} />
    </>
  );
}
