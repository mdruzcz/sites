import type { Metadata } from "next";
import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Deck Medic | Toronto's Wood Preservation Specialists",
  description:
    "Learn about Deck Medic — Toronto's trusted deck restoration experts. Our surgical approach means 80% prep and 20% finish, using only premium weather-shield products.",
  alternates: { canonical: "https://deckmedic.ca/about" },
  openGraph: {
    title: "About Deck Medic | Toronto's Wood Preservation Specialists",
    description: "Meet the team behind Southern Ontario's most trusted deck restoration and staining service.",
    url: "https://deckmedic.ca/about",
    images: [{ url: "/images/Deck-Medic-Banner.png", width: 1200, height: 630, alt: "Deck Medic team at work on a deck restoration in Toronto, ON" }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Deck Medic",
  url: "https://deckmedic.ca/about",
  description: "Deck Medic is Southern Ontario's trusted specialist in professional deck restoration and wood preservation.",
  mainEntity: {
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
    areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
  },
};

const values = [
  { title: "Precision", desc: "Every corner sanded, every board brushed. We don't skip steps." },
  { title: "Transparency", desc: "No hidden costs. Just honest, expert advice from people who care." },
  { title: "Reliability", desc: "We show up on time and leave your backyard spotless every time." },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <main>
        <NavBar />

        {/* Hero */}
        <section className="pt-28 pb-16 lg:pt-36 lg:pb-20" style={{ background: "var(--off-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>About Us</p>
              <h1 className="font-display text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
                We Save Decks.{" "}
                <span className="text-gradient-blue">We Protect Investments.</span>
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: "var(--slate-muted)" }}>
                At Deck Medic, we believe a deck is more than just wood — it's where your family makes memories.
                Our mission is to provide professional-grade restoration that extends the life of your outdoor living space,
                saving you from the high cost of full replacement.
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Why We're Different</p>
                <h2 className="font-display text-4xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
                  A Surgical Approach to Wood Restoration
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--slate-muted)" }}>
                  Most contractors just &ldquo;slap on a coat of stain.&rdquo; We take a completely different approach — one that
                  delivers finishes that last years longer and look far better.
                </p>
                <div className="space-y-4">
                  {[
                    { step: "The Diagnosis", desc: "We check for wood rot and structural integrity before we start. You'll know exactly what you're getting." },
                    { step: "The Preparation", desc: "We spend 80% of our time sanding and cleaning. The finish is only as good as the prep beneath it." },
                    { step: "The Cure", desc: "We use premium, weather-shield technology designed specifically for the Canadian climate — not generic box-store stains." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-2 rounded-full flex-shrink-0 mt-2" style={{ background: "var(--blue)", height: "auto", minHeight: "100%" }} />
                      <div>
                        <p className="font-bold mb-1" style={{ color: "var(--slate)" }}>{item.step}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--slate-muted)" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "500+", label: "Decks Restored" },
                  { val: "5★", label: "Google Rating" },
                  { val: "80%", label: "Time on Prep" },
                  { val: "2–3 yr", label: "Avg. Finish Life" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-8 text-center border"
                    style={{ background: "var(--blue-pale)", borderColor: "var(--light-grey)" }}
                  >
                    <p className="font-display text-4xl font-extrabold mb-2" style={{ color: "var(--blue)" }}>{s.val}</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--slate)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Our Core Values</p>
              <h2 className="font-display text-4xl font-extrabold leading-tight" style={{ color: "var(--slate)" }}>
                What We Stand For
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="text-center rounded-2xl p-8 border bg-white" style={{ borderColor: "var(--light-grey)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "var(--blue)" }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--slate)" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--slate-muted)" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Local Knowledge</p>
            <h2 className="font-display text-4xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
              Professional Results for Southern Ontario Homes
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--slate-muted)" }}>
              With years of experience in the Southern Ontario region, we understand exactly what the local humidity, snow,
              and UV rays do to your wood. We aren&apos;t just painters — we are wood preservation specialists dedicated to
              quality craftsmanship and results that last.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--slate-muted)" }}>
              From reviving weathered cedar in Oakville to protecting pressure-treated lumber in Toronto, Deck Medic
              brings the same meticulous standard to every project, regardless of size.
            </p>
          </div>
        </section>

        <Contact />
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
