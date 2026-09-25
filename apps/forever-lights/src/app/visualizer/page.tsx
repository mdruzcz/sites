import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { getVisualizerCatalog } from '@/lib/visualizer/catalog';
import { VisualizerApp } from '@/components/visualizer/VisualizerApp';
import { vzTheme } from '@/components/visualizer/theme';
import { PageHeader, SectionHeading, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

const url = `https://${site.domain}/visualizer`;

export const metadata: Metadata = {
  title: 'Light Visualizer — Plan Your Permanent Lights on a Photo',
  description:
    'Upload a photo of your home, draw where you want permanent LED lights, and get the footage, the right Forever Lights kit and the extras you need. London, Ontario.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Light Visualizer | Forever Lights',
    description: 'Draw your lights on a photo of your home and get the right kit size, parts list and a checked quote.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Light Visualizer | Forever Lights', description: 'Draw your lights on a photo of your home and get the right kit size, parts list and a checked quote.' },
};

const faqs = [
  { q: 'How accurate is the footage?', a: 'Close enough to pick a kit. A photo flattens perspective, so we add a 10% fitting allowance and always confirm the real numbers against your roofline before anything is charged.' },
  { q: 'What if I cannot set a scale?', a: 'Type your roofline length instead. You can still draw on the photo so we can see exactly where the lights go.' },
  { q: 'What happens after I send it?', a: 'A real person opens your design, checks the runs and jumps, confirms the kit and extras, and emails you a secure payment link with shipping and tax for your province.' },
  { q: 'Can I get it installed instead?', a: 'Yes. Send the plan and mention installation in the notes, or book a free site visit. Installed pricing is on the cost estimator.' },
];

export default function VisualizerPage() {
  const catalog = getVisualizerCatalog();
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Light Visualizer', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Forever Lights Light Visualizer',
      url,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
      description: 'Plan permanent LED roofline lighting on a photo of your home and get a kit recommendation.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Light visualizer"
        title="Draw your lights on a photo. Get the right kit."
        sub="Upload a picture of your home, tap along the roofline where you want permanent lights, and see the footage, the kit that fits and the extras you may need. Send it to us and we check it before you pay a cent."
        crumbs={[{ label: 'Light Visualizer' }]}
      />

      <section className="section-tight bg-white">
        <div className="wrap">
          <VisualizerApp
            catalog={catalog}
            theme={vzTheme}
            site={{ site: 'foreverlights', name: site.name, domain: site.domain, phone: site.phone, path: '/visualizer', kitBasePath: '/kits', samplePhoto: '/images/photos/home-exterior-daytime-permanent-lighting-track-hidden.webp' }}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHeading eyebrow="Tips for a good photo" title="Three things that make the estimate better" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: <Icon.home size={22} />, t: 'Shoot straight on', d: 'Stand across the street, centred on the house, in daylight. Avoid steep angles — they shrink the far side of the roofline.' },
              { icon: <Icon.ruler size={22} />, t: 'Include a ruler', d: 'A garage door or front door in frame gives the tool a known size. A double garage door is 16 ft wide; a front door is 6 ft 8 in tall.' },
              { icon: <Icon.sparkles size={22} />, t: 'Draw every edge', d: 'Follow each eave and gable you want lit. Use an unlit jump to skip a gap, and mark a detached garage as a separate building.' },
            ].map((s) => (
              <li key={s.t} className="card p-6">
                <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center">{s.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap max-w-3xl">
          <SectionHeading eyebrow="Questions" title="About the visualizer" align="left" />
          <dl className="mt-8 divide-y divide-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-bold text-ink">{f.q}</dt>
                <dd className="mt-2 text-muted leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kits" className="btn btn-outline">Browse the DIY kits <Icon.arrow size={18} /></Link>
            <Link href="/cost-estimator" className="btn btn-outline">Installed pricing</Link>
          </div>
        </div>
      </section>

      <CtaBand title="Rather have us measure it?" text="Book a free site visit. We map every run and peak, colour-match the track and hand you a written quote within 24 hours." primaryLabel="Book My Free Site Visit" />
    </>
  );
}
