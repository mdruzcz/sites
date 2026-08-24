import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { renterFaqs } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { StepGrid } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "How Off-Season Renting Works in Port Stanley";
const DESCRIPTION =
  "How a Port Stanley off-season rental works: month-to-month furnished homes from September to May, what is included, what it costs, and how to book one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/how-it-works`,
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] }
};

const STEPS = [
  {
    icon: "search",
    title: "Browse what is open",
    body: "Every listing shows the monthly rate, the minimum stay, what is included and who the place suits. No prices hidden behind a sign-up."
  },
  {
    icon: "mail",
    title: "Send an enquiry",
    body: `Dates, length of stay, and what brings you here. We reply within ${site.responseTime} with availability and the full number — nothing is charged to see it.`
  },
  {
    icon: "key",
    title: "Sign, pay, move in",
    body: "A written agreement, first month plus a refundable deposit, then keys. The heat is already on and the beds are already made."
  }
];

const INCLUDED = [
  { icon: "sofa", label: "Furniture", value: "Every room, including beds, linens and towels" },
  { icon: "flame", label: "Heat", value: "Included on most homes — check the listing" },
  { icon: "wifi", label: "Wi-Fi", value: "Connected before you arrive" },
  { icon: "car", label: "Parking", value: "Driveway parking at the door, free" },
  { icon: "sofa", label: "Kitchen", value: "Cookware, dishes, cutlery — cook the first night" },
  { icon: "sparkle", label: "Clean", value: "Professionally cleaned before handover" }
];

const NOT_INCLUDED = [
  "Your own food, obviously",
  "Contents insurance on your own belongings",
  "Long-distance calls or cable packages beyond the internet",
  "Snow clearing on a few of the rural properties — always stated on the listing"
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd(TITLE, DESCRIPTION, "/how-it-works"),
          breadcrumbLd([{ name: "How it works", href: "/how-it-works" }]),
          faqLd(renterFaqs)
        ]}
      />

      <section className="container-page pt-10 pb-12">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">How it works</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
            How off-season renting works
          </h1>
          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[var(--muted)]">
            It is simpler than a lease and more permanent than a hotel. You take a furnished house
            for a month or more during the season it would otherwise stand empty, and you pay one
            number that covers nearly everything.
          </p>
        </div>
      </section>

      <section className="container-page pb-14">
        <StepGrid steps={STEPS} />
      </section>

      <section className="border-y bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-14">
          <h2 className="text-[24px] sm:text-[30px] font-bold">What the monthly rate covers</h2>
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((i) => (
              <div key={i.label} className="flex items-start gap-3">
                <Icon name={i.icon} size={22} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--muted)]" />
                <div>
                  <p className="text-[15px] font-bold">{i.label}</p>
                  <p className="text-[14px] text-[var(--muted)]">{i.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-10 rule" />

          <h3 className="text-[18px] font-bold">What it does not cover</h3>
          <ul className="mt-4 space-y-2.5">
            {NOT_INCLUDED.map((n) => (
              <li key={n} className="flex items-start gap-3 text-[15px] text-[var(--ink-soft)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--muted)" }} />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[24px] sm:text-[30px] font-bold">The honest version</h2>
            <div className="prose-body mt-5">
              <p>
                Port Stanley between Labour Day and Victoria Day is quiet. The patios close, the
                beach concessions shutter, and the summer crowd disappears until May. Roughly two
                thousand people live here year-round, so the groceries, the fuel, the post office and
                a couple of restaurants stay open — but this is not the village you visited in
                August.
              </p>
              <p>
                That is precisely the trade. You get a whole furnished house near a Blue Flag beach
                for less than a serviced apartment in London, in exchange for accepting that half the
                shops are shut. For most of our tenants — here for a contract, a placement, a
                renovation or a closing date — that is not a compromise. It is the point.
              </p>
            </div>
          </div>

          <div className="card card-pad h-fit">
            <h3 className="text-[18px] font-bold">The numbers, plainly</h3>
            <dl className="mt-5 divide-y" style={{ borderColor: "var(--line-soft)" }}>
              {[
                ["Minimum stay", "30 nights on most homes"],
                ["Deposit", "Typically one month, refundable"],
                ["Payment", "First month plus deposit on signing"],
                ["Notice to extend", "Two weeks is usually plenty"],
                ["Booking fee", "None"],
                ["Our reply time", site.responseTime]
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[15px] text-[var(--muted)]">{k}</dt>
                  <dd className="text-[15px] font-semibold text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/rentals" className="btn btn-primary w-full mt-6">
              Browse what is open
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-14">
        <h2 className="text-[24px] sm:text-[30px] font-bold mb-8">Questions</h2>
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {renterFaqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-[16px] font-bold">{f.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
