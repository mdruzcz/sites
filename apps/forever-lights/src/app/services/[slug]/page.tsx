import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, getService, getPhoto, serviceAreas, site, phoneHref, type Photo } from '@/lib/site';
import { FinancingCallout } from '@/components/FinancingCallout';
import { QuoteForm } from '@/components/QuoteForm';
import { Breadcrumbs, PhotoImg, CheckList, CtaBand, SectionHeading } from '@/components/ui';
import { ServiceIcon } from '@/components/ServiceIcon';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

// Hero photo per service, with a warm-white fallback.
const heroKeys: Record<string, string> = {
  'permanent-christmas-lighting': 'red-white-night',
  'permanent-accent-lighting': 'warm-white-night',
  'holiday-colour-themes': 'bungalow-rainbow',
  'commercial-permanent-lighting': 'canada-day-barn',
  'soffit-roofline-track-lighting': 'track-closeup',
  'repairs-maintenance': 'technician',
};

// Three supporting photos per service (never repeats the hero).
const relatedKeys: Record<string, string[]> = {
  'permanent-christmas-lighting': ['hero-winter', 'rainbow-2728', 'puck-closeup'],
  'permanent-accent-lighting': ['bungalow-warm', 'pink-stone', 'cottage'],
  'holiday-colour-themes': ['bungalow-pink', 'blue-bungalow', 'green-barn'],
  'commercial-permanent-lighting': ['green-barn', 'warm-white-night', 'daytime-brown'],
  'soffit-roofline-track-lighting': ['daytime-grey', 'puck-closeup', 'daytime-brown'],
  'repairs-maintenance': ['track-closeup', 'puck-closeup', 'warm-white-night'],
};

function heroFor(slug: string): Photo {
  return getPhoto(heroKeys[slug] ?? 'warm-white-night');
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const url = `https://${site.domain}/services/${service.slug}`;
  const hero = heroFor(service.slug);
  return {
    title: `${service.title} | Forever Lights`,
    description: `${service.description.slice(0, 155)}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} — London, Ontario | Forever Lights`,
      description: service.description,
      url,
      images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `https://${site.domain}/services/${service.slug}`;
  const heroPhoto = heroFor(service.slug);
  const related = (relatedKeys[service.slug] ?? ['bungalow-warm', 'red-white-night', 'blue-bungalow']).map(getPhoto);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      serviceType: service.title,
      description: service.description,
      provider: {
        '@type': 'LocalBusiness',
        name: site.name,
        telephone: site.phone,
        email: site.email,
        url: `https://${site.domain}`,
      },
      areaServed: serviceAreas.map(a => ({ '@type': 'City', name: `${a.city}, Ontario` })),
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `https://${site.domain}/services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
  ];

  const otherServices = services.filter(s => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── HERO ─── */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <PhotoImg photo={heroPhoto} priority sizes="100vw" quality={72} />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/30" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark to-transparent" />
        </div>
        <div className="relative wrap pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs light items={[{ href: '/services', label: 'Services' }, { label: service.shortTitle }]} />
          <div className="mt-8 max-w-3xl">
            <span className="eyebrow eyebrow-light">Permanent LED lighting · {site.region}</span>
            <div className="mt-5 flex items-start gap-4">
              <span className="hidden sm:flex w-12 h-12 rounded-xl bg-white/10 text-accent items-center justify-center shrink-0 mt-1">
                <ServiceIcon slug={service.slug} size={24} />
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">{service.title}</h1>
            </div>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">{service.intro ?? service.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#quote" className="btn btn-primary btn-lg">Get a Free Quote</a>
              <a href={phoneHref} className="btn btn-outline-light btn-lg"><Icon.phone size={20} /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BODY + SIDEBAR ─── */}
      <section className="section bg-white">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="prose-fl">
              {(service.body ?? [service.description]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 card p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-ink">What&apos;s included</h2>
              <CheckList items={service.features} className="mt-5" />
              <p className="mt-6 text-sm text-muted">
                Every install comes with the same {site.warranty.toLowerCase()} warranty and our own crew doing the service calls.
              </p>
            </div>

            <div className="mt-8">
              <FinancingCallout variant="compact" ctaHref="/financing" />
            </div>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line p-5">
              <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0"><Icon.ruler size={22} /></span>
              <div>
                <h3 className="font-bold text-ink">Want a ballpark before you book?</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">Pick your home size or roofline length and see a live estimated range in under a minute.</p>
                <Link href="/cost-estimator" className="mt-2 inline-flex items-center gap-2 font-semibold text-ink min-h-[44px]">
                  Try the cost estimator <Icon.arrow size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky quote card */}
          <aside className="lg:col-span-5">
            <div id="quote" className="lg:sticky lg:top-24 scroll-mt-24 card p-6 md:p-8 shadow-xl shadow-black/5">
              <span className="eyebrow">Free site visit</span>
              <h2 className="mt-3 text-xl md:text-2xl font-bold text-ink">Get your free quote</h2>
              <p className="text-muted text-sm mt-1 mb-5">
                We visit your property, measure the roofline and send a written quote. Usually within 24 hours.
              </p>
              <QuoteForm compact />
              <p className="mt-4 text-xs text-muted text-center">{site.warranty} · Serving {site.region}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── RELATED PHOTOS ─── */}
      <section className="section bg-soft border-y border-line">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading align="left" eyebrow="Our work" title={`${service.shortTitle} on real homes`} sub="Rooflines, gables and porches across Southwestern Ontario." />
            <Link href="/gallery" className="btn btn-outline self-start md:self-auto">Full gallery <Icon.arrow size={18} /></Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 md:gap-5">
            {related.map(p => (
              <figure key={p.key} className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <PhotoImg photo={p} sizes="(max-width: 640px) 100vw, 33vw" className="group-hover:scale-[1.03] transition-transform duration-700" />
                {p.caption && <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 text-ink text-xs font-semibold px-3 py-1.5">{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OTHER SERVICES ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading align="left" eyebrow="Explore more" title="Other ways to use the same track" />
            <Link href="/services" className="btn btn-outline self-start md:self-auto">All services <Icon.arrow size={18} /></Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {otherServices.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col">
                <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center mb-5"><ServiceIcon slug={s.slug} size={22} /></span>
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink min-h-[44px]">
                  Learn more <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand photoKey={heroPhoto.key === 'warm-white-night' ? 'purple-craftsman' : 'warm-white-night'} />
    </>
  );
}
