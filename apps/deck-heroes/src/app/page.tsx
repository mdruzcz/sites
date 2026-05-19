import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import {
  SERVICES,
  CITIES,
  TESTIMONIALS,
  PHONE,
  PHONE_HREF,
  COMPANY_NAME,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Heroes | Deck Staining, Building & Restoration in Ontario",
  description:
    "Transform your outdoor living space with Deck Heroes. Professional deck staining, refinishing, resurfacing, building, and cleaning across Southwestern Ontario. Free estimates, 5-star rated, fully insured.",
  openGraph: {
    title: "Deck Heroes | Deck Staining, Building & Restoration in Ontario",
    description:
      "Transform your outdoor living space with professional deck staining, building, refinishing, resurfacing, and cleaning across Southwestern Ontario.",
    url: "https://deckheroes.ca",
    siteName: "Deck Heroes",
    locale: "en_CA",
    type: "website",
  },
};

/* ---------- inline SVG icons for services ---------- */
function StainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="8" y="20" width="32" height="4" rx="1" />
      <rect x="8" y="26" width="32" height="4" rx="1" />
      <rect x="8" y="32" width="32" height="4" rx="1" />
      <path d="M24 6v10" strokeWidth={3} strokeLinecap="round" />
      <circle cx="24" cy="14" r="3" fill="currentColor" />
    </svg>
  );
}

function RefinishIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="6" y="28" width="36" height="4" rx="1" />
      <rect x="6" y="34" width="36" height="4" rx="1" />
      <path d="M14 24l8-14 8 14" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="17" x2="30" y2="17" />
    </svg>
  );
}

function ResurfaceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="6" y="30" width="36" height="4" rx="1" />
      <rect x="6" y="36" width="36" height="4" rx="1" />
      <path d="M10 26h28" strokeDasharray="4 3" />
      <path d="M16 18l8-8 8 8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="10" x2="24" y2="26" />
    </svg>
  );
}

function BuildIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="32" width="40" height="4" rx="1" />
      <rect x="4" y="38" width="40" height="4" rx="1" />
      <line x1="10" y1="32" x2="10" y2="20" />
      <line x1="24" y1="32" x2="24" y2="20" />
      <line x1="38" y1="32" x2="38" y2="20" />
      <rect x="8" y="18" width="32" height="4" rx="1" />
      <path d="M20 14l4-6 4 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CleanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="6" y="34" width="36" height="4" rx="1" />
      <rect x="6" y="40" width="36" height="4" rx="1" />
      <path d="M18 30v-8l-4-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 30v-14" strokeLinecap="round" />
      <path d="M30 30v-8l4-6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
      <circle cx="24" cy="10" r="2" fill="currentColor" />
      <circle cx="34" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

const SERVICE_ICONS = [StainIcon, RefinishIcon, ResurfaceIcon, BuildIcon, CleanIcon];

/* ---------- neighbourhood labels for cities ---------- */
const CITY_NEIGHBOURHOODS: Record<string, string> = {
  london: "Byron, Wortley Village, Old South, Masonville",
  woodstock: "Downtown, West End, Southside",
  "st-thomas": "Central, South, East End",
  strathroy: "Downtown, South Strathroy, Industrial Park area",
  brantford: "Eagle Place, Terrace Hill, West Brant",
  hamilton: "Dundas, Ancaster, Stoney Creek, Westdale",
};

/* ---------- article teasers ---------- */
const ARTICLE_TEASERS = [
  {
    slug: "how-often-should-you-stain-your-deck",
    title: "How Often Should You Stain Your Deck?",
    excerpt:
      "Discover the ideal staining schedule based on your wood type, climate, and foot traffic to keep your deck looking its best year-round.",
  },
  {
    slug: "oil-vs-water-based-stains",
    title: "Oil vs. Water-Based Deck Stains: Which Is Right for You?",
    excerpt:
      "We break down the pros and cons of oil-based and water-based stains so you can make an informed choice for your deck.",
  },
  {
    slug: "preparing-your-deck-for-winter",
    title: "Preparing Your Deck for Ontario Winters",
    excerpt:
      "Ontario winters are tough on outdoor wood. Learn the steps to protect your deck from freeze-thaw cycles, ice, and snow damage.",
  },
];

