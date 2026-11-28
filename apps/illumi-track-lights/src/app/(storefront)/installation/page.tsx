import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { REGION_INTRO, INSTALL_CITIES } from "@/lib/installation";
import { kits } from "@/lib/kits";
import { photo } from "@/lib/photos";
import { BRAND, POSTAL_ADDRESS, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/installation`;
const TITLE = "Permanent Light Installation, Ontario";
const DESCRIPTION =
  "Permanent track lighting installation by our own crew in Woodstock, London, Kitchener-Waterloo and nearby. Free on-site measurement and a 5-year parts warranty.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: `Permanent Lighting Installation in Southwestern Ontario | ${BRAND.name}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: [photo("home-install").src]
  },
  twitter: { card: "summary_large_image", title: "Permanent Lighting Installation in Southwestern Ontario", description: DESCRIPTION }
};

const INCLUDED: { title: string; body: string }[] = [
  {
    title: "A free measurement at the house",
    body: "We measure each side you want lit and send an itemized quote. You decide after you have read it."
  },
  {
    title: "Track matched to your trim",
    body: "The same aluminum track that ships in the kits, mounted under the soffit or along the fascia in the closest of the four colours."
  },
  {
    title: "The app set up for you",
    body: "We put the controller on your WiFi and save a warm white for everyday, plus the holiday and game-day colours you ask for."
  },
  {
    title: "Wiring that is sealed and out of sight",
    body: "Cable runs are concealed and the connections are weather-sealed. Longer runs get power injection so the far end is as bright as the near end."
  },
  {
    title: "A walkthrough before we leave",
    body: "We show everyone in the house how to run the lights, so nobody has to work it out alone later."
  },
  {
    title: "The same 5-year warranty",
    body: "The parts carry the warranty that covers every kit we ship, and the support comes from the same shop."
  }
];

export default function InstallationPage() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Permanent LED track lighting installation",
    name: "Permanent track lighting installation in Southwestern Ontario",
    description: DESCRIPTION,
    url: PAGE_URL,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#installer`,
      name: BRAND.name,
      url: SITE_URL,
      email: BRAND.email,
      address: POSTAL_ADDRESS
    },
    areaServed: [...INSTALL_CITIES.map((c) => c.city), "London"].map((name) => ({ "@type": "City", name: `${name}, Ontario` }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <PageHero
        compact
        photo="home-install"
        photoAlt="Permanent LED track lighting installed along the soffit of a two-storey home in Southwestern Ontario"
        eyebrow="Installation by our crew"
        title="Permanent lighting installation in Southwestern Ontario"
        intro="The same 12V track lighting we sell as a kit, put up by our own crew. It starts with a free measurement at your house."
        crumbs={[{ label: "Installation" }]}
      />

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-3xl space-y-4 text-[1.0625rem] text-[var(--color-text-soft)]">
            <p>
              <strong className="text-[var(--color-text)]">Short answer:</strong> if you live in or near one of the towns below, or in London, we will measure for free, quote the job and install it ourselves.
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Long answer:</strong> {REGION_INTRO}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">Where we install</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
            Each town has its own page. We also install in London and in the smaller places between these.
          </p>
          <ul className="mx-auto mt-8 grid max-w-5xl gap-x-10 md:grid-cols-2">
            {INSTALL_CITIES.map((c) => (
              <li key={c.slug} className="border-t border-[var(--color-border)]">
                <Link href={`/installation/${c.slug}`} className="group block py-4">
                  <span className="font-display block text-[1.2rem] group-hover:underline">Installation in {c.city}</span>
                  <span className="mt-1 block text-[0.95rem] leading-relaxed text-[var(--color-text-soft)]">{c.localAngle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <h2 className="font-display h2-fluid track-title">What an install includes</h2>
          <div className="mx-auto mt-9 grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-[1.2rem]">{item.title}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-[var(--color-text-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display h2-fluid">What it costs installed</h2>
            <p className="mt-3 max-w-2xl text-[var(--color-text-soft)]">
              A guide for our own crew, with the kit included. Ladders, corners and second storeys move the number, and the quote after the site visit is the real one.
            </p>
            <div className="mt-6 overflow-x-auto border border-[var(--color-border)]">
              <table className="table-clean min-w-[26rem]">
                <caption className="sr-only">Typical installed price range by length of roofline</caption>
                <thead>
                  <tr>
                    <th scope="col">Roofline lit</th>
                    <th scope="col">Installed, kit included</th>
                    <th scope="col">Typical house</th>
                  </tr>
                </thead>
                <tbody>
                  {kits.map((k) => (
                    <tr key={k.slug}>
                      <th scope="row" className="font-semibold">{k.feet} ft</th>
                      <td>{formatCad(k.installedLow, 0)} to {formatCad(k.installedHigh, 0)}</td>
                      <td>{k.suits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note mt-6">
              <strong>Outside our area?</strong> The kit ships free anywhere in Canada and you can <Link href="/how-it-works" className="text-link">install it yourself</Link>, or we can <Link href="/installers" className="text-link">connect you with an installer</Link>. To see how dealer brands sell installation, read <Link href="/brands" className="text-link">the brand comparison</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display h2-fluid">Ask for a measurement</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">
              Tell us your town and roughly how much roofline you want lit. We reply within one business day to book the visit.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact-us" className="btn-primary">Request a quote</Link>
              <Link href="/diy-kits" className="btn-secondary">Or shop the kits</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
