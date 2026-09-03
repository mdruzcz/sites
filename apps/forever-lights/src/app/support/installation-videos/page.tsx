import type { Metadata } from 'next';
import Link from 'next/link';
import { site, getPhoto, phoneHref } from '@/lib/site';
import { supportVideos } from '@/lib/support';
import { PageHeader, PhotoImg, ComingSoon, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

const url = `https://${site.domain}/support/installation-videos`;

export const metadata: Metadata = {
  title: 'Installation & How-To Videos',
  description:
    'Short videos on what to expect on install day, how the permanent LED track mounts, the controller and app, schedules, holiday presets and winter care. New videos coming soon.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Installation & How-To Videos | Forever Lights',
    description: 'What to expect on install day, how the track mounts, app setup, schedules and winter care.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function InstallationVideosPage() {
  const ready = supportVideos.filter(v => v.url);
  const planned = supportVideos.filter(v => !v.url);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Owner Support', item: `https://${site.domain}/support` },
      { '@type': 'ListItem', position: 3, name: 'Installation Videos', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Installation videos"
        title="Watch how it goes up, and how to run it."
        sub="We are filming a short series this season: install day, the track, the controller, app setup, schedules and winter care. Each one is a few minutes long."
        crumbs={[{ href: '/support', label: 'Owner Support' }, { label: 'Installation Videos' }]}
      >
        {ready.length === 0 && (
          <div className="card bg-tint border-accent/50 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <ComingSoon />
            <p className="text-[15px] text-ink-soft flex-1">
              The first videos are being filmed on installs this fall. Until then, every topic below is covered step by step in the written guides.
            </p>
            <Link href="/support/getting-started" className="btn btn-dark btn-sm">Read the guides <Icon.arrow size={16} /></Link>
          </div>
        )}
      </PageHeader>

      {ready.length > 0 && (
        <section className="section">
          <div className="wrap">
            <h2 className="text-2xl font-bold text-ink mb-6">Watch now</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ready.map(v => (
                <VideoCard key={v.slug} v={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={ready.length > 0 ? 'section bg-soft border-t border-line' : 'section'}>
        <div className="wrap">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <span className="eyebrow">{ready.length > 0 ? 'In production' : 'The series'}</span>
              <h2 className="mt-3 text-3xl font-bold text-ink">{planned.length} videos planned</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {planned.map(v => (
              <VideoCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap max-w-4xl">
          <div className="card p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <span className="w-12 h-12 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0"><Icon.headset size={24} /></span>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ink">Prefer a walkthrough right now?</h2>
              <p className="text-[15px] text-muted mt-1">Call us during office hours and we will go through app setup or a re-pair with you on the phone. It usually takes five minutes.</p>
            </div>
            <a href={phoneHref} className="btn btn-primary"><Icon.phone size={18} /> {site.phone}</a>
          </div>
        </div>
      </section>

      <CtaBand title="Want to see it on your own home?" text="Book a free site visit and we will show you exactly where the track goes and what it looks like at night." primaryLabel="Get a Free Quote" />
    </>
  );
}

function VideoCard({ v }: { v: (typeof supportVideos)[number] }) {
  const photo = getPhoto(v.photoKey);
  const inner = (
    <>
      <div className="relative aspect-video">
        <PhotoImg photo={photo} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className={v.url ? '' : 'grayscale-[35%] opacity-90'} />
        <div className="absolute inset-0 bg-dark/35" />
        <span className={`absolute inset-0 flex items-center justify-center ${v.url ? 'text-white' : 'text-white/80'}`}>
          <span className="w-14 h-14 rounded-full bg-white/90 text-ink flex items-center justify-center"><Icon.play size={28} /></span>
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-dark/80 text-white text-xs font-semibold px-2.5 py-1">{v.length}</span>
        {!v.url && <ComingSoon className="absolute top-3 left-3 bg-white" />}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-ink leading-snug">{v.title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">{v.description}</p>
      </div>
    </>
  );
  return v.url ? (
    <a href={v.url} target="_blank" rel="noopener" className="card overflow-hidden hover:border-ink transition-colors flex flex-col">{inner}</a>
  ) : (
    <div className="card overflow-hidden flex flex-col" aria-label={`${v.title} (coming soon)`}>{inner}</div>
  );
}
