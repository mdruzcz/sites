import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getGuide, getGuides } from "@/lib/content";
import ArticleBody, { FaqList, faqJsonLd } from "@/components/ArticleBody";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 3600;

const HERO: Record<string, string> = {
  "how-to-measure-your-kitchen": "/images/gallery/white-shaker-kitchen-1.webp",
  "how-to-assemble-rta-cabinets": "/images/gallery/white-shaker-kitchen-2.webp",
  "how-to-install-kitchen-cabinets": "/images/gallery/white-shaker-kitchen-3.webp",
  "rta-vs-custom-vs-big-box-cabinets": "/images/gallery/white-shaker-kitchen-4.webp",
  "white-shaker-kitchen-design-ideas": "/images/gallery/white-shaker-kitchen-5.webp",
  "kitchen-cabinet-sizes-explained": "/images/gallery/white-shaker-kitchen-6.webp",
  "shipping-delivery-and-free-local-delivery": "/images/gallery/white-shaker-kitchen-8.webp",
  "financing-and-lowest-price-guarantee": "/images/gallery/white-shaker-kitchen-9.webp",
  "caring-for-painted-cabinets": "/images/gallery/white-shaker-kitchen-10.webp",
};

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const img = HERO[g.slug] ?? "/images/gallery/white-shaker-kitchen-1.webp";
  return {
    title: g.metaTitle.slice(0, 60),
    description: g.description.slice(0, 160),
    alternates: { canonical: `/resources/${g.slug}` },
    openGraph: { title: g.title, description: g.description.slice(0, 160), images: [img], type: "article" },
    twitter: { card: "summary_large_image", title: g.title, description: g.description.slice(0, 160) },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const img = HERO[g.slug] ?? "/images/gallery/white-shaker-kitchen-1.webp";
  const others = getGuides().filter((o) => o.slug !== g.slug).slice(0, 3);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    image: [`${site.url}${img}`],
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/resources/${g.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/resources` },
      { "@type": "ListItem", position: 3, name: g.title, item: `${site.url}/resources/${g.slug}` },
    ],
  };
  return (
    <article className="container py-10 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {g.faqs?.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(g.faqs)) }} />}
      <nav className="text-sm text-ink-soft mb-4">
        <Link href="/resources" className="hover:text-accent">Resources</Link> / {g.category}
      </nav>
      <p className="text-xs text-accent font-medium mb-2">
        {g.category} · {g.readMinutes} min read
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{g.title}</h1>
      <p className="text-lg text-ink-soft mb-6">{g.intro}</p>
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border bg-sand mb-10">
        <Image src={img} alt={`${g.title} - White Shaker RTA kitchen by ${site.name}`} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>
      <ArticleBody sections={g.sections} />
      <FaqList faqs={g.faqs ?? []} />

      <div className="mt-12 rounded-lg bg-ink text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to plan your kitchen?</h2>
        <p className="text-white/80 mb-5">Design it free in 3D, get a parts list and 8% off every complete kitchen. Free delivery within {site.freeDeliveryKm} km of London, Ontario.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
            Open the Kitchen Planner
          </Link>
          <Link href="/request" className="border border-white/30 text-white px-6 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-white/10">
            Request a Quote
          </Link>
        </div>
      </div>

      <TrustStrip compact className="mt-8" />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">More guides</h2>
        <ul className="grid sm:grid-cols-3 gap-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/resources/${o.slug}`} className="block rounded-lg border border-border bg-white p-4 hover:shadow-md transition-shadow">
                <p className="text-xs text-accent font-medium mb-1">{o.category}</p>
                <p className="font-semibold text-sm leading-snug">{o.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
