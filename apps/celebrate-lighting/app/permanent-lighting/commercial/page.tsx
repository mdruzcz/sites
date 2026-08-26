import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialLinePage } from "@/components/CommercialLinePage";
import { site } from "@/lib/site";
import { getServiceLine } from "@/lib/content";
import { localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const LINE_SLUG = "permanent-lighting";

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
          url: "/images/gallery-2.jpg",
          alt: "Commercial property frontage lit by Celebrate Lighting in Southwestern Ontario",
        },
      ],
    },
  };
}

export default function PermanentCommercialPage() {
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
        accent="var(--accent)"
        heroImage="/images/gallery-2.jpg"
        heroImageAlt="Commercial property frontage lit with warm white by Celebrate Lighting in Woodstock, Ontario"
        intro={
          <div className="space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              The arithmetic on commercial permanent lighting is simple. If a property is paying a contractor to
              install and remove seasonal lighting every year, a permanent system usually pays for itself in a
              handful of seasons — and then keeps working. After that there&apos;s no annual install bill, no
              crew on the roof each November, and no scramble when the installer is booked solid.
            </p>
            <p>
              What it buys beyond the savings is control. A{" "}
              <strong className="text-[var(--foreground)]">retail plaza</strong> can run brand colours year-round
              and switch to a promotion overnight. A{" "}
              <strong className="text-[var(--foreground)]">car dealership</strong> can light the showroom line
              and lot boundary permanently so it reads as open long after dark. A{" "}
              <strong className="text-[var(--foreground)]">municipal building</strong> can run civic colours for
              Remembrance Day, Pride, Canada Day and awareness campaigns from an app, instead of raising a work
              order and booking a contractor for each one.
            </p>
            <p>
              We also handle <strong className="text-[var(--foreground)]">office parks and industrial
              properties</strong>, <strong className="text-[var(--foreground)]">restaurants and hospitality</strong>{" "}
              frontages and patios, and{" "}
              <strong className="text-[var(--foreground)]">multi-site and franchise portfolios</strong> where one
              specification needs to look identical in every town. Every commercial install is scheduled outside
              trading hours and carries the same lifetime warranty on parts, hardware and workmanship as our
              residential work.
            </p>
          </div>
        }
      />
    </>
  );
}
