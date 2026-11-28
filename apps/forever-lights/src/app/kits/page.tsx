import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site, phoneHref, getPhoto } from '@/lib/site';
import {
  kits, kitComponents, kitColours, kitImage, kitSaving, kitPriceFrom, kitPriceTo, formatCad, kitTitle, STOCK_NOTE,
} from '@/lib/kits';
import { orderableColours, addonCatalog } from '@/lib/shop';
import { kitFaq, SHIP_LINE } from '@/lib/kit-store';
import { Breadcrumbs, PhotoImg, SectionHeading, CheckList, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';
import { KitRequestForm } from '@/components/KitRequestForm';
import { KitCard } from '@/components/KitCard';
import { KitStoreFacts } from '@/components/KitStoreFacts';
import { AddOns } from '@/components/AddOns';

export const revalidate = 3600;

const url = `https://${site.domain}/kits`;

export const metadata: Metadata = {
  title: 'DIY Permanent Lighting Kits: Buy and Install It Yourself',
  description:
    'Buy a Forever Lights permanent LED roofline kit and install it yourself. Six sizes from 50 to 250 feet, everything in the box, shipped across Canada. Order online with free shipping within 200 km.',
  alternates: { canonical: url },
  openGraph: {
    title: 'DIY Permanent Lighting Kits | Forever Lights',
    description: 'Six DIY permanent LED roofline kits from 50 to 250 feet. Track, lights, power, controller and connectors in the box, shipped across Canada.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'DIY Permanent Lighting Kits | Forever Lights', description: 'Buy a permanent LED roofline kit and install it yourself. Six sizes, shipped across Canada.' },
};

const faq = kitFaq;

const supplied = [
  'A cordless drill and a driver bit for the screws supplied',
  'A ladder or lift you are comfortable and safe working from',
  'A GFCI-protected exterior or garage outlet within reach of the run',
  'Basic tools: tape measure, chalk line or level, tin snips or a hacksaw for cutting track',
  'A helper. Holding a 42 inch track piece flush to a soffit is a two-person job',
];

export default function KitsPage() {
  const kitOptions = kits.map(k => ({ slug: k.slug, label: kitTitle(k), price: formatCad(k.price) }));
  const colourOptions = kitColours.map(c => ({ key: c.key, label: c.label }));
  const shown = kitComponents.filter(c => c.image);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'DIY Kits', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Forever Lights DIY permanent lighting kits',
      itemListElement: kits.map((k, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: kitTitle(k),
        url: `https://${site.domain}/kits/${k.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero: a store header, not a service pitch */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <PhotoImg photo={getPhoto('hero-winter')} priority sizes="100vw" quality={70} className="object-[58%_78%] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/30" />
        </div>
        <div className="relative wrap pt-6 pb-10 md:pt-8 md:pb-14">
          <Breadcrumbs light items={[{ label: 'DIY Kits' }]} />
          <div className="mt-6 max-w-3xl">
            <span className="eyebrow eyebrow-light">Online store · ships across Canada</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.04]">DIY permanent lighting kits, shipped across Canada.</h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-2xl">
              The same track, RGBW lights and app control our crew installs, boxed as a complete kit. Six sizes from 50 to
              250 feet, {formatCad(kitPriceFrom, 0)} to {formatCad(kitPriceTo, 0)}. Order online and pay by card.
            </p>
            <p className="mt-5 flex items-start gap-2.5 text-[15px] font-medium text-white">
              <Icon.truck size={20} className="mt-0.5 shrink-0 text-accent" />
              <span>{SHIP_LINE}</span>
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              {['Secure card checkout', 'Packed in 1 to 2 business days', '30-day returns', '5-year parts warranty'].map(t => (
                <li key={t} className="inline-flex items-center gap-2"><Icon.check size={18} className="text-accent" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Kit cards */}
      <section id="kits" className="section-tight scroll-mt-24">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <span className="eyebrow">Choose your size</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink leading-[1.08]">Six kits, priced by roofline length.</h2>
            </div>
            <p className="text-sm text-muted max-w-sm md:text-right">
              Prices in Canadian dollars, before shipping and GST/HST. Longer kits cost less per foot.
            </p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kits.map((k, i) => (
              <KitCard key={k.slug} kit={k} priority={i < 3} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Not sure which size? <Link href="/visualizer" className="font-semibold text-ink underline">Draw your lights on a photo</Link> with the Light Visualizer, or <Link href="/cost-estimator" className="font-semibold text-ink underline">use the cost estimator</Link> to get a roofline length for your home.
          </p>
        </div>
      </section>

      {/* How ordering works + store facts */}
      <section className="bg-tint border-y border-line">
        <div className="wrap section-tight">
          <SectionHeading align="left" eyebrow="How ordering works" title="Order online today, wherever you are in Canada." />
          <ol className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { t: 'Pick your kit', d: 'Choose the size that covers your roofline and the track colour that matches your soffit or fascia. Every kit lists exactly what is in the box.' },
              { t: 'Check out securely', d: 'Pay by card on Stripe. Shipping and GST/HST for your postal code are shown before you pay.' },
              { t: 'We ship it', d: 'Kits leave our Belmont, Ontario shop within one to two business days, with your invoice emailed right away.' },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="w-10 h-10 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-ink">{s.t}</h3>
                  <p className="text-[15px] text-muted leading-relaxed mt-1">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 card p-6 md:p-8">
            <KitStoreFacts />
          </div>
        </div>
      </section>

      {/* Colours */}
      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Colour matched</span>
            <h2 className="mt-3 text-3xl font-bold text-ink">Pick a track colour that disappears against your trim.</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              The aluminum channel is what people see in daylight, so order the colour closest to the soffit or fascia it will be
              screwed to, not the colour of your siding or brick. If you are between two, the darker one hides better in the
              shadow under the roofline. Standard colours include a box of colour-matched screws. Custom colour orders ship
              without the screw pack, since the heads are matched to stock colours only.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
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
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-white border border-line aspect-[4/3]">
            {kitImage('aluminum-track') && (
              <Image
                src={kitImage('aluminum-track')!.src}
                alt="Aluminum permanent lighting track shown in black, beige, white and brown with RGBW puck lights fitted"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
                placeholder="blur"
                blurDataURL={kitImage('aluminum-track')!.blurDataURL}
              />
            )}
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What is in the box" title="Every part, in every kit." sub="Quantities change with the size of the kit. The parts themselves do not." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {shown.map(c => {
              const img = kitImage(c.image);
              return (
                <div key={c.key} className="card overflow-hidden flex flex-col">
                  <div className="relative aspect-square bg-white border-b border-line">
                    {img && (
                      <Image
                        src={img.src}
                        alt={`${c.name} supplied in Forever Lights permanent lighting kits`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4"
                        placeholder="blur"
                        blurDataURL={img.blurDataURL}
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink text-[15px] leading-snug">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{c.blurb}</p>
                  </div>
                </div>
              );
            })}
            {kitComponents.filter(c => !c.image).map(c => {
              const Placeholder = c.key === 'controller' ? Icon.wifi : Icon.wrench;
              return (
              <div key={c.key} className="card-soft overflow-hidden flex flex-col">
                <div className="relative aspect-square flex items-center justify-center text-muted">
                  <Placeholder size={56} />
                </div>
                <div className="p-5 border-t border-line">
                  <h3 className="font-bold text-ink text-[15px] leading-snug">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{c.blurb}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-on parts (the cart links here) */}
      <section id="add-ons" className="section-tight scroll-mt-24">
        <div className="wrap">
          <AddOns
            addons={addonCatalog()}
            colours={orderableColours.map(c => ({ key: c.key, label: c.label, hex: c.hex }))}
            title="Extra parts, sold on their own"
            intro="Extending a run, lighting a second elevation or need a longer jumper than the kit includes? Every part can be added to an order and ships in the same box as a kit."
            stockNote={STOCK_NOTE}
          />
        </div>
      </section>

      {/* Full comparison table */}
      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap">
          <SectionHeading align="left" eyebrow="Kit contents" title="Exact quantities, kit by kit." />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full text-sm text-left border-collapse">
              <caption className="sr-only">Quantity of each component supplied in each Forever Lights DIY kit size</caption>
              <thead className="bg-soft">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink whitespace-nowrap sticky left-0 bg-soft">Component</th>
                  {kits.map(k => (
                    <th key={k.slug} scope="col" className="px-4 py-3 font-semibold text-ink text-center whitespace-nowrap">{k.feet} ft</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kitComponents.map(c => (
                  <tr key={c.key} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 font-medium text-ink text-left align-top min-w-[220px] sticky left-0 bg-white">{c.name}</th>
                    {kits.map(k => {
                      const qty = k.bom[c.key] ?? 0;
                      return (
                        <td key={k.slug} className={`px-4 py-3 text-center ${qty ? 'text-ink font-medium' : 'text-muted/50'}`}>
                          {qty || '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-line bg-tint">
                  <th scope="row" className="px-4 py-3 font-bold text-ink text-left sticky left-0 bg-tint">Kit price (before shipping and tax)</th>
                  {kits.map(k => (
                    <td key={k.slug} className="px-4 py-3 text-center font-bold text-ink whitespace-nowrap">{formatCad(k.price)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DIY vs installed + what you supply */}
      <section className="section">
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="min-w-0">
            <span className="eyebrow">DIY or installed</span>
            <h2 className="mt-3 text-3xl font-bold text-ink">What you save, and what you take on.</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              A kit is the same hardware we put on our own installs. What you are taking on is the measuring, the ladder work and
              the commissioning. On a single-storey home that is a realistic weekend. On a steep two-storey it is the part most
              people hand back to us.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full text-sm text-left">
                <thead className="bg-soft">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-ink">Length</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-ink">DIY kit</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-ink">Installed by us</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-ink">You save</th>
                  </tr>
                </thead>
                <tbody>
                  {kits.map(k => (
                    <tr key={k.slug} className="border-t border-line">
                      <th scope="row" className="px-4 py-3 font-medium text-ink text-left">{k.feet} ft</th>
                      <td className="px-4 py-3 text-ink-soft whitespace-nowrap">{formatCad(k.price)}</td>
                      <td className="px-4 py-3 text-ink-soft whitespace-nowrap">{formatCad(k.installedLow)}</td>
                      <td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{kitSaving(k) > 0 ? formatCad(kitSaving(k)) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Installed prices are the low end of our full-service range for the same length and include measuring, mounting,
              wiring, commissioning and the 1-year workmanship warranty. Kit prices exclude shipping and GST/HST.
            </p>
            <Link href="/resources/diy-permanent-lights-vs-professional-installation" className="mt-5 inline-flex items-center gap-2 font-semibold text-ink min-h-[44px]">
              Read the full DIY versus professional comparison <Icon.arrow size={18} />
            </Link>
          </div>
          <div>
            <span className="eyebrow">Before you order</span>
            <h2 className="mt-3 text-3xl font-bold text-ink">What you will need to supply.</h2>
            <CheckList items={supplied} className="mt-6" />
            <div className="mt-8 card-soft p-6">
              <h3 className="font-bold text-ink flex items-center gap-2"><Icon.headset size={20} /> You are not on your own</h3>
              <p className="mt-2 text-[15px] text-muted leading-relaxed">
                Every kit comes with phone support from the same people who install these for a living. Call us mid-install if a
                run is not lighting or the controller will not pair, and we will talk you through it.
              </p>
              <a href={phoneHref} className="btn btn-dark btn-sm mt-4"><Icon.phone size={16} /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="section bg-soft border-y border-line scroll-mt-24">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="Questions or custom colours" title="Not ready to order yet? Ask us first." />
            <p className="mt-5 text-ink-soft leading-relaxed">
              Standard kits can be ordered and paid for online. For a custom colour match, several kits for one property, or a
              second opinion on sizing, send your details and you will have a written answer within one business day. Nothing is
              charged until you agree to it.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: <Icon.file size={20} />, t: 'A written quote', d: 'Kit, shipping and GST/HST, itemised.' },
                { icon: <Icon.shield size={20} />, t: '5-year parts warranty', d: 'The same warranty as our installed systems.' },
                { icon: <Icon.clock size={20} />, t: 'One business day', d: 'We reply Monday to Friday, usually the same day.' },
              ].map(r => (
                <div key={r.t} className="flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-white text-ink flex items-center justify-center shrink-0">{r.icon}</span>
                  <div>
                    <h3 className="font-bold text-ink">{r.t}</h3>
                    <p className="text-[15px] text-muted leading-relaxed">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-ink">Ask about a kit</h2>
              <p className="text-muted text-sm mt-1 mb-6">No payment now. We reply within one business day.</p>
              <KitRequestForm kitOptions={kitOptions} colourOptions={colourOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap max-w-3xl">
          <SectionHeading eyebrow="Kit FAQ" title="Ordering, sizing and installing." />
          <div className="mt-10 space-y-3">
            {faq.map((f, i) => (
              <details key={i} className="group card overflow-hidden open:border-ink transition-colors">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-ink min-h-[56px]">
                  {f.q}
                  <Icon.chevron size={20} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Would you rather we just did it?"
        text="Our crew measures, colour-matches the track to your soffit and commissions the whole system in a day, backed by the workmanship warranty."
        primaryLabel="Get an installed quote"
        photoKey="technician"
      />
    </>
  );
}
