import type { Metadata } from 'next';
import Link from 'next/link';
import { site, phoneHref } from '@/lib/site';
import warranty from '@/content/warranty.json';
import { PageHeader, CheckList, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';
import { PrintButton } from '@/components/PrintButton';

export const revalidate = 3600;

const url = `https://${site.domain}/warranty`;

export const metadata: Metadata = {
  title: 'Warranty: 5-Year Parts, 1-Year Workmanship',
  description: `${site.name} backs every permanent LED installation with a 5-year parts warranty and 1-year workmanship warranty. Read what is covered, what is not, and how to make a claim.`,
  alternates: { canonical: url },
  openGraph: {
    title: 'Forever Lights Warranty: 5-Year Parts, 1-Year Workmanship',
    description: 'Full warranty terms for permanent LED roofline lighting installed by Forever Lights in Southwestern Ontario.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function WarrantyPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Owner Support', item: `https://${site.domain}/support` },
        { '@type': 'ListItem', position: 3, name: 'Warranty', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WarrantyPromise',
      durationOfWarranty: { '@type': 'QuantitativeValue', value: 5, unitCode: 'ANN' },
      warrantyScope: 'Parts (5 years) and workmanship (1 year) on permanent LED lighting installations',
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Peace of mind"
        title="Our warranty, in plain language."
        sub={warranty.summary}
        crumbs={[{ href: '/support', label: 'Owner Support' }, { label: 'Warranty' }]}
      >
        <div className="flex flex-wrap gap-3 no-print">
          <a href="/downloads/forever-lights-warranty-terms.pdf" className="btn btn-dark" download>
            <Icon.download size={18} /> Download warranty terms (PDF)
          </a>
          <PrintButton />
        </div>
      </PageHeader>

      <section className="section">
        <div className="wrap max-w-5xl">
          <div className="grid md:grid-cols-3 gap-5">
            {warranty.tiers.map((t, i) => (
              <div key={t.title} className={`${i === 0 ? 'card bg-tint border-accent/50' : 'card'} p-7`}>
                <div className="font-heading text-4xl font-bold text-ink">{t.term}</div>
                <h2 className="text-lg font-bold text-ink mt-1 mb-3">{t.title}</h2>
                <p className="text-[15px] text-ink-soft leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            <div className="card p-7 md:p-8">
              <h2 className="text-2xl font-bold text-ink mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-dot-green/15 text-dot-green flex items-center justify-center"><Icon.check size={22} /></span>
                What is covered
              </h2>
              <CheckList items={warranty.covered} />
            </div>
            <div className="card-soft p-7 md:p-8">
              <h2 className="text-2xl font-bold text-ink mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-dot-red/10 text-dot-red flex items-center justify-center"><Icon.close size={22} /></span>
                What is not covered
              </h2>
              <ul className="space-y-3">
                {warranty.notCovered.map(item => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-ink mb-6">How to make a claim</h2>
              <ol className="space-y-4">
                {warranty.claim.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-ink-soft leading-relaxed pt-1.5">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 no-print">
                <a href={phoneHref} className="btn btn-primary"><Icon.phone size={18} /> {site.phone}</a>
                <Link href="/contact" className="btn btn-outline">Request service online</Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-ink mb-6">Terms</h2>
              <ul className="space-y-3 text-sm text-ink-soft leading-relaxed">
                {warranty.terms.map(t => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted">Warranty version {warranty.version}, effective {warranty.effective}. {site.name}, London, Ontario.</p>
            </div>
          </div>

          <div className="mt-12 card-soft p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 no-print">
            <span className="w-12 h-12 rounded-xl bg-white text-ink flex items-center justify-center shrink-0"><Icon.headset size={24} /></span>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ink">Not sure if it is a warranty issue?</h2>
              <p className="text-[15px] text-muted mt-1">Start with the troubleshooting guide. Most dark systems are a tripped GFCI, and most app problems are a Wi-Fi change.</p>
            </div>
            <Link href="/support/troubleshooting" className="btn btn-dark">Troubleshooting guide <Icon.arrow size={18} /></Link>
          </div>
        </div>
      </section>

      <CtaBand title="Thinking about permanent lighting?" text="Every install comes with this warranty, our own crew for service, and free phone support for life. Book a free site visit to get an exact price." />
    </>
  );
}
