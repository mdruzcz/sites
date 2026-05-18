import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/hero-stamped-concrete-driveway.jpg"
          alt="Stamped concrete driveway with decorative stone pattern by Woodstock Concrete Pros in Woodstock, Ontario"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--charcoal)]/90 via-[var(--charcoal)]/80 to-[var(--charcoal)]/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-wider mb-4">
              {site.yearsExperience}+ Years Serving Oxford County
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              #1 Concrete Contractors in Woodstock, Ontario
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed">
              {site.tagline}
            </p>
            <p className="text-lg text-slate-400 mb-8">
              Serving {site.serviceAreas.slice(0, -1).join(", ")}, and {site.serviceAreas[site.serviceAreas.length - 1]}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4 min-h-[44px]">
                Get a Free Estimate
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost text-base px-8 py-4 min-h-[44px]">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="Local Expertise"
                title="Concrete Built for Southwestern Ontario"
                center={false}
              />
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  In Southwestern Ontario, your concrete is constantly under attack from shifting clay soils,
                  heavy snow loads, and corrosive road salt. These conditions lead to cracking, spalling,
                  sinking, and premature failure.
                </p>
                <p>
                  At Woodstock Concrete Pros, we specialize in high-strength, winter-resistant installations
                  designed to withstand the brutal freeze-thaw cycles of Oxford County. Every pour uses
                  air-entrained, high-PSI concrete with proper reinforcement — the right way to build for
                  our climate.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about" className="btn btn-outline">
                  Learn About Our Process
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/concrete-driveway-front-view.jpg"
                  alt="Completed concrete driveway with stamped borders by Woodstock Concrete Pros"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Freeze-Thaw Cracking", icon: "❄️" },
                  { label: "Salt & Chemical Damage", icon: "🧂" },
                  { label: "Sinking & Settling", icon: "⬇️" },
                  { label: "Surface Spalling", icon: "💥" },
                ].map((problem) => (
                  <div key={problem.label} className="card p-5 text-center">
                    <div className="text-3xl mb-2">{problem.icon}</div>
                    <p className="font-semibold text-sm text-slate-700">{problem.label}</p>
                    <p className="text-xs text-green-600 mt-1 font-medium">We solve this ✓</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Proven 6-Step Process"
            title="How We Deliver Lasting Results — Every Time"
            description="A structured, transparent process designed specifically for Woodstock's demanding climate and local soil conditions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.process.map((p) => (
              <div key={p.step} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--charcoal)] flex items-center justify-center font-bold text-lg mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Professional Concrete Services in Woodstock"
            description="From new installations to expert repairs, we handle every concrete project with premium materials and proven techniques."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center mb-4 group-hover:bg-yellow-100 transition-colors">
                  <ServiceIcon />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent-700)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-[var(--accent-700)] mt-4 group-hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Your Local Experts in Durable Concrete"
            description="We combine local knowledge, premium materials, and transparent service to deliver results that last decades."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Woodstock Neighbours Are Saying"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[var(--accent)] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-slate-900">
                  {t.author} <span className="font-normal text-slate-500">— {t.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader
                eyebrow="Contact Us"
                title="Get Your Free Estimate"
                description="Tell us about your project and we'll provide a no-obligation quote. Most quotes delivered within 24 hours."
                center={false}
              />
              <div className="space-y-4 mt-6">
                <p className="text-slate-600">
                  <strong>Service Areas:</strong> {site.serviceAreas.join(", ")}
                </p>
                <p className="text-slate-600">
                  <strong>Hours:</strong> {site.hours}
                </p>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ServiceIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--accent-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
