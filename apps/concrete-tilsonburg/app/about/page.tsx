import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Concrete Tilsonburg — Oxford County Concrete Contractor",
  description:
    "Locally owned and operated in Tillsonburg, ON for 12+ years. Concrete Tilsonburg serves Oxford County homeowners with custom driveways, stamped patios, and structural repairs built to last.",
  openGraph: {
    title: "About Concrete Tilsonburg — Oxford County Concrete Contractor",
    description:
      "Locally owned in Tillsonburg for 12+ years. Custom driveways, stamped patios, and structural repairs built to last through Ontario winters.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "About", url: `${site.url}/about` },
  ]);

  const pillars = [
    {
      title: "Deep Local Roots",
      description:
        "We&apos;ve been pouring concrete in Oxford County for over 12 years. We know the soil conditions, the local freeze-thaw patterns, and the permit landscape — knowledge that translates directly into better, longer-lasting results for our customers.",
    },
    {
      title: "Uncompromising Quality",
      description:
        "Every project — from a simple broom-finish driveway to a complex stamped patio — gets the same engineered base prep, reinforced pour, and proper curing process. We don&apos;t cut corners when we know it&apos;ll fail in an Ontario winter.",
    },
    {
      title: "Clear Communication",
      description:
        "You&apos;ll know what we&apos;re doing, when we&apos;re doing it, and exactly what it will cost before we start. Written quotes, written warranties, and straight answers to every question — no surprises at invoice time.",
    },
    {
      title: "Complete Services",
      description:
        "From new construction pours to repair and resurfacing, we handle the full spectrum of residential and light commercial concrete work. You don&apos;t need multiple contractors — we can handle it all.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Tillsonburg, ON</p>
          <h1 className="h-display text-4xl sm:text-5xl mb-4 max-w-3xl">
            About Concrete Tilsonburg
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            Oxford County&apos;s locally owned concrete contractor — {site.yearsExperience}+ years building driveways, patios, and concrete structures built to last through Ontario winters.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Locally Owned. Oxford County Focused.
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed text-lg">
                <p>
                  Concrete Tilsonburg was built on a simple belief: homeowners in Oxford County deserve concrete work that&apos;s engineered properly — not the lowest-bidder pour that cracks after three winters.
                </p>
                <p>
                  We serve both residential and commercial customers across Tillsonburg, Woodstock, Delhi, Ingersoll, and surrounding communities. Our projects range from single-car driveways to commercial slab pours, but every single one gets the same reinforced base, quality mix, and proper curing.
                </p>
                <p>
                  After {site.yearsExperience}+ years in this business, our reputation is built on projects that outlast the competition — and on customers who call us back when they want more work done.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/stamped-patios-walkways.png"
                alt="Concrete Tilsonburg team completing a stamped patio project in Oxford County, Ontario"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Four Pillars We Build On"
            description="Every decision we make on a job site comes back to these four commitments."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <div key={pillar.title} className="card p-6 sm:p-8 relative corner-accent">
                <div className="text-5xl font-extrabold text-[var(--accent)]/15 absolute top-4 right-5 leading-none" aria-hidden="true">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-xl text-[var(--charcoal)] mb-3">{pillar.title}</h3>
                <p
                  className="text-[var(--concrete)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: pillar.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow">Community Commitment</p>
          <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
            Proud to Serve Oxford County
          </h2>
          <p className="text-lg text-[var(--concrete)] leading-relaxed mb-6">
            We live and work in the same communities we serve. That means we care about the quality of our work long after we leave — because we&apos;re driving past it, running into customers at the hardware store, and staking our name on every pour.
          </p>
          <p className="text-lg text-[var(--concrete)] leading-relaxed mb-8">
            Supporting local businesses, hiring local crews, and building long-term relationships with Oxford County homeowners isn&apos;t just good business — it&apos;s the right way to operate.
          </p>
          <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
            Get Your Free Estimate
          </Link>
        </div>
      </section>

      <section className="py-12 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="card p-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)]">{site.stats.projectsCompleted}+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--concrete)] mt-1">Projects Completed</p>
            </div>
            <div className="card p-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)]">{site.stats.yearsInBusiness}+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--concrete)] mt-1">Years in Business</p>
            </div>
            <div className="card p-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)]">{site.stats.citiesServed}+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--concrete)] mt-1">Cities Served</p>
            </div>
            <div className="card p-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)]">{site.stats.satisfiedClients}+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--concrete)] mt-1">Satisfied Clients</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
