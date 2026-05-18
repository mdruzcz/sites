import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us | Trusted Concrete Contractor in Woodstock",
  description: `Learn about ${site.name} — a family-owned concrete contractor with ${site.yearsExperience}+ years serving Woodstock, Ingersoll, Tillsonburg, and Oxford County.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src="/images/concrete-driveway-stamped-border.jpg"
          alt="Concrete driveway with decorative stamped borders at an upscale home in Oxford County"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-[var(--charcoal)]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            About {site.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Your local concrete experts — {site.yearsExperience}+ years building durable
            driveways, patios, and more across Oxford County.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="h-display text-2xl sm:text-3xl mb-6">Who We Are</h2>
            <div className="prose prose-lg text-slate-600 space-y-4">
              <p>
                Welcome to Woodstock Concrete Pros, your premier concrete contractor in Woodstock,
                Ontario. We are a family-owned business dedicated to building and repairing concrete
                structures that stand strong against Southwestern Ontario&apos;s toughest winters.
              </p>
              <p>
                Founded with a passion for the community, we&apos;ve become the go-to concrete contractor
                for homeowners and businesses in Woodstock, Innerkip, Tillsonburg, Ingersoll, Norwich,
                and beyond. Our crew brings {site.yearsExperience}+ years of hands-on experience in
                concrete driveway installation and decorative work like stamped concrete patios that
                Woodstock residents love.
              </p>
              <p>
                As a local concrete contractor, we know Southwestern Ontario&apos;s ground conditions
                inside out — from variable clay soils to heavy snow loads. We don&apos;t just offer
                quick fixes; we provide long-term solutions engineered for our climate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Mission & Values"
            title="What Drives Us"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Durability First",
                description: "We use high-PSI, air-entrained concrete mixes built to resist salt damage and freeze-thaw cycles.",
              },
              {
                title: "Transparency & Honesty",
                description: "No hidden fees and clear, no-obligation quotes for every project. You know exactly what you're getting.",
              },
              {
                title: "Respect for Your Home",
                description: "From broom-finished driveways to stunning stamped designs, we raise the standard for local concrete work.",
              },
              {
                title: "Satisfaction Guaranteed",
                description: "We don't consider a job done until you're 100% happy. We stand behind our work with follow-up support.",
              },
              {
                title: "Community Focus",
                description: "Proudly serving Woodstock and nearby towns, we support local families with reliable results that last.",
              },
              {
                title: "Winter-Ready Techniques",
                description: "Proper reinforcement, vapor barriers, and air-entrained mixes designed specifically for our harsh climate.",
              },
            ].map((value) => (
              <div key={value.title} className="card p-6">
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Process */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Proven 6-Step Process"
            description="Designed specifically for Southwestern Ontario conditions, ensuring structural integrity and aesthetic excellence every time."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.process.map((p) => (
              <div key={p.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-[var(--charcoal)] flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Coverage"
            title="Service Areas"
            description="We proudly serve communities across Oxford County and Southwestern Ontario."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {site.serviceAreas.map((area) => (
              <div key={area} className="card p-4 text-center">
                <p className="font-semibold text-slate-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
