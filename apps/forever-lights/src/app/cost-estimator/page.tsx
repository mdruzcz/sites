import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { CostEstimator } from '@/components/CostEstimator';
import { FinancingCallout } from '@/components/FinancingCallout';
import { Icon } from '@/components/icons';
import { PageHeader, SectionHeading, CtaBand } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/cost-estimator`;

export const metadata: Metadata = {
  title: 'Permanent Lighting Cost Estimator — London, Ontario',
  description:
    'Estimate your permanent LED lighting cost in London & Southwestern Ontario. Pick your home size or roofline length, add options, and see a live CAD range. Financing available.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Permanent Lighting Cost Estimator | Forever Lights',
    description:
      'Get a realistic ballpark for professionally installed permanent LED track lighting on your Southwestern Ontario home. Free, no obligation.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Permanent Lighting Cost Estimator | Forever Lights',
    description: 'Estimate your permanent LED lighting cost in Southwestern Ontario — live CAD range, financing available.',
  },
};

const nextSteps = [
  {
    icon: <Icon.ruler size={22} />,
    title: 'We measure the roofline',
    text: 'A free site visit maps every run, peak and return so the linear footage is exact, not estimated.',
  },
  {
    icon: <Icon.palette size={22} />,
    title: 'We colour-match the track',
    text: 'The channel is matched to your soffit and fascia so it disappears by day.',
  },
  {
    icon: <Icon.file size={22} />,
    title: 'You get a written quote',
    text: 'A firm price with the monthly financing option shown alongside, usually within 24 hours.',
  },
];

export default function CostEstimatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Cost Estimator', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="Cost estimator"
        title="Estimate your permanent LED lighting cost."
        sub="Get a realistic ballpark for professionally installed, app-controlled permanent LED track lighting on your London or Southwestern Ontario home. Financing available, no obligation."
        crumbs={[{ label: 'Cost Estimator' }]}
      />

      {/* ─── Estimator ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <CostEstimator />
        </div>
      </section>

      {/* ─── Financing "ways to pay" band ─── */}
      <FinancingCallout variant="band" ctaHref="/financing" />

      {/* ─── From ballpark to exact price ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="Next step"
            title="From ballpark to exact price"
            sub="This estimator gets you in the right range. The only way to a firm number is a free on-site measurement."
          />
          <ol className="mt-12 grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="card p-6 md:p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0">{s.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Step {i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link href="/resources/permanent-christmas-lights-cost-ontario" className="btn btn-outline">
              Read the 2026 Ontario pricing guide <Icon.arrow size={18} />
            </Link>
            <Link href="/resources" className="btn btn-outline">Browse all resources</Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready for your exact number?"
        text="Book a free site visit. We map your rooflines, colour-match the track to your soffit and hand you a written quote, usually within 24 hours."
        primaryLabel="Book My Free Site Visit"
      />
    </>
  );
}
