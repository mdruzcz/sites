import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getCities, getCityBySlug, getKits } from "@/lib/content";
import { estimate } from "@/lib/estimate";
import { formatCad, pricing, zoneForProvince } from "@/lib/pricing";
import type { SceneId } from "@/lib/lightshow/scenes";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SceneCanvas } from "@/components/demo/SceneCanvas";
import { Check } from "@/components/Icons";
import { breadcrumbSchema, citySchemas, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

type Params = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) return { title: "Not found" };
  const url = `${site.url}/locations/${c.slug}`;
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url },
    openGraph: { title: `${c.title} | ${site.name}`, description: c.description, url },
    twitter: { title: `${c.title} | ${site.name}`, description: c.description },
  };
}

export default async function CityPage({ params }: Params) {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) notFound();
  const zoneId = zoneForProvince(c.province);
  const zone = pricing.travel.zones[zoneId];
  const kits = getKits();
  const rec = kits.find((k) => k.slug === c.recommend) ?? kits[1];
  const nearby = c.nearby.map((s) => getCityBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x);
  const url = `${site.url}/locations/${c.slug}`;
  const examples = kits.map((k) => ({ kit: k, est: estimate(k.pkg.contents, zoneId) }));
  const quote = `/contact?${new URLSearchParams({ city: `${c.name}, ${c.province}`, prov: c.province }).toString()}#quote`;

  return (
    <>
      {citySchemas(c).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Locations", url: `${site.url}/locations` },
          { name: c.name, url },
        ])}
      />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-muted mb-4">
              <Link href="/locations" className="hover:text-resonant">Locations</Link> <span aria-hidden="true">/</span> {c.provinceName}
            </nav>
            <p className="eyebrow">
              {c.name}, {c.provinceName}
            </p>
            <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">{c.h1}</h1>
            <p className="text-muted-strong text-lg leading-relaxed mb-6">{c.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={quote} className="btn btn-primary">Request a quote in {c.name}</Link>
              <Link href="#budget-planner" className="btn btn-ghost">Plan a budget</Link>
            </div>
          </div>
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-line bg-[#04060b]">
            <SceneCanvas
              scene={c.scene as SceneId}
              selection={{ kind: "theme", name: c.theme }}
              label={`3D render of pixel props running the ${c.theme} theme, as we would install in ${c.name}`}
              mini={false}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose-rl">
            <h2>Winter installation in {c.name}</h2>
            <p>{c.climate}</p>
            <h3>How we install for it</h3>
            <ul>
              {c.installNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <h2>Commercial districts and BIAs in {c.name}</h2>
            <p>{c.districts}</p>
            <h3>When to book</h3>
            <p>{c.season}</p>
          </div>
          <aside className="space-y-6">
            <div className="card card-glow is-active p-7">
              <p className="eyebrow">Usually a fit in {c.name}</p>
              <h3 className="text-xl font-bold text-white mb-1">{rec.name}</h3>
              <p className="text-sm text-muted mb-3">
                {rec.pkg.priceLabel} <span className="text-white font-semibold">{formatCad(rec.pkg.price)}</span> CAD, {pricing.taxNote}
              </p>
              <p className="text-muted-strong text-sm leading-relaxed mb-5">{c.recommendWhy}</p>
              <Link href={`/contact?kit=${rec.slug}&${new URLSearchParams({ city: `${c.name}, ${c.province}`, prov: c.province }).toString()}#quote`} className="btn btn-primary w-full">
                Request a quote
              </Link>
              <Link href={`/kits#${rec.slug}`} className="block text-center text-cool text-sm mt-3 underline underline-offset-2 min-h-[44px] leading-[44px]">
                What&apos;s in the {rec.name}
              </Link>
            </div>
            <div className="card p-7">
              <h3 className="font-bold text-white mb-3">Who we serve in {c.name}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/commercial" className="text-muted-strong hover:text-resonant">Commercial spaces →</Link></li>
                <li><Link href="/bia" className="text-muted-strong hover:text-resonant">BIAs and main streets →</Link></li>
                <li><Link href="/municipal" className="text-muted-strong hover:text-resonant">Municipalities →</Link></li>
                <li><Link href="/care" className="text-muted-strong hover:text-resonant">Care &amp; seasonal service →</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Travel & installation"
            title={`Installing in ${c.name}`}
            description={`Installation is available in ${c.name} and in any city in Canada, with applicable travel charges. ${c.provinceName} is in ${zoneId === "home" ? "our home region" : zone.name}.`}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-7">
              <h3 className="font-bold text-white mb-4">Rates for {c.name}</h3>
              <ul className="space-y-3 text-sm text-muted-strong">
                <li className="flex items-start gap-2"><Check /> Installation {formatCad(pricing.installation.crewDayRate)} per crew-day ({pricing.installation.crewLabel})</li>
                <li className="flex items-start gap-2">
                  <Check />
                  {zone.tripFee
                    ? `Travel ${formatCad(zone.tripFee)} per crew trip (${zone.name})`
                    : `No trip fee: ${pricing.travel.homeRegion} is our home region (mileage only beyond ${pricing.travel.homeFreeRadiusKm} km of our base)`}
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  {zone.accommodationPerNight
                    ? `Accommodation ${formatCad(zone.accommodationPerNight)} per crew-night on multi-day installs`
                    : "No accommodation charges in the home region"}
                </li>
              </ul>
              <p className="text-xs text-muted mt-4">CAD, {pricing.taxNote}. Final travel is confirmed in your quote.</p>
            </div>
            <div className="card p-7 lg:col-span-2 overflow-x-auto">
              <h3 className="font-bold text-white mb-1">Typical installed totals in {c.name}</h3>
              <p className="text-xs text-muted mb-4">Starting kit price plus estimated crew-days and travel for the standard package layout.</p>
              <table className="est-table w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="text-muted">
                    <th className="text-left font-semibold">Package</th>
                    <th className="text-right font-semibold">Kit</th>
                    <th className="text-right font-semibold">Install + travel</th>
                    <th className="text-right font-semibold">Estimated total</th>
                  </tr>
                </thead>
                <tbody>
                  {examples.map(({ kit, est }) => (
                    <tr key={kit.slug}>
                      <td>
                        <Link href={`/kits#${kit.slug}`} className="text-white font-semibold hover:text-resonant">{kit.name}</Link>
                        <span className="block text-xs text-muted">{est.crewDays} crew-days</span>
                      </td>
                      <td className="text-right text-muted-strong tabular-nums">{formatCad(est.hardwareTotal)}</td>
                      <td className="text-right text-muted-strong tabular-nums">{formatCad(est.installTotal)}</td>
                      <td className="text-right text-white font-semibold tabular-nums">{formatCad(est.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Budget planner" title={`Plan a display in ${c.name}`} description={`The planner starts with travel for ${c.provinceName}. Slide the budget to see the layout and an itemised estimate.`} />
          <BudgetPlanner defaultProvince={c.province} cityName={`${c.name}, ${c.province}`} />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title={`${c.name}: common questions`} />
          <FaqAccordion faqs={c.faqs} />
        </div>
      </section>

      <section className="py-14 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="h-display text-2xl text-white mb-5">Nearby locations</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearby.map((n) => (
              <Link key={n.slug} href={`/locations/${n.slug}`} className="seg">
                {n.name}
              </Link>
            ))}
            <Link href="/locations" className="seg">All locations</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