export default function HomePage() {
  const featuredTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-forest-light py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.04) 40px,rgba(255,255,255,0.04) 42px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
              Professional Deck Building &amp; Restoration in Ontario
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream sm:text-xl lg:mx-0">
              Transform your outdoor living space with expert deck staining,
              refinishing, resurfacing, building, and cleaning. Trusted by hundreds
              of homeowners across Southwestern Ontario.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:bg-terra-dark focus:outline-none focus:ring-2 focus:ring-sand"
              >
                Get Free Quote
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center rounded-lg border-2 border-sand bg-transparent px-8 py-4 text-lg font-semibold text-cream transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sand"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE}
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-deck.png"
                alt="Professional deck staining and restoration by Deck Heroes in Ontario"
                width={683}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-bg-alt py-6 px-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold text-wood-dark sm:text-base">
          {[
            { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", label: "Trusted by 500+ Homeowners" },
            { icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", label: "5-Star Rated" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Fully Insured" },
            { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: "Free Estimates" },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </span>
          ))}
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-wood-dark sm:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              From fresh staining to custom builds, we offer comprehensive deck
              services for every outdoor wood surface.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <article
                  key={service.slug}
                  className="group rounded-xl border border-forest-light/20 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-terracotta/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-forest-light/20 text-terracotta transition group-hover:bg-terracotta group-hover:text-cream">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-wood-dark">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-wood-light">
                    {service.shortDescription}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-terracotta hover:text-terra-dark transition-colors"
                  >
                    Learn More
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/choose-deck-heroes.png"
                alt="Why homeowners choose Deck Heroes for professional deck care in Ontario"
                width={683}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-wood-dark sm:text-4xl">
                Why Choose Deck Heroes?
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Years of Experience",
                description:
                  "Our seasoned team has stained, sealed, and refinished hundreds of decks across Southwestern Ontario, delivering consistent, lasting results.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Premium Products",
                description:
                  "We use only top-tier stains and sealants from trusted brands, ensuring superior UV protection, moisture resistance, and rich colour retention.",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
              },
              {
                title: "Attention to Detail",
                description:
                  "From thorough surface prep to careful masking and even application, we treat every board with care. No shortcuts, no missed spots.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              },
              {
                title: "Customer Satisfaction",
                description:
                  "Our 5-star reviews speak for themselves. We are not done until you love the result. Every project includes a final walkthrough with the homeowner.",
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-wood-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">
                  {item.description}
                </p>
              </div>
            ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREAS ===== */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-wood-dark sm:text-4xl">
              Service Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              We proudly serve homeowners in these Southwestern Ontario communities
              and surrounding areas.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group rounded-xl border border-forest-light/20 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-terracotta/40"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-serif text-xl font-semibold text-wood-dark group-hover:text-terracotta transition-colors">
                    {city.name}, {city.province}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-wood-light">
                  Serving {CITY_NEIGHBOURHOODS[city.slug] ?? city.name} and surrounding
                  neighbourhoods.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-forest-dark py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-cream sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream">
              Real reviews from real homeowners across Ontario.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((t, i) => (
              <blockquote
                key={i}
                className="rounded-xl bg-forest/60 p-6 backdrop-blur-sm"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} className="h-5 w-5text-cream" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-cream-dark">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-semiboldtext-cream">
                  {t.name} &mdash; {t.city}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-cream font-semibold hover:text-cream transition-colors"
            >
              Read All Reviews
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES PREVIEW ===== */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-wood-dark sm:text-4xl">
              Tips &amp; Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-wood-light">
              Expert advice on deck care, stain selection, and seasonal maintenance
              from our team.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLE_TEASERS.map((a) => (
              <article
                key={a.slug}
                className="group rounded-xl border border-forest-light/20 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-terracotta/40"
              >
                <h3 className="font-serif text-lg font-semibold text-wood-dark group-hover:text-terracotta transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">
                  {a.excerpt}
                </p>
                <Link
                  href={`/articles/${a.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-terracotta hover:text-terra-dark transition-colors"
                >
                  Read Article
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center text-terracotta font-semibold hover:text-terra-dark transition-colors"
            >
              View All Articles
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <ContactCTA />
    </>
  );
}
