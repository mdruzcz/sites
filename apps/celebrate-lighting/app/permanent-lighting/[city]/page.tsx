import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineCityPage } from "@/components/LineCityPage";
import { site } from "@/lib/site";
import { getServiceLine, getServiceAreas, getCityBySlug } from "@/lib/content";
import { localBusinessSchema, faqSchema, serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const LINE_SLUG = "permanent-lighting";
const OTHER_SLUG = "seasonal-lighting";

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const title = `Permanent LED Lighting in ${city.name}, ON`;
  const description = `Permanent outdoor LED lighting in ${city.name} — colour-matched track, app-controlled, lifetime warranty. Free on-site demo before you pay a cent. Call ${site.phone}.`;
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
          url: "/images/project-brantford.jpg",
          alt: `Permanent LED roofline lighting installed by Celebrate Lighting in ${city.name}, Ontario`,
        },
      ],
    },
  };
}

export default async function PermanentLightingCityPage({ params }: { params: Promise<{ city: string }> }) {
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
              { slug: line.slug, title: line.name, shortDescription: line.metaDescription } as never,
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
        accent="var(--accent)"
        heroImage="/images/project-london.jpg"
        heroImageAlt={`Home with warm white permanent LED roofline lighting at night, of the kind Celebrate Lighting installs in ${city.name}, Ontario`}
      />
    </>
  );
}
