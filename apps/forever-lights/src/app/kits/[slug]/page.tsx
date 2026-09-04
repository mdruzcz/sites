import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site, phoneHref } from '@/lib/site';
import {
  kits, kitColours, getKit, kitImage, kitBom, kitLightCount, kitTrackFeet, kitSaving, formatCad, kitTitle,
} from '@/lib/kits';
import { Breadcrumbs, SectionHeading, CheckList, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';
import { KitRequestForm } from '@/components/KitRequestForm';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return kits.map(k => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKit(slug);
  if (!kit) return {};
  const url = `https://${site.domain}/kits/${kit.slug}`;
  const title = `${kit.feet} ft DIY Permanent Lighting Kit`;
  const description = `The ${kit.feet} ft Forever Lights DIY kit: ${kitLightCount(kit)} RGBW lights, ${kitTrackFeet(kit)} ft of aluminum track, controller, power and connectors. ${formatCad(kit.price)} plus shipping and tax.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Forever Lights`,
      description,
      url,
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${title} | Forever Lights`, description },
  };
}

export default async function KitDetailPage({ params }: Props) {
  const { slug } = await params;
  const kit = getKit(slug);
  if (!kit) notFound();

  const url = `https://${site.domain}/kits/${kit.slug}`;
  const rows = kitBom(kit);
  const others = kits.filter(k => k.slug !== kit.slug);
  const kitOptions = kits.map(k => ({ slug: k.slug, label: kitTitle(k), price: formatCad(k.price) }));
  const colourOptions = kitColours.map(c => ({ key: c.key, label: c.label }));
  const totalParts = rows.reduce((n, r) => n + r.qty, 0);
  const heroImg = kitImage('aluminum-track');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `Forever Lights ${kit.feet} ft Permanent Lighting Kit`,
      description: `DIY permanent LED roofline lighting kit covering about ${kit.feet} feet. Includes ${kitLightCount(kit)} RGBW light points, ${kitTrackFeet(kit)} feet of aluminum track, a WiFi controller, power supplies and all connectors.`,
      url,
      brand: { '@type': 'Brand', name: site.name },
      category: 'Permanent outdoor LED lighting kit',
      offers: {
        '@type': 'Offer',
        price: kit.price.toFixed(2),
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        url,
        seller: { '@type': 'Organization', name: site.name },
        priceValidUntil: '2026-12-31',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'DIY Kits', item: `https://${site.domain}/kits` },
        { '@type': 'ListItem', position: 3, name: kitTitle(kit), item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="bg-soft border-b border-line">
        <div className="wrap pt-8 pb-12 md:pt-10 md:pb-16">
          <Breadcrumbs items={[{ href: '/kits', label: 'DIY Kits' }, { label: `${kit.feet} ft kit` }]} />
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">DIY kit</span>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-ink leading-[1.05]">{kit.feet} ft permanent lighting kit</h1>
              <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-xl">{kit.suits}</p>
              <p className="mt-8 font-heading text-4xl md:text-5xl font-bold text-ink">{formatCad(kit.price)}</p>
              <p className="mt-2 text-sm text-muted">
                Kit only, about {formatCad(kit.price / kit.feet, 2)} per foot. Shipping and provincial tax quoted separately.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a href="#request" className="btn btn-primary btn-lg">Request this kit</a>
                <a href={phoneHref} className="btn btn-outline btn-lg"><Icon.phone size={20} /> {site.phone}</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-line aspect-[4/3]">
                {heroImg && (
                  <Image
                    src={heroImg.src}
                    alt={`Aluminum track and RGBW puck lights supplied in the Forever Lights ${kit.feet} ft permanent lighting kit`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain p-6"
                    placeholder="blur"
                    blurDataURL={heroImg.blurDataURL}
                  />
                )}
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { t: `${kitLightCount(kit)}`, l: 'RGBW lights' },
                  { t: `${kitTrackFeet(kit)} ft`, l: 'track supplied' },
                  { t: `${totalParts}`, l: 'parts in the box' },
                ].map(s => (
                  <div key={s.l} className="card p-4">
                    <dt className="font-heading text-xl font-bold text-ink">{s.t}</dt>
                    <dd className="text-xs text-muted mt-0.5">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* BOM */}
      <section className="section">
        <div className="wrap">
          <SectionHeading align="left" eyebrow="What is in the box" title={`Everything in the ${kit.feet} ft kit.`} sub={`The kit ships with ${kitTrackFeet(kit)} feet of track, a little more than the nominal ${kit.feet} feet, so you have room for corners and offcuts.`} />
          <div className="mt-10 grid gap-4">
            {rows.map(({ component, qty }) => {
              const img = kitImage(component.image);
              return (
                <div key={component.key} className="card p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-white border border-line">
                    {img ? (
                      <Image
                        src={img.src}
                        alt={`${component.name} included in the ${kit.feet} ft Forever Lights kit`}
                        fill
                        sizes="112px"
                        className="object-contain p-2"
                        placeholder="blur"
                        blurDataURL={img.blurDataURL}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-muted">
                        {component.key === 'controller' ? <Icon.wifi size={36} /> : <Icon.wrench size={36} />}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-bold text-ink">{component.name}</h3>
                      <span className="chip">Qty {qty}</span>
                    </div>
                    <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{component.blurb}</p>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{component.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value + colours */}
      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap grid lg:grid-cols-2 gap-10">
          <div className="card p-7">
            <h2 className="text-xl font-bold text-ink">DIY versus letting us install it</h2>
            <dl className="mt-5 space-y-3 text-[15px]">
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-muted">This kit, you install</dt>
                <dd className="font-semibold text-ink whitespace-nowrap">{formatCad(kit.price)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-muted">Same length, installed by us</dt>
                <dd className="font-semibold text-ink whitespace-nowrap">{formatCad(kit.installedLow)} – {formatCad(kit.installedHigh)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink font-medium">You save</dt>
                <dd className="font-heading text-2xl font-bold text-ink whitespace-nowrap">{formatCad(kitSaving(kit))}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-muted leading-relaxed">
              The saving is the labour: measuring, mounting, wiring, commissioning and the 1-year workmanship warranty. The
              5-year parts warranty is the same either way. Kit price excludes shipping and provincial tax.
            </p>
            <Link href="/resources/diy-permanent-lights-vs-professional-installation" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink min-h-[44px]">
              Which is right for you? <Icon.arrow size={16} />
            </Link>
          </div>
          <div className="card p-7">
            <h2 className="text-xl font-bold text-ink">Choose your track colour</h2>
            <p className="mt-2 text-[15px] text-muted leading-relaxed">
              Match the channel to your soffit and fascia so it reads as trim in daylight.
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {kitColours.map(c => (
                <li key={c.key} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={c.hex ? { background: c.hex } : { background: 'linear-gradient(135deg,#ec3013,#f2a900,#17a15a,#0aa5c9,#7b3fd4)' }}
                    aria-hidden="true"
                  />
                  {c.label}
                </li>
              ))}
            </ul>
            <h3 className="mt-7 font-bold text-ink">You will also need</h3>
            <CheckList
              className="mt-3"
              items={[
                'A cordless drill and a ladder you are safe working from',
                'A GFCI-protected outlet within reach of the run',
                'Tin snips or a hacksaw for cutting track to length',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="section scroll-mt-24">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="Request this kit" title={`Get a total for the ${kit.feet} ft kit.`} />
            <p className="mt-5 text-ink-soft leading-relaxed">
              There is no checkout here. Send us your shipping address and we will email a written total, the kit at{' '}
              {formatCad(kit.price)} plus exact shipping to your postal code and the tax for your province. Nothing is charged
              until you agree to it.
            </p>
            <div className="mt-8 card-soft p-6">
              <h3 className="font-bold text-ink flex items-center gap-2"><Icon.headset size={20} /> Not sure this is the right size?</h3>
              <p className="mt-2 text-[15px] text-muted leading-relaxed">
                Put your roofline length in the notes, or call us and we will size it with you. Swapping to a different kit
                before you pay is no trouble.
              </p>
              <a href={phoneHref} className="btn btn-dark btn-sm mt-4"><Icon.phone size={16} /> {site.phone}</a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-ink">Kit request</h2>
              <p className="text-muted text-sm mt-1 mb-6">We reply within one business day with shipping and tax.</p>
              <KitRequestForm kitOptions={kitOptions} colourOptions={colourOptions} defaultKit={kit.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Other kits */}
      <section className="section-tight bg-soft border-t border-line">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <SectionHeading align="left" eyebrow="Other sizes" title="Need more or less coverage?" />
            <Link href="/kits" className="btn btn-outline self-start md:self-auto">All kits <Icon.arrow size={18} /></Link>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {others.map(k => (
              <Link key={k.slug} href={`/kits/${k.slug}`} className="card p-5 hover:border-ink transition-colors group">
                <h3 className="font-heading text-xl font-bold text-ink">{k.feet} ft</h3>
                <p className="mt-1 font-semibold text-ink">{formatCad(k.price)}</p>
                <p className="mt-1 text-xs text-muted">{kitLightCount(k)} lights</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  View <Icon.arrow size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Rather have it installed?"
        text="Our crew measures, colour-matches the track and commissions the system in a day, with a written quote before anything starts."
        primaryLabel="Get an installed quote"
        photoKey="technician"
      />
    </>
  );
}
