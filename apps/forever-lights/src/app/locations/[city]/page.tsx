import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceAreas, getArea, getNearbyAreas, getPhoto, getPhotosByTag, testimonials, site, phoneHref } from '@/lib/site';
import { QuoteForm } from '@/components/QuoteForm';
import { Breadcrumbs, PhotoImg, FeatureCard, SectionHeading, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';

export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string }>;
}

// Hero rotates per city so the 20 pages do not all open on the same photo.
const heroRotation = ['hero-winter', 'warm-white-night', 'red-white-night', 'pink-stone'];

export async function generateStaticParams() {
  return serviceAreas.map(a => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);
  if (!area) return {};
  const url = `https://${site.domain}/locations/${area.slug}`;
  return {
    title: `Permanent LED Lighting in ${area.city}, Ontario | Forever Lights`,
    description: `Forever Lights installs permanent Christmas & year-round LED track lighting in ${area.city}, ON. App-controlled, weatherproof, 5-year warranty. Never hang lights again — free quote!`,
    alternates: { canonical: url },
    openGraph: {
      title: `Permanent LED Lighting in ${area.city}, Ontario | Forever Lights`,
      description: `Professional permanent LED soffit lighting for ${area.city}, Ontario homes. Weatherproof, invisible by day, stunning at night.`,
      url,
      images: [{ url: '/images/photos/permanent-led-roofline-lights-warm-white-night.webp', width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = getArea(city);
  if (!area) notFound();

  const nearby = getNearbyAreas(area.slug, 6);

  // Deterministic picks so each city gets stable, varied content.
  const cityIndex = serviceAreas.findIndex(a => a.slug === area.slug);
  const testimonial = testimonials[cityIndex % testimonials.length];
  const heroPhoto = getPhoto(heroRotation[cityIndex % heroRotation.length]);

  // Gallery rotates through the real-install photos, skipping the hero and the install action shot.
  const realPool = getPhotosByTag('real').filter(p => p.key !== 'technician' && p.key !== heroPhoto.key);
  const cityPhotos = [0, 2, 4].map(offset => realPool[(cityIndex + offset) % realPool.length]);

  const url = `https://${site.domain}/locations/${area.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `${site.name} — ${area.city}`,
      description: `Permanent outdoor LED track lighting installation in ${area.city}, Ontario. ${area.description}`,
      url,
      telephone: site.phone,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: area.city,
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      areaServed: { '@type': 'City', name: `${area.city}, Ontario` },
      openingHours: 'Mo-Fr 08:00-17:00',
      image: `https://${site.domain}/images/photos/permanent-led-roofline-lights-warm-white-night.webp`,
      priceRange: '$$',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Permanent LED Lighting Installation',
      provider: { '@type': 'LocalBusiness', name: site.name, telephone: site.phone },
      areaServed: { '@type': 'City', name: `${area.city}, Ontario` },
      description: `Permanent Christmas and year-round LED track lighting installed on homes and businesses in ${area.city}, Ontario.`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `https://${site.domain}/locations` },
        { '@type': 'ListItem', position: 3, name: area.city, item: url },
      ],
    },
  ];

  const why = [
    { icon: <Icon.smartphone size={22} />, title: 'App-controlled', text: `Change colours and schedules for your ${area.city} home from your phone, anywhere in the world.` },
    { icon: <Icon.eyeOff size={22} />, title: 'Invisible by day', text: 'Tracks are colour-matched to your soffit. Nobody knows they are there until the lights come on.' },
    { icon: <Icon.snowflake size={22} />, title: 'Built for Ontario winters', text: 'IP68 waterproof, UV-rated and CSA-approved, tested to −40°C. Ready for every Southwestern Ontario storm.' },
    { icon: <Icon.pin size={22} />, title: 'Local and nearby', text: `We serve ${area.city} and the surrounding communities, so scheduling your free site visit is quick and easy.` },
    { icon: <Icon.shield size={22} />, title: '5-year parts warranty', text: 'Every installation is backed by a 5-year parts warranty and 1-year labour warranty. No asterisks.' },
    { icon: <Icon.card size={22} />, title: 'Financing available', text: '24-month financing at 10% APR (on approved credit). Install now, spread the cost.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── HERO ─── */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <PhotoImg
            photo={heroPhoto}
            priority
            sizes="100vw"
            quality={72}
            alt={`Permanent LED roofline lighting on a home in ${area.city}, Ontario by Forever Lights`}
            className="object-[62%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
        </div>

        <div className="relative wrap pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs light items={[{ href: '/locations', label: 'Service Areas' }, { label: area.city }]} />
          <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow eyebrow-light">Serving {area.label} · Pop. {area.population}</span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.04] text-white">
                Permanent Christmas &amp; year-round LED lighting in {area.city}, Ontario
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                {area.description} Installed once on your soffit, then controlled forever from your phone. Every holiday, every colour, zero ladders.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#quote" className="btn btn-primary btn-lg">Get a Free {area.city} Quote</a>
                <a href={phoneHref} className="btn btn-outline-light btn-lg"><Icon.phone size={20} /> {site.phone}</a>
              </div>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
                {[
                  { icon: <Icon.smartphone size={18} />, t: 'App-controlled' },
                  { icon: <Icon.shield size={18} />, t: '5-year parts warranty' },
                  { icon: <Icon.snowflake size={18} />, t: 'Rated to −40°C' },
                ].map(b => (
                  <li key={b.t} className="inline-flex items-center gap-2"><span className="text-accent">{b.icon}</span>{b.t}</li>
                ))}
              </ul>
            </div>

            <div id="quote" className="lg:col-span-5 scroll-mt-24">
              <div className="bg-white text-ink rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40">
                <h2 className="text-xl md:text-2xl font-bold">Free quote for {area.city} homes</h2>
                <p className="text-muted text-sm mt-1 mb-5">
                  We visit your {area.city} property, measure the roofline and send a written quote. Usually within 24 hours.
                </p>
                <QuoteForm city={area.city} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCALIZED INTRO ─── */}
      <section className="section bg-white">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow={`Permanent lighting in ${area.city}`}
              title={<>Your {area.city} home, lit beautifully all year long.</>}
            />
            <div className="prose-fl mt-6">
              <p>
                With a population of {area.population}, {area.label} is home to families who take pride in their properties, and Forever Lights helps them stand out in every season. Our permanent LED track is mounted discreetly along your soffit and roofline, colour-matched so it is invisible during the day and dazzling the moment the sun goes down.
              </p>
              <p>
                From a warm-white architectural glow on an ordinary Tuesday to a full red-and-green Christmas display in December, Halloween orange, Canada Day red and white, or your team&apos;s colours for the playoffs, every look is a tap away in the app. No ladders, no tangled strings, no annual contractor call-out. Just your {area.city} home looking its best, every single night.
              </p>
            </div>
          </div>

          {/* Neighbourhoods */}
          <div className="lg:col-span-5 card-soft p-6 md:p-8">
            <h2 className="text-xl font-bold text-ink">Neighbourhoods we serve in {area.city}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Forever Lights installs permanent LED lighting across {area.city} and the surrounding area, including:
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label={`${area.city} neighbourhoods`}>
              {area.neighbourhoods.map(n => (
                <li key={n} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-line px-3.5 py-2 text-sm font-medium text-ink-soft">
                  <Icon.pin size={14} className="text-accent" /> {n}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted">Not listed? We still likely serve you. <Link href="/contact" className="font-semibold text-ink underline underline-offset-4">Ask about your address</Link>.</p>
          </div>
        </div>
      </section>

      {/* ─── WHY (dark) ─── */}
      <section className="section bg-dark text-white">
        <div className="wrap">
          <SectionHeading light eyebrow={`Why ${area.city} chooses Forever Lights`} title={<>Built for {area.city} homes. <br className="hidden md:block" />Built to last.</>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {why.map(f => <FeatureCard key={f.title} dark icon={f.icon} title={f.title} text={f.text} />)}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading align="left" eyebrow="Our work" title="Real permanent lighting installations" sub={`Rooflines, gables and porches near ${area.city} and across Southwestern Ontario.`} />
            <Link href="/gallery" className="btn btn-outline self-start md:self-auto">Full gallery <Icon.arrow size={18} /></Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 md:gap-5">
            {cityPhotos.map(p => (
              <figure key={p.key} className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <PhotoImg
                  photo={p}
                  alt={`${p.alt} — permanent LED lighting near ${area.city}, Ontario`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="group-hover:scale-[1.03] transition-transform duration-700"
                />
                {p.caption && <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 text-ink text-xs font-semibold px-3 py-1.5">{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="section bg-soft border-y border-line">
        <div className="wrap max-w-3xl text-center">
          <div className="flex justify-center gap-0.5 text-accent" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, j) => <Icon.star key={j} size={20} />)}
          </div>
          <blockquote className="mt-6 font-heading text-2xl md:text-3xl font-bold leading-snug text-ink">
            &ldquo;{testimonial.text}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="w-10 h-10 rounded-full bg-ink text-white font-bold text-sm flex items-center justify-center">{testimonial.name[0]}</span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-ink">{testimonial.name}</span>
              <span className="block text-xs text-muted">{testimonial.location}</span>
            </span>
          </figcaption>
        </div>
      </section>

      {/* ─── NEARBY COMMUNITIES ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Coverage" title="Nearby communities we serve" sub={`Just outside ${area.city}? We install permanent LED lighting across these neighbouring towns too.`} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearby.map(n => (
              <Link
                key={n.slug}
                href={`/locations/${n.slug}`}
                className="card p-5 group hover:border-ink transition-colors flex items-center justify-between gap-3 min-h-[72px]"
              >
                <span className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-soft text-ink flex items-center justify-center shrink-0"><Icon.pin size={20} /></span>
                  <span>
                    <span className="block font-bold text-ink">{n.city}, ON</span>
                    <span className="block text-xs text-muted">Permanent LED lighting</span>
                  </span>
                </span>
                <Icon.arrow size={18} className="shrink-0 text-ink transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/locations" className="inline-flex items-center gap-2 font-semibold text-ink min-h-[44px]">All service areas <Icon.arrow size={18} /></Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Ready to transform your {area.city} home?</>}
        text={`Get your free, no-obligation quote today. We visit your ${area.city} property, measure the roofline and provide exact pricing.`}
        photoKey="purple-craftsman"
      />
    </>
  );
}
