import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { brochures } from '@/lib/brochures';
import { PageHeader, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

const url = `https://${site.domain}/brochures`;

export const metadata: Metadata = {
  title: 'Brochures & Price Sheets',
  description:
    'Download the Forever Lights brochure, 2026 price list, seasonal vs permanent cost comparison, FAQ, commercial and builder sheet, and lookbook as PDFs.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Brochures & Price Sheets | Forever Lights',
    description: 'The brochure, price list, cost comparison, FAQ, commercial sheet and lookbook, ready to download or forward.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const pagesLabel = (n: number) => `${n} page${n === 1 ? '' : 's'} · PDF`;

export default function BrochuresPage() {
  const [featured, ...rest] = brochures;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Brochures & Price Sheets', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Brochures & price sheets"
        title="Everything we hand out at a site visit."
        sub="Read them here, save them, or forward them to whoever else gets a say. The prices match this website."
        crumbs={[{ label: 'Brochures & Price Sheets' }]}
      />

      <section className="section">
        <div className="wrap max-w-6xl">
          <a href={featured.href} download className="card p-6 md:p-8 grid md:grid-cols-[minmax(0,280px)_1fr] gap-8 items-center hover:border-ink transition-colors">
            <Image src={featured.thumb} alt={`Cover of ${featured.title}`} width={600} height={776} className="w-full max-w-[280px] mx-auto rounded-lg border border-line shadow-sm" />
            <div>
              <span className="chip">{featured.audience}</span>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-ink">{featured.title}</h2>
              <p className="mt-3 text-ink-soft leading-relaxed max-w-xl">{featured.description}</p>
              <span className="mt-6 btn btn-primary"><Icon.download size={18} /> Download the brochure</span>
              <p className="mt-3 text-sm text-muted">{pagesLabel(featured.pages)}</p>
            </div>
          </a>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(b => (
              <a key={b.slug} href={b.href} download className="card p-5 flex flex-col hover:border-ink transition-colors">
                <Image src={b.thumb} alt={`Cover of ${b.title}`} width={600} height={776} className="w-full rounded-lg border border-line" />
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{b.audience}</span>
                <h3 className="mt-1 text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{b.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"><Icon.download size={16} /> Download · {pagesLabel(b.pages)}</span>
              </a>
            ))}
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            <Link href="/support/manuals" className="card-soft p-7 flex items-start gap-4 hover:bg-tint transition-colors min-h-[44px]">
              <span className="w-11 h-11 rounded-xl bg-white text-ink flex items-center justify-center shrink-0"><Icon.book size={22} /></span>
              <span>
                <span className="block text-lg font-bold text-ink">Already an owner?</span>
                <span className="block mt-1 text-[15px] text-muted leading-relaxed">The quick start guide, care checklist and warranty terms are in Manuals &amp; Downloads.</span>
              </span>
            </Link>
            <Link href="/become-a-dealer" className="card-soft p-7 flex items-start gap-4 hover:bg-tint transition-colors min-h-[44px]">
              <span className="w-11 h-11 rounded-xl bg-white text-ink flex items-center justify-center shrink-0"><Icon.building size={22} /></span>
              <span>
                <span className="block text-lg font-bold text-ink">Dealers and installers</span>
                <span className="block mt-1 text-[15px] text-muted leading-relaxed">These are the same documents our dealers hand to their customers. See the dealer program.</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want your own number on paper?"
        text="Book a free site visit. We measure the roofline, colour-match the track to your trim and leave a written quote, usually within 24 hours."
        primaryLabel="Book My Free Site Visit"
      />
    </>
  );
}
