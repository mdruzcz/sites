import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { INSTALL_CITIES } from "@/lib/installation";
import { kits } from "@/lib/kits";
import { photo } from "@/lib/photos";
import { BRAND, POSTAL_ADDRESS, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/about`;
const TITLE = "About the Shop in Woodstock, Ontario";
const DESCRIPTION =
  "Illumi Track Lights is a permanent track lighting shop in Woodstock, Ontario. We stock 12V kits and parts, ship them free in Canada and install them nearby.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("home-install").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

export default function AboutPage() {
  const feet = kits.map((k) => k.feet);
  const smallest = Math.min(...feet);
  const largest = Math.max(...feet);
  const installCities = [...INSTALL_CITIES.map((c) => c.city), "London"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${BRAND.name}`,
    url: PAGE_URL,
    description: DESCRIPTION,
    // Same node the root layout describes; repeated here with the address so the page stands alone.
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
      email: BRAND.email,
      address: POSTAL_ADDRESS
    }
  };

  const facts: [string, React.ReactNode][] = [
    ["Where", BRAND.address],
    ["What we sell", `${kits.length} track lighting kits, ${smallest} to ${largest} ft, and every part that goes in them`],
    ["Voltage", "12V. Every light, controller, power supply and connector"],
    ["Shipping", "Free on every order, to any address in Canada"],
    ["Pickup", `Free, by appointment, at ${BRAND.street}`],
    ["Warranty", `${BRAND.warrantyYears} years on parts. Workmanship is covered on our own installs`],
    ["How to reach us", <>The <Link href="/contact-us" className="text-link">contact form</Link> or <a href={`mailto:${BRAND.email}`} className="text-link">{BRAND.email}</a></>]
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="home-install"
        eyebrow="About the shop"
        title="We sell track lighting, and we put it up."
        intro={`A lighting shop at ${BRAND.street} in ${BRAND.city}, ${BRAND.region}. Kits and parts go out by mail. Our own crew installs close to home.`}
        crumbs={[{ label: "About" }]}
      />

      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div className="space-y-10">
            <div>
              <h2 className="font-display h2-fluid">Why we sell the parts</h2>
              <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
                <p>
                  <strong className="text-[var(--color-text)]">Short answer:</strong> so you can skip the installer if you would rather do the work.
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">Long answer:</strong> most permanent track lighting in Canada is sold through dealers. A dealer measures the house, quotes it and sends a crew. That suits plenty of people. It does not suit someone who owns a drill and a ladder and wants to buy the hardware outright. The hardware is not exotic: an aluminum channel, sealed 12V RGBW lights, a WiFi controller and a power supply. We started Illumi to sell those parts directly to homeowners, and to install them ourselves for neighbours who ask.
                </p>
                <p>
                  If you are weighing us against a dealer brand or a retail string, <Link href="/brands" className="text-link">the brand comparison</Link> sets them side by side from each maker&rsquo;s own pages.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display h2-fluid">What is on the shelf</h2>
              <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
                <p>
                  {kits.length} complete kits, sized from {smallest} to {largest} feet of roofline. Every part in a kit is also sold by itself, so you can extend a run later or replace one strand. Nothing in the store is anything other than 12V, which means any part works with any other.
                </p>
                <p>
                  The controller runs WLED. That is open lighting firmware with a free app, so your lights do not depend on one company keeping its app alive.
                </p>
                <p>
                  <Link href="/diy-kits" className="text-link">See the kits</Link>
                  <span className="mx-2 text-[var(--color-border-strong)]">|</span>
                  <Link href="/shop" className="text-link">Browse the parts</Link>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display h2-fluid">Where our crew installs</h2>
              <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
                <p>
                  We install in {installCities.slice(0, -1).join(", ")} and {installCities[installCities.length - 1]}, and in the towns between them. An install starts with a free measurement at the house. The track is matched to your soffit colour, the wiring is sealed, and we walk you through the app before we leave. The parts carry the same five-year warranty as a kit you put up yourself.
                </p>
                <p>
                  <Link href="/installation" className="text-link">Installation areas and what is included</Link>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display h2-fluid">What happens when you write to us</h2>
              <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
                <p>
                  We answer the inbox within one business day. Send a photo of the house and we will tell you which kit fits. Send a photo of a dead light and we will ship the replacement.
                </p>
                <p className="note">
                  <strong>Not sure where to start?</strong> The <Link href="/resources" className="text-link">guides</Link> cover measuring, mounting and wiring, and <Link href="/how-it-works" className="text-link">how it works</Link> walks through an install from the tape measure to the app.
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Photo name="soffit-lights-perm" ratio="aspect-[4/5]" sizes="(max-width: 1024px) 50vw, 240px" />
              <Photo name="detail-tracks" ratio="aspect-[4/5]" sizes="(max-width: 1024px) 50vw, 240px" />
            </div>

            <div className="border border-[var(--color-border)] p-5 md:p-6">
              <h2 className="eyebrow text-[var(--color-gold-text)]">The shop in brief</h2>
              <dl className="mt-3 text-[0.95rem]">
                {facts.map(([k, v]) => (
                  <div key={k} className="border-t border-[var(--color-border)] py-3 first:border-t-0 first:pt-0">
                    <dt className="eyebrow text-[var(--color-text-soft)]">{k}</dt>
                    <dd className="mt-0.5 text-[var(--color-text)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <p className="eyebrow text-[var(--color-gold-text)]">Where to find us</p>
            <h2 className="font-display h2-fluid mt-2">Stock, packing and pickup at one address.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">
              Orders are packed within one to two business days and ship free anywhere in Canada. If you are near {BRAND.city}, choose pickup at checkout and wait for the email that says your order is ready. Pickups are by appointment and cost nothing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/diy-kits" className="btn-primary">Shop the kits</Link>
              <Link href="/contact-us" className="btn-secondary">Ask us a question</Link>
            </div>
          </div>
          <div className="border border-[var(--color-border)] bg-white p-6">
            <h3 className="eyebrow text-[var(--color-gold-text)]">Pickup address</h3>
            <address className="font-display mt-2 text-[1.35rem] not-italic leading-snug">
              {BRAND.street}
              <br />
              {BRAND.city}, {BRAND.regionCode} {BRAND.postal}
            </address>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-[44px] items-center">Open in Google Maps</a>
              <Link href="/shipping-returns#pickup" className="text-link inline-flex min-h-[44px] items-center">How pickup works</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
