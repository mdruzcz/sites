import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "About Off Season Rentals — Port Stanley, Ontario";
const DESCRIPTION =
  "Who we are: a small Port Stanley operation matching furnished cottages with people who need somewhere real to live from September to May.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/about`,
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] }
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[webPageLd(TITLE, DESCRIPTION, "/about"), breadcrumbLd([{ name: "About", href: "/about" }])]} />

      <section className="container-page pt-10 pb-12">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">About</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
            Two problems that happen to be each other&rsquo;s answer
          </h1>

          <div className="prose-body mt-7">
            <p>
              Port Stanley has a housing problem that only exists for eight months of the year, and a
              second one that only exists for the other four. In summer there is nowhere to stay
              because everything is booked. From September onward there is nowhere to stay because
              nothing is open — hundreds of furnished, heated, fully equipped houses sitting dark
              while their owners pay to keep the pipes from freezing.
            </p>
            <p>
              Meanwhile fifteen minutes up the road, St.&nbsp;Thomas has more contract work than it has
              short-term housing, and London has more term-length placements than it has furnished
              apartments. Travel nurses on thirteen-week contracts. Trades booked in for a season.
              Families out of their house for a renovation or an insurance claim. People between a
              sale and a closing date. None of them want a twelve-month lease and none of them want
              four months in a motel.
            </p>
            <p>
              That is the whole business. We market the off season on cottages that would otherwise
              earn nothing, to people who need somewhere real to live for a few months. The owner
              keeps their summer calendar untouched. The tenant gets a whole house for less than a
              serviced apartment. Nobody had to build anything.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-14">
          <h2 className="text-[24px] sm:text-[30px] font-bold mb-8">How we work</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "shield",
                title: "Every tenant is screened",
                body: "References, employment or contract confirmation, a signed agreement and a held deposit. Owners approve before keys change hands."
              },
              {
                icon: "clock",
                title: "We only take the off season",
                body: "Your summer stays exactly where it is, on whatever platform you already use. We do not ask for it and we do not want it."
              },
              {
                icon: "mapPin",
                title: "We are actually here",
                body: "This is a Port Stanley operation, not a national platform with a call centre. If something breaks in January, somebody local goes and looks at it."
              },
              {
                icon: "sparkle",
                title: "Prices are on the page",
                body: "No account, no booking fee, no price revealed only after you hand over an email address. The monthly rate is on every listing."
              }
            ].map((c) => (
              <div key={c.title}>
                <span
                  className="grid place-items-center rounded-full mb-4"
                  style={{ width: 44, height: 44, background: "var(--accent-soft)", color: "var(--accent-dark)" }}
                  aria-hidden="true"
                >
                  <Icon name={c.icon} size={20} strokeWidth={1.8} />
                </span>
                <h3 className="text-[16px] font-bold">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[24px] sm:text-[30px] font-bold">Where we operate</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">
              The homes are all in and around Port Stanley. The tenants come from everywhere within
              about forty minutes of it — which in this part of Elgin County covers two hospitals,
              two post-secondary campuses, a police college and most of the industrial land south of
              the 401.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/off-season-rentals/${c.slug}`}
                  className="pill pill-line hover:border-[var(--ink)] transition-colors"
                  style={{ minHeight: 44, paddingInline: 18 }}
                >
                  <Icon name="mapPin" size={15} />
                  {c.isHome ? c.name : `${c.name} · ${c.minutes} min`}
                </Link>
              ))}
            </div>
          </div>

          <div className="card card-pad h-fit">
            <h3 className="text-[18px] font-bold">Get in touch</h3>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              {site.hours}. We reply to everything within {site.responseTime}.
            </p>
            <div className="mt-5 space-y-3">
              <a href={site.phoneHref} className="btn btn-outline w-full">
                <Icon name="phone" size={18} strokeWidth={2} />
                {site.phone}
              </a>
              <a href={site.emailHref} className="btn btn-quiet w-full">
                <Icon name="mail" size={18} />
                {site.email}
              </a>
            </div>
            <div className="my-6 rule" />
            <p className="text-[15px] font-semibold">Own a cottage here?</p>
            <p className="mt-1.5 text-[14px] text-[var(--muted)]">
              The off season is dead money. We can fix that without touching your July.
            </p>
            <Link href="/list-your-property" className="btn btn-primary w-full mt-4">
              {site.cta.ownerLong}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
