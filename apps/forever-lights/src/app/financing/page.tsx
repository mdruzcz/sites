import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { FinancingCallout } from '@/components/FinancingCallout';
import { Icon } from '@/components/icons';
import { PageHeader, SectionHeading, FeatureCard, CtaBand } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/financing`;

export const metadata: Metadata = {
  title: 'Financing for Permanent LED Lighting',
  description:
    'Spread the cost of permanent LED lighting with flexible monthly financing on approved credit. Install now, pay in comfortable instalments across Southwestern Ontario.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Financing for Permanent LED Lighting | Forever Lights',
    description:
      'Flexible monthly financing on approved credit for permanent LED lighting. Install now and pay in comfortable instalments.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financing for Permanent LED Lighting | Forever Lights',
    description: 'Spread the cost of permanent LED lighting with flexible monthly financing on approved credit.',
  },
};

const benefits = [
  {
    icon: <Icon.calendar size={22} />,
    title: 'Manageable monthly payments',
    text: 'Spread the cost over a 24-month term instead of paying the full install up front.',
  },
  {
    icon: <Icon.card size={22} />,
    title: 'No large upfront hit',
    text: 'Keep your cash free for other things while you enjoy the lights right away.',
  },
  {
    icon: <Icon.bolt size={22} />,
    title: 'Quick application',
    text: 'A straightforward application with a fast decision, so your install date is never held up.',
  },
  {
    icon: <Icon.file size={22} />,
    title: 'Paired with your estimate',
    text: 'We show the monthly option alongside your free written quote. No guesswork.',
  },
];

export default function FinancingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Financing', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="Financing"
        title="Spread the cost of your permanent lighting."
        sub={`Get your permanent LED track lighting installed now and pay it off over a 24-month term at 10% APR, on approved credit. Available to homeowners across ${site.region}.`}
        crumbs={[{ label: 'Financing' }]}
      />

      {/* ─── Reusable financing band ─── */}
      <FinancingCallout variant="band" ctaHref="/contact" />

      {/* ─── How it works ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="max-w-3xl mx-auto">
            <SectionHeading align="left" eyebrow="How it works" title="One install. Twenty-four easy payments." />
            <div className="prose-fl mt-6">
              <p>
                A permanent lighting install is a one-time investment that replaces years of buying temporary lights and
                paying for seasonal installs and takedowns. Financing simply turns that one-time cost into a manageable
                monthly amount over a 24-month term at 10% APR, so you can enjoy the lights right away instead of waiting.
              </p>
              <p>
                The application is quick and straightforward, with a fast decision so your project isn&apos;t held up. It
                pairs directly with your free estimate. Once we&apos;ve measured your roofline, we&apos;ll walk you through the
                monthly option alongside your written quote so there&apos;s no guesswork and no pressure.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {benefits.map(b => (
                <FeatureCard key={b.title} icon={b.icon} title={b.title} text={b.text} />
              ))}
            </div>

            {/* CTA card */}
            <div className="mt-12 card p-8 md:p-10 text-center">
              <span className="eyebrow">Ways to pay</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-ink">Ask us about monthly financing</h2>
              <p className="mt-4 text-muted leading-relaxed max-w-lg mx-auto">
                Flag your interest when you request a quote and we&apos;ll include the monthly option with your written
                estimate.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn btn-primary btn-lg">Ask about financing</Link>
                <Link href="/cost-estimator" className="btn btn-outline btn-lg">Estimate my cost</Link>
              </div>
            </div>

            {/* OAC disclaimer */}
            <p className="mt-8 text-xs text-muted leading-relaxed">
              Financing is offered over a 24-month term at 10% APR, on approved credit (OAC). Your exact monthly payment
              depends on the size of your install. We&apos;ll show you the monthly option with your written estimate, no
              guesswork, no pressure. Financing is subject to approval and provided through a third-party lender; rates and
              terms are confirmed at the time of application.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Install now, pay over 24 months."
        text="Book a free site visit and we will include the monthly financing option with your written quote."
        primaryLabel="Ask about financing"
      />
    </>
  );
}
