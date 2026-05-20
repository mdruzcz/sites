import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us — London ON Concrete Contractor",
  description: `Family-run concrete contractor with ${site.yearsExperience}+ years pouring driveways and patios across London and Southwestern Ontario. Reinforced base, written warranty, no shortcuts.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-[var(--accent)]">About Us</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            Concrete Done the Slow Way.
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            We&apos;ve been pouring concrete in Southwestern Ontario for {site.yearsExperience}+ years. Same crews. Same standard. No shortcuts on the base prep.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/migrated/5kconcrete-5k-concrete-featured-project-2.jpg"
                alt="Concrete crew preparing a residential driveway in London, Ontario"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="h-display text-3xl text-[var(--charcoal)] mb-5">
                A Local Contractor That Actually Returns Phone Calls.
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed">
                <p>
                  Concrete Driveways was started with one rule: do the base prep right and the rest takes care of itself. After {site.yearsExperience} years of pouring driveways across London, St. Thomas, and Southwestern Ontario, that&apos;s still how we work.
                </p>
                <p>
                  We&apos;re a local crew — not a sales office that subs everything out. The person who quotes your driveway is part of the team that pours it. That means honest pricing, no hidden change orders, and a written warranty backed by the people who actually did the work.
                </p>
                <p>
                  Every driveway gets a properly compacted granular base, mesh or rebar reinforcement, air-entrained concrete formulated for Ontario freeze-thaw, and engineered control joints in exactly the right places. That&apos;s the whole reason we&apos;re still here {site.yearsExperience} years in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat value={`${site.yearsExperience}+`} label="Years in Business" />
            <Stat value={`${site.stats.drivewaysPoured}+`} label="Driveways Poured" />
            <Stat value={`${site.stats.happyHomes}+`} label="Happy Customers" />
            <Stat value={`${site.stats.yearsLifespan} yr`} label="Avg Driveway Lifespan" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="h-display text-3xl text-[var(--charcoal)] text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white mb-4">
                  <span className="font-extrabold text-xl">{v.num}</span>
                </div>
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-2">{v.title}</h3>
                <p className="text-[var(--concrete)] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn btn-primary text-base">
              Work With Us
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

const values = [
  { num: "1", title: "Honest Quotes", text: "The number on the quote is the number on the invoice. No surprise change orders, no padded labour, no hidden upcharges." },
  { num: "2", title: "Proper Base Prep", text: "Half the job is what's under the concrete. Compacted granular, drainage, and the right thickness — every time." },
  { num: "3", title: "Written Warranty", text: "Every pour comes with a written workmanship warranty. If we built it, we stand behind it in writing." },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold text-[var(--accent)] mb-2">{value}</p>
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--charcoal)]">{label}</p>
    </div>
  );
}
