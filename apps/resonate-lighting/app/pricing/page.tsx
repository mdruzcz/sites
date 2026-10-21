import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getKits, pricingFaqs } from "@/lib/content";
import { describeCounts, totalProps } from "@/lib/estimate";
import { formatCad, pricing, PROP_TYPES, PROVINCES, type ZoneId } from "@/lib/pricing";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { SceneCanvas } from "@/components/demo/SceneCanvas";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, installationServiceSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Kit & Installation Pricing";
const description =
  "Starting prices for Resonate pixel lighting kits in CAD, plus installation rates, travel zones across Canada and a budget planner with a live 3D preview.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/pricing` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/pricing` },
  twitter: { title: `${title} | ${site.name}`, description },
};

export default function PricingPage() {
  const kits = getKits();
  const faqs = pricingFaqs();
  const zones = Object.entries(pricing.travel.zones) as [ZoneId, (typeof pricing.travel.zones)[ZoneId]][];
  const inst = pricing.installation;

  return (
    <>
      <JsonLd data={installationServiceSchema()} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Pricing", url: `${site.url}/pricing` }])} />

      <section className="relative bg-ink-800 border-b border-soft overflow-hidden">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Pricing</p>
            <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
              Kits, installation and <span className="gradient-text">travel</span>.
            </h1>
            <p className="text-muted-strong text-lg leading-relaxed mb-6">
              Starting prices in Canadian dollars, {pricing.taxNote}. Installation and travel are extra and itemised in every quote. Every project is confirmed after a site review.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#budget-planner" className="btn btn-primary">Plan a budget</Link>
              <Link href="/contact#quote" className="btn btn-ghost">Request a quote</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-line bg-[#04060b]">
            <SceneCanvas scene="mega" selection={{ kind: "theme", name: "Candy Cane" }} label="3D render of a spinning music-reactive mega tree running the Candy Cane theme" mini={false} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kits.map((k) => (
              <div key={k.slug} className="card card-glow p-7 flex flex-col">
                <p className="eyebrow">{k.tier}</p>
                <h2 className="text-lg font-bold text-white">{k.name}</h2>
                <p className="text-sm text-muted mt-2">{k.pkg.priceLabel}</p>
                <p className="h-display text-3xl text-white">{formatCad(k.pkg.price)}</p>
                <p className="text-sm text-muted-strong mt-3 flex-1">
                  {totalProps(k.pkg.contents)
                    ? `Control system + ${describeCounts(k.pkg.contents)}.`
                    : "The complete control system: Pi 5 Light Show controller, USB mic, Kulp pixel controller, power supplies, enclosure and pigtails."}
                </p>
                <p className="text-xs text-muted mt-4">Installation and travel extra.</p>
                <Link href={`/kits#${k.slug}`} className="text-resonant font-semibold text-sm mt-4 min-h-[44px] inline-flex items-center">What&apos;s included →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Budget planner"
            title="See what your budget builds."
            description="Pick a budget and a province. The scene grows prop by prop and the estimate itemises the kit, installation, travel and accommodation. Adjust any prop, then send the layout with your quote request."
          />
          <BudgetPlanner />
        </div>
      </section>

      <section id="installation" className="py-16 sm:py-24 bg-ink scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader eyebrow="Installation" title="Professional installation" align="left" />
            <div className="card p-7 -mt-4">
              <p className="h-display text-4xl text-white">{formatCad(inst.crewDayRate)}</p>
              <p className="text-sm text-muted mb-5">day rate per {inst.crewLabel}, {pricing.taxNote}</p>
              <ul className="space-y-3 text-sm text-muted-strong">
                <li>Mounting, power and data runs, and anchoring for your local weather.</li>
                <li>Commissioning on site: port tests on every prop, microphone calibration with your music and the look check.</li>
                <li>Handover and training on the Light Show app on your phone.</li>
                <li>Installation is itemised in your quote and in the budget planner above.</li>
              </ul>
              <p className="text-xs text-muted mt-4">{inst.liftNote}</p>
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Travel" title="Travel zones" align="left" />
            <div className="card p-7 -mt-4">
              <table className="est-table w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-muted font-semibold">Zone</th>
                    <th className="text-right text-muted font-semibold">Per crew trip</th>
                    <th className="text-right text-muted font-semibold">Accommodation per night</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map(([id, z]) => (
                    <tr key={id}>
                      <td className="pr-3">
                        <span className="text-white font-semibold">{z.name}</span>
                        <span className="block text-xs text-muted">{z.provinces.map((c) => PROVINCES.find((p) => p.code === c)?.name ?? c).join(", ")}</span>
                      </td>
                      <td className="text-right text-white whitespace-nowrap">{z.tripFee ? formatCad(z.tripFee) : "None"}</td>
                      <td className="text-right text-white whitespace-nowrap">{z.accommodationPerNight ? formatCad(z.accommodationPerNight) : "None"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="text-xs text-muted mt-4 space-y-2">
                <li>{pricing.travel.homeRegion} is our home region: no trip fee, and mileage at ${pricing.travel.homeMileagePerKm.toFixed(2)}/km only beyond {pricing.travel.homeFreeRadiusKm} km of our base.</li>
                <li>Accommodation applies only to multi-day jobs outside {pricing.travel.homeRegion}.</li>
                <li>Installation is available in any city in Canada with these travel charges. See <Link href="/locations" className="text-cool underline underline-offset-2">locations</Link>.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Add-ons" title="Unit prices for extra props." description="Add props to any kit. A package is never more than the sum of its parts." />
          <div className="card p-7">
            <table className="est-table w-full text-sm">
              <tbody>
                {PROP_TYPES.map((t) => (
                  <tr key={t}>
                    <td className="pr-3">
                      <span className="text-white font-semibold">{pricing.props[t].label}</span>
                      <span className="block text-xs text-muted">{pricing.props[t].detail}</span>
                    </td>
                    <td className="text-right text-white whitespace-nowrap">{formatCad(pricing.props[t].price)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="pr-3">
                    <span className="text-white font-semibold">{pricing.extraController.label}</span>
                    <span className="block text-xs text-muted">One for every {pricing.propsPerController} props beyond the first {pricing.propsPerController}</span>
                  </td>
                  <td className="text-right text-white whitespace-nowrap">{formatCad(pricing.extraController.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Pricing questions." />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
