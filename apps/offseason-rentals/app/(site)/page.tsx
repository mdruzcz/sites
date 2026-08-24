import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getProperties } from "@/lib/properties";
import { audiences, cities, renterFaqs } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { SectionHeading, PropertyGrid, StepGrid } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { propertyListLd, faqLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

const STEPS = [
  {
    icon: "search",
    title: "Find the house",
    body: "Browse what is open for the coming off season. Every listing shows the monthly rate, what is included, and who the place actually suits."
  },
  {
    icon: "mail",
    title: "Send an enquiry",
    body: `Tell us your dates and what brings you here. We come back within ${site.responseTime} with availability and the full number — no deposit to see a price.`
  },
  {
    icon: "key",
    title: "Sign and move in",
    body: "Agreement, deposit, keys. The house is furnished and the utilities are already on, so you arrive with a suitcase and start living in it."
  }
];

export default async function HomePage() {
  const properties = await getProperties();
  const featured = properties.slice(0, 8);

  return (
    <>
      <JsonLd data={[propertyListLd(properties, "Off-season rentals in Port Stanley", "/rentals"), faqLd(renterFaqs.slice(0, 6))]} />

      {/* ---------------- Hero ---------------- */}
      <section className="container-page pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="max-w-3xl">
          <span className="pill pill-lake">
            <Icon name="snow" size={14} strokeWidth={2} />
            {site.season.label} · By the month
          </span>

          <h1 className="mt-5 text-[34px] leading-[1.08] sm:text-[52px] font-extrabold tracking-tight">
            Premium Port Stanley living
            <span className="text-[var(--accent)]">—without the summer price tag.</span>
          </h1>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[var(--muted)]">
            Rent fully furnished beachfront and village homes month-to-month through the off-season.
            One simple monthly price covers heat, hydro, and high-speed Wi-Fi.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/rentals" className="btn btn-primary">
              <Icon name="search" size={18} strokeWidth={2.2} />
              {site.cta.browse}
            </Link>
            <Link href="/list-your-property" className="btn btn-outline">
              {site.cta.ownerLong}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-[var(--muted)]">
            {[
              { icon: "check", label: "Fully furnished" },
              { icon: "flame", label: "Heat and hydro included" },
              { icon: "wifi", label: "Wi-Fi connected" },
              { icon: "calendar", label: "Month to month" }
            ].map((i) => (
              <li key={i.label} className="flex items-center gap-2">
                <Icon name={i.icon} size={16} strokeWidth={2} className="text-[var(--ok)]" />
                {i.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Listings ---------------- */}
      <section className="container-page pb-16">
        <SectionHeading
          title="Open for the off season"
          sub="Every home here is a summer rental the rest of the year. These are the months the owners are not selling anyway."
          href="/rentals"
          hrefLabel="See all rentals"
        />
        <PropertyGrid
          properties={featured}
          emptyNote="The off-season list is being put together right now."
        />
      </section>

      {/* ---------------- Why off season ---------------- */}
      <section className="border-y bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-[26px] sm:text-[32px] font-bold leading-tight">
                A beach town in February is a different product
              </h2>
              <div className="prose-body mt-5">
                <p>{site.season.blurb}</p>
                <p>
                  For the owner it is nine months of income instead of three. For you it is a whole
                  furnished house with a kitchen, a washing machine and a driveway, for less than a
                  serviced apartment in London — and a Blue Flag beach you will have largely to
                  yourself.
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-md)]" style={{ background: "var(--line)" }}>
              {[
                { k: "1 month", v: "Minimum stay on most homes" },
                { k: "Sept – May", v: "The season we rent" },
                { k: "All-in", v: "Heat, hydro, water and Wi-Fi" },
                { k: "15 min", v: "To St. Thomas, 35 to London" }
              ].map((s) => (
                <div key={s.k} className="bg-[var(--surface)] p-6">
                  <dt className="text-[24px] font-extrabold tracking-tight">{s.k}</dt>
                  <dd className="mt-1 text-[14px] text-[var(--muted)]">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="container-page py-16">
        <SectionHeading title="How it works" sub="Three steps, no account to create." />
        <StepGrid steps={STEPS} />
      </section>

      {/* ---------------- Audiences ---------------- */}
      <section className="container-page pb-16">
        <SectionHeading
          title="Who ends up here"
          sub="Most of our tenants are here because of a job or a deadline, not a holiday."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <Link
              key={a.slug}
              href={`/perfect-for/${a.slug}`}
              className="card card-pad group transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <span
                className="grid place-items-center rounded-full mb-4"
                style={{ width: 44, height: 44, background: "var(--lake-soft)", color: "var(--lake)" }}
                aria-hidden="true"
              >
                <Icon name={a.icon} size={20} strokeWidth={1.8} />
              </span>
              <h3 className="text-[16px] font-bold">{a.label}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)] clamp-3">{a.intro}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold group-hover:text-[var(--accent)]">
                Read more
                <Icon name="arrowRight" size={14} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Owner CTA ---------------- */}
      <section className="container-page pb-16">
        <div
          className="rounded-[var(--r-lg)] px-6 py-12 sm:px-12 sm:py-14 text-center"
          style={{ background: "var(--ink)", color: "#fff" }}
        >
          <h2 className="text-[26px] sm:text-[34px] font-extrabold tracking-tight text-white">
            {site.ownerPromise.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] sm:text-[17px] leading-relaxed text-white/75">
            If you own a cottage in Port Stanley, the off season is dead money — you are heating an
            empty building for eight months to protect the pipes. We market those months to people
            who need somewhere real to live, and leave your summer calendar exactly where it is.
          </p>

          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 text-left">
            {site.ownerPromise.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-white/90">
                <Icon name="check" size={18} strokeWidth={2.4} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                {p}
              </li>
            ))}
          </ul>

          <Link href="/list-your-property" className="btn btn-primary mt-9">
            {site.cta.ownerLong}
          </Link>
          <p className="mt-3 text-[13px] text-white/60">
            Already on VRBO or Airbnb? Paste the link and we import your photos.
          </p>
        </div>
      </section>

      {/* ---------------- Where ---------------- */}
      <section className="container-page pb-16">
        <SectionHeading
          title="Where people commute to"
          sub="The village is the base. These are the places our tenants drive to."
        />
        <div className="flex flex-wrap gap-2.5">
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
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="container-page pb-4">
        <SectionHeading title="Questions we get a lot" href="/faq" hrefLabel="All questions" />
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {renterFaqs.slice(0, 6).map((f) => (
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
