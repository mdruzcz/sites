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
      {/* Hero — Hudson Kitchen-inspired full-bleed with warm overlay */}
      <section className="relative overflow-hidden min-h-[600px] sm:min-h-[700px] flex items-center">
        <Image
          src="/images/hero.jpg"
          alt="Professional pressure washing transforming a home exterior in London, Ontario"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/90 via-[var(--navy-deep)]/70 to-[var(--navy-deep)]/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-[var(--accent-light)] font-semibold text-sm uppercase tracking-widest mb-6">
              {site.yearsExperience}+ Years Serving Southwestern Ontario
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-[1.1] font-bold">
              Where clean means business.
            </h1>
            <p className="font-display italic text-[var(--accent-light)] text-2xl sm:text-3xl lg:text-4xl mb-6">
              And so does your property.
            </p>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
              Professional pressure washing &amp; exterior cleaning services.
              The equipment, expertise, and care your property needs to shine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
                Get a Free Estimate
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost text-base px-8 py-4">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dotted divider — Hudson Kitchen style */}
      <div className="dotted-divider h-16 sm:h-20" />

      {/* Value Proposition — 3-column feature cards like Hudson Kitchen */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Everything plus the pressure washer."
            accentWord="plus"
            description="We're not just a cleaning crew. We're the exterior restoration experts who bring commercial-grade equipment, eco-friendly solutions, and 10+ years of know-how to every job."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-12">
            <FeatureCard
              icon={<CalendarIcon />}
              title="Flexible"
              description="Residential or commercial, one-time or scheduled — we work around your timeline and clean on your terms."
            />
            <FeatureCard
              icon={<EquipmentIcon />}
              title="Commercial Grade"
              description="Hot & cold water units, soft wash systems, and surface cleaners. The right tool for every surface type."
            />
            <FeatureCard
              icon={<ShieldIcon />}
              title="Fully Insured"
              description="WSIB compliant, fully insured, and eco-friendly solutions. We protect your property and the environment."
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/about" className="btn btn-primary px-8 py-4">
              Learn About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Band — Orange background like Hudson Kitchen quote section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-3 bg-[var(--accent)] px-6 sm:px-12 lg:px-16 py-16 sm:py-20 flex items-center">
            <div className="max-w-xl">
              <svg className="w-10 h-10 text-white/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-white text-xl sm:text-2xl font-display leading-relaxed mb-6">
                &ldquo;{testimonials[0]?.quote}&rdquo;
              </blockquote>
              <p className="text-white/80 font-semibold">
                — {testimonials[0]?.author}, {testimonials[0]?.city}
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-0">
            <Image
              src="/images/concrete-washing.jpg"
              alt="Professional concrete pressure washing results in Southwestern Ontario"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--navy-deep)]/70" />
            <div className="relative flex items-center justify-center h-full p-12">
              <div className="text-center">
                <p className="text-6xl sm:text-7xl font-display font-bold text-[var(--accent-light)]">
                  {site.yearsExperience}+
                </p>
                <p className="text-white text-lg mt-2 uppercase tracking-wider font-semibold">
                  Years Experience
                </p>
                <div className="w-12 h-0.5 bg-[var(--accent)] mx-auto my-6" />
                <p className="text-slate-300 text-sm max-w-xs mx-auto">
                  Serving {site.serviceAreas.join(", ")} and surrounding communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Pressure washing for every surface."
            accentWord="every"
            description="From residential house washing to commercial fleet cleaning, we handle it all with the right equipment and technique."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 hover:shadow-lg transition-all group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] transition-colors">
                  <svg className="w-5 h-5 text-[var(--accent)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {service.shortDescription.slice(0, 100)}...
                </p>
                <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-1">
                  Learn More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — with image */}
      <section className="py-16 sm:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/deck-cleaning.jpg"
                alt="Deck and fence pressure washing restoration by Spotless Property Cleaning"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeader
                eyebrow="Why Choose Us"
                title="Your local exterior cleaning experts."
                description="We combine professional-grade equipment, eco-friendly solutions, and years of local experience to deliver results that exceed expectations."
                center={false}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-8">
                {site.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 py-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-slate-700 font-medium text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What our customers are saying."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
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
      <section className="py-16 sm:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader
                eyebrow="Contact Us"
                title="Get your free estimate."
                description="Tell us about your project and we'll provide a no-obligation quote. Most estimates delivered within 24 hours."
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
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg mt-8">
                <Image
                  src="/images/before-after.jpg"
                  alt="Before and after pressure washing results - Spotless Property Cleaning"
                  fill
                  className="object-cover"
                />
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold mb-3 underline decoration-[var(--accent)] decoration-2 underline-offset-8">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-12 h-12 text-[var(--navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function EquipmentIcon() {
  return (
    <svg className="w-12 h-12 text-[var(--navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.3-3.04a1 1 0 00-1.09.04L3 14.25V21h18v-6.75l-2.03-2.08a1 1 0 00-1.09-.04l-5.3 3.04a1 1 0 01-1.17 0zM21 3l-9 6-9-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v6H9V3z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-12 h-12 text-[var(--navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
