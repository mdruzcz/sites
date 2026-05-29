import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sell Your Home in London, Ontario — Matt Druzcz, Realtor",
  description:
    "Sell your home for more with Matt Druzcz. Expert pricing, professional staging, proven negotiation — serving London, Aylmer, St. Thomas & Woodstock, Ontario. No middlemen.",
  openGraph: {
    title: "Sell Your Home in London, Ontario — Matt Druzcz",
    description:
      "From pricing to possession, Matt handles everything to get you the best price for your home in SW Ontario.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Home Selling Services",
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
  description: "Full-service home selling: pricing strategy, staging, photography, marketing, negotiation, and closing.",
};

const CheckIcon = () => (
  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function SellingPage() {
  const process = [
    { step: "01", title: "Free Home Valuation", detail: "Matt walks your property, reviews comparable sales, and gives you an honest market value — not an inflated number to win your listing." },
    { step: "02", title: "Preparation Strategy", detail: "Staging advice, minor repairs, professional photography, and decluttering coordination to make your home shine." },
    { step: "03", title: "Pricing & Listing", detail: "Strategic pricing to attract qualified buyers and generate competitive offers. MLS listing, online marketing, and open house coordination." },
    { step: "04", title: "Offer Management", detail: "Matt reviews every offer with you, explains the terms clearly, and negotiates hard to get you the best possible outcome." },
    { step: "05", title: "Closing Coordination", detail: "From accepted offer to closing day, Matt manages the paperwork, deadlines, and any issues that arise — so you can focus on your next chapter." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-36 pb-20 relative" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 70% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Sell Your Home</p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Together We Can Sell Your Home for{" "}
            <span style={{ color: "var(--gold)" }}>More</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--cream-muted)" }}>
            Selling your home is a major financial event. Matt brings the strategy, marketing, and negotiation skills
            to get you the best possible result — with full transparency and zero hand-offs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="px-6 py-3.5 rounded-full font-bold text-sm text-center transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}>
              Get a Free Home Valuation
            </Link>
            <a href="tel:+15198786735" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}>
              (519) 878-6735
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>What's Included</p>
            <h2 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--cream)" }}>Everything You Need to Sell for Top Dollar</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
              Matt coordinates everything — from the first walkthrough to the final signature — so you get a smooth,
              profitable sale without the stress.
            </p>
            <ul className="space-y-3">
              {[
                "Comprehensive market analysis and honest pricing",
                "Professional staging advice and coordination",
                "Professional photography and virtual tour",
                "MLS listing and targeted digital marketing",
                "Open house hosting and buyer feedback collection",
                "Skilled offer negotiation",
                "Coordination of inspections and conditions",
                "Full closing support and paperwork management",
              ].map(pt => (
                <li key={pt} className="flex items-start gap-3 text-sm" style={{ color: "var(--cream-muted)" }}>
                  <span style={{ color: "var(--gold)" }}><CheckIcon /></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--gold)" }}>Family Home Sales</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>
                Homes accumulate wear over time. With Matt&apos;s trusted network of painters, cleaners, and photographers,
                your home will look its absolute best — and he covers the cost if the work doesn&apos;t meet standard.
              </p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--gold)" }}>Bungalow Sales</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>
                Having sold 100+ bungalows, Matt understands the unique challenges of older homes. He proactively
                identifies issues, coordinates repairs, and positions the property to sell clean.
              </p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--gold)" }}>Probate & Estate Sales</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>
                Estate sales require sensitivity and expertise. Matt handles the property preparation, legal coordination,
                and marketing to get the best outcome during a difficult time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>The Process</p>
          <h2 className="font-serif text-4xl font-bold mb-12" style={{ color: "var(--cream)" }}>How It Works</h2>
          <div className="space-y-5">
            {process.map(p => (
              <div key={p.step} className="flex gap-6 p-6 rounded-2xl items-start"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-serif text-sm font-bold"
                  style={{ background: "rgba(201,168,76,0.12)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  {p.step}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--cream)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            What&apos;s your home worth?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
            Get an honest valuation from someone who knows the market — and will tell you the truth.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}>
            Request a Free Valuation →
          </Link>
        </div>
      </section>
    </>
  );
}
