import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { audiences, getAudience, renterFaqs } from "@/lib/content";
import { getProperties, getPropertiesForAudience } from "@/lib/properties";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { PropertyGrid, SectionHeading } from "@/components/Section";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, propertyListLd, abs } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) return { title: "Not found" };

  const path = `/perfect-for/${a.slug}`;
  const title = `${a.headline} — Port Stanley Off-Season Rentals`;
  return {
    title,
    description: a.meta,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: a.meta,
      url: abs(path),
      images: ["/og.jpg"]
    },
    twitter: { card: "summary_large_image", title, description: a.meta, images: ["/og.jpg"] }
  };
}

export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) notFound();

  const matched = await getPropertiesForAudience(a.slug);
  const all = await getProperties();
  // If nothing is explicitly tagged, showing the full list beats showing none —
  // the tag is an editorial hint, not a hard eligibility rule.
  const properties = matched.length ? matched : all;
  const others = audiences.filter((x) => x.slug !== a.slug);
  const path = `/perfect-for/${a.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Who it suits", href: "/rentals" },
            { name: a.label, href: path }
          ]),
          propertyListLd(properties, `${a.label} — Port Stanley off-season rentals`, path),
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
          <span className="text-[var(--ink)]">{a.short}</span>
        </nav>

        <div className="max-w-3xl">
          <span className="pill pill-lake">
            <Icon name={a.icon} size={14} strokeWidth={2} />
            {a.label}
          </span>

          <h1 className="mt-5 text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
            {a.headline}
          </h1>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[var(--muted)]">{a.intro}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href={`/rentals?for=${a.slug}`} className="btn btn-primary">
              <Icon name="search" size={18} strokeWidth={2.2} />
              See matching homes
            </Link>
            <a href="#enquire" className="btn btn-outline">
              Ask a question
            </a>
          </div>
        </div>
      </section>

      <section className="border-y bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-12">
          <h2 className="text-[22px] sm:text-[26px] font-bold mb-6">Why this works</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {a.why.map((w) => (
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
          title={matched.length ? `Homes that suit ${a.short.toLowerCase()}` : "Homes open this off season"}
          sub={`Off-season monthly rates, ${site.season.label}. Utilities included on most.`}
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
              Tell us what you need
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Dates, how long, how many of you, and anything particular — a fenced yard, room for a
              work truck, a desk that faces a window. We reply within {site.responseTime} with what
              actually fits.
            </p>
          </div>
          <div className="card card-pad">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="text-[20px] font-bold mb-4">Other people who rent off season</h2>
        <div className="flex flex-wrap gap-2.5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/perfect-for/${o.slug}`}
              className="pill pill-line hover:border-[var(--ink)] transition-colors"
              style={{ minHeight: 44, paddingInline: 18 }}
            >
              <Icon name={o.icon} size={15} strokeWidth={1.8} />
              {o.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
