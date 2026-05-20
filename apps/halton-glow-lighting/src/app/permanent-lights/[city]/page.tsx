import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { cities, getCityBySlug, site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { CityHero } from "@/components/CityHero";
import { TrustBar } from "@/components/TrustBar";
import { CityOverview } from "@/components/CityOverview";
import { WhyChoose } from "@/components/WhyChoose";
import { SmartControl } from "@/components/SmartControl";
import { ColorShowcase } from "@/components/ColorShowcase";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { UseCases } from "@/components/UseCases";
import { Testimonials } from "@/components/Testimonials";
import { OtherCitiesNav } from "@/components/OtherCitiesNav";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `${site.url}/permanent-lights/${city.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: site.name,
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${site.url}/permanent-lights/${city.slug}`,
      images: [
        {
          url: "/images/hero-led-house.png",
          width: 1024,
          height: 535,
          alt: `Permanent outdoor LED lighting on a ${city.name} home`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Permanent Outdoor LED Lighting in ${city.name}`,
    description: city.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      telephone: site.phone,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
    },
    serviceType: "Permanent Outdoor LED Lighting Installation",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${site.url}/#service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.name}, ON`,
        item: `${site.url}/permanent-lights/${city.slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id={`ld-service-${city.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id={`ld-breadcrumb-${city.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />
        <CityHero city={city} />
        <TrustBar />
        <CityOverview city={city} />
        <WhyChoose />
        <SmartControl />
        <ColorShowcase />
        <Process />
        <Gallery />
        <UseCases />
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
