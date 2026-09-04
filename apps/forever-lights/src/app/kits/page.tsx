import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site, phoneHref, getPhoto } from '@/lib/site';
import {
  kits, kitComponents, kitColours, kitImage, kitBom, kitLightCount, kitTrackFeet, kitSaving, formatCad, kitTitle,
} from '@/lib/kits';
import { Breadcrumbs, PhotoImg, SectionHeading, CheckList, CtaBand } from '@/components/ui';
import { Icon } from '@/components/icons';
import { KitRequestForm } from '@/components/KitRequestForm';

export const revalidate = 3600;

const url = `https://${site.domain}/kits`;

export const metadata: Metadata = {
  title: 'DIY Permanent Lighting Kits: Buy and Install It Yourself',
  description:
    'Buy a Forever Lights permanent LED roofline kit and install it yourself. Six sizes from 50 to 250 feet, everything in the box, shipped across Canada. Request a quote.',
  alternates: { canonical: url },
  openGraph: {
    title: 'DIY Permanent Lighting Kits | Forever Lights',
    description: 'Six DIY permanent LED roofline kits from 50 to 250 feet. Track, lights, power, controller and connectors in the box, shipped across Canada.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'DIY Permanent Lighting Kits | Forever Lights', description: 'Buy a permanent LED roofline kit and install it yourself. Six sizes, shipped across Canada.' },
};

const faq = [
  { q: 'How do I pay for a kit?', a: 'You do not pay on the website. You choose a kit and send us your shipping address, then we email a written total: the kit price, exact shipping to your address, and the tax for your province. If it looks good, we take payment and ship. Nothing is charged before you agree to the total.' },
  { q: 'Why is shipping not shown on the site?', a: 'Kits are heavy and bulky, and the cost changes a lot between, say, London and Whitehorse. Rather than pad every kit with a worst-case shipping charge, we quote the real cost to your postal code.' },
  { q: 'Which size do I need?', a: 'Measure the rooflines you want lit, in feet, and round up. Our cost estimator will also give you a length if you pick your home size. If you are between sizes, tell us in the notes and we will help you choose. Every kit ships with a little more track than its nominal length to allow for corners and offcuts.' },
  { q: 'How hard is the install?', a: 'If you are comfortable working from a ladder and using a cordless drill, it is a weekend job on a single-storey home. The connectors are sealed twist fittings, so there is no cutting or soldering, and the power supply plugs into an existing GFCI outlet. Two-storey and steep rooflines are where most people decide to have us install it instead.' },
  { q: 'What warranty comes with a kit?', a: 'DIY kits carry the same 5-year parts warranty as our installed systems. The 1-year workmanship warranty applies only where our own crew did the install, since we cannot warranty how a kit was mounted.' },
  { q: 'Can I add to a kit later?', a: 'Yes. The system is modular, so you can extend a run or light another elevation later with more track, strands and connectors. Tell us what you already have and we will quote the add-on parts.' },
];

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

      {/* Hero */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <PhotoImg photo={getPhoto('track-closeup')} priority sizes="100vw" quality={70} className="object-[center_40%] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
        </div>
        <div className="relative wrap pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs light items={[{ label: 'DIY Kits' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="eyebrow eyebrow-light">DIY kits · shipped across Canada</span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02]">Handy? Install it yourself and keep the labour.</h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              The same track, the same RGBW lights and the same app-controlled system we install, boxed as a complete kit with
              every connector you need. Six sizes from 50 to 250 feet.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#kits" className="btn btn-primary btn-lg">See the kits</a>
              <a href="#request" className="btn btn-outline-light btn-lg">Request a quote</a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {['Everything in one box', 'No cutting or soldering', 'Same 5-year parts warranty', 'Phone support included'].map(t => (
                <li key={t} className="inline-flex items-center gap-2"><Icon.check size={18} className="text-accent" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How ordering works */}
      <section className="bg-tint border-b border-line">
        <div className="wrap section-tight">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { t: 'Pick your kit', d: 'Choose the size that covers your roofline. Every kit lists exactly what is in the box.' },
              { t: 'Send your address', d: 'Fill in the short form. We need your province and postal code to work out shipping and tax.' },
              { t: 'We send your total', d: 'Within one business day you get a written total: kit, shipping and tax. Nothing is charged until you say yes.' },
            ].map((s, i) => (
              <div key={s.t} className="flex gap-4">
                <span className="w-10 h-10 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <h2 className="font-bold text-ink">{s.t}</h2>
                  <p className="text-[15px] text-muted leading-relaxed mt-1">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted max-w-2xl mx-auto">
            This is not an online store and there is no checkout. Kit prices below are the product only, in Canadian dollars,
            before shipping and provincial tax.
          </p>
        </div>
      </section>

      {/* Kit cards */}
      <section id="kits" className="section scroll-mt-24">
        <div className="wrap">
          <SectionHeading eyebrow="The kits" title="Six sizes, priced by roofline length." sub="Longer kits cost less per foot, because the controller and the fixed parts are the same whatever the length." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kits.map(k => (
              <Link key={k.slug} href={`/kits/${k.slug}`} className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-2xl font-bold text-ink">{k.feet} ft</h3>
                  <span className="chip">{kitLightCount(k)} lights</span>
                </div>
                <p className="mt-4 font-heading text-3xl font-bold text-ink">{formatCad(k.price)}</p>
                <p className="text-xs text-muted mt-1">
                  about {formatCad(k.price / k.feet, 2)} per foot, kit only
                </p>
                <p className="mt-4 text-[15px] text-muted leading-relaxed flex-1">{k.suits}</p>
                <dl className="mt-5 space-y-1.5 text-sm border-t border-line pt-4">
                  <div className="flex justify-between gap-3"><dt className="text-muted">Track supplied</dt><dd className="text-ink font-medium">{kitTrackFeet(k)} ft</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-muted">Parts in the box</dt><dd className="text-ink font-medium">{kitBom(k).reduce((n, r) => n + r.qty, 0)}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-muted">Installed by us</dt><dd className="text-ink font-medium">{formatCad(k.installedLow)}+</dd></div>
                </dl>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  What is in the box <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Not sure which size? <Link href="/cost-estimator" className="font-semibold text-ink underline">Use the cost estimator</Link> to get a roofline length for your home.
          </p>
        </div>
      </section>

      {/* Colours */}
      <section className="section-tight bg-soft border-y border-line">
        <div className="wrap grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Colour matched</span>
            <h2 className="mt-3 text-3xl font-bold text-ink">Pick a track colour that disappears against your trim.</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              The aluminum channel is what people see in daylight, so it ships in the colour closest to your soffit and fascia.
              Standard colours include a box of colour-matched screws. Custom colour orders ship without the screw pack, since
              the heads are matched to stock colours only.
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
                      <td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{formatCad(kitSaving(k))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Installed prices are the low end of our full-service range for the same length and include measuring, mounting,
              wiring, commissioning and the 1-year workmanship warranty. Kit prices exclude shipping and provincial tax.
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
            <SectionHeading align="left" eyebrow="Request a kit" title="Tell us where it is going and we will price it." />
            <p className="mt-5 text-ink-soft leading-relaxed">
              Shipping and tax both depend on where you are, so we quote them rather than guess. Send your address and you will
              have a written total within one business day. There is no payment step on this website and nothing is charged
              until you agree to the total.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: <Icon.file size={20} />, t: 'A written total', d: 'Kit, shipping and provincial tax, itemised.' },
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
              <h2 className="text-2xl font-bold text-ink">Kit request</h2>
              <p className="text-muted text-sm mt-1 mb-6">No payment now. We reply with shipping and tax for your province.</p>
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
