import type { Metadata } from 'next';
import Link from 'next/link';
import { site, phoneHref, getPhoto } from '@/lib/site';
import { supportGuides, supportVideos, supportDownloads } from '@/lib/support';
import { PageHeader, PhotoImg, ComingSoon, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

const url = `https://${site.domain}/support`;

export const metadata: Metadata = {
  title: 'Owner Support: Guides, Videos, Manuals & Warranty',
  description:
    'Support hub for Forever Lights owners in London & Southwestern Ontario: getting-started guide, app help, installation videos, manuals and downloads, troubleshooting and warranty.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Owner Support | Forever Lights',
    description: 'Guides, installation videos, manuals, troubleshooting and warranty for your permanent LED lighting.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function SupportPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Owner Support', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Forever Lights owner support guides',
      itemListElement: supportGuides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: `https://${site.domain}/support/${g.slug}` })),
    },
  ];

  const readyDownloads = supportDownloads.filter(d => d.href).length;
  const readyVideos = supportVideos.filter(v => v.url).length;

  const hubs = [
    { href: '/support/getting-started', icon: <Icon.book size={24} />, t: 'Getting started', d: 'What is on your home, how it is powered and the three settings to do on night one.' },
    { href: '/support/using-the-app', icon: <Icon.smartphone size={24} />, t: 'Using the app', d: 'Colours, scenes, effects, dusk-to-dawn schedules, zones and sharing access.' },
    { href: '/support/installation-videos', icon: <Icon.video size={24} />, t: 'Installation videos', d: `${supportVideos.length} short videos on install day, the track, the app and winter care.`, soon: readyVideos === 0 },
    { href: '/support/manuals', icon: <Icon.file size={24} />, t: 'Manuals & downloads', d: `${readyDownloads} PDFs ready now: quick start guide, warranty terms and care checklist. More coming.` },
    { href: '/support/troubleshooting', icon: <Icon.wrench size={24} />, t: 'Troubleshooting', d: 'Whole system dark, one section out, wrong colours or the controller offline. Fix it in minutes.' },
    { href: '/support/care-and-maintenance', icon: <Icon.leaf size={24} />, t: 'Care & maintenance', d: 'The short seasonal list, and what to tell painters, roofers and eavestrough crews.' },
    { href: '/warranty', icon: <Icon.shield size={24} />, t: 'Warranty', d: '5-year parts, 1-year workmanship, lifetime phone support. What is covered and how to claim.' },
    { href: '/contact', icon: <Icon.headset size={24} />, t: 'Request service', d: 'Book a repair or a re-hang before other contractors work on your home.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Owner support"
        title="Everything you need after install day."
        sub="Guides, videos, manuals and warranty details for Forever Lights owners. And a real person on the phone Monday to Friday."
        crumbs={[{ label: 'Owner Support' }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={phoneHref} className="btn btn-primary"><Icon.phone size={18} /> {site.phone}</a>
          <a href={`mailto:${site.email}`} className="btn btn-outline"><Icon.mail size={18} /> {site.email}</a>
        </div>
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hubs.map(h => (
              <Link key={h.href} href={h.href} className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-soft text-ink flex items-center justify-center">{h.icon}</span>
                  {h.soon && <ComingSoon />}
                </div>
                <h2 className="text-lg font-bold text-ink">{h.t}</h2>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{h.d}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">Open <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick fixes */}
      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <PhotoImg photo={getPhoto('puck-closeup')} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <span className="eyebrow">Before you call</span>
            <h2 className="mt-3 text-3xl font-bold text-ink">The three fixes that solve most calls</h2>
            <ol className="mt-6 space-y-4">
              {[
                { t: 'Whole system dark?', d: 'Check the plug, press RESET on the GFCI outlet, then check the breaker. Storms and outages trip GFCIs all the time.' },
                { t: 'Controller offline in the app?', d: 'Unplug the power supply for 15 seconds. If you changed your Wi-Fi or password, re-pair it (two minutes).' },
                { t: 'One section dark or the wrong colour?', d: 'That is a connector or a point. It is covered. Note where it starts and call us; never climb up to look.' },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-ink">{s.t}</h3>
                    <p className="text-[15px] text-ink-soft leading-relaxed mt-1">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/support/troubleshooting" className="mt-6 inline-flex items-center gap-2 font-semibold text-ink min-h-[44px]">Full troubleshooting guide <Icon.arrow size={18} /></Link>
          </div>
        </div>
      </section>

      {/* Downloads preview */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="eyebrow">Manuals & downloads</span>
              <h2 className="mt-3 text-3xl font-bold text-ink">Ready to save or print</h2>
            </div>
            <Link href="/support/manuals" className="btn btn-outline self-start md:self-auto">All downloads <Icon.arrow size={18} /></Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {supportDownloads.filter(d => d.href).map(d => (
              <a key={d.title} href={d.href!} download className="card p-6 flex items-start gap-4 hover:border-ink transition-colors">
                <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0"><Icon.download size={22} /></span>
                <span>
                  <span className="block font-bold text-ink">{d.title}</span>
                  <span className="block text-sm text-muted mt-1 leading-relaxed">{d.description}</span>
                  <span className="mt-2 chip">{d.size ?? 'PDF'}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not a Forever Lights owner yet?"
        text="This is the support you get after install day. Book a free site visit and see what it costs to never hang lights again."
        photoKey="hero-winter"
        primaryLabel="Get a Free Quote"
      />
    </>
  );
}
