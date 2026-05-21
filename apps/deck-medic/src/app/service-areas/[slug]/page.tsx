import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, cities, services, getCityBySlug } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `${site.url}/service-areas/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${site.url}/service-areas/${city.slug}`,
      images: [{ url: "/images/Deck-Medic-Banner.png", width: 1200, height: 630, alt: `Deck restoration and staining in ${city.name}, ON by Deck Medic` }],
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Deck Restoration & Staining in ${city.name}, ON`,
    description: city.description,
    url: `${site.url}/service-areas/${city.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "ON",
      addressCountry: "CA",
    },
  };

  return (
    <>
      <Script id="ld-city" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>
        <NavBar />

        {/* Hero */}
        <section className="pt-28 pb-16 lg:pt-36 lg:pb-20" style={{ background: "var(--off-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--slate-muted)" }}>
              <Link href="/" className="hover:text-[var(--blue)] transition">Home</Link>
              <span>/</span>
              <Link href="/service-areas" className="hover:text-[var(--blue)] transition">Service Areas</Link>
              <span>/</span>
              <span style={{ color: "var(--slate)" }}>{city.name}</span>
            </nav>
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>
                Serving {city.name}, {city.region}
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
                Deck Restoration &amp; Staining in{" "}
                <span className="text-gradient-blue">{city.name}, Ontario</span>
              </h1>
              <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--slate-muted)" }}>
                {city.heroIntro}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-lg min-h-11"
                style={{ background: "var(--blue)" }}
              >
                Get a Free {city.name} Estimate
              </a>
            </div>
          </div>
        </section>

        {/* About the city */}
        <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-display text-3xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
                  Professional Deck Care in {city.name}
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--slate-muted)" }}>
                  {city.description}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--slate-muted)" }}>
                  Whether your deck needs a simple staining refresh or a full multi-day restoration, our team brings the
                  same professional standard to every {city.name} home. We understand Southern Ontario&apos;s climate and choose
                  products specifically rated for the freeze-thaw cycle, UV exposure, and humidity levels your deck faces every year.
                </p>
              </div>

              <div>
                <div className="rounded-2xl p-8 border mb-6" style={{ background: "var(--blue-pale)", borderColor: "var(--blue)" }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: "var(--slate)" }}>
                    Neighbourhoods We Serve in {city.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {city.neighbourhoods.map((n) => (
                      <span key={n} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "white", color: "var(--blue)" }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-8 border" style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: "var(--slate)" }}>Why {city.name} Homeowners Choose Deck Medic</h3>
                  <ul className="space-y-3">
                    {[
                      `Local {city.name} expertise — we know your climate and wood types`,
                      "Deep preparation — 80% of our time is on prep, not product",
                      "Weather-shield finishes rated for Southern Ontario winters",
                      "Transparent pricing, no hidden costs",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--slate-light)" }}>
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--blue)" }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item.replace("{city.name}", city.name)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services in this city */}
        <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Available in {city.name}</p>
              <h2 className="font-display text-3xl font-extrabold leading-tight" style={{ color: "var(--slate)" }}>
                Our Services in {city.name}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-xl p-6 border bg-white transition-all hover:shadow-lg hover:border-[var(--blue)]"
                  style={{ borderColor: "var(--light-grey)" }}
                >
                  <h3 className="font-semibold mb-2 group-hover:text-[var(--blue)] transition" style={{ color: "var(--slate)" }}>{s.name}</h3>
                  <p className="text-sm mb-3" style={{ color: "var(--slate-muted)" }}>{s.shortDesc}</p>
                  <span className="text-sm font-semibold" style={{ color: "var(--blue)" }}>Learn More →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section className="py-16" style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold mb-8" style={{ color: "var(--slate)" }}>Other Service Areas</h2>
            <div className="flex flex-wrap gap-3">
              {cities.filter((c) => c.slug !== city.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/service-areas/${other.slug}`}
                  className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:border-[var(--blue)] hover:text-[var(--blue)] hover:bg-[var(--blue-pale)]"
                  style={{ borderColor: "var(--light-grey)", color: "var(--slate-light)" }}
                >
                  {other.name}, ON
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <Contact />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
