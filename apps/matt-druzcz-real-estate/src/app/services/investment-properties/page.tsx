import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investment Properties — Property Flipping & Rentals in London, Ontario",
  description:
    "Matt Druzcz helps investors flip properties, build rental portfolios, and grow wealth through real estate in London, St. Thomas, Aylmer & Woodstock, ON. Contractor background = real renovation insight.",
  openGraph: {
    title: "Investment Properties — Flipping & Rentals in SW Ontario",
    description:
      "Former contractor + licensed realtor + personal investor. Matt Druzcz helps you find, analyse, and close investment deals that actually make sense.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Investment Property Services",
  provider: {
    "@type": "RealEstateAgent",
    name: "Matt Druzcz",
    telephone: "+15198786735",
    url: "https://www.mattdruzcz.ca",
  },
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "City", name: "St. Thomas" },
    { "@type": "City", name: "Aylmer" },
    { "@type": "City", name: "Woodstock" },
  ],
  description:
    "Property flipping analysis, long-term rental guidance, and multi-family investment services across Southwestern Ontario.",
};

const CheckIcon = () => (
  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function InvestmentPropertiesPage() {
  const strategies = [
    {
      title: "Property Flipping",
      subtitle: "Buy low. Renovate smart. Sell high.",
      description:
        "After 10+ years as a contractor and multiple flips of my own, I know exactly how to assess a property's potential — and its pitfalls. I help investors find undervalued properties, estimate renovation costs accurately, calculate the ARV, and close at the right price to make the deal work.",
      points: [
        "After Repair Value (ARV) analysis",
        "Accurate renovation cost estimates — from someone who's done the work",
        "Identifying undervalued or distressed properties",
        "Negotiating acquisition price to protect your margin",
        "Trusted trades network for renovations",
        "Exit strategy planning for maximum profit",
      ],
    },
    {
      title: "Long-Term Rentals",
      subtitle: "Buy and hold for steady cash flow.",
      description:
        "A good rental property is a long-term wealth-building machine — when the numbers are right. I help you identify properties with solid cash-flow potential, analyse cap rates and gross yield, and avoid the common traps that turn rental investments into money pits.",
      points: [
        "Cash flow and cap rate analysis",
        "Identifying high-demand rental neighbourhoods",
        "Evaluating tenant-in-place properties",
        "Single-family and multi-family opportunities",
        "Understanding landlord rights and responsibilities in Ontario",
        "Long-term portfolio growth strategy",
      ],
    },
    {
      title: "BRRRR Strategy",
      subtitle: "Buy, Rehab, Rent, Refinance, Repeat.",
      description:
        "The BRRRR strategy is one of the most powerful ways to build a real estate portfolio quickly — and one that requires a realtor who understands both the renovation and the financing sides. Having been a contractor and investor myself, I can guide you through each step.",
      points: [
        "Identifying BRRRR-eligible properties",
        "Renovation planning and scope management",
        "After-renovation valuation strategy for refinancing",
        "Tenanting the property at market rate",
        "Refinancing support and lender connections",
        "Portfolio recycling to scale your holdings",
      ],
    },
  ];

  const edgePoints = [
    {
      title: "Contractor's Eye",
      body: "I can walk through a property and give you a realistic renovation estimate before we ever put in an offer. That number can make or break a deal.",
    },
    {
      title: "Been the Investor",
      body: "I've bought, renovated, rented, and sold properties in this market. I know what the numbers need to look like — and when to walk away.",
    },
    {
      title: "Finance Background",
      body: "I understand how mortgages, refinancing, and cash flow interact. I can help you structure a deal that actually works financially.",
    },
    {
      title: "Network Access",
      body: "Access to off-market deals through my contractor and investor network — properties you won't find on MLS.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-36 pb-20 relative" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 60% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Investment Properties
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Build Wealth Through{" "}
            <span style={{ color: "var(--gold)" }}>Real Estate</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--cream-muted)" }}>
            Whether you&apos;re flipping your first property, building a rental portfolio, or scaling with the BRRRR
            strategy — Matt brings a former contractor&apos;s precision, a personal investor&apos;s experience, and a
            licensed realtor&apos;s access to every deal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full font-bold text-sm text-center transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}
            >
              Discuss an Investment Opportunity
            </Link>
            <a
              href="tel:+15198786735"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}
            >
              (519) 878-6735
            </a>
          </div>
        </div>
      </section>

      {/* Edge */}
      <div className="py-16" style={{ background: "var(--navy-card)", borderTop: "1px solid var(--navy-border)", borderBottom: "1px solid var(--navy-border)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-semibold tracking-widest uppercase mb-10" style={{ color: "var(--gold)" }}>
            The Matt Druzcz Advantage
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {edgePoints.map(e => (
              <div key={e.title} className="p-5 rounded-xl" style={{ background: "var(--navy)", border: "1px solid var(--navy-border)" }}>
                <h3 className="font-serif text-base font-bold mb-2" style={{ color: "var(--gold)" }}>{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategies */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Investment Strategies
          </p>
          <h2 className="font-serif text-4xl font-bold mb-12" style={{ color: "var(--cream)" }}>
            How Matt Helps Investors
          </h2>
          <div className="space-y-8">
            {strategies.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-start"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
              >
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                    Strategy 0{i + 1}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-1" style={{ color: "var(--cream)" }}>{s.title}</h3>
                  <p className="text-sm italic mb-4" style={{ color: "var(--gold-light)" }}>{s.subtitle}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{s.description}</p>
                </div>
                <ul className="space-y-3">
                  {s.points.map(p => (
                    <li key={p} className="flex items-start gap-3 text-sm" style={{ color: "var(--cream-muted)" }}>
                      <span style={{ color: "var(--gold)" }}><CheckIcon /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-20" style={{ background: "var(--navy)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Investment Markets
          </p>
          <h2 className="font-serif text-4xl font-bold mb-8" style={{ color: "var(--cream)" }}>
            Where to Invest in SW Ontario
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              {
                city: "St. Thomas, ON",
                angle: "High-growth opportunity",
                body: "The incoming Volkswagen EV plant is set to bring thousands of jobs. Properties here are still undervalued relative to where the market is heading — a window investors shouldn't miss.",
              },
              {
                city: "London, ON",
                angle: "Steady demand & strong rental market",
                body: "University, hospital, and tech sector workers create deep rental demand. Multi-family properties and BRRRR opportunities are consistent — especially in established east-end neighbourhoods.",
              },
              {
                city: "Aylmer, ON",
                angle: "Affordable entry with growth potential",
                body: "Buyers priced out of larger cities are discovering Aylmer. Entry prices remain accessible while appreciation is trending upward — making it ideal for buy-and-hold investors.",
              },
              {
                city: "Woodstock, ON",
                angle: "Strong cap rates & transit access",
                body: "Oxford County's commercial hub. Highway 401 access, growing population, and solid rental demand make Woodstock one of the best-kept secrets for cash-flow-positive rental investments.",
              },
            ].map(m => (
              <div
                key={m.city}
                className="p-6 rounded-2xl"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--gold)" }}>{m.angle}</div>
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: "var(--cream)" }}>{m.city}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%)", borderTop: "1px solid rgba(201,168,76,0.2)" }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Ready to find your next deal?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
            Tell Matt what you&apos;re looking for and he&apos;ll help you find properties that make the numbers work.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}
          >
            Start the Conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
