import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqGroups, getAllFaqs } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "FAQ: Permanent Lighting Questions Answered";
const description = "Forty answers on permanent LED roofline lighting and seasonal C9 Christmas lights in Ontario: cost, installation, winters, app control, warranty, the free demo and the AI home preview.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/faq`, images: [{ url: "/images/gallery/teal-permanent-soffit-lights-close-up-grey-siding.jpg", alt: "Permanent lighting FAQ" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function FaqPage() {
  const groups = getFaqGroups();
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <>
      <JsonLd data={[faqSchema(getAllFaqs()), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "FAQ", url: `${site.url}/faq` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "FAQ" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Got questions?</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Frequently Asked Questions</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">Everything we get asked about permanent lighting, seasonal C9 lights, pricing, installation, warranties and the free demo and AI preview.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">{groups.map((g) => <a key={g.category} href={`#${slug(g.category)}`} className="chip">{g.category}</a>)}</div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap max-w-4xl">
          {groups.map((g) => (
            <div key={g.category} id={slug(g.category)} className="mb-12 last:mb-0 scroll-mt-40">
              <h2 className="font-bold text-2xl text-ink mb-5">{g.category}</h2>
              <FaqList items={g.items} name={`faq-${slug(g.category)}`} />
            </div>
          ))}
          <div className="card card-static p-6 md:p-8 mt-12 text-center">
            <h2 className="font-bold text-2xl text-ink">Still have questions?</h2>
            <p className="mt-2 text-[var(--muted)]">Send a note through the contact form. We reply within 24 hours.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3"><Link href="/contact" className="btn btn-primary">Contact us <Icon.Arrow width={16} height={16} /></Link><Link href="/guides" className="btn btn-outline">Read the guides</Link></div>
          </div>
        </div>
      </section>
      <BookCta />
    </>
  );
}
