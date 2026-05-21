import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Ontario Ramp Solutions — Accessibility Experts",
  description: `Learn about Ontario Ramp Solutions — ${site.yearsExperience}+ years installing wheelchair ramps and delivering accessibility solutions to homes, businesses, and events across Ontario.`,
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "About", url: `${site.url}/about` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>About</span>
          </nav>
          <p className="eyebrow text-blue-200">About Us</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4 max-w-3xl">
            We believe access is a right, not a privilege.
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Ontario Ramp Solutions has been making Ontario more accessible for over {site.yearsExperience} years — one ramp, one entrance, one event at a time.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose-ors">
              <p className="eyebrow">Our Story</p>
              <h2>Built from a real need.</h2>
              <p>
                Ontario Ramp Solutions was founded in London, Ontario, when our team saw firsthand how often a single step — two inches of concrete — was enough to keep someone from their own front door. A family member coming home from the hospital. A business owner who couldn't serve every customer. A wedding guest waiting outside while everyone else went in.
              </p>
              <p>
                We started with residential installs in London and the surrounding area, and grew through word of mouth. Families told other families. Event planners called us after seeing our work at a wedding venue. Property managers added us to their vendor list after one installation.
              </p>
              <p>
                Today we serve the full spectrum of accessibility needs across Ontario: permanent aluminum ramp installations for homes and commercial properties, flexible rental programs for short-term needs, and event accessibility solutions that make sure every guest at every event gets through the door.
              </p>
              <p>
                We're based in London, Ontario. We travel wherever the work is.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: "Ramps Installed", value: site.stats.rampsInstalled, desc: "Across Ontario" },
                { label: "Events Served", value: site.stats.eventsServed, desc: "Weddings, festivals, corporate" },
                { label: "Cities Reached", value: site.stats.citiesServed, desc: "Province-wide" },
                { label: "Years of Experience", value: `${site.stats.yearsInBusiness}+`, desc: "Based in London, ON" },
              ].map((stat) => (
                <div key={stat.label} className="card p-6 card-accented flex items-center gap-5">
                  <div className="text-3xl sm:text-4xl font-extrabold gradient-text leading-none shrink-0 w-20">
                    {stat.value}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{stat.label}</p>
                    <p className="text-sm text-muted">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">Our Values</p>
            <h2 className="h-display text-3xl sm:text-4xl text-gray-900">How we work.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-8 text-center card-accented">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{v.title}</h3>
                <p className="text-muted-strong text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

const values = [
  {
    title: "Access Is Non-Negotiable",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    text: "We don't treat accessibility as a compliance checkbox. It's the reason we show up. Every ramp we build or deliver is designed to give someone back their independence.",
  },
  {
    title: "Honest, Transparent Quotes",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    text: "No surprises. We measure your site, explain exactly what we're installing and why, and put everything in writing before we start. What you're quoted is what you pay.",
  },
  {
    title: "Responsive When It Matters",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Hospital discharges don't wait for next-week availability. Event setups don't get a rain delay. When the situation is urgent, we move fast — and we communicate throughout.",
  },
];
