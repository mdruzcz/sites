import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getPhoto, getServiceLines } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, SectionHeading, CheckList, FaqList } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "Permanent vs Seasonal Christmas Lights: Compare Your Options";
const description = "Side-by-side comparison of permanent LED roofline lighting and seasonal C9 Christmas light installation: cost, look, lifespan, control, maintenance and who each suits in Ontario.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/compare" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/compare`, images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-brick-home-garage-gable.jpg", alt: "Permanent vs seasonal lighting comparison" }] },
  twitter: { card: "summary_large_image", title, description },
};

const rows: [string, string, string][] = [
  ["Look", "Small, diffused LEDs in a colour-matched track. Clean lines, any colour.", "Classic large C9 bulbs on commercial wire. The traditional Christmas look."],
  ["When it's up", "Year-round, installed once.", "October–November to January, every season."],
  ["Colours", "16 million+, change in seconds from the app.", "Fixed colour set chosen at booking (warm white, multi, red/green, etc.)."],
  ["Control", "App: scenes, schedules, zones, timers, dimming.", "Outdoor timer set at install."],
  ["Cost model", "One-time, typically $2,500–$8,000 depending on roofline.", "Per season; rent the lights or buy them and pay labour yearly."],
  ["Daytime appearance", "Nearly invisible. Track matched to soffit and fascia.", "Visible bulbs and wire while installed."],
  ["Weather rating", "IP67, cold-rated to −40°C, UV-rated cable.", "Commercial-grade LED, rated for winter use."],
  ["Maintenance", "Essentially none. Lifetime warranty on parts and workmanship.", "In-season service calls included; takedown in January."],
  ["Best for", "Owners staying put who want lights for every occasion.", "Traditionalists, renters, and anyone who only wants December lit."],
  ["Before you commit", "Free on-site demo: a live sample lit on your house.", "Measured quote with a firm per-season price; book before Sept 30."],
];

const faqs = [
  { question: "Can I have both permanent and seasonal lighting?", answer: "Yes, and some homes do. Permanent track on the roofline for year-round scenes, plus seasonal tree wrapping, garland and wreaths in December that we install and remove." },
  { question: "Which is cheaper over ten years?", answer: "Permanent is usually cheaper across a decade because it's a one-time cost with no annual install bill, while seasonal is paid every year. Seasonal is cheaper in year one. Our cost guide walks through the arithmetic." },
  { question: "Do permanent lights look like Christmas lights?", answer: "Only when you want them to. In warm white at low brightness they read as architectural lighting. In red and green at full brightness they read as Christmas. Same system." },
  { question: "I rent. What are my options?", answer: "Seasonal C9 is the practical choice for renters: nothing permanent is attached, and everything comes down in January. Permanent lighting is an investment in the home, so it suits owners." },
];

export default function ComparePage() {
  const [perm, seas] = getServiceLines();
  const a = getPhoto("warm-white-permanent-roofline-lights-brick-home-garage-gable");
  const b = getPhoto("red-green-white-permanent-roofline-lights-stone-home-steep-gables");
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/compare` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Compare", url: `${site.url}/compare` }]), faqSchema(faqs)]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Compare" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Which one is right for you?</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Permanent Lighting vs Seasonal C9 Christmas Lights</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">Two good options for two different homeowners. Here’s an honest side-by-side so you pick the one you’ll actually be happy with.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[{ line: perm, photo: a, gold: false }, { line: seas, photo: b, gold: true }].map(({ line, photo, gold }) => (
              <Link key={line.slug} href={`/${line.slug}`} className="card card-lift overflow-hidden group">
                <div className="relative aspect-[16/9]"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="p-6"><span className={`pill ${gold ? "pill-gold" : ""} mb-3`}>{line.eyebrow}</span><h2 className="font-bold text-2xl text-ink">{line.name}</h2><p className="mt-2 text-[var(--muted)]">{line.tagline}</p></div>
              </Link>
            ))}
          </div>
          <div className="card card-static overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left" style={{ background: "var(--panel-2)" }}><th className="p-4 font-bold text-ink w-[20%]">Factor</th><th className="p-4 font-bold text-[var(--accent-ink)]">Permanent lighting</th><th className="p-4 font-bold text-[var(--gold-ink)]">Seasonal C9</th></tr></thead>
                <tbody>{rows.map(([k, p, s]) => <tr key={k} className="border-t" style={{ borderColor: "var(--border)" }}><th scope="row" className="p-4 font-semibold text-ink align-top">{k}</th><td className="p-4 text-body align-top">{p}</td><td className="p-4 text-body align-top">{s}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid md:grid-cols-2 gap-5">
          <div className="card card-static p-6 md:p-8" style={{ borderColor: "rgba(34,193,176,0.4)" }}><h2 className="font-bold text-xl text-ink mb-4">{perm.audienceFit.heading}</h2><CheckList items={perm.audienceFit.yes} /><Link href="/permanent-lighting" className="btn btn-primary btn-sm mt-6">Permanent lighting <Icon.Arrow width={14} height={14} /></Link></div>
          <div className="card card-static p-6 md:p-8" style={{ borderColor: "rgba(232,182,0,0.4)" }}><h2 className="font-bold text-xl text-ink mb-4">{seas.audienceFit.heading}</h2><CheckList items={seas.audienceFit.yes} /><Link href="/seasonal-lighting" className="btn btn-gold btn-sm mt-6">Seasonal C9 lights <Icon.Arrow width={14} height={14} /></Link></div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10"><div><SectionHeading eyebrow="FAQ" title="Comparison questions" align="left" /><p className="text-[var(--muted)] -mt-8">Still deciding? <Link href="/guides/permanent-vs-seasonal-christmas-lights" className="text-[var(--accent-ink)] underline underline-offset-2">Read the full guide</Link>.</p></div><FaqList items={faqs} name="compare-faq" /></div>
      </section>
      <BookCta />
    </>
  );
}
