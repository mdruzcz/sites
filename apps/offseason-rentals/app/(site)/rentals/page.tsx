import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getProperties } from "@/lib/properties";
import { audiences, getAudience } from "@/lib/content";
import { Filters } from "@/components/Filters";
import { PropertyGrid } from "@/components/Section";
import { effectiveMonthly } from "@/lib/format";
import { PropertyCardSkeleton } from "@/components/PropertyCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, propertyListLd } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Property } from "@/lib/types";

export const revalidate = 3600;

const TITLE = "Off-Season Rentals in Port Stanley — Furnished Monthly Cottages";
const DESCRIPTION =
  "Browse every furnished Port Stanley cottage available by the month from September to May. Winter rates, utilities included, filtered by size, budget and who it suits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/rentals" },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/rentals`,
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] }
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function one(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

/** Applies the URL filters. Kept pure so it is trivially testable. */
export function applyFilters(all: Property[], sp: Record<string, string>): Property[] {
  let out = all;

  const bedrooms = Number.parseInt(sp.bedrooms ?? "", 10);
  if (Number.isFinite(bedrooms)) out = out.filter((p) => p.bedrooms >= bedrooms);

  const budget = Number.parseInt(sp.budget ?? "", 10);
  if (Number.isFinite(budget)) {
    // Filter on what they would actually pay, so a discounted home shows up
    // under the budget its offer puts it in.
    out = out.filter((p) => {
      const rate = effectiveMonthly(p);
      return rate !== null && rate <= budget;
    });
  }

  if (sp.for) out = out.filter((p) => p.perfect_for.includes(sp.for));
  if (sp.pets === "1") out = out.filter((p) => p.pets_allowed);
  if (sp.utilities === "1") out = out.filter((p) => p.utilities_included);
  if (sp.beach === "1") out = out.filter((p) => p.amenities.includes("walk-to-beach"));
  if (sp.workspace === "1") out = out.filter((p) => p.amenities.includes("workspace"));

  return out;
}

export default async function RentalsPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const sp = {
    bedrooms: one(raw.bedrooms),
    budget: one(raw.budget),
    for: one(raw.for),
    pets: one(raw.pets),
    utilities: one(raw.utilities),
    beach: one(raw.beach),
    workspace: one(raw.workspace)
  };

  const all = await getProperties();
  const properties = applyFilters(all, sp);
  const audience = sp.for ? getAudience(sp.for) : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Rentals", href: "/rentals" }]),
          propertyListLd(properties, "Off-season rentals in Port Stanley", "/rentals")
        ]}
      />

      <div className="container-page py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">Rentals</span>
        </nav>

        <h1 className="text-[30px] sm:text-[40px] font-extrabold tracking-tight">
          {audience ? `Off-season rentals for ${audience.short.toLowerCase()}` : "Off-season rentals in Port Stanley"}
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] sm:text-[17px] text-[var(--muted)]">
          {audience
            ? audience.intro
            : `Furnished homes let by the month from ${site.season.startsLabel} to ${site.season.endsLabel}. Rates shown are the off-season monthly figure, not the summer weekly one.`}
        </p>

        <Suspense
          fallback={<div className="h-[76px]" aria-hidden="true" />}
        >
          <Filters total={properties.length} />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid gap-x-6 gap-y-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <PropertyGrid
            properties={properties}
            emptyNote={
              all.length
                ? "Nothing matches those filters right now."
                : "The off-season list is being put together right now."
            }
          />
        </Suspense>

        {/* Internal links: every audience is a real, crawlable landing page. */}
        <section className="mt-16">
          <h2 className="text-[20px] font-bold">Browse by who it suits</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {audiences.map((a) => (
              <Link
                key={a.slug}
                href={`/perfect-for/${a.slug}`}
                className="pill pill-line hover:border-[var(--ink)] transition-colors"
                style={{ minHeight: 44, paddingInline: 18 }}
              >
                {a.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
