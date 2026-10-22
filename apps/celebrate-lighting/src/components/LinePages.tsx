import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getCities, getNearbyCities, getOtherServiceLine, getPhoto, type City, type ServiceLine } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema, lineServiceSchema } from "@/lib/jsonld";
import { Icon } from "./Icons";
import { SectionHeading, Breadcrumbs, FaqList, CheckList, CityChips, FeatureGrid, IconTile, StatRow } from "./ui";
import { QuoteFormCompact } from "./QuoteFormCompact";
import { AiPreviewButton } from "./AiPreviewProvider";
import { ProcessTimeline, Testimonials, ClosingForm, SplitFeature } from "./sections";

/* ------------------------------------------------------------------
   The permanent and seasonal lines render from service-lines.json via
   these three components. Permanent = teal + demo offer; seasonal = gold
   + early-bird offer. Keep "demo" language exclusive to permanent.
   ------------------------------------------------------------------ */

const isSeasonal = (line: ServiceLine) => line.slug === "seasonal-lighting";

function formPropsFor(line: ServiceLine) {
  if (!isSeasonal(line)) return {};
  return {
    serviceValue: "Seasonal C9 Lighting",
    submitLabel: site.seasonal.ctaLong,
    reassurance: `Book before ${site.seasonal.deadline} for the best dates and price.`,
    successTitle: "Seasonal quote request received",
    successBody: <>We’ll call within <strong>24 hours</strong> to measure and give you a firm per-season price. Install runs {site.seasonal.installWindow}; takedown in {site.seasonal.takedownWindow}.</>,
  };
}

function heroPhotoFor(line: ServiceLine) {
  return isSeasonal(line)
    ? getPhoto("red-green-white-permanent-roofline-lights-stone-home-steep-gables")
    : getPhoto("cool-white-permanent-roofline-lights-stone-home-wraparound-porch");
}

function LineHero({ line, city, h1, sub, eyebrow, crumbs }: { line: ServiceLine; city?: City; h1: React.ReactNode; sub: string; eyebrow: string; crumbs: { name: string; href?: string }[] }) {
  const gold = isSeasonal(line);
  const photo = heroPhotoFor(line);
  const offer = gold ? site.seasonal : site.demo;
  return (
    <section className="relative overflow-hidden on-photo" style={{ background: "var(--deep)" }}>
      <div className="absolute inset-0">
        <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
        <div className="absolute inset-0 night-veil" />
      </div>
      <div className="wrap relative py-14 md:py-20 lg:py-24">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="max-w-2xl">
            <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{eyebrow}</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.05] text-ink text-balance">{h1}</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{sub}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={`btn ${gold ? "btn-gold" : "btn-primary"} btn-lg`}>{offer.ctaLong} <Icon.Arrow width={18} height={18} /></Link>
              <Link href="/ai-preview" className="btn btn-ghost-white btn-lg"><Icon.Sparkle width={18} height={18} /> Free AI Preview</Link>
            </div>
            {city && <p className="mt-5 inline-flex items-center gap-2 text-sm text-body"><Icon.Pin width={16} height={16} className={gold ? "text-[var(--gold-ink)]" : "text-[var(--accent-ink)]"} /> {city.name}, {city.county} · {city.driveFromWoodstock} from our Woodstock base</p>}
          </div>
          <div className="card-light p-5 sm:p-7">
            <span className={`pill ${gold ? "pill-gold" : ""} mb-3`}>{offer.short}</span>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">{gold ? `Lock your ${new Date().getFullYear()} install date` : "See it lit on your home first"}</h2>
            <p className="text-sm text-slate-600 mt-1 mb-4">{offer.promise}</p>
            <QuoteFormCompact formId="line-hero" gold={gold} {...formPropsFor(line)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceFit({ line }: { line: ServiceLine }) {
  const gold = isSeasonal(line);
  const other = getOtherServiceLine(line.slug)!;
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap grid md:grid-cols-2 gap-5">
        <div className="card card-static p-6 md:p-8" style={{ borderColor: gold ? "rgba(232,182,0,0.4)" : "rgba(34,193,176,0.4)" }}>
          <h2 className="font-bold text-xl text-ink mb-4">{line.audienceFit.heading}</h2>
          <CheckList items={line.audienceFit.yes} />
        </div>
        <div className="card card-static p-6 md:p-8">
          <h2 className="font-bold text-xl text-ink mb-4">{line.audienceFit.noHeading}</h2>
          <ul className="space-y-2.5">
            {line.audienceFit.no.map((t) => (
              <li key={t} className="flex items-start gap-3 text-body"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--muted)] shrink-0" />{t}</li>
            ))}
          </ul>
          <Link href={`/${other.slug}`} className="btn btn-outline btn-sm mt-6">See {other.name.toLowerCase()} <Icon.Arrow width={14} height={14} /></Link>
        </div>
      </div>
    </section>
  );
}

