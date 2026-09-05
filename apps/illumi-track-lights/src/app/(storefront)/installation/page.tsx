import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { REGION_INTRO, INSTALL_CITIES } from "@/lib/installation";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = {
  title: "Permanent Lighting Installation — Southwestern Ontario",
  description:
    "Professional permanent LED soffit lighting installation across London, Woodstock and the Kitchener-Waterloo region. Free on-site measurement and 5-year warranty.",
  alternates: { canonical: `${SITE_URL}/installation` },
  openGraph: {
    title: "Permanent Lighting Installation — Southwestern Ontario",
    description:
      "Professional permanent LED soffit lighting installation across Southwestern Ontario, from Illumi Track Lights in London.",
    url: `${SITE_URL}/installation`
  }
};

const INCLUDED = [
  {
    title: "Free on-site measurement",
    body: "We measure every elevation you want lit and give you an honest, itemized quote before you commit to anything."
  },
  {
    title: "Colour-matched aluminum track",
    body: "The same weather-rated extrusion from our DIY kits, mounted under your soffit or along the fascia in the colour closest to your trim."
  },
  {
    title: "12V RGBW app control",
    body: "We configure the WiFi controller with warm-white everyday scenes plus the holiday and game-day colours you actually want."
  },
  {
    title: "Tidy, sealed wiring",
    body: "Concealed cable runs, weather-sealed connections and power injection on longer facades so brightness stays even end to end."
  },
  {
    title: "Full app walkthrough",
    body: "Before we leave the driveway, we walk the whole household through running the system so you are comfortable from day one."
  },
  {
    title: "5-year product warranty",
    body: "The identical warranty and Canadian-based support that backs every kit we ship, applied to your professional install."
  }
];

export default function InstallationPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Installation", item: `${SITE_URL}/installation` }
    ]
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Permanent LED soffit lighting installation",
    description:
      "Professional installation of permanent 12V RGBW LED soffit track lighting on residential homes across Southwestern Ontario.",
    provider: {
      "@type": "LocalBusiness",
      name: "Illumi Track Lights",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressRegion: "ON",
        addressCountry: "CA"
      }
    },
    areaServed: INSTALL_CITIES.map((c) => ({
      "@type": "City",
      name: `${c.city}, Ontario`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <PageHero
        photo="home-install"
        photoAlt="Technician installing permanent LED soffit track lighting on a Southwestern Ontario home"
        eyebrow="Professional installation"
        title="Permanent lighting installation across Southwestern Ontario"
        intro="Prefer not to climb a ladder? Our own crew installs the same 12V RGBW soffit systems we ship — free measurement, colour-matched track and a 5-year warranty."
        crumb="Installation"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{REGION_INTRO}</p>
          </div>

          {/* Cities we serve */}
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl">Cities we install in</h2>
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              Book a free on-site measurement in any of these Southwestern Ontario communities.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INSTALL_CITIES.map((c) => (
                <Link key={c.slug} href={`/installation/${c.slug}`} className="card group flex flex-col p-6">
                  <h3 className="font-display text-xl transition group-hover:text-[var(--color-amber-text)]">
                    {c.city}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--color-text-soft)]">
                    {c.localAngle}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-[var(--color-amber-text)]">
                    Installation in {c.city} →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="mx-auto mt-20 max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl">What every install includes</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display text-lg">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-text-soft)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-20 max-w-5xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-amber-soft)] p-9 text-center md:p-12">
            <h2 className="font-display text-2xl">Request an installation quote</h2>
            <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              Tell us your city and roughly how much roofline you want lit, and we will book a free on-site
              measurement and send an honest quote.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact-us" className="btn-amber">Request a quote</Link>
              <Link href="/diy-kits" className="btn-secondary">Rather DIY? Shop kits</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
