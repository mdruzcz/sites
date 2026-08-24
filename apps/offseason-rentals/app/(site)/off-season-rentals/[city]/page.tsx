import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity, renterFaqs } from "@/lib/content";
import { getProperties } from "@/lib/properties";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { PropertyGrid, SectionHeading } from "@/components/Section";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, propertyListLd, abs } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return { title: "Area not found" };

  const path = `/off-season-rentals/${c.slug}`;
  return {
    title: c.headline,
    description: c.meta,
    alternates: { canonical: path },
    openGraph: {
      title: `${c.headline} | ${site.name}`,
      description: c.meta,
      url: abs(path),
      images: ["/og.jpg"]
    },
    twitter: { card: "summary_large_image", title: c.headline, description: c.meta, images: ["/og.jpg"] }
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const properties = await getProperties();
  const others = cities.filter((x) => x.slug !== c.slug);
  const path = `/off-season-rentals/${c.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Where we rent", href: "/rentals" },
            { name: c.name, href: path }
          ]),
          propertyListLd(properties, c.headline, path),
          faqLd(renterFaqs.slice(0, 5))
        ]}
      />

      <section className="container-page pt-10 pb-12">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/rentals" className="hover:underline">
            Rentals
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">{c.name}</span>
        </nav>

        <div className="max-w-3xl">
          <span className="pill pill-lake">
            <Icon name="mapPin" size={14} strokeWidth={2} />
            {c.isHome ? "Where the homes are" : `${c.minutes} minutes from the village`}
          </span>

          <h1 className="mt-5 text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
            {c.headline}
          </h1>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[var(--muted)]">{c.intro}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/rentals" className="btn btn-primary">
              <Icon name="search" size={18} strokeWidth={2.2} />
              See what is open
            </Link>
            <a href="#enquire" className="btn btn-outline">
              Ask about {c.name}
            </a>
          </div>
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="prose-body">
            <p>{c.body}</p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold mb-4">
              {c.isHome ? "In and around the village" : `What is near ${c.name}`}
            </h2>
            <ul className="space-y-3">
              {c.anchors.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px]">
                  <Icon name="mapPin" size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--muted)]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-12">
          <h2 className="text-[22px] sm:text-[26px] font-bold mb-6">
            Why people {c.isHome ? "rent here" : `commuting to ${c.name} stay in Port Stanley`}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.why.map((w) => (
              <li key={w} className="flex items-start gap-3 text-[16px]">
                <Icon name="check" size={20} strokeWidth={2.2} className="mt-0.5 shrink-0" style={{ color: "var(--ok)" }} />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          title={c.isHome ? "Homes open this off season" : `Homes within ${c.minutes} minutes of ${c.name}`}
          sub={`Every rate below is the off-season monthly figure, ${site.season.label}.`}
          href="/rentals"
          hrefLabel="See all rentals"
        />
        <PropertyGrid properties={properties.slice(0, 8)} />
      </section>

      <section id="enquire" className="container-page pb-14 scroll-mt-28">
        <div className="rule mb-10" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
          <div>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight">
              {c.isHome ? "Looking for something in the village?" : `Working in ${c.name} this season?`}
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Tell us your dates and what brings you here. We will come back within {site.responseTime}{" "}
              with what is open, what it costs, and what is included — even if the right answer turns
              out to be a home we have not listed yet.
            </p>
          </div>
          <div className="card card-pad">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="text-[20px] font-bold mb-4">Other places our tenants commute to</h2>
        <div className="flex flex-wrap gap-2.5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/off-season-rentals/${o.slug}`}
              className="pill pill-line hover:border-[var(--ink)] transition-colors"
              style={{ minHeight: 44, paddingInline: 18 }}
            >
              <Icon name="mapPin" size={15} />
              {o.isHome ? o.name : `${o.name} · ${o.minutes} min`}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
