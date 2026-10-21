import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCaseStudies } from "@/lib/content";
import { formatCad, pricing, PROP_TYPES } from "@/lib/pricing";
import { SectionHeader } from "@/components/SectionHeader";
import { ShowPlanner } from "@/components/ShowPlanner";
import { ShowDemo } from "@/components/demo/ShowDemo";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Plan Your Light Show: Budget Planner";
const description =
  "Plan a music-synchronized light show in Ontario: slide your budget and watch snowflakes, mega trees, singing trees, candy canes and arches fill the stage in 3D.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/plan-your-show` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/plan-your-show`, images: [{ url: "/images/show/show-blue-mega-trees.jpg", width: 1920, height: 1080, alt: "Pavilion stage with pixel mega trees at an Ontario Light Shows Christmas show" }] },
};

export default function PlanYourShowPage() {
  const featured = getCaseStudies()[0];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Plan Your Show", url: `${site.url}/plan-your-show` }])) }}
      />
      <section className="bg-midnight-800 border-b border-soft relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Plan your show</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Build a show around <span className="gradient-text">your stage</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Every show starts with the control system and soundtrack. Add a stage outline, snowflakes, mega trees, singing trees, candy canes and arches, see it in 3D facing your audience, and send the layout with your quote request.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowPlanner />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight-800 border-y border-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Starting prices" title="What each piece costs." description={`CAD, ${pricing.taxNote}. Installation and travel are itemised separately in your quote.`} />
          <div className="card p-6 sm:p-8">
            <table className="est-table w-full text-sm">
              <tbody>
                <tr>
                  <td className="pr-3">
                    <span className="text-white font-semibold">{pricing.controlSystem.label}</span>
                    <span className="block text-xs text-muted">{pricing.controlSystem.detail}</span>
                  </td>
                  <td className="text-right text-white whitespace-nowrap">{formatCad(pricing.controlSystem.price)}</td>
                </tr>
                {PROP_TYPES.map((t) => (
                  <tr key={t}>
                    <td className="pr-3">
                      <span className="text-white font-semibold">{pricing.props[t].label}</span>
                      <span className="block text-xs text-muted">{pricing.props[t].detail}</span>
                    </td>
                    <td className="text-right text-white whitespace-nowrap">{formatCad(pricing.props[t].price)} each</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">Try it with music</p>
            <h2 className="h-display text-3xl sm:text-4xl text-white mb-4">Hear what the stage does.</h2>
            <p className="text-muted-strong leading-relaxed mb-6">Switch on your microphone, play the piano or hit the drum pads and the props respond, including the singing trees.</p>
            <Link href={`/case-studies/${featured.slug}`} className="btn btn-outline">See the real show</Link>
          </div>
          <div className="lg:col-span-8">
            <ShowDemo />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
