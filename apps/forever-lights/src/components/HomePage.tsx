import Link from 'next/link';
import { site, services, faqs, testimonials, serviceAreas, getPhoto, phoneHref } from '@/lib/site';
import { QuoteForm } from './QuoteForm';
import { FinancingCallout } from './FinancingCallout';
import { Icon } from './icons';
import { PhotoImg, SectionHeading, FeatureCard, CtaBand } from './ui';
import { ServiceIcon } from './ServiceIcon';
import { DotRow } from './Logo';

interface HomePageProps {
  city?: string;
  cityLabel?: string;
  citySlug?: string;
}

const holidays = [
  { label: 'Christmas', colours: ['#ec3013', '#17a15a', '#fff3d6'] },
  { label: "Valentine's", colours: ['#e0359c', '#ec3013'] },
  { label: "St. Patrick's", colours: ['#17a15a', '#fff3d6'] },
  { label: 'Canada Day', colours: ['#ec3013', '#fff3d6'] },
  { label: 'Halloween', colours: ['#f27a00', '#7b3fd4'] },
  { label: 'Game day', colours: ['#0aa5c9', '#f2a900'] },
  { label: 'Every night', colours: ['#ffe2a8'] },
];

export function HomePage({ city = 'London', cityLabel = 'London, Ontario' }: HomePageProps) {
  const hero = getPhoto('hero-winter');
  const trio = [getPhoto('bungalow-warm'), getPhoto('bungalow-pink'), getPhoto('bungalow-rainbow')];
  const day = getPhoto('daytime-grey');
  const night = getPhoto('warm-white-night');
  const galleryStrip = ['red-white-night', 'blue-bungalow', 'purple-craftsman', 'pink-stone', 'green-barn'].map(getPhoto);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <PhotoImg photo={hero} priority sizes="100vw" quality={72} className="object-[58%_78%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/65 to-dark/10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark/80 to-transparent" />
        </div>

        <div className="relative wrap pt-12 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow eyebrow-light">Permanent roofline lighting · {cityLabel}</span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.9rem] font-bold leading-[1.02] text-white">
              Never hang Christmas lights again.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              A slim LED track, installed once along your roofline and colour-matched to disappear by day.
              Every holiday, every colour, a warm glow every night. All from your phone.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#quote" className="btn btn-primary btn-lg">Get a Free Quote</a>
              <a href={phoneHref} className="btn btn-outline-light btn-lg"><Icon.phone size={20} /> {site.phone}</a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {[
                { icon: <Icon.smartphone size={18} />, t: 'App-controlled' },
                { icon: <Icon.shield size={18} />, t: '5-year parts warranty' },
                { icon: <Icon.snowflake size={18} />, t: 'Rated to −40°C' },
                { icon: <Icon.check size={18} />, t: 'No permit needed' },
              ].map(b => (
                <li key={b.t} className="inline-flex items-center gap-2"><span className="text-accent">{b.icon}</span>{b.t}</li>
              ))}
            </ul>
          </div>

          <div id="quote" className="lg:col-span-5 scroll-mt-24">
            <div className="bg-white text-ink rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40">
              <h2 className="text-xl md:text-2xl font-bold">Get your free quote</h2>
              <p className="text-muted text-sm mt-1 mb-5">
                We visit your {city} home, measure the roofline and send a written quote. Usually within 24 hours.
              </p>
              <QuoteForm city={city} compact />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-line">
        <div className="wrap py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-2 font-semibold text-ink">
            <span className="inline-flex text-accent" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map(i => <Icon.star key={i} size={16} />)}</span>
            5.0 Google rating
          </span>
          <span>2026 Service Excellence Award winner</span>
          <span>200+ homes lit across Southwestern Ontario</span>
          <span>CSA approved · IP68 weatherproof</span>
        </div>
      </section>

      {/* ─── SAME HOME, ANY COLOUR ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="One install, every occasion"
            title={<>Same home. <span className="whitespace-nowrap">Any colour.</span> Any night.</>}
            sub="Sixteen million colours and built-in holiday scenes, switched from the couch. Here is one bungalow on three different evenings."
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-4 md:gap-5">
            {trio.map(p => (
              <figure key={p.key} className="relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] group">
                <PhotoImg photo={p} sizes="(max-width: 640px) 100vw, 33vw" className="group-hover:scale-[1.03] transition-transform duration-700" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 text-ink text-xs font-semibold px-3 py-1.5">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5" aria-label="Holiday colour themes">
            {holidays.map(h => (
              <li key={h.label} className="chip">
                <span className="inline-flex -space-x-1" aria-hidden="true">
                  {h.colours.map((c, i) => <span key={i} className="w-3 h-3 rounded-full ring-2 ring-white" style={{ background: c }} />)}
                </span>
                {h.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── DAY / NIGHT ─── */}
      <section className="section bg-soft">
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <PhotoImg photo={day} sizes="(max-width: 1024px) 50vw, 25vw" className="object-[center_35%]" />
              <figcaption className="absolute top-3 left-3 rounded-full bg-white/90 text-ink text-xs font-semibold px-3 py-1.5">By day</figcaption>
            </figure>
            <figure className="relative rounded-2xl overflow-hidden aspect-[3/4] translate-y-6">
              <PhotoImg photo={night} sizes="(max-width: 1024px) 50vw, 25vw" />
              <figcaption className="absolute top-3 left-3 rounded-full bg-ink text-white text-xs font-semibold px-3 py-1.5">By night</figcaption>
            </figure>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Invisible by day"
              title="A track so discreet your neighbours will ask where the lights come from."
              sub="During your free site visit we colour-match the aluminum channel to your soffit and fascia in white, black, brown or custom. From the street it reads as trim, not lighting."
            />
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                { icon: <Icon.ruler size={22} />, t: 'Measured & colour-matched', d: 'Every run is cut to your roofline and matched to your trim.' },
                { icon: <Icon.eyeOff size={22} />, t: 'Sealed, recessed LEDs', d: 'Each puck sits inside a rigid channel, angled down for an even line of light.' },
                { icon: <Icon.snowflake size={22} />, t: 'Built for Ontario winters', d: 'IP68 sealed, UV-stable and tested to −40°C. Snow and ice are not a problem.' },
                { icon: <Icon.bolt size={22} />, t: '0.3 W per point', d: 'A whole house draws about as much as a few bulbs, all night, all year.' },
              ].map(f => (
                <div key={f.t} className="flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-white text-ink flex items-center justify-center shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-ink">{f.t}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-1">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/services/soffit-roofline-track-lighting" className="mt-8 inline-flex items-center gap-2 font-semibold text-ink hover:text-ink-soft min-h-[44px]">
              How the track works <Icon.arrow size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Our process" title="Three steps to a home that lights itself." />
          <ol className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { n: '01', t: 'Free site visit', d: `We come to your ${city} property, measure the roofline, colour-match the track to your soffit and leave you a written quote. Free and no obligation.`, photo: getPhoto('daytime-brown') },
              { n: '02', t: 'Installed in a day', d: 'Our crew arrives with a lift, mounts the track flush to the soffit, routes the wiring back to a weatherproof controller and tests every zone before we leave.', photo: getPhoto('technician') },
              { n: '03', t: 'Enjoy it forever', d: 'Open the app, pick a scene, set a dusk-to-dawn schedule. Change it for every holiday without ever touching a ladder again.', photo: getPhoto('blue-bungalow') },
            ].map(s => (
              <li key={s.n} className="card overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3]">
                  <PhotoImg photo={s.photo} sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-4 left-4 w-11 h-11 rounded-full bg-accent text-ink font-heading font-bold flex items-center justify-center">{s.n}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink">{s.t}</h3>
                  <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── WHY ─── */}
      <section className="section bg-dark text-white">
        <div className="wrap">
          <SectionHeading light eyebrow="Why Forever Lights" title={<>Built for {city} homes. <br className="hidden md:block" />Built to last.</>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Icon.smartphone size={22} />, t: 'App-controlled', d: 'Colours, brightness, effects and schedules from your phone, anywhere in the world.' },
              { icon: <Icon.eyeOff size={22} />, t: 'Invisible by day', d: 'Colour-matched channel that reads as trim. Nobody knows it is there until dusk.' },
              { icon: <Icon.snowflake size={22} />, t: 'Made for Canadian winters', d: 'IP68 waterproof, UV-rated, CSA-approved parts tested to −40°C.' },
              { icon: <Icon.bolt size={22} />, t: 'Energy efficient', d: 'Just 0.3 W per LED point. Your whole house costs pennies a night to run.' },
              { icon: <Icon.shield size={22} />, t: '5-year parts warranty', d: '5 years on parts, 1 year on labour, and our own crew doing the service calls.' },
              { icon: <Icon.card size={22} />, t: 'Financing available', d: '24-month financing at 10% APR (on approved credit). Install now, spread the cost.' },
            ].map(f => (
              <FeatureCard key={f.t} dark icon={f.icon} title={f.t} text={f.d} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading align="left" eyebrow="What we do" title="One track. Six ways to use it." />
            <Link href="/services" className="btn btn-outline self-start md:self-auto">All services <Icon.arrow size={18} /></Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card p-6 md:p-7 group hover:border-ink transition-colors flex flex-col">
                <span className="w-11 h-11 rounded-xl bg-soft text-ink flex items-center justify-center mb-5"><ServiceIcon slug={s.slug} size={22} /></span>
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">Learn more <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINANCING ─── */}
      <FinancingCallout variant="band" ctaHref="/financing" />

      {/* ─── GALLERY STRIP ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading align="left" eyebrow="Our work" title="Real homes, real evenings." sub="Rooflines, gables, porches and shops across Southwestern Ontario." />
            <Link href="/gallery" className="btn btn-outline self-start md:self-auto">Full gallery <Icon.arrow size={18} /></Link>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryStrip.map((p, i) => (
              <figure key={p.key} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <PhotoImg photo={p} sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'} className="group-hover:scale-[1.03] transition-transform duration-700" />
                {p.caption && <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 text-ink text-xs font-semibold px-3 py-1.5">{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section bg-soft">
        <div className="wrap">
          <SectionHeading eyebrow="Reviews" title={`What ${city}-area homeowners say`} />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map(t => (
              <figure key={t.name} className="card p-6 md:p-7 flex flex-col">
                <div className="flex gap-0.5 text-accent mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => <Icon.star key={j} size={16} />)}
                </div>
                <blockquote className="text-ink-soft leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-ink text-white font-bold text-sm flex items-center justify-center">{t.name[0]}</span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{t.name}</span>
                    <span className="block text-xs text-muted">{t.location}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPEC BAR ─── */}
      <section className="bg-white border-y border-line">
        <div className="wrap py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { v: '50,000', u: 'hours', l: 'LED lifespan' },
            { v: '20+', u: 'years', l: 'Expected life' },
            { v: '0.3 W', u: 'per point', l: 'Energy use' },
            { v: 'IP68', u: 'sealed', l: 'Weatherproof' },
            { v: '−40°C', u: 'tested', l: 'Cold rating' },
            { v: '5 yr', u: 'parts', l: 'Warranty' },
          ].map(s => (
            <div key={s.l}>
              <div className="font-heading text-2xl md:text-3xl font-bold text-ink">{s.v}</div>
              <div className="text-xs text-muted">{s.u}</div>
              <div className="text-sm text-ink-soft mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section bg-white">
        <div className="wrap max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-10 space-y-3">
            {faqs.slice(0, 6).map((f, i) => (
              <details key={i} className="group card overflow-hidden open:border-ink transition-colors">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-ink min-h-[56px]">
                  {f.question}
                  <Icon.chevron size={20} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-ink-soft leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 font-semibold text-ink min-h-[44px]">All {faqs.length} questions <Icon.arrow size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ─── PLAN / LEARN / SUPPORT ─── */}
      <section className="section bg-soft">
        <div className="wrap">
          <SectionHeading eyebrow="Do your homework" title="Get a number, read the facts, and know what happens after." />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { href: '/cost-estimator', icon: <Icon.ruler size={24} />, t: 'Cost estimator', d: 'Pick your home size or roofline length and see a live estimated range in seconds.', cta: 'Estimate my cost' },
              { href: '/resources', icon: <Icon.book size={24} />, t: 'Guides & articles', d: 'Plain-language guides on cost, how the system works, brand comparisons and year-round uses.', cta: 'Browse the guides' },
              { href: '/support', icon: <Icon.headset size={24} />, t: 'Owner support', d: 'Getting-started guide, installation videos, manuals, troubleshooting and warranty details.', cta: 'Visit the support hub' },
            ].map(c => (
              <Link key={c.href} href={c.href} className="card p-7 group hover:border-ink transition-colors flex flex-col">
                <span className="w-12 h-12 rounded-xl bg-soft text-ink flex items-center justify-center mb-5">{c.icon}</span>
                <h3 className="text-xl font-bold text-ink">{c.t}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed flex-1">{c.d}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">{c.cta} <Icon.arrow size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEALER BAND ─── */}
      <section className="bg-tint border-y border-line">
        <div className="wrap section-tight grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">For installers and trades</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink">Become an authorized Forever Lights dealer.</h2>
            <p className="mt-4 text-ink-soft leading-relaxed max-w-xl">
              Electricians, holiday lighting crews, roofers and landscapers: add a year-round, high-margin product with a protected territory, hands-on training, dealer pricing, quoting software and co-marketing that sends leads your way.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {['Protected territory', 'Training & certification', 'Volume pricing', 'Quoting software', 'Co-marketing'].map(t => <li key={t} className="chip bg-white">{t}</li>)}
            </ul>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link href="/become-a-dealer" className="btn btn-dark btn-lg">Explore the dealer program <Icon.arrow size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Coverage" title="London and the communities around it." sub="Free site visits across Middlesex, Elgin, Oxford, Perth and Brant counties." />
          <DotRow className="mt-6 mx-auto flex justify-center" />
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {serviceAreas.map(a => (
              <li key={a.slug}>
                <Link href={`/locations/${a.slug}`} className="inline-flex items-center min-h-[44px] rounded-full border border-line px-4 text-sm font-medium text-ink-soft hover:border-ink hover:text-ink transition-colors">
                  {a.city}, ON
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={<>Ready to transform your {city} home?</>} />
    </>
  );
}
