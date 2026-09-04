import type { Metadata } from 'next';
import Link from 'next/link';
import { site, phoneHref, getPhoto } from '@/lib/site';
import { Breadcrumbs, PhotoImg, SectionHeading, CheckList } from '@/components/ui';
import { Icon } from '@/components/icons';
import { DealerForm } from '@/components/DealerForm';

export const revalidate = 3600;

const url = `https://${site.domain}/become-a-dealer`;

export const metadata: Metadata = {
  title: 'Become a Dealer: Authorized Permanent Lighting Installer',
  description:
    'Join the Forever Lights dealer network. Protected territory, hands-on training, volume pricing, quoting software and co-marketing for installers across Ontario. Apply today.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Become a Forever Lights Dealer | Authorized Installer Program',
    description: 'Protected territory, training, volume pricing, quoting software and co-marketing for permanent lighting installers across Ontario.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Become a Forever Lights Dealer', description: 'Authorized installer program for permanent LED roofline lighting across Ontario.' },
};

const benefits = [
  { icon: <Icon.pin size={22} />, t: 'Protected territory', d: 'You get an exclusive or protected service area, so the leads we generate in your market go to you, not to three other dealers.' },
  { icon: <Icon.book size={22} />, t: 'Hands-on training and certification', d: 'Two days on real rooflines with our crew: measuring, colour matching, track mounting on every soffit type, power injection, controller setup and commissioning. Refreshers every season.' },
  { icon: <Icon.card size={22} />, t: 'Volume pricing', d: 'Tiered dealer pricing on track, points, controllers and power supplies that improves as your annual volume grows. No minimum stocking order to start.' },
  { icon: <Icon.ruler size={22} />, t: 'Quoting software access', d: 'Measure from satellite imagery, drop in the site-visit numbers and produce a branded written quote with financing options in minutes, on your phone or laptop.' },
  { icon: <Icon.sparkles size={22} />, t: 'Co-marketing and lead sharing', d: 'Listing on our website and in the app, local Google campaigns in your territory, print-ready brochures, yard signs, vehicle graphics and photo assets you can use as your own.' },
  { icon: <Icon.shield size={22} />, t: 'Warranty and product support', d: 'The same 5-year parts warranty behind every install, warranty parts shipped fast, and a dealer support line for tricky roofs, controllers and app questions.' },
  { icon: <Icon.smartphone size={22} />, t: 'Branded customer app experience', d: 'Your customers get the same polished app, scenes and schedules, and your company name in the support contacts.' },
  { icon: <Icon.calendar size={22} />, t: 'Year-round revenue', d: 'Permanent lighting sells in spring and summer as much as in the fall. It fills the gaps between roofing, eavestrough, electrical and landscaping seasons.' },
];

const idealFor = [
  'Electrical contractors adding a high-margin exterior product',
  'Seasonal Christmas lighting companies moving customers to permanent',
  'Roofing, eavestrough, soffit and siding installers already on the eaves',
  'Landscapers, deck builders and outdoor-living companies',
  'Solar and smart-home installers comfortable with low-voltage and apps',
  'New businesses with a lift or ladder crew and a service mindset',
];

const steps = [
  { t: 'Apply', d: 'Send the form below. We reply within two business days.' },
  { t: 'Discovery call', d: 'A 30-minute call about your market, crew, equipment and the territory that makes sense.' },
  { t: 'Training', d: 'Two days on the tools with our crew, plus the quoting software and app walkthrough.' },
  { t: 'Launch', d: 'Territory confirmed, opening stock ordered, listing live, first campaign running in your market.' },
];

const faq = [
  { q: 'Is there a franchise or licensing fee?', a: 'No franchise fee. Dealers purchase product at dealer pricing and complete training. There is a modest opening order so you have stock for your first installs; we will walk through it on the discovery call.' },
  { q: 'Do I need to be an electrician?', a: 'No. The system is low-voltage and plugs into an existing GFCI receptacle, so no electrical permit is needed for a standard install. If a customer needs a new outlet, you sub-contract or partner with a licensed electrician, as many of our dealers do.' },
  { q: 'What equipment do I need?', a: 'A reliable ladder setup or a lift for two-storey work, basic cordless tools, and a phone or tablet for the app and quoting software. We supply the training, product and marketing assets.' },
  { q: 'How big is a territory?', a: 'It depends on population and how many installs you can realistically take on. Typical territories are a city and its surrounding towns. We map it together so it is protected but not more than you can serve well.' },
  { q: 'Who handles warranty service in my territory?', a: 'You do, with warranty parts supplied by us at no charge. Service calls are one of the best ways to earn referrals, and dealer support is a phone call away for anything unusual.' },
  { q: 'Can I keep my existing business name?', a: 'Yes. Most dealers operate under their own brand as an authorized Forever Lights installer, using our product, app and marketing assets alongside their own.' },
];

