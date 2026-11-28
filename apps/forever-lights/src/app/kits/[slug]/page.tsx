import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site, phoneHref, getPhoto } from '@/lib/site';
import {
  kits, kitColours, getKit, kitImage, kitBom, kitLightCount, kitTrackFeet, kitSaving, kitPhotoKey, formatCad, kitTitle,
} from '@/lib/kits';
import { Breadcrumbs, SectionHeading, CheckList, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';
import { KitRequestForm } from '@/components/KitRequestForm';
import { AddToCart } from '@/components/AddToCart';
import { AddOns } from '@/components/AddOns';
import { KitGallery, type GalleryImage } from '@/components/KitGallery';
import { KitStoreFacts } from '@/components/KitStoreFacts';
import { SHIP_LINE, kitFaqByKeys } from '@/lib/kit-store';
import { KitCard } from '@/components/KitCard';
import { orderableColours, addonCatalog } from '@/lib/shop';
import { STOCK_NOTE } from '@/lib/kits';

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
  const description = `Buy the ${kit.feet} ft Forever Lights DIY kit online: ${kitLightCount(kit)} RGBW lights, ${kitTrackFeet(kit)} ft of track, controller and connectors. ${formatCad(kit.price)}. Ships across Canada, pay by card.`;
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
  const colours = orderableColours.map(c => ({ key: c.key, label: c.label, hex: c.hex }));
  const orderFaq = kitFaqByKeys(['canada', 'shipping', 'returns', 'warranty']);

  // Lead with a lit home (a different photo for every kit size), then the parts.
  const photo = getPhoto(kitPhotoKey(kit));
  const mounted = getPhoto('track-closeup');
  const trackImg = kitImage('aluminum-track');
  const strandImg = kitImage('rgbw-light-strand');
  const supplyImg = kitImage('power-supply-150w');
  const gallery: GalleryImage[] = [
    { src: photo.src, alt: photo.alt, blurDataURL: photo.blurDataURL, fit: 'cover', label: photo.caption ?? 'Permanent roofline lighting at night' },
    ...(trackImg ? [{
      src: trackImg.src,
      alt: `Aluminum permanent lighting track in black, beige, white and brown with RGBW puck lights fitted, as supplied in the Forever Lights ${kit.feet} ft kit`,
      blurDataURL: trackImg.blurDataURL,
      fit: 'contain' as const,
      label: 'Aluminum track in the four stock colours',
    }] : []),
    ...(strandImg ? [{
      src: strandImg.src,
      alt: `Five-light RGBW strand with sealed twist connectors, ${kit.bom.strand} supplied in the Forever Lights ${kit.feet} ft kit`,
      blurDataURL: strandImg.blurDataURL,
      fit: 'contain' as const,
      label: `5-light RGBW strand, ${kit.bom.strand} in this kit`,
    }] : []),
    { src: mounted.src, alt: mounted.alt, blurDataURL: mounted.blurDataURL, fit: 'cover', label: 'Track and lights mounted under an eave' },
    ...(supplyImg ? [{
      src: supplyImg.src,
      alt: `150 W waterproof plug-in power supply included in the Forever Lights ${kit.feet} ft permanent lighting kit`,
      blurDataURL: supplyImg.blurDataURL,
      fit: 'contain' as const,
      label: `150 W plug-in power supply, ${kit.bom.powerSupply} in this kit`,
    }] : []),
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `Forever Lights ${kit.feet} ft Permanent Lighting Kit`,
      description: `DIY permanent LED roofline lighting kit covering about ${kit.feet} feet. Includes ${kitLightCount(kit)} RGBW light points, ${kitTrackFeet(kit)} feet of aluminum track, a WiFi controller, power supplies and all connectors.`,
      url,
      image: [photo.src, ...(trackImg ? [trackImg.src] : [])].map(src => `https://${site.domain}${src}`),
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

      {/* Product: photos, price, buy box */}
      <section className="bg-soft border-b border-line">
        <div className="wrap pt-6 pb-12 md:pb-16">
          <Breadcrumbs items={[{ href: '/kits', label: 'DIY Kits' }, { label: `${kit.feet} ft kit` }]} />
          <div className="mt-5 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-28">
              <KitGallery images={gallery} note="Example install. Measure your own roofline to pick a size." />
            </div>
            <div>
              <span className="eyebrow">DIY kit · ships across Canada</span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-ink leading-[1.08]">{kit.feet} ft permanent lighting kit</h1>
              <p className="mt-3 text-[17px] text-ink-soft leading-relaxed">
                Covers {kit.suits.charAt(0).toLowerCase() + kit.suits.slice(1)}{' '}
                <span className="text-muted">
                  {kitLightCount(kit)} RGBW lights, {kitTrackFeet(kit)} ft of track, WiFi controller, power and every connector: {totalParts} parts in one order.
                </span>
              </p>
              <div id="order" className="mt-5 scroll-mt-28">
                <AddToCart
                  slug={kit.slug}
                  feet={kit.feet}
                  price={kit.price}
                  perFootLabel={`${formatCad(kit.price / kit.feet, 2)} per foot`}
                  shipLine={SHIP_LINE}
                  colours={colours}
                />
              </div>
              <KitStoreFacts columns="two" className="mt-7" />
              <p className="mt-6 text-sm text-ink-soft leading-relaxed">
                Not sure this is the right size, or the right colour?{' '}
                <a href={phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-ink underline underline-offset-4 min-h-[44px]"><Icon.phone size={16} /> Call {site.phone}</a>{' '}
                or <a href="#request" className="font-semibold text-ink underline underline-offset-4">send us a question</a> before you order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOM */}
      <section id="in-the-box" className="section scroll-mt-24">
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

      {/* Add-on parts upsell */}
      <section id="add-ons" className="section-tight scroll-mt-24">
        <div className="wrap">
          <AddOns
            addons={addonCatalog()}
            colours={colours}
            title="Add the extras your roofline will ask for"
            intro={`The ${kit.feet} ft kit covers a typical layout, but every house has a corner, a gap or a long run the kit can't predict. These ship in the same box, so there is no second delivery and no stopping half-way up the ladder.`}
            stockNote={STOCK_NOTE}
          />
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
              {kitSaving(kit) > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink font-medium">You save</dt>
                  <dd className="font-heading text-2xl font-bold text-ink whitespace-nowrap">{formatCad(kitSaving(kit))}</dd>
                </div>
              )}
            </dl>
            <p className="mt-5 text-xs text-muted leading-relaxed">
              The saving is the labour: measuring, mounting, wiring, commissioning and the 1-year workmanship warranty. The
              5-year parts warranty is the same either way. Kit price excludes shipping and GST/HST. We install in London,
              Ontario and the surrounding area; kits ship anywhere in Canada.
            </p>
            <Link href="/resources/diy-permanent-lights-vs-professional-installation" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink min-h-[44px]">
              Which is right for you? <Icon.arrow size={16} />
            </Link>
          </div>
          <div className="card p-7">
            <h2 className="text-xl font-bold text-ink">Shipping, returns and warranty</h2>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {orderFaq.map(f => (
                <details key={f.key} className="group">
                  <summary className="flex min-h-[52px] cursor-pointer items-center justify-between gap-4 py-3 text-[15px] font-semibold text-ink">
                    {f.q}
                    <Icon.chevron size={18} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 text-[15px] text-ink-soft leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
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
            <SectionHeading align="left" eyebrow="Custom colour or questions" title="Want a custom colour, or help choosing?" />
            <p className="mt-5 text-ink-soft leading-relaxed">
              The four standard track colours can be ordered above and paid for online. For a custom colour match, a combination
              of kits, or if you would like us to check the size first, send us the details here and we will reply with a written
              quote. Nothing is charged until you agree to it.
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
              <h2 className="text-2xl font-bold text-ink">Ask about this kit</h2>
              <p className="text-muted text-sm mt-1 mb-6">We reply within one business day.</p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {others.map(k => (
              <KitCard key={k.slug} kit={k} compact sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px" />
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
