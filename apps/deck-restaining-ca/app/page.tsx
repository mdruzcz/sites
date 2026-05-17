import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export const revalidate = 3600;

const beforeAfterProjects = [
  { before: "/images/drc1.jpeg", after: "/images/drc2.jpeg", label: "Deck Restaining — Oakville, ON" },
  { before: "/images/drc3.jpeg", after: "/images/drc4.jpeg", label: "Deck Restoration — Burlington, ON" },
  { before: "/images/drc5.jpeg", after: "/images/drc6.jpeg", label: "Full Deck Restoration — Milton, ON" },
  { before: "/images/drc7.jpeg", after: "/images/drc8.jpeg", label: "Fence Staining — Halton Region" },
  { before: "/images/deck6.jpg", after: "/images/deck7.jpg", label: "Cedar Deck Restaining — Oakville, ON" },
  { before: "/images/deck8.jpg", after: "/images/deck9.jpg", label: "Fence Restoration — Burlington, ON" },
];

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px]">
        <Image
          src="/images/deck10.jpeg"
          alt="Professional deck staining team at work in Oakville, Ontario"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--wood-dark)]/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-amber-300 font-semibold text-sm uppercase tracking-wider mb-4">
              {site.yearsExperience}+ Years · Oil-Based Stains Only
            </p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Expert Deck & Fence Staining in Oakville & Burlington
            </h1>
            <p className="text-xl text-stone-200 mb-8 leading-relaxed">
              Transform your weathered wood into a beautiful masterpiece. We use exclusively
              premium oil-based stains that penetrate deep and never peel — guaranteed protection
              for 3–5 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
                Get a Free Quote
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn-ghost text-base px-8 py-4">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Oil-Based */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="h-display text-3xl sm:text-4xl text-stone-900 mb-6">
              Why We Only Use Oil-Based Stains
            </h2>
            <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
              <p>
                Most deck staining companies use water-based products because they&apos;re faster to apply
                and cheaper to buy. The problem? Water-based stains sit on the wood surface like paint.
                Within 1–2 years they start peeling, cracking, and flaking — leaving your deck looking
                worse than before.
              </p>
              <p>
                Our premium oil-based stains penetrate deep into the wood fibre, bonding at a molecular
                level. They flex with the wood as it expands and contracts through Ontario&apos;s freeze-thaw
                cycles. The result is a finish that wears away gradually and evenly over 3–5 years —
                never peeling, never flaking.
              </p>
              <p>
                Combined with our thorough prep process (chemical stripping + professional sanding),
                you get a stain job that lasts. That&apos;s why we back every project with our satisfaction guarantee.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/services/deck-restaining" className="btn btn-primary">
                Learn About Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 sm:py-20 bg-[var(--stone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Work"
            title="Before & After Transformations"
            description="Drag the slider to see real results from projects across the Halton Region."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beforeAfterProjects.map((project) => (
              <BeforeAfterSlider
                key={project.label}
                beforeSrc={project.before}
                afterSrc={project.after}
                label={project.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Professional Deck & Fence Staining"
            description="From simple restaining to complete restoration — we bring weathered wood back to life."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <BrushIcon />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-[var(--stone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our 4-Step Process"
            description="Every project follows a proven process that delivers consistent, long-lasting results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Free On-Site Quote", desc: "We assess your deck in person, discuss your goals, and provide a transparent quote." },
              { step: "2", title: "Strip & Clean", desc: "Chemical stripping removes old finishes. Power washing cleans dirt, mildew, and greying." },
              { step: "3", title: "Sand & Stain", desc: "Professional sanding opens wood pores. Premium oil-based stain is applied for deep penetration." },
              { step: "4", title: "Walkthrough & Care", desc: "Final quality check with you. We provide maintenance tips to maximize your stain's lifespan." },
            ].map((p) => (
              <div key={p.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-stone-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Us"
            title="The Deck Restaining Difference"
            description="We combine proper prep work, premium products, and professional application for results that last."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-stone-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-[var(--stone)]">
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
                <p className="text-stone-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-stone-900">
                  {t.author} <span className="font-normal text-stone-500">— {t.city}, ON</span>
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
                description="Tell us about your deck and we'll provide a no-obligation quote. Most quotes delivered within 24 hours."
                center={false}
              />
              <div className="space-y-4 mt-6">
                <p className="text-stone-600">
                  <strong>Stain Options:</strong> {site.stainOptions.join(" · ")}
                </p>
                <p className="text-stone-600">
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

function BrushIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}
