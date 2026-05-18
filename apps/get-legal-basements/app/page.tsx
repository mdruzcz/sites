import Link from "next/link";
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
      <section className="relative overflow-hidden bg-[var(--charcoal)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--charcoal)] via-slate-800 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-blue-300 font-semibold text-sm uppercase tracking-wider mb-4">
              Licensed General Contractor &middot; {site.yearsExperience}+ Years Experience
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Legal Basement Apartments &amp; Renovations in London, Ontario
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              {site.tagline} We handle permits, design, and construction for legal second suites,
              underpinning, waterproofing, and complete basement renovations across{" "}
              {site.serviceAreas.slice(0, 3).join(", ")} and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
                Get a Free Consultation
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost text-base px-8 py-4">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: "Free Consultations", desc: "No-obligation site assessment" },
              { title: "Full Permit Handling", desc: "We deal with City Hall" },
              { title: "Fixed Pricing", desc: "No hidden fees or surprises" },
              { title: "2-Year Warranty", desc: "On all workmanship" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-bold text-[var(--charcoal)]">{item.title}</h3>
                <p className="text-sm text-[var(--concrete)] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content — Legal Basements */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-6">
              Turn Your Basement Into a Legal, Income-Generating Apartment
            </h2>
            <div className="space-y-4 text-lg text-[var(--concrete)] leading-relaxed">
              <p>
                A legal basement apartment is one of the smartest investments a London, Ontario
                homeowner can make. With rental demand at an all-time high — driven by Western
                University, Fanshawe College, and a growing population — a properly permitted
                second suite can generate $1,200 to $2,000+ per month in rental income while
                significantly increasing your property value.
              </p>
              <p>
                But building a legal basement apartment isn&apos;t a DIY project. Ontario Building Code
                requirements cover everything from minimum ceiling heights and fire separations to
                egress windows, separate entrances, and independent HVAC systems. Getting it wrong
                means failed inspections, costly rework, and potential legal liability.
              </p>
              <p>
                That&apos;s where we come in. As London&apos;s dedicated basement renovation specialists,
                we handle every aspect of your project — from initial feasibility assessment and
                architectural drawings to permit applications, construction, and final inspection.
                Whether you need underpinning to increase ceiling height, waterproofing to ensure
                a dry living space, or a complete suite build from scratch, we deliver turnkey
                results with fixed pricing and no surprises.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/services/legal-basement-apartments" className="btn btn-primary">
                Learn About Legal Basement Apartments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Basement Renovation Solutions"
            description="From legal second suites to foundation repair, we provide comprehensive basement services across London and Southwestern Ontario."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <ServiceIcon />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[var(--concrete)] text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our 4-Step Process"
            description="A proven approach that delivers code-compliant results on time and on budget."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consultation", desc: "Free on-site assessment. We evaluate your basement's potential, discuss your goals, and outline the path forward." },
              { step: "2", title: "Design & Permits", desc: "3D design renderings, architectural drawings, engineering reports, and full permit submission to the City of London." },
              { step: "3", title: "Construction", desc: "Professional, project-managed construction with regular updates, clean jobsite, and adherence to timeline and budget." },
              { step: "4", title: "Inspection & Handover", desc: "Final municipal inspection, occupancy approval, and complete walkthrough. Your legal basement is ready." },
            ].map((p) => (
              <div key={p.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="The Legal Basements London Advantage"
            description="We combine deep expertise in Ontario Building Code with hands-on construction experience to deliver basements that pass inspection the first time."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {site.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium text-sm">{feature}</p>
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
            title="What Our Clients Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--concrete)] text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-slate-900">
                  {t.author} <span className="font-normal text-[var(--concrete)]">— {t.city}</span>
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
                title="Get Your Free Consultation"
                description="Tell us about your basement project and we'll provide a detailed, no-obligation quote. Most consultations booked within 48 hours."
                center={false}
              />
              <div className="space-y-4 mt-6">
                <p className="text-[var(--concrete)]">
                  <strong>Services:</strong> Legal Apartments &middot; Underpinning &middot;
                  Waterproofing &middot; Finishing &middot; Egress Windows &middot; Bathrooms &middot; Foundation Repair
                </p>
                <p className="text-[var(--concrete)]">
                  <strong>Service Areas:</strong> {site.serviceAreas.join(", ")}
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
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
