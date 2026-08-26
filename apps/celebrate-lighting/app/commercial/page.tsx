import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceLines } from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `Commercial & Municipal Lighting | ${site.name}` },
  description:
    "Commercial and municipal lighting across Southwestern Ontario — parks, downtown streetscapes, light shows, charity events, retail frontages and civic buildings. Insured, WSIB.",
  alternates: { canonical: "/commercial" },
  openGraph: {
    title: `Commercial & Municipal Lighting | ${site.name}`,
    description:
      "Parks, municipalities, BIAs, drive-through light shows, charity fundraisers, retail plazas and civic buildings. Seasonal or permanent.",
    url: `${site.url}/commercial`,
    images: [{ url: "/images/gallery-1.jpg", alt: "Municipal park trees wrapped in seasonal lighting by Celebrate Lighting" }],
  },
};

const KEYWORD_GROUPS = [
  {
    heading: "Public & municipal",
    items: ["Municipal parks", "Downtown & BIA streetscapes", "Civic buildings & town halls", "Arenas & community centres", "Conservation areas", "Boulevard & lamp-standard lighting"],
  },
  {
    heading: "Events & fundraising",
    items: ["Drive-through light shows", "Festival of lights", "Charity & hospice fundraisers", "Service-club displays", "Santa Claus parades", "Tree lightings & winter markets"],
  },
  {
    heading: "Business & retail",
    items: ["Retail plazas & storefronts", "Car dealerships", "Restaurants & patios", "Office parks & industrial", "Hotels & hospitality", "Multi-site & franchise rollouts"],
  },
];

export default function CommercialHubPage() {
  const lines = getServiceLines();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Commercial & Municipal", url: `${site.url}/commercial` },
            ]),
          ),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-4.jpg"
            alt="Commercial streetscape hedging lit for the season by Celebrate Lighting in Woodstock, Ontario"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 night-veil" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <nav className="text-sm text-[#93a1b8] mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Commercial &amp; Municipal</span>
            </nav>
            <p className="section-eyebrow mb-5">Commercial, Municipal &amp; Events</p>
            <h1 className="font-display text-[2.3rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-6 text-balance">
              Lighting for Parks, Main Streets and Events
            </h1>
            <p className="text-lg text-[#c7d2e1] leading-relaxed mb-9 max-w-2xl">
              Two ways to light a commercial or public property: a seasonal display installed and removed each
              year, or a permanent system that stays up and changes colour on demand. Both fully insured, WSIB
              covered, and scoped to hit your opening date.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/seasonal-lighting/commercial" className="btn btn-gold text-base px-8">
                Seasonal &amp; event lighting
              </Link>
              <Link href="/permanent-lighting/commercial" className="btn btn-primary text-base px-8">
                Permanent architectural
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-20 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Which one fits the site?</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Seasonal or permanent
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {lines.map((line) => {
              const isSeasonal = line.slug === "seasonal-lighting";
              const accent = isSeasonal ? "var(--gold)" : "var(--accent)";
              return (
                <div key={line.slug} className="card p-7 flex flex-col" style={{ borderTop: `3px solid ${accent}` }}>
                  <h3 className="font-display text-2xl font-bold text-[var(--foreground)] mb-3">
                    {isSeasonal ? "Seasonal & Event" : "Permanent Architectural"}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                    {isSeasonal
                      ? "Installed in the fall, serviced through the season, removed and stored on your schedule. Right for displays tied to a date — parks, streetscapes, light shows, parades and fundraisers."
                      : "One install that stays up year-round and changes colour from an app. Right for properties that want to be lit more than a few weeks a year — plazas, dealerships, civic buildings, office parks."}
                  </p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {line.commercial.segments.slice(0, 4).map((s) => (
                      <li key={s.title} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                        <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${line.slug}/commercial`}
                    className="btn w-full justify-center mt-auto"
                    style={{ background: accent, color: "#04121a" }}
                  >
                    {isSeasonal ? "Seasonal commercial lighting" : "Permanent commercial lighting"} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE LIGHT — keyword coverage */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">What we light</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance">
              Properties and projects we take on
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {KEYWORD_GROUPS.map((g) => (
              <div key={g.heading} className="card p-7">
                <h3 className="font-bold text-[var(--foreground)] mb-4">{g.heading}</h3>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                      <svg className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <circle cx="10" cy="10" r="4" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: "var(--deep)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-5 text-balance">
            Tell us the site and the date.
          </h2>
          <p className="text-[#c7d2e1] leading-relaxed mb-8">
            If you&apos;re working to a fixed budget, say the number — we&apos;ll design to it and show you what
            each additional zone would add. Insurance certificates and WSIB clearance on request.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/seasonal-lighting/commercial#commercial-quote" className="btn btn-gold px-8">
              Request a commercial quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-white px-8">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
