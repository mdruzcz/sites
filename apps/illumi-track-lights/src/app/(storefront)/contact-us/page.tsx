import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Contact Illumi Track Lights — London, Ontario",
  description:
    "Questions about sizing a soffit track kit, controllers or bulk pricing? Email service@masterdecker.com and our London, Ontario team replies within one business day.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
  openGraph: {
    title: "Contact Illumi Track Lights — London, Ontario",
    description: "Talk to our London, Ontario team about soffit track kits and trade pricing.",
    url: `${SITE_URL}/contact-us`
  }
};

const ROUTES = [
  {
    title: "Sizing and product questions",
    body: "Working out how much track you need, which controller fits, or whether a part is in stock.",
    action: { label: "service@masterdecker.com", href: "mailto:service@masterdecker.com" }
  },
  {
    title: "Installer pricing",
    body: "Permanent lighting installers, event lighting companies and landscaping crews buying at volume.",
    action: { label: "Apply to the installer program", href: "/professional-installer" }
  },
  {
    title: "Hire an installer",
    body: "Would rather not DIY? We work with installers across Canada who fit our gear.",
    action: { label: "Find an installer", href: "/installers" }
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
        photo="hero-home-twilight"
        photoAlt="Home outlined in warm-white permanent LED soffit track lighting at twilight"
        eyebrow="Get in touch"
        title="Contact us"
        intro="We are a London, Ontario shop — we stock what we sell and we answer our own email. Most messages get a reply within one business day."
        crumb="Contact"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-rule text-[var(--color-amber-text)]">Where to reach us</p>
              <h2 className="font-display mt-6 text-[2rem] md:text-[2.75rem]">Pick the route that fits.</h2>

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
                        className="mt-5 inline-flex w-fit text-sm font-semibold text-[var(--color-amber-text)] hover:underline"
                      >
                        {r.action.label}
                      </a>
                    ) : (
                      <Link
                        href={r.action.href}
                        className="mt-5 inline-flex w-fit text-sm font-semibold text-[var(--color-amber-text)] hover:underline"
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
                  Orders leave the same or next business day. Free shipping anywhere in Canada on orders over
                  $500 CAD.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Photo
                name="home-night-lit"
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 460px"
                rounded="rounded-3xl"
              />
              <Photo
                name="detail-pucks"
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
