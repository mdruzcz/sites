import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs, site, phoneHref } from '@/lib/site';
import { Icon } from '@/components/icons';
import { PageHeader, CtaBand } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/faq`;

export const metadata: Metadata = {
  title: 'FAQ — Permanent Outdoor LED Lighting Questions',
  description: `Answers to common questions about ${site.name}'s permanent LED outdoor lighting — costs, installation, weatherproofing, app control, warranty, and more.`,
  alternates: { canonical: url },
  openGraph: {
    title: `FAQ — Permanent Outdoor LED Lighting | ${site.name}`,
    description: 'Costs, installation, weatherproofing, app control and warranty. The questions homeowners ask before going permanent, answered.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function FAQPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        sub="Everything you need to know about permanent outdoor LED lighting — answered."
        crumbs={[{ label: 'FAQ' }]}
      />

      <section className="section bg-white">
        <div className="wrap max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group card overflow-hidden open:border-ink transition-colors">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-ink min-h-[56px]">
                  {f.question}
                  <Icon.chevron size={20} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-ink-soft leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 card-soft p-6 md:p-8 text-center">
            <span className="w-12 h-12 rounded-xl bg-white text-ink flex items-center justify-center mx-auto">
              <Icon.headset size={24} />
            </span>
            <h2 className="mt-5 text-xl md:text-2xl font-bold text-ink">Still have a question?</h2>
            <p className="mt-2 text-muted max-w-md mx-auto">
              Call us or send a message. A real person answers, and we are happy to help.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={phoneHref} className="btn btn-outline"><Icon.phone size={18} /> {site.phone}</a>
              <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
            </div>
            <p className="mt-4 text-xs text-muted">{site.hours}</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
