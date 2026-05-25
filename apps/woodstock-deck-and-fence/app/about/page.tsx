import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — ${site.yearsExperience}+ years building custom decks and installing fences across Woodstock, Ingersoll, and Tillsonburg, Ontario.`,
  openGraph: {
    title: `About ${site.name}`,
    description: `${site.yearsExperience}+ years of custom deck and fence construction in Woodstock and Oxford County.`,
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow">Our Story</p>
            <h1 className="h-display text-4xl sm:text-5xl text-[var(--charcoal)]">
              About Woodstock Deck and Fence
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-4 text-[var(--concrete)] leading-relaxed normal-case font-normal">
              <p>
                Woodstock Deck and Fence was built on one principle: outdoor structures done properly from the footings up.
                We&apos;re not general contractors adding decks and fences as a side service — they&apos;re all we do,
                and that focus shows in every project.
              </p>
              <p>
                Based in Woodstock and serving Oxford County, we&apos;ve been building decks and installing fences for
                homeowners in Woodstock, Ingersoll, Tillsonburg, Norwich, and Embro for {site.yearsExperience}+ years.
                Our crews know the soil conditions, the City of Woodstock permit process, and the freeze-thaw realities
                that make outdoor construction in this part of Ontario a specialized craft.
              </p>
              <p>
                We build with the materials that work — pressure-treated, Western Red Cedar, and composite decking from Trex
                and TimberTech; vinyl, decorative steel, wood, and chain-link fencing. Every project gets the same engineered
                4-foot footings and galvanized fasteners. The difference is the look you choose.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Focused Expertise", text: "We do one thing: build decks and install fences. That focus means our crews are faster, our quality is higher, and our pricing is honest." },
                { title: "Deep-Set Footings", text: "Every post hole goes a minimum of 4 feet deep, below the Ontario frost line. Foundation work isn't glamorous, but it's why our builds outlast everyone else's." },
                { title: "5-Year Workmanship Warranty", text: "We stand behind every deck and fence with a written 5-year workmanship warranty — on top of manufacturer warranties on composite and vinyl." },
                { title: "Local Crews", text: "We live and work in Oxford County. No travel surcharges, no missed appointments — just neighbours doing quality work." },
              ].map((item) => (
                <div key={item.title} className="card p-5 corner-accent">
                  <h3 className="font-bold uppercase tracking-wide text-sm text-[var(--charcoal)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--concrete)] normal-case font-normal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Years in Business", value: `${site.yearsExperience}+` },
              { label: "Decks Built", value: `${site.stats.decks}+` },
              { label: "Fences Installed", value: `${site.stats.fences}+` },
              { label: "Happy Homeowners", value: `${site.stats.happyHomes}+` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
                <p className="text-4xl font-extrabold text-[var(--accent)]">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="eyebrow">Ready to Start?</p>
            <h2 className="h-display text-3xl text-[var(--charcoal)] mb-5">
              Get a Free On-Site Quote
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn btn-primary">Request a Quote</Link>
              <a href={site.phoneHref} className="btn btn-outline">Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
