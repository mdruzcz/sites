import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { site, cities } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { CheckIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Classic Christmas Light Installation, Southern Ontario",
  description: "Classic Christmas lights installed, maintained, taken down and stored by Festive: C9 rooflines, tree wraps, garland and wreaths for homes and businesses in Hamilton, Burlington, Oakville and across Southern Ontario.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/christmas-light-installation" },
  openGraph: { title: "Classic Christmas Light Installation | Festive Holiday Lighting", description: "C9 rooflines, tree wraps, garland and wreaths, installed and stored for you.", url: "https://festiveholidaylighting.ca/services/christmas-light-installation", images: ["/images/xmas-gallery/red-and-warm-white-c9-roofline-brick-home-01.jpg"] },
};

const faqs = [
  { q: "What does the classic program include?", a: "Design consultation, all lights and materials, professional installation, a mid-season maintenance check, post-holiday takedown and labelled storage. You buy nothing and store nothing." },
  { q: "When should I book?", a: "Late September or early October for the best dates. Our calendar fills through October and November, but call anyway; we will do our best to fit you in." },
  { q: "Do I supply any lights?", a: "No. We use commercial-grade LED C9s, mini lights and garland that outlast anything from a hardware store, and they go back to our warehouse in January." },
  { q: "How long does an install take?", a: "Most homes are done in a single visit. Larger homes with many trees, and commercial properties, can take two days." },
  { q: "What if lights go out?", a: "A mid-season maintenance visit is included. If a section fails, call us and we return within one to two business days." },
  { q: "When do the lights come down?", a: "After January 6, or on the date you prefer. Everything is removed, labelled and stored until next season." },
];

const included = [
  ["Custom design consultation", "We visit, assess the architecture and plan a display that fits your home and budget."],
  ["All materials supplied", "Commercial-grade LED C9 bulbs, mini lights, garland, wreaths, clips, cords and timers."],
  ["Professional installation", "Insured, WSIB-compliant crew. Most homes finished in one day, tall work from our boom trucks."],
  ["Mid-season maintenance", "We check the display partway through the season and fix anything that has gone dark."],
  ["Post-holiday takedown", "After January 6 we remove everything carefully."],
  ["Labelled storage", "Your lights are stored, organized and ready for next year."],
];

export default function ChristmasLightInstallationPage() {
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: "Classic Christmas Light Installation", serviceType: "Seasonal Christmas light installation", url: `${site.url}/services/christmas-light-installation`, provider: { "@id": `${site.url}/#organization` }, areaServed: cities.map((c) => ({ "@type": "City", name: c.name })), description: metadata.description },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id="classic-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <NavBar />
      <PageHero photo={PICKS.heroClassic} eyebrow="Classic lights · Seasonal" title={<>Classic Christmas lights, <span className="text-[var(--gold)]">installed for you.</span></>} intro="Warm white or multicolour C9 bulbs along the roofline, wrapped trees, garland and wreaths. We design, install, maintain, take down and store it all." crumbs={[{ label: "Services", href: "/services" }, { label: "Classic Christmas Lights" }]} formService="Classic Christmas Lights (Seasonal)" />

      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow-pill pine">Everything included</p>
            <h2 className="font-display h2-fluid mt-4">Nothing for you to buy, hang, fix or store.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">From the first design conversation to the last box on the shelf in January, the whole season is handled.</p>
            <ul className="mt-6 space-y-4">
              {included.map(([t, b]) => (
                <li key={t} className="flex gap-4"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--candy)] text-white"><CheckIcon className="w-3.5 h-3.5" /></span><div><p className="font-bold">{t}</p><p className="text-sm text-[var(--ink-soft)]">{b}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo name={PICKS.heroResidential} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name={PICKS.treeWrap} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
            <Photo name={PICKS.wreath} ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
            <Photo name="grey-brick-home-white-roofline-lights-lit-window-wreaths" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)]">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill">Pro vs DIY</p><h2 className="font-display h2-fluid mt-4">Why families stop doing it themselves.</h2></div>
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <div className="grid grid-cols-2 border-b border-[var(--line)] bg-[var(--snow)] text-xs font-bold uppercase tracking-wider"><span className="px-5 py-3 text-[var(--candy-deep)]">With Festive</span><span className="px-5 py-3 text-[var(--muted)]">Doing it yourself</span></div>
            {[["Insured crew on the ladder", "You, on ice, in December"], ["Commercial-grade LEDs that last", "Hardware-store strings that fail"], ["Custom design for your home", "Same box as last year"], ["Mid-season maintenance included", "Half the display goes dark"], ["Takedown and storage included", "A tangled mess in the garage"]].map(([a, b]) => (
              <div key={a} className="grid grid-cols-2 border-b border-[var(--line)] text-sm last:border-0"><span className="flex items-start gap-2 px-5 py-3 font-semibold"><span className="text-[var(--pine)]">✓</span>{a}</span><span className="flex items-start gap-2 px-5 py-3 text-[var(--muted)]"><span>✗</span>{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-6 md:grid-cols-2">
          <div className="card p-7">
            <p className="eyebrow-pill pine">Classic lights</p>
            <h3 className="font-display mt-3 text-2xl">Up in November, down in January</h3>
            <p className="mt-2 text-[var(--ink-soft)]">The traditional look, fully managed each season. Nothing to store.</p>
          </div>
          <Link href="/services/permanent-lighting" className="card card-lift block border-[var(--candy-soft)] bg-[var(--candy-soft)] p-7">
            <p className="eyebrow-pill candy">Permanent lights</p>
            <h3 className="font-display mt-3 text-2xl">Installed once, any colour all year</h3>
            <p className="mt-2 text-[var(--ink-soft)]">App-controlled RGBW LEDs hidden in the roofline. Christmas, Halloween, Canada Day, game day. See permanent lighting →</p>
          </Link>
        </div>
      </section>

      <Testimonials />
      <CtaBand heading="Ready to have the best-looking street on the block?" sub="Book your free quote today. Crews are limited and we book up fast every October." photo={PICKS.heroGallery} />
      <FAQ faqs={faqs} title="Classic lights questions" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
