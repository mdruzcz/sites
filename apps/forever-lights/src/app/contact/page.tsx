import type { Metadata } from 'next';
import { site, phoneHref } from '@/lib/site';
import { QuoteForm } from '@/components/QuoteForm';
import { Icon } from '@/components/icons';
import { PageHeader } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/contact`;

export const metadata: Metadata = {
  title: 'Get a Free Quote — Permanent LED Lighting',
  description: `Request a free, no-obligation quote for permanent outdoor LED lighting from ${site.name}. We serve ${site.region}. Call ${site.phone} or fill out the form.`,
  alternates: { canonical: url },
  openGraph: {
    title: `Get a Free Quote — Permanent LED Lighting | ${site.name}`,
    description: `Free, no-obligation quotes for permanent outdoor LED lighting across ${site.region}. Call ${site.phone} or send the form.`,
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const steps = [
  {
    title: 'We get back to you within 24 hours',
    text: 'A real person calls or emails to confirm a time for your free site visit that suits your schedule.',
  },
  {
    title: 'Free site visit and colour match',
    text: 'We measure your roofline, match the track to your soffit and fascia, and answer every question on the spot.',
  },
  {
    title: 'Written quote, then a one-day install',
    text: 'You get an exact written price. Say yes and most homes are installed, wired and tested in a single day.',
  },
];

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: url },
    ],
  };

  const rows: { icon: React.ReactNode; label: string; value: string; href?: string }[] = [
    { icon: <Icon.phone size={20} />, label: 'Phone', value: site.phone, href: phoneHref },
    { icon: <Icon.mail size={20} />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: <Icon.clock size={20} />, label: 'Hours', value: site.hours },
    { icon: <Icon.pin size={20} />, label: 'Service area', value: `${site.address} and ${site.region}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="Free quote"
        title="Let’s light up your home."
        sub="Fill out the form and we’ll contact you within 24 hours to schedule a free site visit. No pressure, no obligation — just a conversation about what permanent lighting could look like on your home."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section bg-white">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ─── Details + what happens next ─── */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <h2 className="text-2xl font-bold text-ink">Talk to a real person</h2>
            <ul className="mt-5 border-y border-line divide-y divide-line">
              {rows.map(r => {
                const inner = (
                  <>
                    <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0">{r.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted">{r.label}</span>
                      <span className="block font-semibold text-ink break-words">{r.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={r.label} className="py-3">
                    {r.href ? (
                      <a href={r.href} className="flex items-center gap-4 min-h-[44px] rounded-xl hover:bg-soft transition-colors -mx-2 px-2">
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 min-h-[44px] -mx-2 px-2">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <h2 className="mt-12 text-2xl font-bold text-ink">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="w-11 h-11 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{s.title}</h3>
                    <p className="mt-1 text-[15px] text-muted leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-sm text-muted">
              Prefer to talk it through? Call{' '}
              <a href={phoneHref} className="inline-flex items-center min-h-[44px] font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
                {site.phone}
              </a>{' '}
              during business hours.
            </p>
          </div>

          {/* ─── Form ─── */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="card p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-ink">Request your free quote</h2>
              <p className="mt-1 mb-6 text-sm text-muted">
                Tell us a little about your home and we will be in touch within 24 hours.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
