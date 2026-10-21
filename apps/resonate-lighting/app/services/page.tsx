import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, installationServiceSchema, serviceSchema } from "@/lib/jsonld";
import { getCities } from "@/lib/content";
import { formatCad, pricing } from "@/lib/pricing";

export const revalidate = 3600;

const title = "Pixel Lighting Installation & Services";
const description =
  "Pixel lighting installation anywhere in Canada: design, kit supply, mega tree and roofline installs billed by crew-day, and seasonal care for businesses and BIAs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/services` },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/services` },
  twitter: { title: `${title} | ${site.name}`, description },
};

const PROCESS = [
  { step: "1", title: "Site walk & photos", body: "Send photos and rough dimensions, or book a site visit. We identify rooflines, tree locations, power and the best microphone placement." },
  { step: "2", title: "Design & quote", body: "You receive a prop layout, power plan and an itemised quote in CAD: kit, crew-days and travel, with a package recommendation." },
  { step: "3", title: "Build & configure", body: "The Pi 5 controller box, pixel controller and props are configured to your layout before they ship." },
  { step: "4", title: "Install & commission", body: "Our crew mounts and powers the props, runs Setup (port tests, mic calibration, look check) and hands over the Light Show app on your phone." },
  { step: "5", title: "Care", body: "Theme and playlist changeovers, pixel checks, takedown and storage, and software updates on a schedule that suits you." },
];

export default function ServicesPage() {
  const services = getServices();
  const cities = getCities();

  return (
    <>
      {services.map((s) => (
        <JsonLd key={s.slug} data={serviceSchema(s)} />
      ))}
      <JsonLd data={installationServiceSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Installation & Services", url: `${site.url}/services` },
        ])}
      />

      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Installation &amp; services</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            From site walk to <span className="gradient-text">season</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Resonate Lighting designs, supplies, installs and services music-reactive pixel lighting anywhere in Canada. Installation is billed at {formatCad(pricing.installation.crewDayRate)} per crew-day plus travel by zone, and the only thing your team ever does is pick a theme or a look.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((s, i) => (
            <article key={s.slug} id={s.slug} className="card card-glow p-8 sm:p-10 scroll-mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <div className="h-display text-resonant text-sm tracking-widest mb-3">0{i + 1}</div>
                <h2 className="h-display text-2xl sm:text-3xl text-white mb-3">{s.title}</h2>
                <p className="text-muted-strong text-sm leading-relaxed">{s.shortDescription}</p>
              </div>
              <div className="lg:col-span-2">
                <p className="text-muted-strong leading-relaxed mb-5">{s.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-strong">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><Check /> {b}</li>
                  ))}
                </ul>
                {s.slug === "installation" && (
                  <Link href="/pricing#installation" className="inline-flex items-center min-h-[44px] mt-3 text-cool underline underline-offset-2 text-sm">Crew-day rate and travel zones</Link>
                )}
                {s.slug === "seasonal-service" && (
                  <Link href="/care" className="inline-flex items-center min-h-[44px] mt-3 text-cool underline underline-offset-2 text-sm">Care &amp; seasonal service</Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink-800 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Process" title="How a project runs." description="Five steps, one point of contact, a reply within 24 hours at every stage." />
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS.map((p) => (
              <li key={p.step} className="card p-6">
                <div className="w-9 h-9 rounded-full bg-resonant/15 border border-resonant/40 text-resonant font-bold flex items-center justify-center mb-4">{p.step}</div>
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-muted-strong text-sm leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Service areas" title="Installing across Canada." description={`Based in ${pricing.travel.homeRegion}. Installation is available in any city with applicable travel charges.`} />
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map((c) => (
              <Link key={c.slug} href={`/locations/${c.slug}`} className="spec-chip spec-chip-cool normal-case tracking-normal text-sm min-h-[44px]">{c.name}</Link>
            ))}
            <Link href="/locations" className="spec-chip normal-case tracking-normal text-sm min-h-[44px]">All locations</Link>
          </div>
          <p className="text-center text-muted text-sm mt-6">
            Not sure if we cover your area? <Link href="/contact" className="text-cool underline underline-offset-2">Ask us</Link> — we reply within {site.responseTime}.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Check() {
  return (
    <svg className="w-4 h-4 text-resonant mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
