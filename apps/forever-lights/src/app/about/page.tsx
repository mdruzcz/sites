import type { Metadata } from 'next';
import { site, serviceAreas, getPhoto } from '@/lib/site';
import { Icon } from '@/components/icons';
import { PageHeader, PhotoImg, FeatureCard, CtaBand, SectionHeading } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/about`;

export const metadata: Metadata = {
  title: 'About Us — Permanent LED Lighting Experts',
  description: `Learn about ${site.name} — the permanent outdoor LED lighting company serving London, Ontario and Southwestern Ontario. Local experts, 5-year warranty.`,
  alternates: { canonical: url },
  openGraph: {
    title: `About ${site.name} — Permanent LED Lighting Experts`,
    description: `The permanent outdoor LED lighting company serving London, Ontario and Southwestern Ontario. Local crew, 5-year parts warranty.`,
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const values = [
  {
    icon: <Icon.pin size={22} />,
    title: 'Local experts',
    text: 'We live and work in the communities we serve. We know the homes, the weather and what a roofline here has to stand up to.',
  },
  {
    icon: <Icon.wrench size={22} />,
    title: 'Professional install',
    text: 'Bucket lifts, trained installers and a clean site when we leave. Every single time.',
  },
  {
    icon: <Icon.shield size={22} />,
    title: 'Quality products',
    text: 'CSA-approved, IP68-rated, 50,000-hour LEDs backed by a 5-year parts warranty. No shortcuts.',
  },
  {
    icon: <Icon.file size={22} />,
    title: 'Transparent process',
    text: 'Clear written quotes and invoices, a fixed price before we start and no surprises after.',
  },
];

const numbers = [
  { v: '200+', l: 'Homes lit across Southwestern Ontario' },
  { v: String(serviceAreas.length), l: 'Communities we visit for free quotes' },
  { v: '5 yr', l: 'Parts warranty on every install' },
  { v: '1 day', l: 'Typical install for a family home' },
];

export default function AboutPage() {
  const crew = getPhoto('technician');
  const night = getPhoto('warm-white-night');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'About', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="About us"
        title="Lighting up Ontario, one home at a time."
        sub="Forever Lights was founded by a team of Southern Ontario locals who got tired of watching their neighbours (and themselves) risk their safety every December hanging lights. We decided there had to be a better way."
        crumbs={[{ label: 'About' }]}
      />

      {/* ─── STORY ─── */}
      <section className="section bg-white">
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="grid grid-cols-5 gap-4">
            <figure className="relative col-span-3 rounded-2xl overflow-hidden aspect-[3/4]">
              <PhotoImg photo={crew} sizes="(max-width: 1024px) 60vw, 30vw" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 text-ink text-xs font-semibold px-3 py-1.5">
                {crew.caption}
              </figcaption>
            </figure>
            <figure className="relative col-span-2 rounded-2xl overflow-hidden aspect-[3/4] translate-y-8">
              <PhotoImg photo={night} sizes="(max-width: 1024px) 40vw, 20vw" />
              <figcaption className="absolute top-3 left-3 rounded-full bg-ink text-white text-xs font-semibold px-3 py-1.5">
                {night.caption}
              </figcaption>
            </figure>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Built by people who grew up under these rooflines."
            />
            <div className="mt-6 space-y-4 text-ink-soft leading-relaxed text-[1.05rem]">
              <p>
                We grew up in Southwestern Ontario — London, Woodstock, Brantford, St. Thomas. We know these
                communities, we know the homes, and we understand what it means to take pride in your property.
              </p>
              <p>
                When permanent LED track lighting became available, we saw an opportunity: install it right, back it
                with a real warranty, and make sure every homeowner in our community could enjoy their home year-round.
              </p>
              <p>
                Today we serve hundreds of homes across the region with professional installations, a 5-year parts
                warranty, and a simple promise: your lights work, or we fix them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="section bg-soft">
        <div className="wrap">
          <SectionHeading eyebrow="What we stand for" title="Four things every customer can count on." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => (
              <FeatureCard key={v.title} icon={v.icon} title={v.title} text={v.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BY THE NUMBERS ─── */}
      <section className="bg-white border-y border-line">
        <div className="wrap py-12 md:py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {numbers.map(n => (
            <div key={n.l}>
              <div className="font-heading text-3xl md:text-4xl font-bold text-ink">{n.v}</div>
              <div className="mt-2 text-sm text-muted leading-snug max-w-[14rem] mx-auto">{n.l}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to see what we can do for your home?"
        text="Book a free site visit and get a detailed, no-obligation quote. We colour-match your soffit and show you exactly what your home will look like."
      />
    </>
  );
}
