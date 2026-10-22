import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCities, getFaqGroups, getOccasions, getPhoto, getPhotos, getTestimonials } from "@/lib/content";
import { JsonLd, faqSchema, localBusinessSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { SectionHeading, FeatureGrid, FaqList, CityChips, IconTile } from "@/components/ui";
import { AiPreviewButton } from "@/components/AiPreviewProvider";
import { ProcessTimeline, Testimonials, ClosingForm, SplitFeature } from "@/components/sections";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Permanent Outdoor LED Lighting in Ontario | Celebrate Lighting",
  description:
    "Permanent roofline LED lighting and seasonal C9 Christmas lights across Southwestern Ontario. Free on-site demo and free AI preview of your home. Woodstock, London, Kitchener-Waterloo, Guelph, Brantford.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Permanent Outdoor LED Lighting in Ontario | Celebrate Lighting",
    description: "See permanent lighting lit up on your own home before you pay. Free on-site demo, free AI preview, lifetime warranty.",
    url: site.url,
    images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home.jpg", alt: "Permanent roofline lighting on an Ontario home" }],
  },
  twitter: { card: "summary_large_image", title: "Permanent Outdoor LED Lighting in Ontario | Celebrate Lighting", description: "Free on-site demo and free AI preview of your home. Lifetime warranty." },
};

const homeFaqs = [
  { question: "What is permanent outdoor lighting?", answer: "A colour-matched aluminum track with individually controlled LEDs, fitted into your soffit and fascia once and left up year-round. You control colours, scenes and schedules from an app. Warm white on a normal night, holiday colours when you want them, with nothing to hang or take down." },
  { question: "How much does permanent lighting cost in Ontario?", answer: "Most homes land between $2,500 and $8,000 as a one-time cost, depending on how many linear feet of roofline you light and how many peaks and storeys are involved. You get an itemized quote at your free on-site demo before you commit to anything." },
  { question: "What happens at the free on-site demo?", answer: site.demo.detail },
  { question: "What is the free AI home preview?", answer: `${site.aiPreview.detail} It arrives by email ${site.aiPreview.turnaround}.` },
  { question: "Do you still install traditional Christmas lights?", answer: "Yes. Our seasonal C9 service installs classic big-bulb Christmas lights in October and November, services them through the season and takes them down in January. You can rent the lights or buy them. Book before September 30 for the best dates and pricing." },
  { question: "Where do you install?", answer: `We're based in Woodstock and serve Southwestern Ontario within about 90 minutes, including ${site.serviceAreas.slice(1, 9).join(", ")} and the towns in between.` },
];

