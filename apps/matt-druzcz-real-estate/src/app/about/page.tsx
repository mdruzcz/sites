import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Matt Druzcz — Realtor, Investor & Former Contractor",
  description:
    "Meet Matt Druzcz — licensed realtor, experienced property investor, and former contractor serving London, Aylmer, St. Thomas & Woodstock, Ontario. Honest advice, no middlemen.",
  openGraph: {
    title: "About Matt Druzcz — Realtor, Investor & Former Contractor",
    description:
      "Licensed realtor with a contractor's eye and an investor's instincts. Serving SW Ontario with honest, results-driven real estate.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matt Druzcz",
  jobTitle: "Realtor",
  telephone: "+15198786735",
  email: "matt.druzcz@gmail.com",
  url: "https://www.mattdruzcz.ca/about",
  sameAs: [
    "https://www.facebook.com/mattdruzcz",
    "https://www.linkedin.com/in/mattdruzcz",
  ],
  knowsAbout: [
    "Residential Real Estate",
    "Property Flipping",
    "Long-Term Rentals",
    "Home Renovation",
    "Home Finance",
    "Investment Properties",
  ],
};

const CheckIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function AboutPage() {
  const values = [
    {
      title: "Honesty & Transparency",
      body: "You'll always get straight talk — on pricing, on condition, on what to expect. No fluff, no hidden fees, no surprises.",
    },
    {
      title: "Client-First Always",
      body: "Your goals drive every decision. Whether you're a first-time buyer or a seasoned investor, you get a strategy built around you.",
    },
    {
      title: "Expert Guidance",
      body: "A decade of hands-on renovation experience means I see things other agents miss — and give advice grounded in reality.",
    },
    {
      title: "Integrity & Trust",
      body: "Selling or buying a home is one of the biggest financial decisions you'll ever make. I take that seriously and act accordingly.",
    },
  ];

  const milestones = [
    { year: "Early Career", label: "10+ Years as a Contractor", detail: "Built deep expertise in home construction, renovation, and cost estimation across Southwestern Ontario." },
    { year: "Investor", label: "Built a Property Portfolio", detail: "Purchased, renovated, rented, and sold multiple properties — learning the investor side of real estate from the inside." },
    { year: "Licensed", label: "Became a Realtor", detail: "Combined hands-on property experience with formal real estate training to serve buyers, sellers, and investors." },
    { year: "Today", label: "200+ Homes Sold", detail: "Serving London, Aylmer, St. Thomas, and Woodstock with a reputation built on honest advice and real results." },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="pt-36 pb-20 relative"
        style={{ background: "var(--navy)" }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 70% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              About Matt
            </p>
            <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
              Straightforward. Honest.{" "}
              <span style={{ color: "var(--gold)" }}>Local.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--cream-muted)" }}>
              Hi — I&apos;m Matt Druzcz. I&apos;m a licensed realtor, experienced property investor, and former contractor
              serving London, Aylmer, St. Thomas, and Woodstock, Ontario.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
              My path into real estate wasn&apos;t through an office — it was through years of swinging a hammer,
              running renovation projects, and then buying and managing properties of my own. That experience shapes
              every deal I work on today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full font-bold text-sm text-center transition-all hover:opacity-90"
                style={{ background: "var(--gold)", color: "#0A0F1E" }}
              >
                Work With Matt
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

          {/* Photo placeholder */}
          <div
            className="rounded-2xl aspect-[4/5] flex items-center justify-center relative"
            style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
          >
            <div className="text-center px-8">
              <div
                className="w-28 h-28 rounded-full border-2 flex items-center justify-center font-serif text-4xl font-bold mx-auto mb-4"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                MD
              </div>
              <p className="text-sm" style={{ color: "var(--cream-muted)" }}>
                Add headshot at <code className="text-xs">/public/headshot.jpg</code>
              </p>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 rounded-tr-lg"
              style={{ borderColor: "var(--gold)" }} />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 rounded-bl-lg"
              style={{ borderColor: "var(--gold)" }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="py-10" style={{ background: "var(--navy-card)", borderTop: "1px solid var(--navy-border)", borderBottom: "1px solid var(--navy-border)" }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "200+", l: "Homes Sold" },
            { v: "10+", l: "Years as Contractor" },
            { v: "4", l: "Cities Served" },
            { v: "5★", l: "Client Satisfaction" },
          ].map(s => (
            <div key={s.l}>
              <div className="font-serif text-3xl font-bold mb-1" style={{ color: "var(--gold)" }}>{s.v}</div>
              <div className="text-sm" style={{ color: "var(--cream-muted)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>My Story</p>
          <h2 className="font-serif text-4xl font-bold mb-8" style={{ color: "var(--cream)" }}>
            From Contractor to Realtor
          </h2>
          <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--cream-muted)" }}>
            <p>
              I spent over a decade as a contractor in Southwestern Ontario — managing renovation projects,
              assessing structural issues, coordinating trades, and learning exactly what makes a home worth what
              it&apos;s worth. That background isn&apos;t just experience; it&apos;s a genuine edge for every client I work with.
            </p>
            <p>
              While I was still contracting, I started buying properties of my own. I renovated and flipped houses,
              built a portfolio of long-term rentals, and learned the investor side of real estate from the ground up.
              I know what an ARV analysis looks like, how to estimate renovation costs accurately, and how to identify
              a property where the numbers actually make sense.
            </p>
            <p>
              That combination of hands-on skills and investment thinking is what led me to get my real estate licence —
              because I realised I could offer clients something most realtors can&apos;t: a contractor&apos;s eye, an
              investor&apos;s instincts, and the licensing to handle the deal.
            </p>
            <p>
              Today I live just outside the peaceful town of Belmont with my wife and two kids. I chose this area for
              the same reasons many of my clients do: a slower pace, more space, and a strong sense of community.
              It keeps me grounded in the markets I serve and gives me a personal stake in the neighbourhoods where
              my clients are building their futures.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Background</p>
          <h2 className="font-serif text-4xl font-bold mb-12" style={{ color: "var(--cream)" }}>
            The Path Here
          </h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 rounded-2xl"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-serif text-xs font-bold"
                  style={{ background: "rgba(201,168,76,0.12)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--gold)" }}>{m.year}</div>
                  <div className="font-serif text-lg font-bold mb-2" style={{ color: "var(--cream)" }}>{m.label}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Working With Matt
          </p>
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            What You Can Expect
          </h2>
          <p className="text-base leading-relaxed mb-12" style={{ color: "var(--cream-muted)" }}>
            No assistants, no hand-offs, no runaround. When you work with Matt, you work with Matt.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              "Direct, one-on-one communication from listing to close",
              "Honest pricing — no inflated valuations to win your listing",
              "A contractor's eye for identifying issues before they become problems",
              "Investor-grade analysis for buyers building a portfolio",
              "Professional staging, photography, and marketing coordination",
              "Skilled negotiation that protects your interests every step",
              "Regular updates and clear communication throughout",
              "Trusted network of lawyers, lenders, and inspectors",
            ].map(pt => (
              <div key={pt} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
                <span style={{ color: "var(--gold)" }}><CheckIcon /></span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Values</p>
          <h2 className="font-serif text-4xl font-bold mb-12" style={{ color: "var(--cream)" }}>
            How I Operate
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(v => (
              <div
                key={v.title}
                className="p-7 rounded-2xl"
                style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}
              >
                <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "var(--gold)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Ready to make your move?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
            The first conversation is always free, always honest, and always with Matt directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 rounded-full font-semibold text-base border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
