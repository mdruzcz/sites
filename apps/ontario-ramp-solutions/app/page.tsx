import Link from "next/link";
import { site } from "@/lib/site";
import {
  getServices,
  getFeaturedTestimonials,
  getServiceAreas,
  getFaqs,
} from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { TrustBar } from "@/components/TrustBar";
import { ServiceCard } from "@/components/ServiceCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();
  const areas = getServiceAreas();
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs.slice(0, 5))) }}
      />

      {/* 1. Hero */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-300 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20">
                <span className="w-2 h-2 rounded-full bg-yellow-300" />
                <span className="text-xs text-blue-100 uppercase tracking-widest font-semibold">
                  Serving London, Hamilton, KW, GTA & All of Ontario
                </span>
              </div>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
                Wheelchair Ramps.
                <br />
                <span className="text-yellow-300">Accessible</span> for everyone.
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Ontario Ramp Solutions builds and rents professional aluminum wheelchair ramps for homes, businesses, and events. Permanent installations, flexible rentals, and event accessibility — barrier-free everywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#quote" className="btn btn-cta text-base px-7">
                  Get a Free Quote
                  <Arrow />
                </a>
                <a href={site.phoneHref} className="btn text-base px-7 bg-white/15 border border-white/30 text-white hover:bg-white/25">
                  Call {site.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="trust-chip bg-white/15 text-white border-white/25 text-xs">AODA Compliant</span>
                <span className="trust-chip bg-white/15 text-white border-white/25 text-xs">Licensed & Insured</span>
                <span className="trust-chip bg-white/15 text-white border-white/25 text-xs">Free Consultations</span>
                <span className="trust-chip bg-white/15 text-white border-white/25 text-xs">Same-Day Setup Available</span>
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

      {/* 3. Services */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Four ways we make Ontario more accessible."
            description="Whether you need a permanent ramp for your home, a rental for post-surgery recovery, accessibility for an upcoming event, or a safer stairway with proper handrails — we have you covered."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Event specialization highlight */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Event Specialists</p>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-5">
                Every guest gets through the door. <span className="gradient-text">Full stop.</span>
              </h2>
              <p className="text-muted-strong text-base sm:text-lg leading-relaxed mb-6">
                We specialize in event accessibility — the kind that's invisible to most guests and essential to some. Weddings, festivals, corporate events, community fundraisers, and public gatherings across Ontario trust us to ensure every access point is covered before the doors open.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Main entrance, ceremony, stage, bar, washrooms — every barrier addressed",
                  "Setup timed to your event schedule — morning of or day before",
                  "Outdoor platforms for stages and vendor areas on uneven ground",
                  "Heritage venues, tents, temporary structures — we've seen it all",
                  "Full removal after your event wraps — zero disruption",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-strong text-sm">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services/event-accessibility" className="btn btn-primary">
                Learn About Event Accessibility
                <Arrow />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Weddings", icon: <HeartIcon /> },
                { label: "Festivals", icon: <StarIcon /> },
                { label: "Corporate Events", icon: <BuildingIcon /> },
                { label: "Community Gatherings", icon: <GroupIcon /> },
              ].map((type) => (
                <div key={type.label} className="card p-6 text-center card-accented-cta">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(245,166,35,0.1)", color: "var(--cta)" }}
                  >
                    {type.icon}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{type.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why choose us */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Ontario Ramp Solutions"
            title="Professional. Fast. Built for Ontario."
            description="We do one thing and we do it right. Every ramp we install or deliver meets AODA standards, holds up through Ontario winters, and is sized for the person who needs it."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="card p-7 card-accented">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-accent mb-5"
                  style={{ background: "var(--accent-light)" }}
                >
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{b.title}</h3>
                <p className="text-muted-strong text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service areas */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Work"
            title="Across Ontario. Based in London."
            description="Core service zones in London, Hamilton, Kitchener-Waterloo, and the GTA. We travel province-wide for events and larger commercial projects."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-5 text-center group hover:-translate-y-0.5 transition-all hover:border-accent"
              >
                <p className="font-bold text-gray-900 group-hover:text-accent transition-colors text-sm">
                  {city.name}
                </p>
                <p className="text-xs text-muted mt-1">Ontario →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Clients Say"
            title="Real results for real people."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-7 flex flex-col card-accented">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" style={{ color: "var(--cta)" }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5 flex-1 text-sm sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.author}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {t.role} · {t.city}, ON
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions answered."
            description="Quick answers to what we hear most."
          />
          <FaqAccordion faqs={faqs.slice(0, 6)} />
          <div className="text-center mt-10">
            <Link href="/faq" className="btn btn-outline">View All FAQs</Link>
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

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
function GroupIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const benefits = [
  {
    title: "AODA & Building Code Compliant",
    icon: <ShieldIcon />,
    text: "Every installation meets or exceeds Ontario Building Code and AODA accessibility requirements. We handle all specifications — slope, rise, handrail height, landing size.",
  },
  {
    title: "Aluminum — Rust-Proof & Non-Slip",
    icon: <RampIcon />,
    text: "We use heavy-gauge extruded aluminum with a raised non-slip tread pattern and powder-coat finish engineered for Ontario's freeze-thaw winters and road salt.",
  },
  {
    title: "Same-Day Setup Available",
    icon: <ClockIcon />,
    text: "Hospital discharge calls don't wait for next-week scheduling. When you need a ramp urgently, call us — we do our best to accommodate same-day and next-day delivery and installation.",
  },
  {
    title: "Flexible Rental Terms",
    icon: <CalendarIcon />,
    text: "Daily, weekly, monthly, or long-term rental. We deliver, set up, and take down — you just use it. Extend your term anytime without penalty.",
  },
  {
    title: "Event Specialists",
    icon: <EventIcon />,
    text: "We specialize in event accessibility — reading the venue, covering every access point, coordinating with your event timeline, and removing everything cleanly after the event.",
  },
  {
    title: "Free On-Site Consultation",
    icon: <CheckIcon />,
    text: "No guessing from photos. We visit your site, measure the rise and run, assess the threshold and handrail situation, and give you a written quote before any work begins.",
  },
];

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function RampIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l5-10h8l5 10H3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function EventIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
