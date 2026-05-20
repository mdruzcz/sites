import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  getServices,
  getFeaturedTestimonials,
  getFeaturedProjects,
  getServiceAreas,
  getFaqs,
} from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { TrustBar } from "@/components/TrustBar";
import { ServiceCard } from "@/components/ServiceCard";
import { StepProcess } from "@/components/StepProcess";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();
  const projects = getFeaturedProjects();
  const areas = getServiceAreas();
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 5))) }}
      />

      {/* 1. Hero — Outcome-focused with embedded quote form */}
      <section className="relative overflow-hidden bg-charcoal">
        <Image
          src="/images/migrated/5kconcrete-5k-concrete-featured-project-1.jpg"
          alt="Custom-poured concrete driveway in London, Ontario by Concrete Driveways"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 text-white">
              <p className="eyebrow !text-[var(--accent)] !mb-3">
                {site.yearsExperience}+ Years · London ON
              </p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-5">
                A Concrete Driveway That <span className="text-[var(--accent)]">Outlasts</span> Ontario Winters.
              </h1>
              <p className="text-lg sm:text-xl text-[var(--concrete-200)] mb-7 leading-relaxed max-w-2xl">
                Reinforced, properly graded, and finished by hand. We pour custom concrete driveways, patios, and walkways across London, St. Thomas, and Southwestern Ontario — with a written warranty on every project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#quote" className="btn btn-primary text-base px-7 py-4">
                  Get Your Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a href={site.phoneHref} className="btn btn-ghost text-base px-7 py-4">
                  Call {site.phone}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--concrete-200)]">
                <div className="flex items-center gap-2">
                  <CheckIcon /> Written Warranty
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Fully Insured
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Free On-Site Quote
                </div>
              </div>
            </div>

            <div className="lg:col-span-2" id="quote">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Limited-Time Offers (AGC-style) */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">This Season Only</p>
            <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)]">
              Limited-Time Spring Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OfferCard
              icon={<DollarIcon />}
              title="$250 Off Driveway Pours"
              text="Book a full driveway install by June 30 and we'll take $250 off your final quote — applied automatically."
            />
            <OfferCard
              icon={<EyeIcon />}
              title="Free On-Site Inspection"
              text="Already have concrete? We'll inspect existing driveways for free and tell you straight up whether to repair or replace."
            />
            <OfferCard
              icon={<CalendarIcon />}
              title="Priority Scheduling"
              text="Reserve your pour date now and lock in summer scheduling before the calendar fills up — no deposit required."
            />
          </div>
        </div>
      </section>

      {/* 4. About / Pain Point */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Why It Cracks</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Most Cracked Driveways Were Doomed Before the Concrete Was Even Mixed.
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed">
                <p>
                  Ontario freeze-thaw cycles will find every weakness in a concrete pour — thin slabs, missing rebar, skipped control joints, or a base that wasn&apos;t compacted properly. By the third winter, the cracks show.
                </p>
                <p>
                  We do it the other way. Every driveway gets a 4&quot;–6&quot; reinforced pour on a compacted granular base, with air-entrained concrete and engineered joints in the right places. That&apos;s why our driveways last 25–30 years instead of 8.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {site.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--accent)]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </span>
                    <span className="text-[var(--charcoal)] font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/migrated/5kconcrete-5k-concrete-featured-project-4.jpg"
                alt="Reinforced concrete driveway with proper base prep in London, ON"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">Engineered for Ontario</p>
                <p className="text-[var(--charcoal)] font-semibold">25–30 year lifespan with sealing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services Showcase (AGC-style 8 service cards) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="Concrete Built for Every Surface"
            description="From standard residential driveways to high-end stamped patios and pool decks, every job uses the same engineered base and reinforced pour."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose */}
      <section className="py-16 sm:py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="eyebrow">Why Choose Concrete Driveways</p>
            <h2 className="h-display text-3xl sm:text-4xl text-white">
              Six Reasons Homeowners Trust Us
            </h2>
            <p className="mt-4 text-lg text-[var(--concrete-200)]">
              The difference between a driveway that fails in 8 years and one that lasts 30 comes down to what you do before the pour, during the pour, and after.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[var(--accent)] flex items-center justify-center mb-4 text-white">
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-[var(--concrete-200)] text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Service Areas */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Pour"
            title="Serving London & Southwestern Ontario"
            description="Local crews, local knowledge, local pricing. We pour concrete throughout the following Southwestern Ontario communities."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-4 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
              >
                <p className="font-semibold text-[var(--charcoal)] group-hover:text-[var(--accent)]">
                  {city.name}, ON
                </p>
                <p className="text-xs text-[var(--concrete)] mt-1">View services →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Gallery */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recent Projects"
            title="See the Work"
            description="Real driveways, patios, and walkways poured across Southwestern Ontario. Each project labelled with city and finish type."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((p) => (
              <div key={p.slug} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/85 via-[var(--charcoal)]/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm sm:text-base leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline">
              View Full Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Step Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Quote to Finished Pour in 3 Steps"
            description="No high-pressure sales. Just photos, a quote, and concrete done right."
          />
          <StepProcess />
        </div>
      </section>

      {/* 10. Comparison Table — Concrete vs Asphalt */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Concrete vs. Asphalt"
            title="Why Concrete Wins for Driveways"
          />
          <div className="card overflow-hidden">
            <div className="grid grid-cols-3 bg-[var(--charcoal)] text-white">
              <div className="p-4 sm:p-5 font-semibold text-sm sm:text-base">Feature</div>
              <div className="p-4 sm:p-5 font-semibold text-sm sm:text-base text-center text-[var(--accent)]">Concrete</div>
              <div className="p-4 sm:p-5 font-semibold text-sm sm:text-base text-center text-[var(--concrete-200)]">Asphalt</div>
            </div>
            {compareRows.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm sm:text-base ${i % 2 === 1 ? "bg-[var(--surface)]/40" : "bg-white"}`}>
                <div className="p-4 sm:p-5 font-medium text-[var(--charcoal)]">{row.feature}</div>
                <div className="p-4 sm:p-5 text-center text-[var(--charcoal)] font-semibold">{row.concrete}</div>
                <div className="p-4 sm:p-5 text-center text-[var(--concrete)]">{row.asphalt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="Hundreds of Homeowners. One Standard."
            description="Real reviews from real customers across London, St. Thomas, and beyond."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.author} className="card p-6 flex flex-col">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--charcoal)] leading-relaxed mb-4 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-[var(--charcoal)]">
                  {t.author} <span className="font-normal text-[var(--concrete)]">— {t.city}, ON</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Honest Answers"
            description="The questions we get most often, answered straight."
          />
          <FaqAccordion faqs={faqs.slice(0, 6)} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

const benefits = [
  { title: "Written Warranty", icon: <ShieldIcon />, text: "Every pour comes with a written workmanship warranty. No fine print, no excuses." },
  { title: "Reinforced Base", icon: <LayersIcon />, text: "Compacted granular base + rebar or wire mesh on every driveway. Built to outlast Ontario." },
  { title: "Engineered Joints", icon: <RulerIcon />, text: "Control joints cut at the right depth and spacing so any cracking happens invisibly." },
  { title: "Air-Entrained Mix", icon: <SnowflakeIcon />, text: "Concrete formulated to resist freeze-thaw scaling — the silent killer of cheap pours." },
  { title: "Free On-Site Quotes", icon: <ClipboardIcon />, text: "We visit, measure, and quote in writing within 48 hours. The number doesn't change." },
  { title: "Local Crews", icon: <PinIcon />, text: "Our crews live and work in Southwestern Ontario. No travel mark-up, no missed appointments." },
];

const compareRows = [
  { feature: "Lifespan", concrete: "25–30 years", asphalt: "8–12 years" },
  { feature: "Maintenance", concrete: "Reseal every 3–5 yrs", asphalt: "Reseal every 1–2 yrs" },
  { feature: "Curb appeal", concrete: "Stamped / coloured / aggregate", asphalt: "One look only" },
  { feature: "Heat resistance", concrete: "Stays solid in summer", asphalt: "Softens, ruts under tires" },
  { feature: "Repair cost", concrete: "Patch / overlay options", asphalt: "Frequent full re-coats" },
  { feature: "Resale value", concrete: "Higher (long lifespan)", asphalt: "Lower (looks worn fast)" },
];

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.7 0-3 1-3 2.3 0 1.2 1.2 2 3 2.3 2 .3 3.5 1.2 3.5 2.7 0 1.5-1.6 2.7-3.5 2.7s-3.5-1.2-3.5-2.7M12 3v18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7s-8.27-2.94-9.54-7z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 7v10h18V7M7 7v3M11 7v5M15 7v3M19 7v5" />
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function OfferCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="card p-6 relative overflow-hidden corner-accent">
      <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
        Limited Time
      </div>
      <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-[var(--charcoal)] mb-2">{title}</h3>
      <p className="text-[var(--concrete)] text-sm leading-relaxed">{text}</p>
    </div>
  );
}
