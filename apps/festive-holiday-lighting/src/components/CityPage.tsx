import Link from "next/link";
import { NavBar } from "./NavBar";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { CallNowFab } from "./CallNowFab";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { Testimonials } from "./Testimonials";
import { services, site } from "@/lib/site";
import type { City } from "@/lib/site";
import { CheckIcon, ArrowRightIcon, ShieldIcon, StarIcon, PhoneIcon } from "./icons";

const cityFaqs = (city: string) => [
  {
    q: `Do you serve all neighbourhoods in ${city}?`,
    a: `Yes — we serve all areas in and around ${city}. Whether you're in a newer subdivision or an established older neighbourhood, our crews are familiar with the area and can come to you.`,
  },
  {
    q: `How far in advance should I book for ${city}?`,
    a: `We recommend booking by late September or early October for the best availability. ${city} is a popular service area and we fill up fast once the holiday season approaches. That said, give us a call even if it's November — we'll do our best.`,
  },
  {
    q: `Do you do permanent lighting in ${city} as well?`,
    a: `Absolutely! Permanent LED roofline lighting is available throughout ${city}. It's installed once, lasts a lifetime, and you control every colour and pattern from your phone. Many ${city} homeowners choose permanent lighting to enjoy it year-round — Christmas, Halloween, birthdays, sports playoffs, and more.`,
  },
  {
    q: `What commercial properties do you serve in ${city}?`,
    a: `We serve storefronts, plazas, office buildings, restaurants, hotels, and businesses of all sizes in ${city}. Commercial lighting programs are custom-designed to your property's footprint and budget.`,
  },
  {
    q: `Are your crews insured to work in ${city}?`,
    a: `Yes. We carry $5M liability insurance and all our crews are WSIB compliant — fully covered to work on any property in ${city} and across Ontario.`,
  },
];

const whyFeatures = (city: string) => [
  {
    icon: "🏆",
    title: "10+ Years of Local Experience",
    body: `Cameron Blancher and the Festive team have been lighting up homes and businesses in ${city} and across Southern Ontario for over a decade. Award-winning displays, zero shortcuts.`,
  },
  {
    icon: "🛡️",
    title: "Fully Insured & WSIB Compliant",
    body: `$5M liability insurance and WSIB-compliant crews on every job. Every property owner in ${city} is fully protected from first arrival to final takedown.`,
  },
  {
    icon: "📋",
    title: "We Supply Everything",
    body: `Lights, clips, cords, timers — we bring it all. Commercial-grade LED products that outlast anything from the hardware store. You don't need to buy a single thing.`,
  },
  {
    icon: "🔧",
    title: "Mid-Season Maintenance Included",
    body: `We visit ${city} installations mid-season to check every display. If something goes dark, we fix it — fast. Your lights stay bright from Day 1 to takedown.`,
  },
  {
    icon: "🚛",
    title: "Commercial Equipment",
    body: `We use high ladders, JLG and Genie boom trucks, and boom lifts. Tall trees, high rooflines, large commercial buildings — no project in ${city} is too tall or complex.`,
  },
  {
    icon: "📦",
    title: "Takedown & Storage",
    body: `When the season's done, we carefully remove and store everything — labelled, organized, and ready for next year. No tangles in the garage, no lost clips.`,
  },
];

