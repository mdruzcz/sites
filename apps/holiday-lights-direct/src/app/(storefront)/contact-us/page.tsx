import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Contact Holiday Lights Direct — London, Ontario",
  description:
    "Questions about permanent LED lighting kits, C9 bulbs or a bulk order? Email service@masterdecker.com and our London, Ontario team will get back to you within one business day.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
  openGraph: {
    title: "Contact Holiday Lights Direct — London, Ontario",
    description: "Talk to our London, Ontario team about permanent LED lighting kits and bulk orders.",
    url: `${SITE_URL}/contact-us`
  }
};

const ROUTES = [
  {
    title: "General questions",
    body: "Sizing a kit, checking stock, or asking about a product spec before you order.",
    action: { label: "service@masterdecker.com", href: "mailto:service@masterdecker.com" }
  },
  {
    title: "Installer pricing",
    body: "Christmas light installers, event lighting companies and landscaping crews buying at volume.",
    action: { label: "Apply to the installer program", href: "/professional-installer" }
  },
  {
    title: "Municipalities & BIAs",
    body: "Net-30 PO terms, tax-exempt accounts and RFP-ready line-item quotes.",
    action: { label: "See the municipal program", href: "/municipalities" }
  },
  {
    title: "An order already placed",
    body: "Status, tracking numbers and delivery questions on an order you have already made.",
    action: { label: "Track your order", href: "/track-order" }
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        photo="hero-warm-white-home"
        photoAlt="Home at twilight outlined in warm-white permanent LED track lighting"
        eyebrow="Get in touch"
        title="Contact us"
        intro="We are a London, Ontario shop — we stock what we sell and we answer our own email. Most messages get a reply within one business day."
        crumb="Contact"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where to reach us</p>
              <h2 className="font-display mt-6 text-[2rem] md:text-[2.75rem]">
                Pick the route that fits.
              </h2>

              <div className="mt-11 grid gap-6 sm:grid-cols-2">
                {ROUTES.map((r) => (
                  <div key={r.title} className="card flex flex-col p-7">
                    <h3 className="font-display text-lg">{r.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-soft)]">
                      {r.body}
                    </p>
                    {r.action.href.startsWith("mailto:") ? (
                      <a
                        href={r.action.href}
                        className="mt-5 inline-flex w-fit text-sm font-semibold text-[var(--color-gold-text)] hover:underline"
                      >
                        {r.action.label}
                      </a>
                    ) : (
                      <Link
                        href={r.action.href}
                        className="mt-5 inline-flex w-fit text-sm font-semibold text-[var(--color-gold-text)] hover:underline"
                      >
                        {r.action.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-11 rounded-2xl border border-[var(--color-border)] bg-white p-7">
                <p className="eyebrow text-[var(--color-muted)]">Shipping from</p>
                <p className="mt-3 text-[1.0625rem] font-semibold">London, Ontario, Canada</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">
                  Orders leave the same or next business day via Canada Post. Free shipping anywhere in
                  Canada on orders over $500 CAD.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Photo
                name="home-nighttime-lit"
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 460px"
                rounded="rounded-3xl"
              />
              <Photo
                name="detail-led-pucks"
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 460px"
                rounded="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
