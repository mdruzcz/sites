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

const serviceIcons: Record<string, React.ReactNode> = {
  "deck-restaining": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  "deck-stripping": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  "deck-sanding": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V6a2.25 2.25 0 00-2.25-2.25H7.25A2.25 2.25 0 005 6v8.5" />
    </svg>
  ),
  "deck-restoration": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  ),
  "fence-staining": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
};

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
            <p className="text-[#C4A265] font-semibold text-sm uppercase tracking-wider mb-4">
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

      {/* ─── SERVICES (improved) ─── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Professional Deck & Fence Staining"
            description="From simple restaining to complete restoration — we bring weathered wood back to life."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative bg-white rounded-2xl border border-stone-200 p-8 hover:border-[var(--accent)]/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5EDE4] to-[#ECDBC8] flex items-center justify-center mb-5 text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
                  {serviceIcons[service.slug] || <DefaultBrushIcon />}
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl mb-3 text-stone-900 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                {/* Arrow link */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] group-hover:gap-2.5 transition-all">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (improved) ─── */}
      <section className="py-16 sm:py-24 bg-[var(--wood-dark)] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C4A265] font-semibold text-sm uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="h-display text-3xl sm:text-4xl text-white mb-4">
              Our Proven 4-Step Process
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-lg">
              Every project follows a proven process that delivers consistent, long-lasting results.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#6B4226] via-[#8B5E3C] to-[#6B4226] opacity-40" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {[
                {
                  step: "01",
                  title: "Free On-Site Quote",
                  desc: "We assess your deck in person, discuss your goals, and provide a transparent, no-obligation quote.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "Strip & Clean",
                  desc: "Chemical stripping removes old finishes. Power washing cleans dirt, mildew, and surface greying.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V6a2.25 2.25 0 00-2.25-2.25H7.25A2.25 2.25 0 005 6v8.5" />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Sand & Stain",
                  desc: "Professional sanding opens wood pores. Premium oil-based stain is applied for deep penetration.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                  ),
                },
                {
                  step: "04",
                  title: "Walkthrough & Care",
                  desc: "Final quality check with you. We provide maintenance tips to maximize your stain's lifespan.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                },
              ].map((p) => (
                <div key={p.step} className="relative text-center group">
                  {/* Step number badge */}
                  <div className="relative inline-flex flex-col items-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5E3C] to-[#4E2E16] flex items-center justify-center text-white shadow-lg shadow-[#4E2E16]/30 group-hover:scale-110 transition-transform duration-300">
                      {p.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-[var(--wood-dark)] text-xs font-bold flex items-center justify-center shadow">
                      {p.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-white">{p.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
              Start With a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US (improved) ─── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — image + stats overlay */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/deck5.jpg"
                  alt="Beautifully stained cedar deck by Deck Restaining in Oakville, Ontario"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-4 sm:right-4 bg-white rounded-xl shadow-xl p-5 border border-stone-100">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">
                      {site.stats.projectsCompleted}+
                    </p>
                    <p className="text-xs text-stone-500 mt-1">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">
                      {site.stats.yearsExperience}+
                    </p>
                    <p className="text-xs text-stone-500 mt-1">Years</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">
                      {site.stats.satisfactionRate}%
                    </p>
                    <p className="text-xs text-stone-500 mt-1">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — features */}
            <div>
              <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-wider mb-3">
                Why Choose Us
              </p>
              <h2 className="h-display text-3xl sm:text-4xl text-stone-900 mb-4">
                The Deck Restaining Difference
              </h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                We combine proper prep work, premium products, and professional application for results that last years — not months.
              </p>

              <div className="space-y-5">
                {site.features.map((feature, i) => (
                  <div key={feature} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5EDE4] to-[#ECDBC8] flex items-center justify-center shrink-0 group-hover:from-[#ECDBC8] group-hover:to-[#E0CBB0] transition-colors">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/about" className="btn btn-primary">
                  Learn More About Us
                </Link>
              </div>
            </div>
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

function DefaultBrushIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  );
}
