import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate Services — Buying, Selling & Investment Properties",
  description:
    "Matt Druzcz offers full real estate services in London, Aylmer, St. Thomas & Woodstock, ON: home buying, selling, property flipping, and long-term rental investment.",
  openGraph: {
    title: "Real Estate Services — Matt Druzcz, London Ontario",
    description:
      "Buying, selling, flipping, or renting — Matt provides expert real estate services across Southwestern Ontario.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Real Estate Services — Matt Druzcz",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Sell Your Home", url: "https://www.mattdruzcz.ca/services/selling" },
    { "@type": "ListItem", position: 2, name: "Buy a Home", url: "https://www.mattdruzcz.ca/services/buying" },
    { "@type": "ListItem", position: 3, name: "Investment Properties", url: "https://www.mattdruzcz.ca/services/investment-properties" },
  ],
};

const services = [
  {
    href: "/services/selling",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Sell Your Home",
    tagline: "Maximum value. Minimum stress.",
    description:
      "From pricing strategy and professional staging to skilled negotiation, Matt handles every detail to get you the best outcome — with full transparency throughout.",
    highlights: [
      "Competitive pricing strategy backed by data",
      "Professional staging and photography",
      "Targeted MLS + digital marketing",
      "Expert negotiation to maximise your sale price",
      "Experience with family homes, bungalows & estate sales",
    ],
    cta: "Learn About Selling",
  },
  {
    href: "/services/buying",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Buy a Home",
    tagline: "Find the right home at the right price.",
    description:
      "Whether it's your first home or your fifth, Matt's deep local knowledge and straight-shooting advice help you make smart decisions and avoid costly mistakes.",
    highlights: [
      "Local market intelligence across 4 communities",
      "Access to off-market and pre-list opportunities",
      "Neighbourhood-by-neighbourhood comparisons",
      "Skilled negotiation — you keep more money",
      "Full support from pre-approval to possession day",
    ],
    cta: "Learn About Buying",
  },
  {
    href: "/services/investment-properties",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Investment Properties",
    tagline: "Build wealth through real estate.",
    description:
      "As an investor himself, Matt understands what makes a deal work. Whether you're flipping your first property or expanding a rental portfolio, he brings contractor insight and financial expertise to the table.",
    highlights: [
      "Property flipping: ARV analysis and renovation cost estimates",
      "Long-term rental: cash flow and cap rate guidance",
      "BRRRR strategy expertise",
      "Single-family and multi-family opportunities",
      "Network of off-market deals",
    ],
    cta: "Learn About Investing",
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-36 pb-20 relative" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 30% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Services</p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Full-Service Real Estate
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--cream-muted)" }}>
            Whether you&apos;re buying, selling, flipping, or building a rental portfolio — Matt brings a contractor&apos;s
            eye, an investor&apos;s instincts, and a realtor&apos;s licensing to every deal.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {services.map((s, i) => (
            <div
              key={s.href}
              className="rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-start"
              style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
            >
              <div>
                <div className="mb-5" style={{ color: "var(--gold)" }}>{s.icon}</div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                  0{i + 1}
                </p>
                <h2 className="font-serif text-3xl font-bold mb-2" style={{ color: "var(--cream)" }}>{s.title}</h2>
                <p className="text-sm mb-4 italic" style={{ color: "var(--gold-light)" }}>{s.tagline}</p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--cream-muted)" }}>{s.description}</p>
                <Link
                  href={s.href}
                  className="inline-block px-6 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: "var(--gold)", color: "#0A0F1E" }}
                >
                  {s.cta} →
                </Link>
              </div>
              <ul className="space-y-3 pt-2">
                {s.highlights.map(h => (
                  <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "var(--cream-muted)" }}>
                    <span style={{ color: "var(--gold)" }}><CheckIcon /></span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="py-20" style={{ background: "var(--navy)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            The Difference
          </p>
          <h2 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--cream)" }}>
            Why Matt Is Different
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--cream-muted)" }}>
            Most realtors haven&apos;t swung a hammer, reviewed a renovation quote, or run the numbers on a rental
            property. Matt has done all three — and that experience translates into better outcomes for every client.
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--cream-muted)" }}>
            When you work with Matt, you get direct access to someone who understands the full picture: market value,
            renovation potential, carrying costs, and negotiation leverage.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
