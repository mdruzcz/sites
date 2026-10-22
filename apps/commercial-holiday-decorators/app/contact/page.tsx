import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, localBusinessSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, IconTile } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { PROPERTY_TYPES } from "@/components/QuoteFormCompact";

export const revalidate = 3600;

const title = "Request a Commercial Holiday Decorating Quote";
const description = "Book a site visit for commercial holiday decor, lobby tree rental or Christmas light installation anywhere in Ontario. Call 519-266-6796 or send the form. We reply within one business day.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: `${site.url}/contact` },
};

const TYPE_MAP: Record<string, string> = {
  hotel: PROPERTY_TYPES[0], condo: PROPERTY_TYPES[1], plaza: PROPERTY_TYPES[2], mall: PROPERTY_TYPES[2], office: PROPERTY_TYPES[3], pm: PROPERTY_TYPES[4], retail: PROPERTY_TYPES[5], municipal: PROPERTY_TYPES[6],
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const defaultPropertyType = type ? TYPE_MAP[type] ?? "" : "";
  return (
    <>
      <JsonLd data={[localBusinessSchema(), webPageSchema({ name: title, description, url: `${site.url}/contact` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Contact", url: `${site.url}/contact` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Contact" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Get a quote</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Tell us about the property</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{site.quote.detail}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="card card-static p-6 md:p-8">
            <h2 className="font-bold text-2xl text-ink">Request a commercial quote</h2>
            <p className="text-sm text-[var(--muted)] mt-1 mb-6 flex flex-wrap gap-x-4 gap-y-1"><span>✓ Free site visit</span><span>✓ Reply within {site.responseTime}</span><span>✓ Fixed seasonal price</span></p>
            <ContactForm defaultPropertyType={defaultPropertyType} />
          </div>
          <aside className="space-y-4">
            <a href={site.phoneHref} className="card card-lift p-5 flex items-center gap-4">
              <IconTile className="shrink-0"><Icon.Phone /></IconTile>
              <div><p className="text-xs uppercase tracking-wide text-[var(--muted)]">Call us</p><p className="font-bold text-ink">{site.phone}</p><p className="text-xs text-[var(--muted)]">{site.hoursShort}, extended hours in season</p></div>
            </a>
            <div className="card card-static p-5">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">Base</p>
              <p className="font-bold text-ink">{site.address.street}</p>
              <p className="text-sm text-body">{site.address.city}, {site.address.region} {site.address.postal}</p>
              <div className="hairline my-4" />
              <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">Hours</p>
              <ul className="text-sm text-body space-y-1">{site.hoursDetailed.map((h) => <li key={h.day} className="flex justify-between gap-4"><span>{h.day}</span><span className="text-ink font-semibold">{h.hours}</span></li>)}</ul>
            </div>
            <div className="card card-static p-5">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">What helps us quote fast</p>
              <ul className="text-sm text-body space-y-1.5 list-disc pl-4">
                <li>A photo or two of the lobby or building</li>
                <li>Ceiling height for interior trees</li>
                <li>Rooflines, trees or entrances you want lit</li>
                <li>Dates that matter (openings, events, board meetings)</li>
                <li>Whether this is one site or a portfolio</li>
              </ul>
            </div>
            <div className="card card-static p-5">
              <IconTile className="mb-3"><Icon.Calendar /></IconTile>
              <p className="font-bold text-ink">Planning for next year?</p>
              <p className="text-sm text-[var(--muted)] mt-1 mb-3">Multi-year agreements lock pricing and priority install dates. Ask about it in the form.</p>
              <Link href="/guides/lease-vs-buy-commercial-christmas-decor" className="btn btn-outline btn-sm w-full">Read: lease vs buy</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