export default function BecomeADealerPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Become a Dealer', item: url },
      ],
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
          <PhotoImg photo={getPhoto('technician')} priority sizes="100vw" quality={70} className="object-[center_30%] opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
        </div>
        <div className="relative wrap pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs light items={[{ label: 'Become a Dealer' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="eyebrow eyebrow-light">Dealer program · Ontario and beyond</span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02]">Become an authorized Forever Lights installer.</h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Add a high-margin, year-round product to your business with a protected territory, real training, dealer pricing, quoting software and marketing that brings you the leads.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#apply" className="btn btn-primary btn-lg">Apply now</a>
              <a href={phoneHref} className="btn btn-outline-light btn-lg"><Icon.phone size={20} /> {site.phone}</a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {['No franchise fee', 'Protected territory', 'Two-day hands-on training', 'Leads in your market'].map(t => (
                <li key={t} className="inline-flex items-center gap-2"><Icon.check size={18} className="text-accent" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What you get" title="Everything a dealer needs, from day one." sub="We built the program around the things installers told us they were missing from other brands." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(b => (
              <div key={b.t} className="card p-6 h-full">
                <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center mb-5">{b.icon}</span>
                <h3 className="text-lg font-bold text-ink">{b.t}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who + why now */}
      <section className="section bg-soft">
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHeading align="left" eyebrow="Who it suits" title="Already on ladders? You are most of the way there." sub="Our best dealers came from trades that were already working at the eaves. The product is simple to install well once you have been trained on it." />
            <CheckList items={idealFor} className="mt-8" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <PhotoImg photo={getPhoto('track-closeup')} sizes="(max-width: 1024px) 50vw, 25vw" />
            </figure>
            <figure className="relative rounded-2xl overflow-hidden aspect-[3/4] translate-y-6">
              <PhotoImg photo={getPhoto('canada-day-barn')} sizes="(max-width: 1024px) 50vw, 25vw" />
            </figure>
          </div>
        </div>
      </section>

      {/* Why the product sells */}
      <section className="section bg-dark text-white">
        <div className="wrap">
          <SectionHeading light eyebrow="Why it sells" title="A product homeowners ask for by name." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { v: 'One day', l: 'Typical residential install, quoted and scheduled by you.' },
              { v: '5 years', l: 'Parts warranty behind every system, backed by us.' },
              { v: '365 nights', l: 'Year-round use means referrals all year, not just December.' },
              { v: '24 months', l: 'Customer financing at 10% APR (OAC) closes bigger jobs.' },
            ].map(s => (
              <div key={s.v} className="card-dark p-6">
                <div className="font-heading text-3xl font-bold">{s.v}</div>
                <p className="mt-2 text-white/70 text-[15px] leading-relaxed">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps + form */}
      <section id="apply" className="section scroll-mt-24">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="How it works" title="From application to first install in a few weeks." />
            <ol className="mt-8 space-y-5">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="w-10 h-10 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-ink">{s.t}</h3>
                    <p className="text-[15px] text-muted leading-relaxed mt-1">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 card-soft p-6">
              <h3 className="font-bold text-ink">Prefer to talk first?</h3>
              <p className="text-[15px] text-muted mt-1">Call {site.phone} Monday to Friday and ask for the dealer program.</p>
              <a href={phoneHref} className="btn btn-dark btn-sm mt-4"><Icon.phone size={16} /> Call now</a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-ink">Dealer application</h2>
              <p className="text-muted text-sm mt-1 mb-6">Takes two minutes. We review every application personally.</p>
              <DealerForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-soft border-t border-line">
        <div className="wrap max-w-3xl">
          <SectionHeading eyebrow="Dealer FAQ" title="Straight answers before you apply." />
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
          <p className="mt-8 text-center text-sm text-muted">
            Homeowner looking for an install? <Link href="/contact" className="font-semibold text-ink underline">Get a free quote</Link> instead.
          </p>
        </div>
      </section>
    </>
  );
}
