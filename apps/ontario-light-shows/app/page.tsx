import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  getServices,
  getFeaturedTestimonials,
  getFeaturedProjects,
  getServiceAreas,
  getFaqs,
  getCaseStudies,
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
  const caseStudies = getCaseStudies();
  const blenheim = caseStudies[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 5))) }}
      />

      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/uploads/placeholder-blenheim-hero.svg"
          alt="Music-synchronized addressable LED light show by Ontario Light Shows"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="spotlight" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 text-white">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-soft bg-white/5 backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
                <span className="text-xs text-muted-strong uppercase tracking-widest">
                  Now booking 2026 events & permanent installs
                </span>
              </div>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-7xl mb-6">
                <span className="rgb-underline">Synchronized</span> light shows.
                <br className="hidden sm:block" /> Engineered for{" "}
                <span className="gradient-text">Ontario</span>.
              </h1>
              <p className="text-lg sm:text-xl text-muted-strong mb-8 leading-relaxed max-w-2xl">
                We design and install music-synchronized addressable LED light shows, RGB architectural lighting, immersive displays, and permanent holiday lighting on IP67/IP68 hardware — across Toronto, Ottawa, Hamilton, London, Windsor, and all of Ontario.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#quote" className="btn btn-primary text-base px-7">
                  Design My Show
                  <Arrow />
                </a>
                <a href={site.phoneHref} className="btn btn-ghost text-base px-7">
                  Call {site.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="spec-chip">IP67 / IP68 Hardware</span>
                <span className="spec-chip">Addressable Pixels</span>
                <span className="spec-chip">Music-Synced</span>
                <span className="spec-chip">App + Voice Control</span>
              </div>
            </div>

            <div className="lg:col-span-2" id="quote">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust bar */}
      <TrustBar />

      {/* 3. Services overview */}
      <section className="py-20 sm:py-28 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Five categories. One signature."
            description="From a single architectural accent line to a full parade-scale show, every install runs on professional-grade addressable LED hardware engineered for Ontario weather."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Case study teaser — Blenheim */}
      <section className="py-20 sm:py-28 bg-midnight-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Case Study · 2024</p>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-5">
                The <span className="gradient-text">Blenheim Rotary Club</span> Christmas Parade.
              </h2>
              <p className="text-muted-strong text-base sm:text-lg leading-relaxed mb-6">
                {blenheim.summary}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {blenheim.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl sm:text-3xl font-extrabold gradient-text leading-none mb-1.5">
                      {s.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`/case-studies/${blenheim.slug}`} className="btn btn-primary">
                Read the full case study
                <Arrow />
              </Link>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card-glow card">
              <Image
                src={blenheim.heroImage}
                alt={`${blenheim.title} — case study cover image`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 bg-[rgba(5,7,15,0.85)] backdrop-blur-md rounded-xl p-4 border border-soft">
                <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-1">
                  {blenheim.location}
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  &ldquo;{blenheim.testimonialQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why choose us */}
      <section className="py-20 sm:py-28 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Ontario Light Shows"
            title="Built for the show. Built for the weather."
            description="Anybody can hang a string of lights. We sequence individual pixels to a soundtrack and weather-seal the hardware to survive Ontario."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="card p-7 corner-accent">
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-5">
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{b.title}</h3>
                <p className="text-muted-strong text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service areas */}
      <section className="py-20 sm:py-28 bg-midnight-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Install"
            title="Serving all of Ontario."
            description="Core service zones across the GTA, the National Capital Region, Hamilton, London, Windsor, Chatham-Kent, and the Tri-Cities. For larger events or permanent installs, we travel."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-5 text-center group hover:-translate-y-0.5 transition-all hover:border-accent"
              >
                <p className="font-bold text-white group-hover:text-accent transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-muted mt-1.5">Ontario →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Project gallery */}
      <section className="py-20 sm:py-28 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recent Work"
            title="Light, sequenced and earned."
            description="Each install labelled by city and discipline. Drop your own brief — we'll come back with a sample sequence."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((p) => (
              <div key={p.slug} className="relative aspect-square rounded-xl overflow-hidden group card">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm sm:text-base leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Process */}
      <section className="py-20 sm:py-28 bg-midnight-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Process"
            title="From idea to show day in 3 steps."
            description="No pressure pitches. Just storyboards, a sample sequence, and a written quote."
          />
          <StepProcess />
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-20 sm:py-28 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="From Our Clients"
            title="The crowd reacts. So do the clients."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.author} className="card p-7 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[var(--gold)] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 leading-relaxed mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm text-white">{t.author}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {t.role} · {t.city}, ON
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-20 sm:py-28 bg-midnight-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Straight answers."
            description="The questions we get most often."
          />
          <FaqAccordion faqs={faqs.slice(0, 6)} />
          <div className="text-center mt-10">
            <Link href="/faq" className="btn btn-outline">View all FAQs</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Arrow() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

const benefits = [
  {
    title: "Music-Synchronized",
    icon: <NoteIcon />,
    text: "We sequence individual pixels to your soundtrack — frame by frame, in studio, before the rig ever ships. The show plays the same way every night.",
  },
  {
    title: "IP67 / IP68 Hardware",
    icon: <ShieldIcon />,
    text: "Every fixture, connector, and driver is weather-sealed for Ontario freeze-thaw, snow load, and lake-effect humidity.",
  },
  {
    title: "Addressable Pixels",
    icon: <RgbIcon />,
    text: "Millions of colours per fixture, every pixel independently controlled. Animate a wave across a building or paint a flag of your choosing.",
  },
  {
    title: "Invisible by Day",
    icon: <EyeIcon />,
    text: "Permanent installs hide inside low-profile aluminum channels tucked under rooflines. No visible wiring, no holiday-store look.",
  },
  {
    title: "App + Voice Control",
    icon: <AppIcon />,
    text: "Scene library, schedules, dimming, and zone control from your phone. Voice control via Alexa and Google.",
  },
  {
    title: "Multi-Year Warranty",
    icon: <TrophyIcon />,
    text: "Manufacturer warranty plus our own written workmanship guarantee. LED lifespan is 50,000+ hours.",
  },
];

function NoteIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l11-2v13M9 19a2 2 0 11-4 0 2 2 0 014 0zm11-2a2 2 0 11-4 0 2 2 0 014 0z" />
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
function RgbIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="9" cy="10" r="5" />
      <circle cx="15" cy="10" r="5" />
      <circle cx="12" cy="15" r="5" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7s-8.27-2.94-9.54-7z" />
    </svg>
  );
}
function AppIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4h10v5a5 5 0 11-10 0V4zm-3 1h3v3a3 3 0 01-3 0V5zm16 0h-3v3a3 3 0 003 0V5z" />
    </svg>
  );
}
