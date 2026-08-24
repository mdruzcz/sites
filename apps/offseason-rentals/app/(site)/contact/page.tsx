import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "Contact Off Season Rentals — Port Stanley, Ontario";
const DESCRIPTION =
  "Ask about a Port Stanley off-season rental. Tell us your dates and what brings you to the area and we reply within one business day. Call 519-266-6796.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/contact`,
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] }
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[webPageLd(TITLE, DESCRIPTION, "/contact"), breadcrumbLd([{ name: "Contact", href: "/contact" }])]}
      />

      <div className="container-page pt-10 pb-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">Contact</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16 items-start">
          <div>
            <h1 className="text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
              Talk to a person
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-[var(--muted)]">
              There is no booking engine behind this site. Send an enquiry or pick up the phone and
              you will get a straight answer about what is open, what it costs and what is included.
            </p>

            <div className="mt-9 space-y-5">
              <a href={site.phoneHref} className="flex items-start gap-4 group">
                <span
                  className="grid place-items-center rounded-full shrink-0"
                  style={{ width: 48, height: 48, background: "var(--accent-soft)", color: "var(--accent-dark)" }}
                  aria-hidden="true"
                >
                  <Icon name="phone" size={20} strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Phone
                  </span>
                  <span className="block text-[19px] font-bold group-hover:text-[var(--accent)]">
                    {site.phone}
                  </span>
                  <span className="block text-[14px] text-[var(--muted)]">{site.hours}</span>
                </span>
              </a>

              <a href={site.emailHref} className="flex items-start gap-4 group">
                <span
                  className="grid place-items-center rounded-full shrink-0"
                  style={{ width: 48, height: 48, background: "var(--lake-soft)", color: "var(--lake)" }}
                  aria-hidden="true"
                >
                  <Icon name="mail" size={20} strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Email
                  </span>
                  <span className="block text-[17px] font-bold break-all group-hover:text-[var(--accent)]">
                    {site.email}
                  </span>
                  <span className="block text-[14px] text-[var(--muted)]">
                    Replies within {site.responseTime}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4">
                <span
                  className="grid place-items-center rounded-full shrink-0"
                  style={{ width: 48, height: 48, background: "var(--surface-2)", color: "var(--muted)" }}
                  aria-hidden="true"
                >
                  <Icon name="mapPin" size={20} strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Where
                  </span>
                  <span className="block text-[17px] font-bold">{site.addressLine}</span>
                  <span className="block text-[14px] text-[var(--muted)]">
                    Central Elgin, on the north shore of Lake Erie
                  </span>
                </span>
              </div>
            </div>

            <div className="my-10 rule" />

            <h2 className="text-[18px] font-bold">Own a property instead?</h2>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              There is a separate form for that — it asks the right questions and lets you paste your
              existing VRBO or Airbnb link.
            </p>
            <Link href="/list-your-property" className="btn btn-outline mt-4">
              {site.cta.ownerLong}
            </Link>
          </div>

          <div className="card card-pad" style={{ boxShadow: "var(--shadow-lg)" }}>
            <h2 className="text-[20px] font-bold">Send an enquiry</h2>
            <p className="mt-1.5 mb-6 text-[14px] text-[var(--muted)]">
              No account, no booking fee, no card up front.
            </p>
            <InquiryForm />
          </div>
        </div>
      </div>
    </>
  );
}
