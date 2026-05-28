import type { Metadata } from "next";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { SERVICE_CITIES, SITE, formatCad } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Area — Kitchen Cabinets Across Southern Ontario",
  description:
    "We deliver White Shaker cabinets across Southern Ontario — London, Hamilton, Kitchener-Waterloo, Burlington, Oakville, Brantford, Niagara, Windsor and more. Affordable freight, 2–3 week lead time.",
  alternates: { canonical: "/service-area" },
};

const ZONES = [
  {
    name: "London & Middlesex",
    cities: ["London", "St. Thomas", "Tillsonburg", "Strathroy", "Goderich"],
    blurb: "Our home base — same-week delivery available for orders confirmed by Tuesday.",
  },
  {
    name: "Kitchener-Waterloo & Wellington",
    cities: ["Kitchener", "Waterloo", "Cambridge", "Guelph", "Fergus"],
    blurb: "Direct delivery routes 2× per week. Low-cost freight, no LTL surcharges.",
  },
  {
    name: "Halton & Peel",
    cities: ["Burlington", "Oakville", "Mississauga", "Brampton", "Milton"],
    blurb: "Premium suburban kitchens are our specialty. We deliver weekly.",
  },
  {
    name: "Hamilton & Niagara",
    cities: ["Hamilton", "Ancaster", "Grimsby", "St. Catharines", "Niagara Falls", "Welland", "Fort Erie"],
    blurb: "Including the wineries — full coverage with same-week delivery for in-stock items.",
  },
  {
    name: "Greater Toronto",
    cities: ["Toronto", "Etobicoke", "North York", "Scarborough", "Vaughan", "Markham", "Pickering"],
    blurb: "Weekly delivery to the GTA. Inside-the-door delivery available for an extra fee.",
  },
  {
    name: "Oxford, Brant & Norfolk",
    cities: ["Brantford", "Paris", "Woodstock", "Ingersoll", "Simcoe"],
    blurb: "Local trade pricing for contractors in this region — ask about our designer network.",
  },
  {
    name: "Windsor-Essex & Chatham-Kent",
    cities: ["Windsor", "Tecumseh", "Chatham", "Leamington", "Amherstburg"],
    blurb: "Bi-weekly delivery routes. Worth the wait — we keep freight under $150 to most addresses.",
  },
];

export default function ServiceAreaPage() {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: `${SITE.url}/service-area`,
    description: "White Shaker kitchen cabinets delivered across Southern Ontario.",
    areaServed: SERVICE_CITIES.map((c) => ({
      "@type": "City",
      name: c,
      containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <section className="border-b border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
            Service area
          </p>
          <h1 className="mt-4 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
            We deliver across <span className="font-medium">Southern Ontario</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            Plywood cabinets are heavy. Long-distance freight gets expensive fast — so we focus on local delivery across SW Ontario where we can keep shipping costs reasonable and lead times short.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12 border-l-4 border-[var(--color-brass)] bg-[var(--color-cream-warm)] p-6">
          <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
            Free local shipping
          </p>
          <h2 className="mt-2 font-display text-2xl text-[var(--color-navy)]">
            Orders over {formatCad(SITE.freeLocalShippingThreshold)} ship free to these cities
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/cabinets-${c.slug}`}
                className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-line)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-navy)] hover:bg-[var(--color-sandstone-soft)]"
              >
                <span className="text-[var(--color-brass)]">→</span> Cabinets in {c.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-[var(--color-ink-soft)]">
          Outside Southern Ontario? <Link href="/contact" className="underline">Contact us</Link> — we&rsquo;ll quote freight to anywhere in Canada, but the price reflects the distance.
        </p>

        <div className="mt-12 space-y-10">
          {ZONES.map((z) => (
            <div key={z.name} className="border-l-2 border-[var(--color-brass)] pl-5">
              <h2 className="font-display text-2xl text-[var(--color-navy)]">{z.name}</h2>
              <p className="mt-2 text-[var(--color-ink-soft)]">{z.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-ink)]">
                {z.cities.map((c) => (
                  <li key={c} className="before:content-['•'] before:mr-2 before:text-[var(--color-brass)] first:before:content-none first:before:mr-0">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--color-line)] pt-10 text-[var(--color-ink-soft)]">
          <h3 className="font-display text-2xl text-[var(--color-navy)]">Why we focus on Southern Ontario</h3>
          <p className="mt-3">
            A typical kitchen order weighs 400–800 lb on a pallet. Shipping a pallet from London to Halifax is over $500 in freight alone. Within SW Ontario, we can deliver the same kitchen for $80–$150 — so our prices stay competitive and our customers don&rsquo;t pay for cross-country freight on top of cabinets.
          </p>
          <p className="mt-4">
            We&rsquo;ll still quote anywhere in Canada — but if you&rsquo;re in Southern Ontario, you&rsquo;re our priority.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/visualizer" className="btn-primary">Build your kitchen</Link>
          <Link href="/cabinets" className="btn-secondary">Browse the catalog</Link>
        </div>
      </section>
    </>
  );
}
