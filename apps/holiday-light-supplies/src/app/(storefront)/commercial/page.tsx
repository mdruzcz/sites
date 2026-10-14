import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Photo } from "@/components/photo";
import { QuoteForm } from "@/components/quote-form";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonial } from "@/components/sections/testimonial";
import { breadcrumbLd, CheckList, FaqList, faqLd, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";
import { SEGMENTS } from "@/lib/commercial-content";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

const TITLE = "Commercial & Wholesale Christmas Lighting Supplier Canada";
const DESC = "Commercial Christmas lighting, 3D displays, pole décor and wholesale C9 for malls, BIAs, municipalities, property managers and installers. Volume pricing, net-30, shipped from Ontario across Canada.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/commercial` },
  openGraph: { title: `${TITLE} | Holiday Light Supplies`, description: DESC, url: `${SITE_URL}/commercial` },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC }
};

const FAQ = [
  { q: "What counts as a commercial or wholesale order?", a: "Any order for a business, public body or installer. Case quantities of bulbs and strands, multiple displays, or a property-wide package all qualify for volume pricing on the quote." },
  { q: "Do you have minimums?", a: "No minimum order. Volume pricing starts at case quantities (for example four or more 25-packs of C9, or ten or more strands) and improves with the size of the order." },
  { q: "Can you work from a tender or RFP?", a: "Yes. Send the document and we return a line-item quote with specs, warranty and delivery windows in the format the tender asks for." },
  { q: "Do you install?", a: "We supply. For installation we refer crews in Southwestern Ontario and the GTA, and most municipalities and property teams install with their own staff or contractor." },
  { q: "How do payment terms work?", a: "Businesses pay by card or e-transfer on approval of the quote. Municipalities, BIAs, school boards and other public-sector buyers can be set up for net-30 PO invoicing and tax-exempt handling." }
];

export default function CommercialPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "Commercial & wholesale" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }} />
      <PageHero
        photo="plaza-tree"
        eyebrow="Commercial & wholesale"
        title="Christmas lighting and décor, supplied the way large properties buy it."
        intro="Line-item quotes within a business day, volume pricing on case and contract orders, net-30 for the public sector, and a catalog that runs from a 25-pack of C9 to a 16 ft walk-through snowman."
        crumbs={[{ label: "Commercial & wholesale" }]}
        cta={{ href: "#quote", label: "Request a quote" }}
        secondary={{ href: "/shop", label: "Browse the catalog" }}
      />
      <TrustStrip />

      <section className="bg-white">
        <div className="shell section">
          <SectionHeading eyebrow="Pick your segment" title="Every buyer gets their own picks, pricing and process." sub="Choose the page that matches your organization and we show the products, lead times and terms that apply." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {SEGMENTS.map((s) => (
              <Link key={s.slug} href={`/commercial/${s.slug}`} className="card group grid overflow-hidden sm:grid-cols-[200px_1fr]">
                <Photo name={s.photo} ratio="aspect-[4/3] sm:aspect-auto sm:h-full" sizes="200px" imgClassName="transition duration-700 group-hover:scale-105" />
                <div className="p-6">
                  <h2 className="font-display text-xl leading-tight group-hover:text-[var(--color-brand)]">{s.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.intro.split(". ")[0]}.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                    Products, pricing & process <Icon.arrow size={14} />
                  </span>
                </div>
              </Link>
            ))}
            <Link href="/professional-installer" className="card group grid overflow-hidden sm:grid-cols-[200px_1fr]">
              <Photo name="estate-fountain" ratio="aspect-[4/3] sm:aspect-auto sm:h-full" sizes="200px" imgClassName="transition duration-700 group-hover:scale-105" />
              <div className="p-6">
                <h2 className="font-display text-xl leading-tight group-hover:text-[var(--color-brand)]">Professional installers</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">Case pricing on C9, spools, wire, clips and timers, priority fulfilment in October and November, and a direct contact for restocks.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                  Join the installer program <Icon.arrow size={14} />
                </span>
              </div>
            </Link>
            <Link href="/municipalities" className="card group grid overflow-hidden sm:grid-cols-[200px_1fr]">
              <Photo name="town-square" ratio="aspect-[4/3] sm:aspect-auto sm:h-full" sizes="200px" imgClassName="transition duration-700 group-hover:scale-105" />
              <div className="p-6">
                <h2 className="font-display text-xl leading-tight group-hover:text-[var(--color-brand)]">Open a municipal or BIA account</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">Net-30 PO invoicing, tax-exempt handling and tender-ready quotes for public-sector buyers.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                  Register your organization <Icon.arrow size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="shell section grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Why trade buyers switch to us" title="Canadian stock, Canadian pricing, Canadian winters." />
            <CheckList
              className="mt-7"
              items={[
                "No exchange, duty or brokerage — everything is priced in CAD and ships from London, Ontario",
                "Commercial-grade product: aluminum frames, 24V IP44 displays, sealed-socket C9, UV-treated foliage",
                "Quotes include freight to each site and realistic lead times, not a blanket surcharge",
                "Replacement netting, transformers and bulbs available in later seasons",
                "One contact who knows your account, not a ticket queue"
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["downtown-boulevard", "mall-atrium-tree", "office-tower", "golden-cone-tree"].map((k) => (
              <Photo key={k} name={k} ratio="aspect-[4/5]" sizes="300px" rounded="rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <Testimonial />

      <section id="quote" className="scroll-mt-24 bg-white">
        <div className="shell section grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Request a quote</p>
            <h2 className="font-display h2-fluid mt-4">Tell us about the project.</h2>
            <p className="mt-4 text-[var(--color-muted)]">Pole counts, tree lists, ceiling heights, SKUs or a site plan. We reply within one business day with line-item pricing, freight and lead times.</p>
            <div className="mt-8">
              <FaqList items={FAQ} />
            </div>
          </div>
          <QuoteForm source="/commercial" />
        </div>
      </section>
    </>
  );
}
