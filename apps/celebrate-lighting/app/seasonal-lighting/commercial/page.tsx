import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialLinePage } from "@/components/CommercialLinePage";
import { site } from "@/lib/site";
import { getServiceLine } from "@/lib/content";
import { localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const LINE_SLUG = "seasonal-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const line = getServiceLine(LINE_SLUG);
  if (!line) return {};
  const c = line.commercial;
  return {
    title: { absolute: `${c.metaTitle} | ${site.name}` },
    description: c.metaDescription,
    alternates: { canonical: `/${LINE_SLUG}/commercial` },
    openGraph: {
      title: `${c.metaTitle} | ${site.name}`,
      description: c.metaDescription,
      url: `${site.url}/${LINE_SLUG}/commercial`,
      images: [
        {
          url: "/images/gallery-1.jpg",
          alt: "Mature park trees wrapped in warm-white seasonal lighting by Celebrate Lighting",
        },
      ],
    },
  };
}

export default function SeasonalCommercialPage() {
  const line = getServiceLine(LINE_SLUG);
  if (!line) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(line.commercial.faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: line.name, url: `${site.url}/${LINE_SLUG}` },
              { name: "Commercial & Municipal", url: `${site.url}/${LINE_SLUG}/commercial` },
            ]),
          ),
        }}
      />

      <CommercialLinePage
        line={line}
        accent="var(--gold)"
        heroImage="/images/gallery-1.jpg"
        heroImageAlt="Mature park maples wrapped in warm-white seasonal lighting for a municipal display in Woodstock, Ontario"
        intro={
          <div className="space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              Most of what makes a public display work happens before a single bulb goes up. Where does the
              power come from, and is there enough of it? Which sightlines matter — the road, the footpath, or
              the photo everyone posts? How do pedestrians move through the site safely once it&apos;s dark?
              What has to come down the morning after, and what stays until January? We work those questions
              first, because they&apos;re what separates a display that opens on time from one that doesn&apos;t.
            </p>
            <p>
              We handle <strong className="text-[var(--foreground)]">municipal tree wrapping</strong> and park
              canopy lighting, <strong className="text-[var(--foreground)]">downtown and BIA streetscapes</strong>{" "}
              along main streets and boulevards,{" "}
              <strong className="text-[var(--foreground)]">drive-through and walk-through light shows</strong>{" "}
              at fairgrounds and conservation areas, and{" "}
              <strong className="text-[var(--foreground)]">charity and fundraiser displays</strong> for hospital
              and hospice campaigns, service clubs and festival-of-lights events. On the commercial side
              that&apos;s retail plazas, storefronts, restaurants, car dealerships and office parks — plus
              community events like Santa Claus parades, tree lightings, winter markets and outdoor rinks.
            </p>
            <p>
              Lead time matters more here than anywhere else. A streetscape or a light show opening in November
              should be scoped in the spring or early summer; a single commercial frontage can often still be
              fitted in later in the fall. If the date is tight, call rather than email — we&apos;ll tell you
              straight away whether it&apos;s achievable.
            </p>
          </div>
        }
      />
    </>
  );
}