function Benefits({ line }: { line: ServiceLine }) {
  const gold = isSeasonal(line);
  const icons = [<Icon.Eye key="a" />, <Icon.Palette key="b" />, <Icon.Snow key="c" />, <Icon.Home key="d" />, <Icon.Shield key="e" />, <Icon.Sparkle key="f" />];
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow={gold ? "Why seasonal with us" : "Why permanent"} title={gold ? "Classic Look, Zero Ladder Work" : "Precision Design. Premium Materials."} sub={line.tagline} gold={gold} />
        <FeatureGrid cols={3} gold={gold} items={line.benefits.map((b, i) => ({ icon: icons[i % icons.length], title: b.title, body: b.body }))} />
      </div>
    </section>
  );
}

function Pricing({ line }: { line: ServiceLine }) {
  const gold = isSeasonal(line);
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="wrap grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
        <div>
          <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>Pricing</span>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-ink">{line.pricing.heading}</h2>
          <p className="mt-4 text-body leading-relaxed text-lg">{line.pricing.lead}</p>
          <p className="mt-4 text-[var(--muted)] leading-relaxed">{line.pricing.closer}</p>
          {!gold && <Link href="/guides/permanent-christmas-lights-cost-ontario" className="btn btn-outline btn-sm mt-6">Read the full cost guide <Icon.Arrow width={14} height={14} /></Link>}
        </div>
        <div className="card card-static p-6 md:p-8">
          <h3 className="font-bold text-ink mb-4">What moves the price</h3>
          <CheckList items={line.pricing.drivers} />
          {"specs" in line && line.specs && (
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-6" style={{ borderColor: "var(--border)" }}>
              {line.specs.map((s) => (
                <div key={s.label}><dt className="text-xs uppercase tracking-wide text-[var(--muted)]">{s.label}</dt><dd className="font-semibold text-ink text-sm">{s.value}</dd></div>
              ))}
            </dl>
          )}
          {"plans" in line && line.plans && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4 border-t pt-6" style={{ borderColor: "var(--border)" }}>
              {line.plans.map((p) => (
                <div key={p.name} className="rounded-xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <p className="font-bold text-[var(--gold-ink)]">{p.name}</p>
                  <p className="text-xs text-[var(--muted)] mb-2">{p.tagline}</p>
                  <ul className="text-xs text-body space-y-1">{p.includes.map((i) => <li key={i}>· {i}</li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SeasonTimeline({ line }: { line: ServiceLine }) {
  if (!("seasonTimeline" in line) || !line.seasonTimeline) return null;
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading eyebrow="The season at a glance" title="When Everything Happens" sub={`Book before ${site.seasonal.deadline} to lock your price and install slot.`} gold />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {line.seasonTimeline.map((t) => (
            <div key={t.period} className="card card-static p-6">
              <p className="stat-num text-2xl">{t.period}</p>
              <h3 className="font-bold text-ink mt-2">{t.title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PILLAR ================= */
export function ServiceLinePage({ line }: { line: ServiceLine }) {
  const gold = isSeasonal(line);
  const cities = getCities();
  const url = `${site.url}/${line.slug}`;
  return (
    <>
      <JsonLd data={[
        lineServiceSchema({ name: line.name, description: line.metaDescription, url, serviceType: gold ? "Christmas light installation" : "Permanent outdoor LED lighting installation", priceRange: gold ? undefined : "$2,500 to $8,000 one-time" }),
        breadcrumbSchema([{ name: "Home", url: site.url }, { name: line.name, url }]),
        faqSchema(line.faqs),
        howToSchema({ name: `How ${line.name.toLowerCase()} works with Celebrate Lighting`, description: line.heroSub, steps: line.steps.map((s) => ({ name: s.title, text: s.desc })) }),
      ]} />
      <LineHero line={line} eyebrow={line.eyebrow} h1={<>{line.heroH1} <span className={gold ? "text-[var(--gold-ink)]" : "text-[var(--accent-ink)]"}>{line.heroH1Accent}</span></>} sub={line.heroSub} crumbs={[{ name: line.name }]} />
      <section className="border-b" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="wrap py-8"><StatRow stats={gold ? [{ stat: "Oct–Nov", label: "Installation window" }, { stat: "Jan", label: "Takedown and storage" }, { stat: "Rent / Buy", label: "Your choice of plan" }, { stat: site.seasonal.deadline, label: "Early-bird deadline" }] : site.proofPoints} /></div>
      </section>
      <AudienceFit line={line} />
      <Benefits line={line} />
      {!gold && (
        <SplitFeature eyebrow="Colour-matched track" title={<>Invisible by Day. <span className="text-[var(--accent-ink)]">Yours Every Night.</span></>} body="We take a physical sample of your soffit and fascia at the demo and match the aluminum track to it. The LEDs sit inside the trim channel with concealed cable routing, so in daylight the house looks exactly as it did before." bullets={[{ icon: <Icon.Eye width={18} height={18} />, label: "Colour-matched housing" }, { icon: <Icon.Home width={18} height={18} />, label: "No roof penetration" }, { icon: <Icon.Snow width={18} height={18} />, label: "IP67, −40°C rated" }, { icon: <Icon.Shield width={18} height={18} />, label: "Lifetime warranty" }]} photoNeedle="daytime-colour-matched-permanent-light-track-in-white-soffit" cta={{ label: "Will it work on my soffit?", href: "/guides/soffit-fascia-compatibility-guide" }} />
      )}
      <ProcessTimeline steps={line.steps} gold={gold} title={gold ? "How the Season Works" : "How It Works"} sub={gold ? "Book, measure, install, enjoy, takedown. You never touch a ladder." : "From first call to lights-on, usually inside two weeks."} />
      <SeasonTimeline line={line} />
      <Pricing line={line} />
      <Testimonials />
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>FAQ</span>
            <h2 className="font-display text-3xl text-ink leading-tight">{line.name} questions, answered</h2>
            <p className="mt-3 text-[var(--muted)]">Still unsure? <Link href="/faq" className="text-[var(--accent-ink)] underline underline-offset-2">Read all 40 FAQs</Link> or send the form.</p>
          </div>
          <FaqList items={line.faqs} name={`${line.slug}-faq`} />
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Where we install" title={`${line.name} Across Southwestern Ontario`} sub="Local pages with neighbourhood detail for every community we serve." gold={gold} align="left" />
          <CityChips cities={cities} basePath={`/${line.slug}`} />
          <div className="mt-6"><Link href={`/${line.slug}/commercial`} className="btn btn-outline btn-sm">Commercial {line.shortName.toLowerCase()} lighting <Icon.Arrow width={14} height={14} /></Link></div>
        </div>
      </section>
      <ClosingForm gold={gold} formProps={formPropsFor(line)} eyebrow={gold ? site.seasonal.short : site.demo.short} title={gold ? "Lock In Your Install Date Before the Rush." : "See It Lit Up on Your Own Home. Then Decide."} body={gold ? site.seasonal.detail : site.demo.detail} photoNeedle={gold ? "red-white-green-permanent-christmas-roofline-lights-blue-two-storey" : "cool-white-permanent-roofline-lights-stone-home-wraparound-porch"} />
    </>
  );
}

/* ================= CITY ================= */
export function LineCityPage({ line, city }: { line: ServiceLine; city: City }) {
  const gold = isSeasonal(line);
  const copy = gold ? city.seasonalCopy : city.permanentCopy;
  const nearby = getNearbyCities(city.slug, 10);
  const url = `${site.url}/${line.slug}/${city.slug}`;
  const h1 = gold ? <>Christmas Light Installation in <span className="text-[var(--gold-ink)]">{city.name}</span></> : <>Permanent Lighting in <span className="text-[var(--accent-ink)]">{city.name}, Ontario</span></>;
  const photos = gold
    ? [getPhoto("red-white-green-permanent-christmas-roofline-lights-blue-two-storey"), getPhoto("warm-white-permanent-roofline-lights-dark-siding-bungalow"), getPhoto("multicolour-permanent-roofline-lights-stone-and-timber-porch-close-up")]
    : [getPhoto("warm-white-permanent-roofline-lights-brick-home-garage-gable"), getPhoto("rainbow-permanent-roofline-lights-brick-home-garage-gable"), getPhoto("purple-and-teal-permanent-roofline-lights-brick-home-garage-gable")];
  return (
    <>
      <JsonLd data={[
        lineServiceSchema({ name: `${line.name} in ${city.name}`, description: gold ? city.meta.seasonal : city.meta.permanent, url, serviceType: gold ? "Christmas light installation" : "Permanent outdoor LED lighting installation", city: city.name }),
        breadcrumbSchema([{ name: "Home", url: site.url }, { name: line.name, url: `${site.url}/${line.slug}` }, { name: city.name, url }]),
        faqSchema([...city.faqs, ...line.faqs.slice(0, 3)]),
      ]} />
      <LineHero line={line} city={city} eyebrow={`${line.eyebrow} · ${city.name}`} h1={h1} sub={gold ? `Classic C9 roofline lights for ${city.name} homes, installed in ${site.seasonal.installWindow}, serviced all season and taken down in ${site.seasonal.takedownWindow}. Rent or buy.` : `Colour-matched LED track for ${city.name} homes in ${city.county}. ${city.climateNote}`} crumbs={[{ name: line.name, href: `/${line.slug}` }, { name: city.name }]} />

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="prose-dark">
            <h2 className="!mt-0">{gold ? `Seasonal lighting for ${city.name}` : `Why ${city.name} homeowners choose permanent lighting`}</h2>
            {copy.map((p, i) => <p key={i}>{p}</p>)}
            <h3>{city.name} neighbourhoods we serve</h3>
            <p>{city.neighbourhoods.join(", ")} and the surrounding area. {city.housingStock}</p>
            <h3>Commercial {gold ? "holiday" : "permanent"} lighting in {city.name}</h3>
            <p>{city.commercialNote} <Link href={`/${line.slug}/commercial`}>Learn about our commercial service.</Link></p>
          </div>
          <aside className="space-y-4">
            <div className="card card-static p-6">
              <h3 className="font-bold text-ink mb-3">{city.name} at a glance</h3>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">County</dt><dd className="text-ink font-semibold text-right">{city.county}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Population</dt><dd className="text-ink font-semibold text-right">{city.population}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">From Woodstock</dt><dd className="text-ink font-semibold text-right">{city.driveFromWoodstock}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Response</dt><dd className="text-ink font-semibold text-right">Within 24 hours</dd></div>
              </dl>
              <p className="mt-4 text-xs text-[var(--muted)]">Landmarks nearby: {city.landmarks.join(" · ")}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((p) => (
                <div key={p.src} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border)]">
                  <Image src={p.src} alt={p.alt} fill sizes="20vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
                </div>
              ))}
            </div>
            <div className="card card-static p-6">
              <IconTile gold={gold} className="mb-3"><Icon.Sparkle /></IconTile>
              <h3 className="font-bold text-ink">Free AI preview for your {city.name} home</h3>
              <p className="text-sm text-[var(--muted)] mt-1 mb-4">Upload one photo and see it lit before anyone comes out.</p>
              <AiPreviewButton className="btn btn-outline btn-sm w-full" />
            </div>
          </aside>
        </div>
      </section>

      <Benefits line={line} />
      <ProcessTimeline steps={line.steps} gold={gold} title={`How it works in ${city.name}`} sub={gold ? "Book, measure, install, enjoy, takedown." : "From first call to lights-on, usually inside two weeks."} />

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{city.name} FAQ</span>
            <h2 className="font-display text-3xl text-ink leading-tight">Questions from {city.name} homeowners</h2>
          </div>
          <FaqList items={[...city.faqs, ...line.faqs.slice(0, 3)]} name={`${city.slug}-faq`} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Nearby" title={`${line.name} in communities near ${city.name}`} gold={gold} align="left" />
          <CityChips cities={nearby} basePath={`/${line.slug}`} />
          <p className="mt-6 text-sm text-[var(--muted)]">Also see: <Link href={`/service-areas/${city.slug}`} className="text-[var(--accent-ink)] underline underline-offset-2">everything we do in {city.name}</Link> · <Link href={`/${getOtherServiceLine(line.slug)!.slug}/${city.slug}`} className="text-[var(--accent-ink)] underline underline-offset-2">{getOtherServiceLine(line.slug)!.name.toLowerCase()} in {city.name}</Link></p>
        </div>
      </section>

      <ClosingForm gold={gold} formProps={formPropsFor(line)} eyebrow={gold ? site.seasonal.short : site.demo.short} title={gold ? `Book your ${city.name} install before the calendar fills.` : `See it lit up on your ${city.name} home. Then decide.`} body={gold ? site.seasonal.detail : site.demo.detail} photoNeedle={gold ? "red-white-green-permanent-christmas-roofline-lights-blue-two-storey" : "warm-white-permanent-roofline-lights-two-storey-home-covered-porch"} />
    </>
  );
}

/* ================= COMMERCIAL ================= */
export function CommercialLinePage({ line }: { line: ServiceLine }) {
  const gold = isSeasonal(line);
  const c = line.commercial;
  const url = `${site.url}/${line.slug}/commercial`;
  const photos = [getPhoto("purple-and-teal-permanent-roofline-lights-commercial-building"), getPhoto("rainbow-permanent-roofline-lights-commercial-brick-building")];
  const icons = [<Icon.Building key="1" />, <Icon.Pin key="2" />, <Icon.Users key="3" />, <Icon.Lamp key="4" />, <Icon.Sparkle key="5" />, <Icon.Calendar key="6" />];
  return (
    <>
      <JsonLd data={[
        lineServiceSchema({ name: c.h1, description: c.metaDescription, url, serviceType: gold ? "Commercial Christmas light installation" : "Commercial permanent LED lighting" }),
        breadcrumbSchema([{ name: "Home", url: site.url }, { name: line.name, url: `${site.url}/${line.slug}` }, { name: "Commercial", url }]),
        faqSchema(c.faqs),
      ]} />
      <section className="relative overflow-hidden on-photo" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0">
          <Image src={photos[0].src} alt={photos[0].alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={photos[0].blurDataURL} className="object-cover" />
          <div className="absolute inset-0 night-veil" />
        </div>
        <div className="wrap relative py-14 md:py-20 lg:py-24">
          <Breadcrumbs items={[{ name: line.name, href: `/${line.slug}` }, { name: "Commercial" }]} />
          <div className="mt-6 max-w-3xl">
            <span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>{c.eyebrow}</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">{c.h1}</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{c.sub}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact?service=commercial" className={`btn ${gold ? "btn-gold" : "btn-primary"} btn-lg`}>Request a commercial quote <Icon.Arrow width={18} height={18} /></Link>
              <Link href="/ai-preview" className="btn btn-ghost-white btn-lg"><Icon.Sparkle width={18} height={18} /> Free AI Preview</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <p className="max-w-3xl text-lg text-body leading-relaxed mb-12">{c.lead}</p>
          <FeatureGrid cols={3} gold={gold} items={c.segments.map((s, i) => ({ icon: icons[i % icons.length], title: s.title, body: s.body }))} />
        </div>
      </section>
      <SplitFeature eyebrow="Built for procurement" title="What You Get Beyond the Lights" body="Commercial and municipal work runs on paperwork, deadlines and not disrupting the people who use the building. We scope every job around all three." bullets={c.reasons.map((r) => ({ icon: <Icon.Check width={18} height={18} />, label: r.title }))} photoNeedle="rainbow-permanent-roofline-lights-commercial-brick-building" gold={gold} flip />
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.reasons.map((r) => (
            <div key={r.title} className="card card-static p-6"><h3 className="font-bold text-ink mb-1.5">{r.title}</h3><p className="text-sm text-[var(--muted)] leading-relaxed">{r.body}</p></div>
          ))}
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div><span className={`pill ${gold ? "pill-gold" : ""} mb-4`}>Commercial FAQ</span><h2 className="font-display text-3xl text-ink leading-tight">Questions from property managers and municipalities</h2></div>
          <FaqList items={c.faqs} name="commercial-faq" />
        </div>
      </section>
      <ClosingForm gold={gold} formProps={{ serviceValue: `Commercial ${line.shortName} Lighting`, submitLabel: "Request a commercial quote", reassurance: "We respond within 24 hours with next steps and insurance documents on request.", successTitle: "Commercial request received", successBody: <>We’ll be in touch within <strong>24 hours</strong> to arrange a site walk and discuss scope, timing and documentation.</> }} eyebrow="Commercial & municipal" title="Tell Us About the Property and the Deadline." body="A site walk, a written scope and proof of insurance, all before you commit to anything." photoNeedle="purple-and-teal-permanent-roofline-lights-commercial-building" />
    </>
  );
}
