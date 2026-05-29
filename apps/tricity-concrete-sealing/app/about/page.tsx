import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About TriCity Concrete Sealing | SW Ontario's Concrete Specialists",
  description:
    "Learn about TriCity Concrete Sealing — our story, our mission, and why hundreds of homeowners across Southwestern Ontario trust us with their concrete surfaces.",
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--navy)] py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/result_Concrete-Sealing-TriCity-Concrete-Sealing.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">Our Story</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-6">
            About TriCity Concrete Sealing
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            A Southern Ontario team built around one goal: protecting and beautifying the concrete
            surfaces homeowners have invested in.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="eyebrow">Who We Are</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-6">
                Southern Ontario Roots, Professional Results
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed">
                <p>
                  TriCity Concrete Sealing was founded by professionals with deep roots in the communities
                  we serve across London, Woodstock, Brantford, and all of Southwestern Ontario. We grew
                  up here, attended local schools, and participated in the same communities our customers
                  call home.
                </p>
                <p>
                  That local connection shapes how we work. We understand what Ontario winters do to
                  concrete surfaces — the freeze-thaw cycles, the road salt damage, the UV exposure that
                  fades even the best stamped concrete. Our services are designed specifically for these
                  conditions.
                </p>
                <p>
                  Over {site.yearsExperience}+ years and {site.stats.projectsCompleted}+ projects, we&apos;ve
                  built a reputation for showing up on time, doing the job right, and backing every
                  application with our industry-leading {site.warrantyYears}-year written warranty.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/result_Professional-Installation-and-Low-Maintenance-TriCity-Concrete-Sealing-1.jpg"
                alt="TriCity Concrete Sealing team professionally applying sealer to a concrete surface in Ontario"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Mission"
            title="Concrete Care, Done Right"
            description="We believe homeowners deserve concrete sealing they can trust — not a rushed job with cheap products that fail in two seasons."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Premium Products Only",
                text: "We use professional-grade, UV-stable sealers — the same ones used by commercial contractors and municipal projects. No big-box-store products.",
                icon: "🏆",
              },
              {
                title: "Meticulous Preparation",
                text: "A proper seal starts with a properly cleaned surface. We pressure wash, degrease, and prepare every surface before a single drop of sealer is applied.",
                icon: "🧹",
              },
              {
                title: "Backed by a Real Warranty",
                text: "Our {warrantyYears}-year written warranty is a real commitment. If you see sealer failure within the warranty period, we come back and fix it — no runaround.",
                icon: "📋",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[var(--navy)] mb-2">{item.title}</h3>
                <p className="text-[var(--concrete)] text-sm leading-relaxed">
                  {item.text.replace("{warrantyYears}", String(site.warrantyYears))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Work"
            title="Concrete Sealing Results"
            description="A selection of recent projects from across Southwestern Ontario."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/result_Concrete-Sealing-TriCity-Concrete-Sealing.jpg", alt: "Sealed concrete driveway in London, Ontario by TriCity Concrete Sealing" },
              { src: "/images/result_Patio-Sealing-TriCity-Concrete-Sealing-1.jpg", alt: "Beautifully sealed patio by TriCity Concrete Sealing in Woodstock, Ontario" },
              { src: "/images/result_Stamped-Concrete-Sealing-TriCity-Concrete-Sealing.jpg", alt: "Vibrant sealed stamped concrete by TriCity in Brantford, Ontario" },
              { src: "/images/result_Walkway-Sealing-TriCity-Concrete-Sealing.jpg", alt: "Clean sealed walkway by TriCity Concrete Sealing in St. Thomas, Ontario" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us stats */}
      <section className="py-16 sm:py-20 bg-[var(--navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {site.trustBadges.map((b, i) => (
              <div key={b.label} className={`${i < site.trustBadges.length - 1 ? "sm:border-r sm:border-white/10" : ""}`}>
                <p className="text-3xl sm:text-4xl font-black text-[var(--accent)] leading-none mb-2">{b.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
