import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ContactForm } from "@/components/contact-form";
import { kits } from "@/lib/kits";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL, formatCad } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/installers`;
const TITLE = "Find a Track Lighting Installer";
const DESCRIPTION =
  "Want permanent track lighting installed? Our crew covers Southwestern Ontario, and we connect homeowners elsewhere in Canada with installers who fit our kits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("install-home-day").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

export default function InstallersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Permanent LED track lighting installation",
    name: "Track lighting installer referrals in Canada",
    description: DESCRIPTION,
    url: PAGE_URL,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Canada" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="install-home-day"
        eyebrow="For homeowners"
        title="Would you rather have someone else put it up?"
        intro="Tell us where you are. Close to home our own crew does the work, and elsewhere in Canada we connect you with an installer who fits this hardware."
        crumbs={[{ label: "Installers" }]}
      />

      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display h2-fluid">Ask for an installer</h2>
            <div className="mt-4 max-w-xl space-y-4 text-[var(--color-text-soft)]">
              <p>
                <strong className="text-[var(--color-text)]">In Southwestern Ontario:</strong> our own crew installs. The towns are listed on the <Link href="/installation" className="text-link">installation page</Link>.
              </p>
              <p>
                <strong className="text-[var(--color-text)]">Elsewhere in Canada:</strong> send your postal code and a photo of the house. We reply within one business day and connect you with a partner installer near you. The hardware, the warranty and the support are the same either way.
              </p>
            </div>
            <div className="mt-6">
              <ContactForm defaultTopic="Help me size a kit" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-[var(--color-border)] p-5 md:p-6">
              <h2 className="eyebrow text-[var(--color-gold-text)]">Installed price guide</h2>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                Typical installed price for our own crew, kit included. Ladders, corners and second storeys move the number.
              </p>
              <table className="mt-3 w-full text-[0.95rem] [font-variant-numeric:tabular-nums]">
                <caption className="sr-only">Typical installed price range by length of roofline</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Roofline lit</th>
                    <th scope="col">Installed price</th>
                  </tr>
                </thead>
                <tbody>
                  {kits.map((k) => (
                    <tr key={k.slug} className="border-t border-[var(--color-border)]">
                      <th scope="row" className="py-2.5 text-left font-normal text-[var(--color-text-soft)]">{k.feet} ft</th>
                      <td className="py-2.5 text-right font-semibold">{formatCad(k.installedLow, 0)} to {formatCad(k.installedHigh, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-sm">
                <Link href="/compare" className="text-link inline-flex min-h-[44px] items-center">Kit price against installed price</Link>
              </p>
            </div>

            <Photo name="track-security-white" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 420px" />

            <div className="border-t border-[var(--color-border)] pt-5">
              <h2 className="font-display text-[1.25rem]">Getting a quote from a dealer brand as well?</h2>
              <p className="mt-2 text-[0.95rem] text-[var(--color-text-soft)]">
                That is sensible. <Link href="/brands" className="text-link">The brand comparison</Link> lists what each one publishes about mounting, warranty and price, so you know what to ask.
              </p>
            </div>

            <div className="border-t border-[var(--color-border)] pt-5">
              <h2 className="font-display text-[1.25rem]">Do you install for a living?</h2>
              <p className="mt-2 text-[0.95rem] text-[var(--color-text-soft)]">
                Crews that fit our system get tier pricing, priority fulfilment and homeowner referrals.
              </p>
              <Link href="/professional-installer" className="btn-secondary mt-4 w-full">See the installer program</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
