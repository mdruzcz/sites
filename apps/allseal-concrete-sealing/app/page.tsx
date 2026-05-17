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
      <section className="bg-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl relative z-10">
            <p className="text-blue-300 font-semibold text-sm uppercase tracking-wider mb-4">
              {site.yearsExperience}+ Years of Experience
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Professional Concrete Sealing in Southwestern Ontario
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {site.tagline} We protect driveways, patios, pool decks, and more with premium sealers
              and advanced techniques. Serving {site.serviceAreas.join(", ")}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
                Get a Free Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost text-base px-8 py-4">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-[var(--accent)]">{site.stats.driveways}+</p>
              <p className="text-sm text-slate-600">Driveways Sealed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--accent)]">{site.stats.patios}+</p>
              <p className="text-sm text-slate-600">Patios Sealed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--accent)]">{site.stats.happyCustomers}+</p>
              <p className="text-sm text-slate-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Concrete Sealing Solutions"
            description="From driveways to pool decks, we protect every concrete surface with premium products and professional application."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <ShieldIcon />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why All-Seal"
            title="Why Choose Us"
            description="We combine experience, premium products, and professional service to deliver results that last."
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
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Our Customers Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.author} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
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
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader
                eyebrow="Contact Us"
                title="Get Your Free Quote"
                description="Tell us about your project and we'll provide a no-obligation quote. Most quotes delivered within 24 hours."
                center={false}
              />
              <div className="space-y-4 mt-6">
                <p className="text-slate-600">
                  <strong>Sealer Options:</strong> {site.sealerOptions.join(" • ")}
                </p>
                <p className="text-slate-600">
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

function ShieldIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
