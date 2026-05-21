import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — ${site.yearsExperience}+ years of expert concrete driveways and patios in Woodstock, Brantford, and Cambridge, Ontario.`,
  openGraph: {
    title: `About ${site.name}`,
    description: `${site.yearsExperience}+ years of expert concrete driveways and patios in Woodstock, Brantford, and Cambridge.`,
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
              About Woodstock Concrete Forming
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-4 text-[var(--concrete)] leading-relaxed normal-case font-normal">
              <p>
                Woodstock Concrete Forming was built on one principle: concrete work done properly from the ground up.
                We&apos;re not general contractors adding concrete as a side service — concrete driveways and patios are all we do,
                and that focus shows in the quality of every pour.
              </p>
              <p>
                Based in Woodstock and serving Oxford County, Brant County, and Waterloo Region, we&apos;ve been pouring
                concrete for homeowners in Woodstock, Brantford, and Cambridge for {site.yearsExperience}+ years.
                Our crews know the soil conditions, building requirements, and freeze-thaw realities that make concrete
                in this part of Ontario a specialized craft.
              </p>
              <p>
                We specialize in natural broom-finished concrete — the most durable, timeless choice for Ontario driveways
                and patios — and coloured stamped concrete for homeowners who want a premium decorative finish without
                the cost and maintenance of natural stone.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Focused Expertise", text: "We do one thing: concrete driveways and patios. That focus means our crews are faster, our quality is higher, and our pricing is fair." },
                { title: "Proper Base Work", text: "Every pour starts with a compacted granular base and proper drainage. It's not glamorous, but it's why our concrete lasts 25–30 years." },
                { title: "Written Warranty", text: "We stand behind every pour with a written workmanship warranty. No fine print, no excuses." },
                { title: "Local Crews", text: "We live and work in Oxford and Brant County. No travel surcharges, no missed appointments — just neighbours doing quality work." },
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
              { label: "Driveways Poured", value: `${site.stats.driveways}+` },
              { label: "Patios Built", value: `${site.stats.patios}+` },
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
