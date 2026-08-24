import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/seo";

export const revalidate = 86400;

const TITLE = "Terms of Service";
const DESCRIPTION =
  "The terms covering use of the Off Season Rentals website, enquiries, listings and the rental agreements arranged through it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true }
};

const UPDATED = "23 August 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd(TITLE, DESCRIPTION, "/terms-of-service"),
          breadcrumbLd([{ name: "Terms of service", href: "/terms-of-service" }])
        ]}
      />

      <div className="container-prose py-14">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">Terms of service</span>
        </nav>

        <h1 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight">Terms of service</h1>
        <p className="mt-2 text-[14px] text-[var(--muted)]">Last updated {UPDATED}</p>

        <div className="prose-body mt-8 space-y-8">
          <section>
            <h2 className="text-[20px] font-bold mb-3">What this site is</h2>
            <p>
              {site.name} advertises furnished properties in and around {site.address.city}, Ontario
              for rental during the off season. Listings are informational. Nothing on this site is
              an offer capable of acceptance, and submitting an enquiry does not reserve a property
              or create a tenancy.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Rates and availability</h2>
            <p>
              Rates shown are off-season monthly figures and are subject to change until confirmed in
              writing for specific dates. Availability moves quickly and a listing being visible does
              not mean it is still open. The rate, term, deposit and inclusions that bind either
              party are the ones set out in the signed rental agreement, not the ones on this page.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Bookings and agreements</h2>
            <p>
              Every stay is governed by a separate written agreement between you and the property
              owner. That agreement sets out the term, the payment schedule, the deposit, the
              inclusions, cancellation and the house rules. Where a stay falls under the Ontario
              Residential Tenancies Act, that Act prevails over anything inconsistent here.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Property owners</h2>
            <p>
              If you offer a property for listing you confirm that you are entitled to rent it, that
              you hold the necessary insurance, and that you comply with the by-laws of the
              Municipality of Central Elgin including any short-term or seasonal rental licensing
              that applies. Where you provide a VRBO, Airbnb or other listing link for us to import
              from, you confirm you hold the rights to the photographs and descriptions on it, or
              have permission to have them reproduced.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Accuracy</h2>
            <p>
              We take reasonable care that listings are accurate, but details are supplied by owners
              and can change. Photographs show the property at the time they were taken. Always
              confirm anything that matters to you — pets, parking, heating type, snow clearing — in
              writing before you commit.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Acceptable use</h2>
            <p>
              Do not scrape, republish or resell content from this site, submit false enquiries, or
              use the forms to send unsolicited commercial messages. We may decline or withdraw any
              enquiry or listing at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Liability</h2>
            <p>
              To the extent permitted by law, our liability arising from use of this website is
              limited to the amount you have paid us, if any. Nothing in these terms limits liability
              that cannot be limited under Ontario law.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Governing law</h2>
            <p>
              These terms are governed by the laws of the Province of Ontario and the federal laws of
              Canada applicable in it. Questions: {" "}
              <a href={site.emailHref} className="font-semibold text-[var(--ink)] underline">
                {site.email}
              </a>{" "}
              or{" "}
              <a href={site.phoneHref} className="font-semibold text-[var(--ink)] underline">
                {site.phone}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
