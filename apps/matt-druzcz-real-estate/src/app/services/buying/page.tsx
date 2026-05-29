import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buy a Home in London, Ontario — Matt Druzcz, Realtor",
  description:
    "Find the right home at the right price with Matt Druzcz. Deep local market knowledge, skilled negotiation, and honest advice for buyers in London, Aylmer, St. Thomas & Woodstock, ON.",
  openGraph: {
    title: "Buy a Home in London, Ontario — Matt Druzcz",
    description:
      "Expert buyer representation across SW Ontario. Local knowledge, honest advice, strong negotiation.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Home Buying Services",
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
};

const CheckIcon = () => (
  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function BuyingPage() {
  const buyerTypes = [
    {
      title: "First-Time Buyers",
      body: "Buying your first home can feel overwhelming. Matt slows it down, explains every step, and makes sure you get into the right home at the right price — without surprises.",
    },
    {
      title: "Upsizing Families",
      body: "Growing out of your current home? Matt helps you time the sell and buy to minimise carrying costs and stress, finding space that fits your family's next chapter.",
    },
    {
      title: "Downsizers",
      body: "Simplifying your life without sacrificing quality. Matt helps you find the right smaller home — one that matches your lifestyle and frees up equity for what matters.",
    },
    {
      title: "Relocating Buyers",
      body: "Moving to London or surrounding areas from out of town? Matt's neighbourhood-by-neighbourhood knowledge helps you make a confident decision, even remotely.",
    },
  ];

  const process = [
    { step: "01", title: "Pre-Approval Guidance", detail: "Matt connects you with trusted mortgage professionals to get pre-approved and understand your real buying power before you start looking." },
    { step: "02", title: "Needs Assessment", detail: "A straight conversation about what you actually need vs. want, your timeline, budget, and which neighbourhoods make sense for your situation." },
    { step: "03", title: "Property Search", detail: "MLS listings plus off-market opportunities through Matt's network. You'll see properties that match your criteria — not just everything available." },
    { step: "04", title: "Property Walkthrough", detail: "Matt's contractor background means he looks at properties differently. He flags real issues, spots hidden potential, and gives you honest feedback." },
    { step: "05", title: "Offer & Negotiation", detail: "Crafting a compelling offer and negotiating strategically to get you the best price and terms — protecting your interests every step." },
    { step: "06", title: "Conditions & Closing", detail: "Navigating inspections, conditions, and closing requirements with clear communication. You'll never be left wondering what happens next." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-36 pb-20 relative" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 30% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Buy a Home</p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Find the Right Home at{" "}
            <span style={{ color: "var(--gold)" }}>the Right Price</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--cream-muted)" }}>
            Whether it&apos;s your first home or your next one, Matt brings local expertise, honest guidance, and skilled
            negotiation to help you make the smartest decision possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="px-6 py-3.5 rounded-full font-bold text-sm text-center transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}>
              Start My Home Search
            </Link>
            <a href="tel:+15198786735" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}>
              (519) 878-6735
            </a>
          </div>
        </div>
      </section>

      {/* Buyer types */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Who I Help</p>
          <h2 className="font-serif text-4xl font-bold mb-10" style={{ color: "var(--cream)" }}>Every Type of Buyer</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {buyerTypes.map(b => (
              <div key={b.title} className="p-7 rounded-2xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
                <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "var(--gold)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>The Process</p>
          <h2 className="font-serif text-4xl font-bold mb-12" style={{ color: "var(--cream)" }}>How Buying Works With Matt</h2>
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

      {/* Why Matt advantage */}
      <section className="py-20" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Buyer Advantage</p>
            <h2 className="font-serif text-3xl font-bold mb-6" style={{ color: "var(--cream)" }}>Matt Sees What Others Miss</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--cream-muted)" }}>
              Ten years as a contractor means Matt walks through a property with a completely different set of eyes.
              He spots structural concerns, estimates renovation scope, identifies red flags that a general inspection
              might miss — and translates all of that into negotiation leverage for you.
            </p>
            <ul className="space-y-3">
              {[
                "Identifies deferred maintenance and real repair costs",
                "Spots renovation potential others overlook",
                "Negotiates using condition-based leverage",
                "Access to trusted inspectors, lawyers, and mortgage brokers",
              ].map(pt => (
                <li key={pt} className="flex items-start gap-3 text-sm" style={{ color: "var(--cream-muted)" }}>
                  <span style={{ color: "var(--gold)" }}><CheckIcon /></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.03) 100%)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <div className="font-serif text-5xl font-bold mb-2" style={{ color: "var(--gold)" }}>200+</div>
            <p className="text-sm mb-8" style={{ color: "var(--cream-muted)" }}>Homes bought and sold across SW Ontario</p>
            <Link href="/contact" className="inline-block px-6 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}>
              Start My Search →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
