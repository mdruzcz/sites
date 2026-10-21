import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { formatCad, pricing } from "@/lib/pricing";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SceneCanvas } from "@/components/demo/SceneCanvas";
import { Check } from "@/components/Icons";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const title = "Care & Seasonal Service";
const description =
  "Seasonal care for Resonate pixel lighting: pre-season checks, repairs, theme and playlist changeovers, mic recalibration, takedown and storage across Canada.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/care` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/care` },
  twitter: { title: `${title} | ${site.name}`, description },
};

const VISIT = [
  "Port test on every prop (Flash and Last 10) to find dark or miscounted pixels",
  "Replace failed pixels or strands and reseal connections",
  "Check clips, anchors and guy lines after freeze-thaw, wind and snow",
  "Re-run microphone calibration and the look check with your music",
  "Load the season's themes, saved looks, playlists and schedule",
  "Apply software updates",
];

const SEASONS = [
  { name: "Autumn", body: "Pre-season check and repairs, seasonal props installed, holiday playlist and dusk schedule loaded before the first week of December.", theme: "Fireplace" },
  { name: "Winter", body: "Mid-season check on request, storm call-outs, and a switch to a New Year or winter-festival playlist.", theme: "Icicles" },
  { name: "Spring", body: "Takedown and storage of seasonal props; permanent rooflines switch to spring colours or your brand colours.", theme: "Ocean" },
  { name: "Summer", body: "Canada Day and event themes, patio looks, and a site walk to plan the next phase.", theme: "Canada Day" },
];

export default function CarePage() {
  const z = pricing.travel.zones;
  const faqs = [
    {
      question: "How is care priced?",
      answer: `Care visits are billed like installation: ${formatCad(pricing.installation.crewDayRate)} per crew-day, plus travel by zone (no trip fee in ${pricing.travel.homeRegion}). Seasonal care plans for a set number of visits are quoted per site.`,
    },
    {
      question: "What can our staff do without a visit?",
      answer: "From the Light Show app: change themes, looks and colours, edit the schedule and playlists, save looks, run the port tests, and re-run the microphone calibration and look check in Setup.",
    },
    {
      question: "Do you store seasonal props?",
      answer: "Yes. Takedown and storage can be part of a care plan, with re-installation before the next season. Permanent rooflines and wrapped trees usually stay up all year.",
    },
    {
      question: "Are software updates included?",
      answer: "Yes. Lifetime software access includes updates; care visits are a convenient time to apply them.",
    },
  ];

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Pixel lighting care and seasonal service",
          serviceType: "Seasonal lighting maintenance",
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "Canada" },
          url: `${site.url}/care`,
          description,
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Care & seasonal service", url: `${site.url}/care` }])} />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Care &amp; seasonal service</p>
            <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
              Every pixel lit, every <span className="gradient-text">season</span>.
            </h1>
            <p className="text-muted-strong text-lg leading-relaxed mb-6">
              Weather, ladders and busy staff are hard on any display. Care visits keep yours working and changing with the calendar, anywhere in Canada.
            </p>
            <Link href="/contact?kit=care#quote" className="btn btn-primary">Ask about a care plan</Link>
          </div>
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-line bg-[#04060b]">
            <SceneCanvas scene="roofline" selection={{ kind: "theme", name: "Icicles" }} label="3D render of a house roofline running the Icicles theme" mini={false} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader eyebrow="On every visit" title="What a care visit covers." align="left" />
            <ul className="space-y-3 text-muted-strong -mt-4">
              {VISIT.map((v) => (
                <li key={v} className="flex items-start gap-2"><Check /> {v}</li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <p className="eyebrow">Rates</p>
            <h2 className="text-2xl font-bold text-white mb-3">Billed by the crew-day</h2>
            <p className="text-muted-strong leading-relaxed mb-4">
              {formatCad(pricing.installation.crewDayRate)} per crew-day for a {pricing.installation.crewLabel}, plus travel by zone: no trip fee in {pricing.travel.homeRegion}, {formatCad(z.prairies.tripFee)} per crew trip in Alberta and Manitoba, {formatCad(z.national.tripFee)} in BC and Ontario, {formatCad(z.east.tripFee)} in Québec and Atlantic Canada. CAD, {pricing.taxNote}.
            </p>
            <p className="text-sm text-muted">Seasonal plans with a set number of visits, takedown and storage are quoted per site.</p>
            <Link href="/pricing#installation" className="inline-flex items-center min-h-[44px] mt-2 text-cool underline underline-offset-2 text-sm">All installation and travel rates</Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Through the year" title="A display that changes with the calendar." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEASONS.map((s) => (
              <div key={s.name} className="card overflow-hidden">
                <div className="relative aspect-[4/3] bg-[#04060b]">
                  <SceneCanvas scene="mega" selection={{ kind: "theme", name: s.theme }} label={`3D render of a mega tree in the ${s.theme} theme for ${s.name.toLowerCase()}`} />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-1">{s.name}</h3>
                  <p className="text-sm text-muted-strong leading-relaxed">{s.body}</p>
                  <p className="text-xs text-muted mt-2">Shown: {s.theme} theme</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Care questions." />
          <FaqAccordion faqs={faqs} />
          <p className="text-center text-sm text-muted mt-8">
            Setting up yourself? Read the <Link href="/quick-start" className="text-cool underline underline-offset-2">quick-start guide</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
