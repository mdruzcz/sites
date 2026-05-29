import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

const cities: Record<string, {
  name: string;
  province: string;
  nickname: string;
  description: string;
  marketOverview: string;
  buyerHighlights: string[];
  sellerHighlights: string[];
  investorHighlights: string[];
  neighbourhoods: string[];
  img: string;
}> = {
  "london-ontario": {
    name: "London",
    province: "Ontario",
    nickname: "The Forest City",
    description: "London is Ontario's seventh-largest city and one of SW Ontario's most dynamic real estate markets.",
    marketOverview:
      "London's real estate market benefits from diverse economic drivers: Western University, London Health Sciences Centre, and a growing tech and innovation sector. Demand is consistent across all property types — from established Old South heritage homes to new east-end developments. Rental demand is among the highest in the region, driven by students, healthcare workers, and a growing professional population.",
    buyerHighlights: [
      "Diverse neighbourhoods to suit every lifestyle and budget",
      "Strong long-term appreciation across established areas",
      "Excellent schools, parks, and urban amenities",
      "Access to major highways and proximity to Toronto",
    ],
    sellerHighlights: [
      "Deep buyer pool across all price points",
      "Strong demand in established neighbourhoods like Old South and Byron",
      "Professional staging and photography to maximise your sale price",
      "Marketing that reaches both local and out-of-town buyers",
    ],
    investorHighlights: [
      "One of Ontario's strongest rental markets",
      "Student and medical worker demand drives consistent occupancy",
      "Multi-family opportunities in east-end neighbourhoods",
      "BRRRR potential in established areas with deferred maintenance",
    ],
    neighbourhoods: ["Old South", "Byron", "Masonville", "East London", "White Oaks", "Wortley Village"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
  },
  "aylmer-ontario": {
    name: "Aylmer",
    province: "Ontario",
    nickname: "Elgin County's Gem",
    description: "Aylmer is a charming Elgin County town attracting buyers who want space, community, and value.",
    marketOverview:
      "Aylmer has long been known for its deep community roots and quiet, family-friendly streets. In recent years, it's become increasingly attractive to buyers priced out of London and St. Thomas — bringing rising demand to a market that still offers genuine value. Properties here tend to hold value well, and the town's sense of community keeps turnover low.",
    buyerHighlights: [
      "Affordable entry points relative to larger cities",
      "Strong community character and family-friendly environment",
      "Attractive to buyers seeking more space for their budget",
      "Growing demand supports long-term value appreciation",
    ],
    sellerHighlights: [
      "Increasing buyer interest from London and St. Thomas",
      "Low inventory creating strong conditions for sellers",
      "Matt's local network for motivated buyers",
      "Honest pricing that attracts serious offers quickly",
    ],
    investorHighlights: [
      "Below-market entry prices relative to rental income",
      "Growing population supports demand",
      "Renovation opportunities in older housing stock",
      "Positioned to benefit from regional appreciation",
    ],
    neighbourhoods: ["Downtown Aylmer", "Talbot Street", "Elm Street Corridor", "North Aylmer"],
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80",
  },
  "st-thomas-ontario": {
    name: "St. Thomas",
    province: "Ontario",
    nickname: "The Railway City",
    description: "St. Thomas is one of SW Ontario's most exciting markets, with major economic investment incoming.",
    marketOverview:
      "The announcement of the Volkswagen EV battery plant — the largest automotive investment in Canadian history — has put St. Thomas squarely on investors' radars. The plant is expected to bring thousands of direct and indirect jobs, driving housing demand significantly. Home prices remain accessible compared to London, but the window for buyers and investors to get in ahead of this growth is narrowing.",
    buyerHighlights: [
      "Accessible prices compared to London — more home for your budget",
      "Major economic investment incoming — buy before the appreciation wave",
      "Highway 401 access for commuters",
      "Strong community feel with urban amenities",
    ],
    sellerHighlights: [
      "Rising buyer demand from investors and relocating workers",
      "Strong appreciation trend supporting your asking price",
      "Professional marketing reaching motivated, informed buyers",
      "Positioned to attract both local and out-of-town buyers",
    ],
    investorHighlights: [
      "Ground-floor opportunity before VW plant jobs arrive",
      "Strong expected appreciation over next 5 years",
      "Rental demand growing ahead of major employment influx",
      "Still some of the best cap rates in SW Ontario",
    ],
    neighbourhoods: ["Downtown St. Thomas", "Lynhurst", "Valleyview", "Elgin Mall Area", "Applewood"],
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80",
  },
  "woodstock-ontario": {
    name: "Woodstock",
    province: "Ontario",
    nickname: "The Friendly City",
    description: "Woodstock is Oxford County's commercial hub — solid value and strong rental demand.",
    marketOverview:
      "Woodstock punches above its weight for real estate value. Its location at the intersection of Highways 401 and 403 makes it a natural hub for commuters and businesses alike. The city has seen steady population growth, and its rental market is supported by a diverse employment base including manufacturing, logistics, and healthcare. For investors, Woodstock offers some of the best yield-to-price ratios in the region.",
    buyerHighlights: [
      "Competitive prices with strong long-term fundamentals",
      "Excellent highway access to London, Hamilton, and Toronto",
      "Strong employment base across multiple sectors",
      "Family-friendly community with good schools and amenities",
    ],
    sellerHighlights: [
      "Growing buyer pool from the broader SW Ontario region",
      "Infrastructure and population growth supporting demand",
      "Professional preparation and marketing to stand out",
      "Access to both local buyers and commuter-oriented buyers",
    ],
    investorHighlights: [
      "Strong rental yields compared to larger cities",
      "Manufacturing and logistics sector drives rental demand",
      "Multi-family properties with attractive cap rates",
      "Renovation opportunities in established neighbourhoods",
    ],
    neighbourhoods: ["Downtown Woodstock", "Pittock", "North Woodstock", "Huron Park", "Southside"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80",
  },
  "belmont-ontario": {
    name: "Belmont",
    province: "Ontario",
    nickname: "Elgin County Village",
    description: "Belmont is a peaceful Elgin County village — and where Matt calls home.",
    marketOverview:
      "Belmont is a small village just south of London that offers something increasingly rare: space, quiet, and community. Matt lives here with his family, and he understands exactly why buyers choose this area — and what to look for when they do. Properties in Belmont and the surrounding rural Elgin County offer genuine value for buyers seeking a different pace of life within easy reach of London.",
    buyerHighlights: [
      "Peaceful village setting within easy reach of London",
      "More space for your dollar compared to urban properties",
      "Strong community character and rural charm",
      "Matt lives here — local knowledge doesn't get more personal",
    ],
    sellerHighlights: [
      "Growing buyer interest from London families seeking space",
      "Matt's personal knowledge of the community and its buyers",
      "Targeted marketing to the right buyer profile",
      "Honest, realistic pricing for the rural market",
    ],
    investorHighlights: [
      "Underserved market with limited inventory",
      "Long-term rental demand from rural commuters",
      "Renovation and land development opportunities",
      "Access through Matt's contractor network",
    ],
    neighbourhoods: ["Belmont Village", "Elgin County Rural", "Surrounding Township Properties"],
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&auto=format&fit=crop&q=80",
  },
};

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  return Object.keys(cities).map(city => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = cities[city];
  if (!data) return {};
  return {
    title: `Realtor in ${data.name}, ${data.province} — Matt Druzcz`,
    description: `Buy, sell, or invest in ${data.name}, ${data.province} with Matt Druzcz — trusted local realtor with deep market knowledge. ${data.description}`,
    openGraph: {
      title: `Real Estate in ${data.name}, ${data.province} — Matt Druzcz`,
      description: `${data.description} Honest advice, expert negotiation, real results.`,
    },
    alternates: { canonical: `https://www.mattdruzcz.ca/areas/${city}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = cities[city];
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Real Estate Services in ${data.name}, ${data.province}`,
    provider: {
      "@type": "RealEstateAgent",
      name: "Matt Druzcz",
      telephone: "+15198786735",
      url: "https://www.mattdruzcz.ca",
    },
    areaServed: {
      "@type": "City",
      name: data.name,
      containedInPlace: { "@type": "AdministrativeArea", name: data.province },
    },
    description: data.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section
        className="pt-36 pb-24 relative"
        style={{
          background: `linear-gradient(to bottom, rgba(10,15,30,0.8) 0%, rgba(10,15,30,0.9) 100%), url('${data.img}') center/cover`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 relative">
          <Link href="/areas" className="inline-flex items-center gap-2 text-xs mb-6 hover:underline" style={{ color: "var(--gold)" }}>
            ← All Service Areas
          </Link>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            {data.nickname}
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Realtor in {data.name},{" "}
            <span style={{ color: "var(--gold)" }}>{data.province}</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--cream-muted)" }}>
            {data.description} Matt Druzcz brings deep local market knowledge and honest, results-driven real estate
            to every client in {data.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="px-6 py-3.5 rounded-full font-bold text-sm text-center transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}>
              Get a Free {data.name} Valuation
            </Link>
            <a href="tel:+15198786735" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: "rgba(240,236,227,0.35)", color: "var(--cream)" }}>
              (519) 878-6735
            </a>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            {data.name} Market
          </p>
          <h2 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--cream)" }}>
            The {data.name} Real Estate Market
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--cream-muted)" }}>
            {data.marketOverview}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--cream-muted)" }}>
            Matt has been active in {data.name} and the surrounding area throughout his career as a contractor,
            investor, and realtor. He knows the neighbourhoods, understands the value drivers, and can give you
            honest, actionable advice — whether you&apos;re buying, selling, or investing.
          </p>
        </div>
      </section>

      {/* Neighbourhoods */}
      <section className="py-20" style={{ background: "var(--navy)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Neighbourhoods
          </p>
          <h2 className="font-serif text-3xl font-bold mb-8" style={{ color: "var(--cream)" }}>
            Areas Matt Covers in {data.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.neighbourhoods.map(n => (
              <span
                key={n}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)", color: "var(--cream-muted)" }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* For buyers / sellers / investors */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-10" style={{ color: "var(--cream)" }}>
            How Matt Helps in {data.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "For Buyers", points: data.buyerHighlights, href: "/services/buying" },
              { title: "For Sellers", points: data.sellerHighlights, href: "/services/selling" },
              { title: "For Investors", points: data.investorHighlights, href: "/services/investment-properties" },
            ].map(card => (
              <div key={card.title} className="rounded-2xl p-7 flex flex-col"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
                <h3 className="font-serif text-xl font-bold mb-5" style={{ color: "var(--gold)" }}>{card.title}</h3>
                <ul className="space-y-3 flex-1 mb-6">
                  {card.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "var(--cream-muted)" }}>
                      <span className="mt-0.5" style={{ color: "var(--gold)" }}>✦</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={card.href} className="text-xs font-semibold hover:underline" style={{ color: "var(--gold)" }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "var(--navy)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Buying or selling in {data.name}?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
            Get honest, expert advice from a realtor who knows this market — and can give you a real picture of
            what your property is worth or what to offer.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}>
            Talk to Matt About {data.name} →
          </Link>
        </div>
      </section>
    </>
  );
}
