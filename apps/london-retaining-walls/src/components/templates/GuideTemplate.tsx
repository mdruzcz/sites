import Link from "next/link";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import { Sections, FaqList, TableOfContents } from "@/components/ArticleBody";
import { QuotePanel } from "@/components/Sections";
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { HERO_BY_MATERIAL, PICKS } from "@/lib/photos";
import { getGuides, type GuidePage } from "@/lib/content";

export default function GuideTemplate({ page }: { page: GuidePage }) {
  const hero = HERO_BY_MATERIAL[page.photoMaterial] ?? PICKS.homeAlt;
  const url = `${site.url}/${page.slug}`;
  const more = getGuides().filter((g) => g.slug !== page.slug).slice(0, 4);
  const date = new Date(page.publishedDate + "T12:00:00Z").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  return (
    <>
      <JsonLd data={articleSchema({ title: page.h1, description: page.metaDescription, url, image: `${site.url}${hero.image}`, published: page.publishedDate })} />
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: page.h1, href: `/${page.slug}` }])} />
      <section className="bg-paper-2">
        <div className="container-x grid gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:items-center md:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="text-[13px] text-stone"><Link href="/" className="hover:text-accent-2">Home</Link> / <Link href="/resources" className="hover:text-accent-2">Resources</Link> / <span className="text-ink">{page.category}</span></nav>
            <p className="kicker mt-4">{page.category} guide · {page.readMinutes} min read</p>
            <h1 className="display mt-3 text-4xl md:text-5xl">{page.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">{page.intro}</p>
            <p className="mt-4 text-[13px] text-stone">By {site.name} · Updated {date}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-[var(--line)]">
            <Image src={hero.image} alt={hero.alt} fill priority sizes="(max-width:768px) 100vw, 45vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" />
          </div>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_340px]">
          <article>
            <Sections sections={page.sections} />
            <FaqList faqs={page.faqs} />
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <TableOfContents sections={page.sections} />
            <QuotePanel title="Talk to a builder" source={page.slug} />
          </aside>
        </div>
      </section>
      <section className="border-t border-[var(--line)] bg-white">
        <div className="container-x py-14">
          <p className="kicker">Keep reading</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((g) => (
              <li key={g.slug} className="border border-[var(--line)] bg-paper p-5">
                <p className="tag">{g.category}</p>
                <Link href={`/${g.slug}`} className="mt-3 block font-display text-lg font-bold leading-snug hover:text-accent-2">{g.h1}</Link>
                <p className="mt-2 text-[14px] text-ink-2">{g.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title={page.cta} />
    </>
  );
}
