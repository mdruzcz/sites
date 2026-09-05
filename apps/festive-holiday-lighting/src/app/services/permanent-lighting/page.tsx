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
import { CheckIcon, SmartphoneIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Permanent LED Roofline Lighting, Southern Ontario",
  description: "Permanent RGBW LED roofline lighting for homes and businesses across Southern Ontario. Install once, change colours from your phone for Christmas, Halloween, Canada Day and every occasion. Free quote.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services/permanent-lighting" },
  openGraph: { title: "Permanent LED Lighting | Festive Holiday Lighting", description: "One install, every occasion, controlled from your phone.", url: "https://festiveholidaylighting.ca/services/permanent-lighting", images: ["/images/xmas-gallery/home-multicolour-rgb-permanent-led-roofline-01.jpg"] },
};

const faqs = [
  { q: "What is permanent holiday lighting?", a: "RGBW LED lights installed permanently in your roofline, soffits or fascia and controlled from a phone app. They stay up year-round; you change colours, patterns and schedules for any occasion." },
  { q: "How much does it cost?", a: "Most residential installs run $2,500 to $8,000 depending on roofline length and complexity. Your quote is itemized with no hidden fees, and the system pays for itself after two or three seasons of professional seasonal installs." },
  { q: "Can you see the lights during the day?", a: "No. The LEDs sit in discreet channels or clips that blend into the roofline. Most guests never notice them until they turn on." },
  { q: "What is the warranty?", a: "Lifetime warranty on all installed hardware. If a component fails from a defect, we replace it at no charge." },
  { q: "How do I control them?", a: "A phone app for iOS and Android: colours, brightness, patterns, schedules and sunset triggers. Set Christmas colours to start December 1 and Halloween orange on October 1, automatically." },
  { q: "Do they survive Canadian winters?", a: "Yes. Rated from −40 °C to +60 °C, weatherproof and UV resistant." },
  { q: "Do you install on commercial buildings?", a: "Yes. Plazas, storefronts and office buildings that want to stay festive year-round without seasonal logistics." },
];

const occasions = [["🎄", "Christmas", "Red + green"], ["🎃", "Halloween", "Orange + purple"], ["🇨🇦", "Canada Day", "Red + white"], ["🏒", "Playoffs", "Team colours"], ["🎂", "Birthdays", "Any colour"], ["🌸", "Spring", "Pink + white"], ["💙", "Valentine's", "Red + pink"], ["🎊", "New Year's", "Gold + white"]];

export default function PermanentLightingPage() {
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: "Permanent Outdoor LED Lighting", serviceType: "Permanent RGBW LED roofline lighting installation", url: `${site.url}/services/permanent-lighting`, provider: { "@id": `${site.url}/#organization` }, areaServed: cities.map((c) => ({ "@type": "City", name: c.name })), description: metadata.description },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id="permanent-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <NavBar />
      <PageHero photo={PICKS.heroPermanent} eyebrow="Permanent lights · Year-round" title={<>Install once. <span className="text-[var(--gold)]">Celebrate forever.</span></>} intro="Smart RGBW LEDs permanently installed in your roofline. Change every colour, pattern and schedule from your phone for Christmas, Halloween, birthdays, playoffs, any night." crumbs={[{ label: "Services", href: "/services" }, { label: "Permanent Lighting" }]} formService="Permanent Holiday Lighting" />

      <section className="bg-[var(--ice)]">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill sky">One system, every occasion</p><h2 className="font-display h2-fluid mt-4">Stop thinking of them as Christmas lights.</h2><p className="lead mt-3 text-[var(--ink-soft)]">Think of it as your home's year-round lighting, controlled from the couch.</p></div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {occasions.map(([i, n, c]) => (
              <div key={n} className="card p-5 text-center"><div className="text-3xl">{i}</div><p className="mt-2 font-bold">{n}</p><p className="text-xs text-[var(--muted)]">{c}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow-pill candy">What you get</p>
            <h2 className="font-display h2-fluid mt-4">Built for Canadian winters and lazy Sundays.</h2>
            <ul className="mt-6 space-y-4">
              {[["50,000+ hour LEDs", "Over 17 years of nightly use."], ["16 million colours", "Full RGBW spectrum, any shade, any combination."], ["Phone app control", "Colours, brightness, patterns and automated holiday schedules."], ["Weatherproof hardware", "Rated −40 °C to +60 °C. Wind, snow, ice and UV."], ["Discreet by day", "Channels blend with the roofline; invisible until lit."], ["Lifetime warranty", "All installed hardware, replaced at no cost if it fails."]].map(([t, b]) => (
                <li key={t} className="flex gap-4"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--candy)] text-white"><CheckIcon className="w-3.5 h-3.5" /></span><div><p className="font-bold">{t}</p><p className="text-sm text-[var(--ink-soft)]">{b}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <Photo name={PICKS.heroPermanentBlue} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 1024px) 100vw, 560px" className="shadow-[var(--shadow-lg)]" />
            <div className="card p-6">
              <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[var(--candy)] text-white"><SmartphoneIcon className="w-5 h-5" /></span><div><p className="font-bold">Smart app control</p><p className="text-xs text-[var(--muted)]">iOS & Android</p></div></div>
              <div className="mt-4 space-y-2 text-sm">
                {[["🎄 Christmas mode", true], ["🎃 Halloween orange", false], ["🇨🇦 Canada Day red & white", false], ["🏒 Go Leafs Go blue", false], ["✨ Custom, 16M colours", false]].map(([l, a]) => (
                  <div key={String(l)} className={`flex items-center justify-between rounded-xl px-3 py-2 ${a ? "bg-[var(--candy-soft)] font-semibold text-[var(--candy-deep)]" : "bg-[var(--snow)]"}`}>{l as string}{a && <span className="text-[10px] font-bold uppercase">Active</span>}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="card p-7">
            <h3 className="font-display text-2xl">Five-year cost comparison</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[var(--ink-soft)]">Seasonal install × 5 years</span><span className="text-[var(--ink-soft)]">~$3,000–$5,000</span></div>
              <div className="flex justify-between font-bold"><span>Permanent system, one time</span><span className="text-[var(--candy-deep)]">~$2,500–$8,000</span></div>
              <p className="border-t border-[var(--line)] pt-3 text-xs text-[var(--muted)]">After year two or three the permanent system pays for itself, and you get year-round control.</p>
            </div>
          </div>
          <Link href="/services/christmas-light-installation" className="card card-lift block p-7">
            <p className="eyebrow-pill pine">Prefer the traditional look?</p>
            <h3 className="font-display mt-3 text-xl">We do classic Christmas lights too.</h3>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">C9 rooflines, wrapped trees, garland and wreaths each December. Many families run both. See classic lights →</p>
          </Link>
        </div>
      </section>

      <Testimonials />
      <CtaBand heading="Ready to never hang seasonal lights again?" sub="Install once. Control forever. Free quote for your home or business." photo={PICKS.heroPermanentBlue} />
      <FAQ faqs={faqs} title="Permanent lighting questions" />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
