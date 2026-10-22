import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqGroups } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { Breadcrumbs, FaqList } from "@/components/ui";
import { ClosingForm } from "@/components/sections";

export const revalidate = 3600;

const title = "Commercial Holiday Decorating FAQ: Pricing, Leasing, Installation & Storage";
const description = "Answers to the questions hotels, condo boards, property managers and plaza owners ask about commercial holiday decor: cost, leasing vs buying, lobby tree sizes, insurance, after-hours installs, maintenance, takedown and storage.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title, description, url: `${site.url}/faq` },
};

export default function FaqPage() {
  const groups = getFaqGroups();
  return (
    <>
      <JsonLd data={[faqSchema(groups.flatMap((g) => g.items)), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "FAQ", url: `${site.url}/faq` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "FAQ" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Questions</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Frequently asked questions</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">Everything property managers, hotel GMs and boards ask us about pricing, leasing, installation, insurance and what happens in January.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {groups.map((g) => <a key={g.slug} href={`#${g.slug}`} className="chip">{g.group}</a>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap max-w-4xl space-y-14">
          {groups.map((g) => (
            <div key={g.slug} id={g.slug} className="scroll-mt-28">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-5">{g.group}</h2>
              <FaqList items={g.items} name={g.slug} />
            </div>
          ))}
          <p className="text-center text-[var(--muted)]">Didn’t find it? <Link href="/contact" className="text-[var(--accent-ink)] underline underline-offset-2">Ask us directly</Link> and we’ll reply within {site.responseTime}.</p>
        </div>
      </section>
      <ClosingForm />
    </>
  );
}
