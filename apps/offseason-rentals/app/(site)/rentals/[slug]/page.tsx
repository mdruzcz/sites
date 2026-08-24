import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperties, getProperty } from "@/lib/properties";
import { groupAmenities, getAudience, renterFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import {
  money,
  specLine,
  areaLabel,
  paragraphs,
  availabilityLabel,
  minStayLabel,
  headlineRate
} from "@/lib/format";
import { Icon } from "@/components/Icon";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InquiryForm } from "@/components/InquiryForm";
import { PropertyCard } from "@/components/PropertyCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, propertyLd, faqLd, abs } from "@/lib/seo";
import type { Property } from "@/lib/types";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return { title: "Rental not found" };

  const rate = headlineRate(p);
  const title = `${p.name} — ${p.bedrooms} Bed Off-Season Rental in ${p.city}`;
  const description = `${p.summary} ${rate ? `${rate.label}, ${minStayLabel(p.min_stay_nights)}.` : ""} ${
    p.utilities_included ? "Utilities included." : ""
  }`
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 158);

  const image = p.photos[0] ? abs(p.photos[0].url) : "/og.jpg";

  return {
    title,
    description,
    alternates: { canonical: `/rentals/${p.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}/rentals/${p.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: `${p.name} — off-season rental in ${p.city}, ${p.region}` }]
    },
    twitter: { card: "summary_large_image", title, description, images: [image] }
  };
}

function Fact({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-[var(--muted)]" aria-hidden="true">
        <Icon name={icon} size={22} strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold">{label}</p>
        <p className="text-[14px] text-[var(--muted)]">{value}</p>
      </div>
    </div>
  );
}

function RateRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className={`text-[15px] ${strong ? "font-bold" : "text-[var(--muted)]"}`}>{label}</span>
      <span className={`text-[15px] tabular-nums ${strong ? "font-bold" : ""}`}>{value}</span>
    </div>
  );
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) notFound();

  const all = await getProperties();
  const similar = all.filter((x) => x.id !== p.id).slice(0, 4);
  const grouped = groupAmenities(p.amenities);
  const rate = headlineRate(p);

  return (
    <>
      <JsonLd
        data={[
          propertyLd(p),
          breadcrumbLd([
            { name: "Rentals", href: "/rentals" },
            { name: p.name, href: `/rentals/${p.slug}` }
          ]),
          faqLd(renterFaqs.slice(0, 5))
        ]}
      />

      <article className="container-page pt-6 pb-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/rentals" className="hover:underline">
            Rentals
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">{p.name}</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight">{p.name}</h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-[var(--muted)]">
            <span className="font-semibold text-[var(--ink)] underline decoration-1 underline-offset-2">
              {areaLabel(p)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{specLine(p)}</span>
            {p.square_feet ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{p.square_feet.toLocaleString("en-CA")} sq ft</span>
              </>
            ) : null}
          </p>
        </header>

        <PhotoGallery photos={p.photos} title={p.name} />

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_384px] lg:gap-16">
          {/* ------------------- Left column ------------------- */}
          <div className="min-w-0">
            <div className="pb-7">
              <h2 className="text-[20px] sm:text-[22px] font-bold">
                Entire {p.property_type.toLowerCase()} in {p.city}
              </h2>
              <p className="mt-1 text-[15px] text-[var(--muted)]">{specLine(p)}</p>
              {p.headline ? (
                <p className="mt-4 text-[17px] font-semibold leading-snug">{p.headline}</p>
              ) : null}
            </div>

            <div className="rule" />

            {/* Highlights */}
            {p.highlights.length ? (
              <>
                <div className="py-7 space-y-5">
                  {p.highlights.map((h, i) => (
                    <Fact
                      key={h}
                      icon={["mapPin", "key", "sparkle", "shield", "clock"][i % 5]}
                      label={h}
                      value=""
                    />
                  ))}
                </div>
                <div className="rule" />
              </>
            ) : null}

            {/* Description */}
            <div className="py-7 prose-body">
              {paragraphs(p.description).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {!p.description ? <p>{p.summary}</p> : null}
            </div>

            <div className="rule" />

            {/* Who it suits */}
            {p.perfect_for.length ? (
              <>
                <section className="py-7">
                  <h2 className="text-[20px] sm:text-[22px] font-bold">Who this one suits</h2>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {p.perfect_for.map((slug) => {
                      const a = getAudience(slug);
                      if (!a) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/perfect-for/${slug}`}
                          className="pill pill-line hover:border-[var(--ink)] transition-colors"
                          style={{ minHeight: 44, paddingInline: 18 }}
                        >
                          <Icon name={a.icon} size={15} strokeWidth={1.8} />
                          {a.label}
                        </Link>
                      );
                    })}
                  </div>
                </section>
                <div className="rule" />
              </>
            ) : null}

            {/* Amenities */}
            {grouped.length ? (
              <>
                <section className="py-7">
                  <h2 className="text-[20px] sm:text-[22px] font-bold">What this place offers</h2>
                  <div className="mt-5 space-y-7">
                    {grouped.map((g) => (
                      <div key={g.group}>
                        <h3 className="text-[14px] font-bold text-[var(--muted)] uppercase tracking-wide">
                          {g.group}
                        </h3>
                        <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {g.items.map((a) => (
                            <li key={a.slug} className="flex items-center gap-3 text-[15px]">
                              <Icon
                                name={a.icon}
                                size={20}
                                strokeWidth={1.6}
                                className="shrink-0 text-[var(--muted)]"
                              />
                              {a.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
                <div className="rule" />
              </>
            ) : null}

            {/* House rules */}
            {p.house_rules.length ? (
              <>
                <section className="py-7">
                  <h2 className="text-[20px] sm:text-[22px] font-bold">Things to know</h2>
                  <ul className="mt-4 space-y-2.5">
                    {p.house_rules.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-[15px] text-[var(--ink-soft)]">
                        <Icon name="check" size={18} strokeWidth={2} className="mt-1 shrink-0 text-[var(--muted)]" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="rule" />
              </>
            ) : null}

            {/* Location */}
            <section className="py-7">
              <h2 className="text-[20px] sm:text-[22px] font-bold">Where you will be</h2>
              <p className="mt-1.5 text-[15px] text-[var(--muted)]">{areaLabel(p)}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {site.nearby.map((n) => (
                  <li key={n.name} className="flex items-center gap-3 text-[15px]">
                    <Icon name="car" size={20} strokeWidth={1.6} className="shrink-0 text-[var(--muted)]" />
                    <span>
                      {n.name} — <span className="text-[var(--muted)]">{n.minutes} min</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] text-[var(--muted)]">
                The exact address is shared once a stay is confirmed.
              </p>
            </section>
          </div>

          {/* ------------------- Right column: sticky rate card ------------------- */}
          <aside className="lg:sticky lg:top-[104px] lg:self-start">
            <div className="card card-pad" style={{ boxShadow: "var(--shadow-lg)" }}>
              {rate ? (
                <p className="text-[22px] font-bold">
                  {rate.label.split(" / ")[0]}
                  <span className="text-[16px] font-normal text-[var(--muted)]"> / {rate.unit}</span>
                </p>
              ) : (
                <p className="text-[22px] font-bold">Rate on request</p>
              )}
              <p className="mt-1 text-[14px] text-[var(--muted)]">{minStayLabel(p.min_stay_nights)}</p>

              <div className="my-5 rule" />

              <div className="divide-y" style={{ borderColor: "var(--line-soft)" }}>
                {p.monthly_rate ? <RateRow label="Monthly" value={money(p.monthly_rate)!} /> : null}
                {p.weekly_rate ? <RateRow label="Weekly" value={money(p.weekly_rate)!} /> : null}
                {p.nightly_rate ? <RateRow label="Nightly" value={money(p.nightly_rate)!} /> : null}
                {p.cleaning_fee ? <RateRow label="Cleaning" value={money(p.cleaning_fee)!} /> : null}
                {p.security_deposit ? (
                  <RateRow label="Deposit (refundable)" value={money(p.security_deposit)!} />
                ) : null}
                {p.pets_allowed && p.pet_fee ? <RateRow label="Pet fee" value={money(p.pet_fee)!} /> : null}
                <RateRow
                  label="Utilities"
                  value={p.utilities_included ? "Included" : "Metered separately"}
                  strong={p.utilities_included}
                />
                <RateRow label="Available" value={availabilityLabel(p)} />
              </div>

              <a href="#enquire" className="btn btn-primary w-full mt-6">
                {site.cta.renterLong}
              </a>
              <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
                No payment now. We reply within {site.responseTime}.
              </p>

              <a href={site.phoneHref} className="btn btn-quiet w-full mt-3">
                <Icon name="phone" size={16} strokeWidth={2} />
                {site.phone}
              </a>
            </div>
          </aside>
        </div>

        {/* ------------------- Enquiry ------------------- */}
        <section id="enquire" className="mt-16 scroll-mt-28">
          <div className="rule mb-10" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
            <div>
              <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">
                Check availability for {p.name}
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
                Tell us your dates and what brings you to the area. We come back within{" "}
                {site.responseTime} with whether it is open, the total for your stay, and what the
                owner needs to hold it. Nothing is charged until you have seen the numbers in writing.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "No account, no booking fee, no card up front",
                  "A real person reads every enquiry",
                  "If this one is taken, we will tell you what else is open"
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px]">
                    <Icon name="check" size={18} strokeWidth={2.2} className="mt-1 shrink-0" style={{ color: "var(--ok)" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card card-pad">
              <InquiryForm propertySlug={p.slug} propertyName={p.name} />
            </div>
          </div>
        </section>

        {/* ------------------- Similar ------------------- */}
        {similar.length ? (
          <section className="mt-16">
            <div className="rule mb-10" />
            <h2 className="text-[22px] sm:text-[26px] font-bold mb-6">Other homes open this season</h2>
            <div className="grid gap-x-6 gap-y-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {similar.map((s: Property) => (
                <PropertyCard key={s.id} property={s} />
              ))}
            </div>
          </section>
        ) : null}
      </article>

      {/* Mobile sticky action bar — Airbnb's pattern, and the highest-converting
          element on a listing page. */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-[var(--surface)] px-5 py-3"
        style={{ borderColor: "var(--line)", boxShadow: "0 -2px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            {rate ? (
              <p className="text-[16px] font-bold truncate">
                {rate.label.split(" / ")[0]}
                <span className="text-[13px] font-normal text-[var(--muted)]"> / {rate.unit}</span>
              </p>
            ) : (
              <p className="text-[16px] font-bold">Rate on request</p>
            )}
            <p className="text-[12px] text-[var(--muted)] truncate">{minStayLabel(p.min_stay_nights)}</p>
          </div>
          <a href="#enquire" className="btn btn-primary btn-sm shrink-0">
            Check availability
          </a>
        </div>
      </div>
      {/* Spacer so the bar never covers the footer's last row. */}
      <div className="lg:hidden" style={{ height: 76 }} aria-hidden="true" />
    </>
  );
}