export default function HomePage() {
  const hero = getPhoto("rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home");
  const cities = getCities();
  const occasions = getOccasions();
  const photos = getPhotos();
  const teaser = [
    getPhoto("cool-white-permanent-roofline-lights-stone-home-wraparound-porch"),
    getPhoto("red-green-white-permanent-roofline-lights-stone-home-steep-gables"),
    getPhoto("white-permanent-roofline-lights-modern-flat-roof-home"),
    getPhoto("rainbow-gradient-permanent-roofline-lights-dark-siding-bungalow"),
    getPhoto("warm-white-permanent-roofline-lights-brick-home-garage-gable"),
  ];
  const lineCards = [
    { title: "Permanent Lighting", href: "/permanent-lighting", photo: getPhoto("warm-white-permanent-roofline-lights-two-storey-home-covered-porch"), body: "Colour-matched LED track installed in your soffit once. 16 million colours, app control, lifetime warranty.", bullets: ["Roofline, peaks & gables", "Warm white every day, colour for every holiday", "Free on-site demo first"] },
    { title: "Seasonal C9 Christmas Lights", href: "/seasonal-lighting", photo: getPhoto("red-white-green-permanent-christmas-roofline-lights-blue-two-storey"), body: "The classic big-bulb look, custom-fit to your roofline, hung in the fall and removed in January.", bullets: ["Install, service, takedown", "Rent the lights or buy them", "Early-bird pricing before Sept 30"], gold: true },
    { title: "Commercial Lighting", href: "/commercial", photo: getPhoto("purple-and-teal-permanent-roofline-lights-commercial-building"), body: "Storefronts, plazas, churches and municipal buildings. Brand colours year-round, civic colours on demand.", bullets: ["Insured, WSIB covered", "Off-hours installation", "Written specs for tender"] },
  ];
  const faqForSchema = [...homeFaqs, ...getFaqGroups().flatMap((g) => g.items).slice(0, 6)];

  return (
    <>
      <JsonLd data={[localBusinessSchema(getTestimonials()), faqSchema(faqForSchema)]} />

      {/* ---------- Hero (light, photo right) ---------- */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--surface) 0%, #fff 100%)" }}>
        <div className="wrap relative py-14 md:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <span className="pill pill-gold mb-5">{site.bookingBanner}</span>
            <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.5rem] leading-[1.05] text-ink text-balance">
              Permanent roofline lighting that <span className="text-[var(--accent-ink)]">disappears by day</span> and glows every night.
            </h1>
            <p className="mt-5 text-lg text-body leading-relaxed">
              Colour-matched LED track installed in your soffit once. Warm white for everyday, any colour for every holiday, all from your phone. We light it up on your own house before you pay a cent.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">{site.demo.cta} <Icon.Arrow width={18} height={18} /></Link>
              <AiPreviewButton className="btn btn-outline btn-lg" />
            </div>
            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold text-body">
              {[
                [<Icon.Shield key="s" width={16} height={16} />, "Lifetime warranty"],
                [<Icon.Snow key="w" width={16} height={16} />, "Rated to −40°C"],
                [<Icon.Palette key="p" width={16} height={16} />, "16M+ colours"],
                [<Icon.Pin key="l" width={16} height={16} />, "Woodstock based"],
              ].map(([icon, label]) => (
                <li key={String(label)} className="flex items-center gap-2"><span className="text-[var(--accent-ink)]">{icon}</span>{label}</li>
              ))}
            </ul>
          </div>
          <div className="relative lg:pb-10">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-lift)" }}>
              <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" />
            </div>
            <div className="card-light mt-4 lg:mt-0 lg:absolute lg:-bottom-0 lg:-left-8 lg:w-[22rem] p-5 flex items-start gap-4">
              <IconTile className="shrink-0"><Icon.Home /></IconTile>
              <div>
                <p className="font-bold text-slate-900 leading-tight">{site.demo.short}</p>
                <p className="text-sm text-slate-600 mt-1">{site.demo.promise}</p>
                <Link href="/contact" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)] hover:underline">Book a time <Icon.Arrow width={14} height={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust bar ---------- */}
      <section className="border-y" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="wrap py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-[var(--border)]">
          {[
            { icon: <Icon.Home />, title: "Free on-site demo", body: "A live sample lit on your actual house before you decide." },
            { icon: <Icon.Snow />, title: "Ontario winter rated", body: "IP67 sealed and cold-rated to −40°C. Built for lake-effect snow." },
            { icon: <Icon.App />, title: "App controlled", body: "16M+ colours, scenes, schedules and zones from your phone." },
            { icon: <Icon.Shield />, title: "Lifetime warranty", body: "Parts, hardware and workmanship, in writing." },
          ].map((t) => (
            <div key={t.title} className="flex flex-col items-center text-center px-2">
              <IconTile className="mb-3">{t.icon}</IconTile>
              <h3 className="font-bold text-ink">{t.title}</h3>
              <p className="mt-1 text-xs md:text-sm text-[var(--muted)] leading-snug">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Our services" title="Lighting Solutions" sub="Permanent for every night of the year, seasonal for the classic Christmas look, commercial for your business." />
          <div className="grid md:grid-cols-3 gap-5">
            {lineCards.map((c) => (
              <Link key={c.href} href={c.href} className="card card-lift overflow-hidden flex flex-col group">
                <div className="relative aspect-[4/3]">
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" blurDataURL={c.photo.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-xl text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{c.body}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-body">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2"><Icon.Check width={14} height={14} className={c.gold ? "text-[var(--gold-ink)]" : "text-[var(--accent-ink)]"} /> {b}</li>
                    ))}
                  </ul>
                  <span className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${c.gold ? "text-[var(--gold-ink)]" : "text-[var(--accent-ink)]"}`}>Learn more <Icon.Arrow width={16} height={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Why Celebrate Lighting" title="Your Local Lighting Partner" sub="Premium product, careful installation, and a team in Woodstock you can actually reach." />
          <FeatureGrid
            items={[
              { icon: <Icon.Eye />, title: "Try before you buy", body: "The free on-site demo is the whole point. You see your own home lit up, at night, before you spend anything." },
              { icon: <Icon.Pin />, title: "Local, Oxford County based", body: "Our crews know the homes from London to Guelph, and the weather they have to survive." },
              { icon: <Icon.Ruler />, title: "End-to-end service", body: "Measure, colour-match, install, app setup and training. One team from start to finish." },
              { icon: <Icon.Shield />, title: "Guaranteed for life", body: "LED modules, mounting hardware and our workmanship, covered for as long as you own the home." },
            ]}
          />
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <ProcessTimeline
        steps={[
          { title: "Free consultation", desc: "Call or send the form. We ring back within 24 hours and set a time, evenings included." },
          { title: "On-site demo", desc: "We measure your rooflines, colour-match your soffit and mount a live sample. You see it lit on your house.", highlight: "The free part" },
          { title: "Itemized quote", desc: "A clear, written price before we leave. No pressure to sign on the spot." },
          { title: "Installation", desc: "Usually one to two days. Concealed cable routing, no roof penetration, clean finish." },
          { title: "App setup & support", desc: "We configure scenes and schedules, walk you through the app, and back it all for life." },
        ]}
      />

      {/* ---------- Soffit split ---------- */}
      <SplitFeature
        eyebrow="Discreet by day. Brilliant by night."
        title={<>Installed in Your Soffit. <span className="text-[var(--accent-ink)]">Built to Disappear.</span></>}
        body="We take a physical colour sample of your soffit and fascia and match the aluminum track to it, so the housing sits inside the trim line. Most visitors never notice it until the lights come on. Everything is IP67 sealed, UV-rated and cold-rated to −40°C, and nothing is screwed through your shingles."
        bullets={[
          { icon: <Icon.Eye width={18} height={18} />, label: "Virtually invisible by day" },
          { icon: <Icon.Palette width={18} height={18} />, label: "16M+ colours & patterns" },
          { icon: <Icon.App width={18} height={18} />, label: "App controlled" },
          { icon: <Icon.Snow width={18} height={18} />, label: "Weatherproof to −40°C" },
        ]}
        photoNeedle="daytime-colour-matched-permanent-light-track-in-white-soffit"
        cta={{ label: "How permanent lighting works", href: "/permanent-lighting" }}
      />

      {/* ---------- AI preview ---------- */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="pill mb-4"><Icon.Sparkle width={14} height={14} /> New · Free AI Home Preview</span>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-ink text-balance">Curious How It Would Look on Your House?</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">{site.aiPreview.detail}</p>
            <ol className="mt-6 space-y-3">
              {[
                ["Snap a photo", "Stand across the street and get the whole roofline in frame. Day or dusk both work."],
                ["Upload it", "Takes 30 seconds. Tell us the colour you're picturing, or let us choose."],
                ["Get your preview", `We email your AI preview ${site.aiPreview.turnaround}. Then book a demo to see it for real.`],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="timeline-dot !w-9 !h-9 text-sm shrink-0 !shadow-none">{i + 1}</span>
                  <div><p className="font-bold text-ink">{t}</p><p className="text-sm text-[var(--muted)]">{b}</p></div>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-3">
              <AiPreviewButton className="btn btn-primary btn-lg" />
              <Link href="/ai-preview" className="btn btn-outline btn-lg">How it works</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[getPhoto("warm-white-permanent-roofline-lights-brick-home-garage-gable"), getPhoto("rainbow-permanent-roofline-lights-brick-home-garage-gable"), getPhoto("cool-white-permanent-roofline-lights-brick-home-garage-gable"), getPhoto("purple-and-teal-permanent-roofline-lights-brick-home-garage-gable")].map((p, i) => (
              <div key={p.src} className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] ${i % 3 === 0 ? "" : ""}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
                <span className="absolute left-3 bottom-3 pill pill-white !text-[0.62rem] !py-1">{p.colour}</span>
              </div>
            ))}
            <p className="col-span-2 text-center text-xs text-[var(--muted)]">The same house, four scenes. One system does all of it.</p>
          </div>
        </div>
      </section>

      {/* ---------- Gallery teaser ---------- */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[0.8fr_1.6fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.05] text-ink">Beautiful Homes.<br />Happy Clients.</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">Browse permanent roofline installations in every colour, from everyday warm white to full holiday scenes. {photos.length} photos and counting.</p>
            <Link href="/gallery" className="btn btn-primary mt-6">View gallery <Icon.Arrow width={16} height={16} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {teaser.map((p, i) => (
              <Link key={p.src} href="/gallery" className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] group ${i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 33vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ---------- Occasions ---------- */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="One system, every occasion" title="Lights for Every Holiday, Game and Party" sub="Pre-built scenes for the whole calendar. Change the entire house in about five seconds." />
          <div className="flex flex-wrap justify-center gap-2">
            {occasions.map((o) => (
              <Link key={o.slug} href={`/occasions/${o.slug}`} className="chip">{o.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Service area ---------- */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center">
          <div>
            <span className="pill mb-4">Where we work</span>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-ink">Proudly Serving Southwestern Ontario</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">Based at {site.addressLine}, we install permanent and seasonal lighting across Oxford County and the surrounding region, within roughly 90 minutes of home.</p>
            <Link href="/service-areas" className="btn btn-outline mt-6">All service areas <Icon.Arrow width={16} height={16} /></Link>
          </div>
          <CityChips cities={cities} basePath="/service-areas" />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap max-w-4xl">
          <SectionHeading eyebrow="Got questions?" title="Frequently Asked Questions" />
          <FaqList items={homeFaqs} name="home-faq" />
          <div className="text-center mt-8"><Link href="/faq" className="btn btn-outline btn-sm">All 40 questions answered <Icon.Arrow width={14} height={14} /></Link></div>
        </div>
      </section>

      <ClosingForm />
    </>
  );
}
