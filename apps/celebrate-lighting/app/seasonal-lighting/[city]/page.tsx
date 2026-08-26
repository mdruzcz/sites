import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineCityPage } from "@/components/LineCityPage";
import { SeasonalBackdrop } from "@/components/SeasonalBackdrop";
import { site } from "@/lib/site";
import { getServiceLine, getServiceAreas, getCityBySlug } from "@/lib/content";
import { localBusinessSchema, faqSchema, serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const LINE_SLUG = "seasonal-lighting";
const OTHER_SLUG = "permanent-lighting";

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const title = `Christmas Light Installation in ${city.name}, ON`;
  const description = `Professional C9 Christmas light installation in ${city.name} — custom-cut runs, in-season service, takedown and storage included. Book early for the best rates.`;
  return {
    title: { absolute: `${title} | ${site.name}` },
    description,
    alternates: { canonical: `/${LINE_SLUG}/${city.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}/${LINE_SLUG}/${city.slug}`,
      images: [
        {
          url: "/images/gallery-1.jpg",
          alt: `Seasonal lighting installed by Celebrate Lighting near ${city.name}, Ontario`,
        },
      ],
    },
  };
}

export default async function SeasonalLightingCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  const line = getServiceLine(LINE_SLUG);
  const otherLine = getServiceLine(OTHER_SLUG);
  if (!city || !line || !otherLine) notFound();

  const allCities = getServiceAreas().cities;
  const nearby = allCities.filter((c) => c.slug !== city.slug).slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              {
                slug: line.slug,
                title: "Christmas Light Installation",
                shortDescription: line.metaDescription,
              } as never,
              city.name,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(line.faqs.slice(0, 5))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: line.name, url: `${site.url}/${LINE_SLUG}` },
              { name: city.name, url: `${site.url}/${LINE_SLUG}/${city.slug}` },
            ]),
          ),
        }}
      />

      <LineCityPage
        line={line}
        city={city}
        otherLine={otherLine}
        nearbyCities={nearby}
        accent="var(--gold)"
        /* No honest C9 photograph exists yet — see SeasonalBackdrop. */
        heroBackdrop={<SeasonalBackdrop />}
      />
    </>
  );
}
