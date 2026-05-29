import Image from 'next/image';
import Link from 'next/link';
import { site, services, gallery, testimonials, faqs, serviceAreas } from '@/lib/site';
import { QuoteForm } from './QuoteForm';

interface HomePageProps {
  city?: string;
  cityLabel?: string;
  citySlug?: string;
}

export function HomePage({ city = 'London', cityLabel = 'London, Ontario', citySlug }: HomePageProps) {
  const displayCity = city;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-home-2.jpg"
            alt={`Permanent LED lighting on home in ${displayCity} Ontario - Forever Lights`}
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/95 via-[#07070f]/75 to-[#07070f]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-transparent to-[#07070f]/30" />
        </div>

        <div className="relative container mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-10 items-center">
          {/* Left: headline */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
              Serving {cityLabel}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Never Hang <span className="gradient-text">Christmas Lights</span> Again.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6 max-w-lg">
              Permanent LED track lighting installed once on your soffit — then controlled forever from your phone.
              Every holiday. Every colour. Zero ladders.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                '⚡ App-Controlled',
                '🛡️ 5-Year Warranty',
                '🌡️ Rated to -40°C',
                '✅ No Permit Needed',
              ].map(b => (
                <span key={b} className="text-xs font-medium text-slate-300 bg-white/8 border border-white/12 rounded-full px-3 py-1.5">
                  {b}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="min-h-[52px] inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-lg bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-all glow-pulse"
              >
                Get a Free Quote
              </Link>
              <a
                href={`tel:${site.phone.replace(/\D/g, '')}`}
                className="min-h-[52px] inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-lg border border-white/25 text-white hover:border-[#F5A623]/60 hover:text-[#F5A623] transition-all"
              >
                {site.phone}
              </a>
            </div>
          </div>

          {/* Right: inline quote form */}
          <div className="bg-[#10101e]/90 backdrop-blur-sm rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/60">
            <h2 className="text-xl font-bold text-white mb-1">
              Get Your Free Quote
            </h2>
            <p className="text-slate-400 text-sm mb-5">
              We visit your {displayCity} home, measure, and provide a detailed quote — at no cost.
            </p>
            <QuoteForm city={displayCity} />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
          <span>Scroll to explore</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-[#0d0d1f] border-y border-white/8 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-[#F5A623] font-bold text-lg">★★★★★</span>
              <span>5.0 Google Rating</span>
            </div>
            <span className="hidden md:block text-white/20">|</span>
            <div>200+ Homes Lit Across Ontario</div>
            <span className="hidden md:block text-white/20">|</span>
            <div>5-Year Parts Warranty</div>
            <span className="hidden md:block text-white/20">|</span>
            <div>CSA Approved · IP68 Weatherproof</div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER TRANSFORMATION ─── */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">The Transformation</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              See the Difference Permanent Lighting Makes
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto">
              Every home we install looks like this — clean by day, breathtaking at night.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Before */}
            <div className="rounded-2xl overflow-hidden relative group">
              <Image
                src="/images/example-5.jpg"
                alt={`Home before permanent LED lighting installation in ${displayCity}, Ontario - plain exterior`}
                width={800}
                height={600}
                quality={80}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-slate-700/90 text-slate-200 text-sm font-medium">Before</span>
              </div>
            </div>
            {/* After */}
            <div className="rounded-2xl overflow-hidden relative group">
              <Image
                src="/images/hero-home-1.jpg"
                alt={`Home after permanent LED lighting installation in ${displayCity}, Ontario - stunning illuminated exterior`}
                width={800}
                height={600}
                quality={80}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-[#F5A623]/90 text-black text-sm font-bold">After — Forever Lights</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 ring-2 ring-[#F5A623]/40 rounded-2xl pointer-events-none" />
            </div>
          </div>

          {/* Full-width feature image */}
          <div className="rounded-3xl overflow-hidden relative">
            <Image
              src="/images/example-3.jpg"
              alt={`Permanent LED outdoor lighting on ${displayCity} home - blue holiday theme by Forever Lights`}
              width={1400}
              height={700}
              quality={80}
              className="w-full h-72 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                  One Installation. <span className="gradient-text">Infinite Occasions.</span>
                </h3>
                <p className="text-slate-300 leading-relaxed mb-5">
                  Christmas red, Halloween orange, Canada Day red and white — switch your entire home's colour in seconds from anywhere on earth.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full font-bold bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-colors"
                >
                  Book My Free Site Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ─── */}
      <section className="py-20 bg-[#0a0a14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Why Forever Lights</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              Built for {displayCity} Homes. Built to Last.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📱',
                title: 'App-Controlled',
                desc: 'Change colours, set schedules, or turn everything off from your phone — anywhere in the world.',
              },
              {
                icon: '🔒',
                title: 'Invisible by Day',
                desc: 'Tracks are colour-matched to your soffit. Nobody knows they\'re there until the lights come on.',
              },
              {
                icon: '🌡️',
                title: 'Built for Canadian Winters',
                desc: 'IP68 waterproof, UV-rated, and tested to -40°C. Every part is CSA-approved for Canadian homes.',
              },
              {
                icon: '⚡',
                title: 'Energy Efficient',
                desc: 'Each LED point uses just 0.3 watts — your whole house lit for the cost of a single incandescent bulb.',
              },
              {
                icon: '🛡️',
                title: '5-Year Parts Warranty',
                desc: 'We back every installation with a 5-year parts warranty and 1-year labour warranty. No asterisks.',
              },
              {
                icon: '💳',
                title: 'Financing Available',
                desc: '6-month interest-only financing so you can get the lights now and spread the cost.',
              },
            ].map(f => (
              <div key={f.title} className="bg-[#10101e] border border-white/8 rounded-2xl p-6 hover:border-[#F5A623]/30 transition-colors group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F5A623] transition-colors">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              Three Steps to a Transformed Home
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line desktop */}
            <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#F5A623]/40 via-[#F5A623]/20 to-[#F5A623]/40" />

            {[
              {
                step: '01',
                title: 'Free Site Visit',
                desc: `We come to your ${displayCity} property, take precise measurements, and colour-match tracks to your soffit and fascia. Completely free, no obligation.`,
                img: '/images/hero-home-4.jpg',
                imgAlt: `Forever Lights team measuring ${displayCity} home for permanent LED lighting installation`,
              },
              {
                step: '02',
                title: 'Professional Installation',
                desc: 'Our trained team arrives with bucket lifts and installs your system in a single day. Clean, efficient, and no mess left behind.',
                img: '/images/hero-home-1.jpg',
                imgAlt: `Forever Lights professional LED track installation on Ontario home soffit`,
              },
              {
                step: '03',
                title: 'Enjoy Forever',
                desc: 'Download the app, pick a colour, and enjoy. Change your display for every holiday, set schedules, or let it run automatically.',
                img: '/images/hero-home-2.jpg',
                imgAlt: `Homeowner controlling Forever Lights LED system via app - Christmas lighting display`,
              },
            ].map(s => (
              <div key={s.step} className="flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden h-48">
                  <Image
                    src={s.img}
                    alt={s.imgAlt}
                    fill
                    quality={75}
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center text-black font-black text-sm">
                    {s.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO GALLERY ─── */}
      <section className="py-20 bg-[#0a0a14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              Real Homes. Real Results.
            </h2>
            <p className="text-slate-400 mt-3">
              Every photo is a real {displayCity}-area installation by our team.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: '/images/hero-home-1.jpg', alt: `Permanent LED lighting on London Ontario home - warm white year-round accent`, span: 'md:col-span-2 md:row-span-1' },
              { src: '/images/hero-home-2.jpg', alt: `Permanent Christmas LED lights on Ontario home - Forever Lights red green holiday display`, span: '' },
              { src: '/images/example-3.jpg', alt: `Forever Lights blue holiday LED installation on two-storey home`, span: '' },
              { src: '/images/example-5.jpg', alt: `Multicolour permanent outdoor LED accent lighting on Ontario home by Forever Lights`, span: '' },
              { src: '/images/hero-home-4.jpg', alt: `Warm amber permanent LED soffit lighting on Ontario home at night`, span: 'md:col-span-2' },
            ].map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden group ${img.span}`} style={{ aspectRatio: img.span.includes('row-span') ? '16/9' : '4/3' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={75}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width:768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/10 transition-colors font-medium"
            >
              View Full Gallery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              What {displayCity}-Area Homeowners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-[#10101e] border border-white/8 rounded-2xl p-6 hover:border-[#F5A623]/20 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-[#F5A623]">★</span>
                  ))}
                </div>
                <blockquote className="text-slate-300 text-sm leading-relaxed mb-4">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES SPEC BAR ─── */}
      <section className="py-16 bg-[#0a0a14] border-y border-white/8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
            {[
              { value: '50,000', unit: 'hours', label: 'LED Lifespan' },
              { value: '20+', unit: 'years', label: 'Expected Life' },
              { value: '0.3W', unit: 'per point', label: 'Energy Use' },
              { value: 'IP68', unit: 'rated', label: 'Weatherproof' },
              { value: '-40°C', unit: 'tested', label: 'Cold Rating' },
              { value: '5yr', unit: 'parts', label: 'Warranty' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black gradient-text">{s.value}</div>
                <div className="text-slate-500 text-xs">{s.unit}</div>
                <div className="text-slate-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.slice(0, 6).map((f, i) => (
              <details key={i} className="group bg-[#10101e] border border-white/8 rounded-2xl overflow-hidden hover:border-[#F5A623]/20 transition-colors">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-white font-semibold hover:text-[#F5A623] transition-colors">
                  {f.question}
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-slate-400 leading-relaxed text-sm border-t border-white/6 pt-4">{f.answer}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq" className="text-[#F5A623] hover:underline text-sm font-medium">
              View all {faqs.length} frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="py-20 bg-[#0a0a14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Coverage</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              We Serve All of Southwestern Ontario
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map(a => (
              <Link
                key={a.slug}
                href={`/locations/${a.slug}`}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                  a.slug === citySlug
                    ? 'bg-[#F5A623] text-black border-[#F5A623]'
                    : 'border-white/15 text-slate-300 hover:border-[#F5A623]/40 hover:text-[#F5A623]'
                }`}
              >
                {a.city}, ON
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-home-1.jpg"
            alt={`Permanent LED lighting on ${displayCity} Ontario home - book your free quote with Forever Lights`}
            fill
            quality={70}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#07070f]/88" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Ready to Transform Your <span className="gradient-text">{displayCity}</span> Home?
          </h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
            Join hundreds of satisfied homeowners. Get your free, no-obligation quote today — we visit your property and provide exact pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="min-h-[56px] inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-xl bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-all glow-pulse"
            >
              Get My Free Quote
            </Link>
            <a
              href={`tel:${site.phone.replace(/\D/g, '')}`}
              className="min-h-[56px] inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-xl border-2 border-white/30 text-white hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
            >
              Call {site.phone}
            </a>
          </div>
          <p className="mt-5 text-slate-500 text-sm">Mon–Fri 8AM–5PM · We respond within 24 hours</p>
        </div>
      </section>
    </>
  );
}