export function CityPage({ city }: { city: City }) {
  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16"
        style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        <div className="absolute inset-0">
          {[
            { top: "10%", left: "5%", size: 140, color: "rgba(178,34,34,0.15)", dur: "6s", delay: "0s" },
            { top: "30%", left: "80%", size: 80, color: "rgba(201,168,76,0.2)", dur: "5s", delay: "1s" },
            { top: "65%", left: "15%", size: 60, color: "rgba(201,168,76,0.12)", dur: "7s", delay: "2s" },
            { top: "75%", left: "88%", size: 100, color: "rgba(178,34,34,0.1)", dur: "4s", delay: "0.5s" },
          ].map((dot, i) => (
            <div key={i} className="absolute rounded-full bokeh-dot"
              style={{
                top: dot.top, left: dot.left,
                width: dot.size, height: dot.size,
                background: `radial-gradient(circle, ${dot.color} 0%, transparent 70%)`,
                filter: "blur(20px)",
                "--duration": dot.dur, "--delay": dot.delay,
              } as React.CSSProperties} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/45 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition">Home</Link>
            <span>/</span>
            <Link href="/service-areas" className="hover:text-white/70 transition">Service Areas</Link>
            <span>/</span>
            <span className="text-white/70">{city.name}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold-bright)", border: "1px solid rgba(201,168,76,0.3)" }}>
              📍 Serving {city.name}, {city.region}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 text-white">
              Holiday Lighting in{" "}
              <span className="text-gradient-gold">{city.name}</span>
              <br />
              Seasonal & Permanent
            </h1>

            <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-xl">{city.heroIntro}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">🎄 Christmas Lighting</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">✨ Permanent LED Systems</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">🏠 Homes & Businesses</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
                style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.5)" }}>
                Get a Free Quote in {city.name}
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a href={site.phoneHref}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white border border-white/25 hover:bg-white/10 transition min-h-11">
                <PhoneIcon className="w-5 h-5" />
                {site.phone}
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {site.trustBadges.map((b) => (
                <div key={b.label} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold-bright)" }}>
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-tight">{b.label}</p>
                    <p className="text-[11px] text-white/50">{b.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* City intro */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            {city.name} Holiday Lighting
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-5">
            {city.description.split(".")[0]}.
          </h2>
          <p className="text-lg text-white/65 leading-relaxed mb-6">
            {city.description}
          </p>
          <p className="text-sm text-white/50 italic">{city.localFact}</p>
        </div>
      </section>

      {/* Services in this city */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--crimson-bright)" }}>
              Services in {city.name}
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Everything You Need,{" "}
              <span className="text-gradient-gold">Done Right in {city.name}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`}
                className="group p-7 rounded-2xl border transition-all hover:border-[var(--crimson)]/40 hover:bg-white/[0.03]"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-[var(--gold-bright)] transition">{svc.name}</h3>
                <p className="text-sm text-white/55 mb-3 leading-relaxed">{svc.description.slice(0, 100)}…</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--crimson-bright)] group-hover:text-[var(--gold-bright)] transition">
                  Learn more <ArrowRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose in this city */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
              Why Choose Festive in {city.name}
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4">
              The {city.name} Standard for{" "}
              <span className="text-gradient-gold">Holiday Lighting</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyFeatures(city.name).map((f) => (
              <div key={f.title} className="p-7 rounded-2xl border"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-10 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, rgba(178,34,34,0.1) 0%, rgba(201,168,76,0.08) 100%)", borderColor: "rgba(201,168,76,0.2)" }}>
            <div className="flex items-center gap-4">
              <ShieldIcon className="w-10 h-10 text-[var(--gold-bright)] flex-shrink-0" />
              <div>
                <p className="font-display font-bold text-white text-base">Fully Insured · WSIB Compliant · Cameron-Led Crews</p>
                <p className="text-sm text-white/60">{site.yearsExperience}+ years serving {city.name} and Southern Ontario.</p>
              </div>
            </div>
            <a href="#contact"
              className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-white text-sm min-h-11 flex items-center hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}>
              Book My Install
            </a>
          </div>
        </div>
      </section>

      {/* Permanent lighting section */}
      <section className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: "var(--night)" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(178,34,34,0.3) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ backgroundColor: "rgba(178,34,34,0.15)", color: "var(--crimson-bright)", border: "1px solid rgba(178,34,34,0.3)" }}>
                ✨ Available in {city.name}
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5">
                Permanent LED Lighting for {city.name} Homes & Businesses
              </h2>
              <p className="text-lg text-white/65 mb-8 leading-relaxed">
                One install. Lifetime of celebrations. Smart RGBW LEDs built into your {city.name} home's roofline — control every colour, pattern, and schedule from your phone. Christmas, Halloween, birthdays, playoffs, any occasion.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "App-controlled from your phone — change colours instantly",
                  `Installed in ${city.name} by certified, insured crews`,
                  "No more annual install fees after year one",
                  "Lifetime warranty on all hardware",
                  "Discreet — no visible hardware during the day",
                  "Available for homes and commercial properties",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(178,34,34,0.2)", color: "var(--crimson-bright)" }}>
                      <CheckIcon className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-white/75">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/permanent-lighting"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
                style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", boxShadow: "0 8px 32px rgba(178,34,34,0.4)" }}>
                Learn About Permanent Lighting
              </Link>
            </div>

            <div className="p-8 rounded-2xl border"
              style={{ background: "linear-gradient(135deg, rgba(31,10,10,0.8), rgba(20,10,30,0.8))", borderColor: "rgba(178,34,34,0.25)" }}>
              <h3 className="font-display text-xl font-bold text-white mb-6">Seasonal vs. Permanent</h3>
              <div className="space-y-4">
                {[
                  { label: "Installation", seasonal: "Every year", permanent: "Once, lifetime" },
                  { label: "Cost over 5 years", seasonal: "5× install fee", permanent: "1× install + zero" },
                  { label: "Ladder time", seasonal: "Every year", permanent: "Never again" },
                  { label: "Occasions", seasonal: "Christmas only", permanent: "Every holiday & event" },
                  { label: "Control", seasonal: "Manual timer", permanent: "Phone app, anywhere" },
                  { label: "Warranty", seasonal: "Season only", permanent: "Lifetime" },
                ].map((row) => (
                  <div key={row.label} className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-xs text-white/50">{row.label}</span>
                    <span className="text-xs text-center text-white/55 bg-white/5 rounded px-2 py-1">{row.seasonal}</span>
                    <span className="text-xs text-center font-semibold text-white rounded px-2 py-1"
                      style={{ background: "rgba(178,34,34,0.25)", color: "var(--crimson-bright)" }}>{row.permanent}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <span />
                  <span className="text-[10px] text-center text-white/40">Seasonal</span>
                  <span className="text-[10px] text-center font-semibold" style={{ color: "var(--crimson-bright)" }}>Permanent ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Band */}
      <CtaBand
        heading={`Ready to Light Up Your ${city.name} Home or Business?`}
        sub={`Spots in ${city.name} fill fast in October and November. Book your free quote today.`}
      />

      {/* FAQ */}
      <FAQ faqs={cityFaqs(city.name)} title={`Lighting Questions for ${city.name}`} />

      {/* Neighbourhoods */}
      <section className="py-14 lg:py-20" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            Neighbourhoods We Serve
          </p>
          <h2 className="font-display text-2xl font-extrabold text-white mb-6">
            We Cover All of {city.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {city.neighbourhoods.map((n) => (
              <span key={n} className="px-4 py-2 rounded-full text-sm text-white/70 border border-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                {n}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full text-sm text-white/50 border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
              + all surrounding areas
            </span>
          </div>
          <p className="mt-6 text-sm text-white/50">
            Not sure if we cover your street? <a href={site.phoneHref} className="text-[var(--crimson-bright)] hover:underline">Call us — we almost certainly do.</a>
          </p>
        </div>
      </section>

      {/* Stars strip */}
      <section className="py-10 border-y" style={{ borderColor: "rgba(201,168,76,0.15)", backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-2">
            {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-5 h-5 text-[var(--gold-bright)]" filled />)}
          </div>
          <p className="font-display font-bold text-white text-lg">"{city.name}'s Best Holiday Lighting Company"</p>
          <p className="text-sm text-white/50 mt-1">{site.googleRating} stars · {site.reviewCount}+ verified reviews · Southern Ontario</p>
        </div>
      </section>

      {/* Contact */}
      <Contact cityName={city.name} />

      {/* Other cities */}
      <section className="py-12" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4 text-center">Also Serving</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { slug: "hamilton", name: "Hamilton" },
              { slug: "burlington", name: "Burlington" },
              { slug: "oakville", name: "Oakville" },
              { slug: "mississauga", name: "Mississauga" },
              { slug: "brampton", name: "Brampton" },
              { slug: "milton", name: "Milton" },
              { slug: "ancaster", name: "Ancaster" },
              { slug: "grimsby", name: "Grimsby" },
              { slug: "st-catharines", name: "St. Catharines" },
              { slug: "niagara-falls", name: "Niagara Falls" },
            ].filter(c => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`}
                className="px-4 py-2 rounded-full text-sm text-white/60 border border-white/10 hover:text-[var(--gold-bright)] hover:border-[var(--gold)]/30 transition">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CallNowFab />
    </>
  );
}
