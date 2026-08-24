import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/seo";

export const revalidate = 86400;

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Off Season Rentals collects, uses and stores the information you send through our enquiry and property listing forms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true }
};

const UPDATED = "23 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd(TITLE, DESCRIPTION, "/privacy-policy"),
          breadcrumbLd([{ name: "Privacy policy", href: "/privacy-policy" }])
        ]}
      />

      <div className="container-prose py-14">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">Privacy policy</span>
        </nav>

        <h1 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight">Privacy policy</h1>
        <p className="mt-2 text-[14px] text-[var(--muted)]">Last updated {UPDATED}</p>

        <div className="prose-body mt-8 space-y-8">
          <section>
            <h2 className="text-[20px] font-bold mb-3">What we collect</h2>
            <p>
              When you send a rental enquiry we collect your name, email address, phone number, the
              dates and length of stay you are asking about, the number of guests, the reason for
              your stay and anything you type into the message field. When you offer a property for
              listing we collect your name and contact details, the property address, its basic
              specifications, the months you are willing to release, any rate you name and any
              existing VRBO or Airbnb link you provide.
            </p>
            <p>
              We do not ask for payment card details anywhere on this site and we never collect them.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Why we collect it</h2>
            <p>
              Solely to answer you and to arrange a rental. Enquiries are emailed to our team at{" "}
              {site.email} and stored so we can pick the conversation back up later. We do not sell
              your information, we do not rent it to anyone, and we do not add you to a marketing
              list you did not ask for.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Where it is stored</h2>
            <p>
              Form submissions are stored in a Supabase database hosted in Canada (ca-central-1) and
              delivered as email through Resend. Photographs uploaded by property owners are stored
              in the same Supabase project. Our site is served by Vercel and protected by Cloudflare,
              both of which process request metadata such as IP address for security and delivery
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Cookies and analytics</h2>
            <p>
              This site does not use advertising cookies. We use Cloudflare Turnstile to keep spam
              off the forms, which sets a short-lived token for that purpose only. If analytics or
              Google Tag Manager are enabled they are used to count page visits and form submissions
              in aggregate, never to identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">How long we keep it</h2>
            <p>
              Enquiries are kept for as long as they are commercially useful — typically two years —
              and then deleted. Records connected to a completed tenancy are kept for as long as
              Ontario law requires for a residential tenancy record.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Your rights</h2>
            <p>
              You can ask us what we hold about you, ask for it to be corrected, or ask for it to be
              deleted. Email {site.email} or call {site.phone} and we will action it. If you are not
              satisfied with our response you may complain to the Office of the Privacy Commissioner
              of Canada.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold mb-3">Contact</h2>
            <p>
              {site.name}, {site.addressLine}. Email{" "}
              <a href={site.emailHref} className="font-semibold text-[var(--ink)] underline">
                {site.email}
              </a>{" "}
              or call{" "}
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
