import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "About Toronto Deck Stainers | GTA Deck Restoration Experts Since 2008",
  description: "Meet Toronto's trusted deck staining team. Family-owned since 2008, 1,500+ decks restored across Toronto & GTA. Licensed, insured & eco-friendly.",
  openGraph: { title: "About Toronto Deck Stainers", description: "Family-owned since 2008, 1,500+ decks restored across Toronto & GTA. Licensed, insured & eco-friendly.", url: `${site.url}/about` },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--charcoal)] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow">About Us</p>
            <h1 className="h-display text-4xl sm:text-5xl text-white mb-5">
              GTA&apos;s Deck Restoration Experts Since 2008
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Ontario&apos;s premier deck and fence refinishing specialists — 1,500+ decks restored
              across Toronto and the Greater Toronto Area.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-5">
                Built on Toronto Craftsmanship
              </h2>
              <div className="space-y-4 text-[var(--concrete)] leading-relaxed">
                <p>
                  Toronto Deck Stainers was founded in 2008 with one goal: to give Toronto homeowners
                  a deck staining company they could actually trust. No pushy sales tactics, no hidden
                  fees, no shortcuts on prep work. Just honest, expert craftsmanship backed by a team
                  that genuinely cares about the result.
                </p>
                <p>
                  Over 15 years and 1,500+ restored decks later, we&apos;ve become one of the most
                  recognized deck staining companies in the Greater Toronto Area — serving homeowners
                  from Mississauga to Markham, Oakville to Richmond Hill, and every neighbourhood in
                  between.
                </p>
                <p>
                  Toronto&apos;s climate taught us early that the difference between a deck that lasts
                  2 years and one that lasts 5 years comes down to three things: proper preparation,
                  quality products, and taking the time to do it right. Every technique we use and
                  every product we carry has been tested and proven in Ontario&apos;s conditions.
                </p>
                <p>
                  We&apos;re proud to be a family-owned business that has earned its reputation one
                  deck at a time — through consistent results, honest pricing, and treating every
                  customer&apos;s home like it&apos;s our own.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/banner-2.webp"
                alt="Toronto Deck Stainers team at work on a deck restoration project in the GTA"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "1,500+", label: "Decks Restored" },
              { value: "15+", label: "Years Serving GTA" },
              { value: "9+", label: "GTA Cities Served" },
              { value: "5-Star", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="card p-8 text-center">
                <p className="stat-value">{stat.value}</p>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--concrete)] mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Mission"
            title="Enhancing Outdoor Living Across the GTA"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-[var(--concrete)] leading-relaxed mb-6">
                Our mission is simple: to enhance and protect the natural beauty of your outdoor wood
                surfaces through expert care and long-lasting finishes. We&apos;re committed to delivering
                top-tier deck and fence staining services that combine quality, durability, and aesthetic appeal.
              </p>
              <p className="text-[var(--concrete)] leading-relaxed">
                Our goal is to make every deck we touch a source of pride for homeowners — offering
                customized solutions that reflect each client&apos;s unique needs and style. Through honest
                service, skilled craftsmanship, and eco-conscious practices, we strive to be the most
                trusted name in deck restoration throughout the Greater Toronto Area.
              </p>
            </div>
            <div className="space-y-5">
              {[
                {
                  title: "Local Expertise",
                  text: "We understand the unique demands of Toronto's climate — from icy winters to humid summers — and tailor our process to ensure long-lasting protection and performance.",
                },
                {
                  title: "Skilled Craftsmanship",
                  text: "Years of hands-on experience mean flawless finishes that highlight the natural beauty of your wood while safeguarding it from the elements.",
                },
                {
                  title: "Eco-Friendly Products",
                  text: "We use high-quality, low-VOC stains and sealers that are safe for your family, pets, and the environment — without compromising quality.",
                },
                {
                  title: "Customized Solutions",
                  text: "Every deck and fence is different. We offer personalized consultations, custom colour options, and services designed to meet your specific needs.",
                },
              ].map((item) => (
                <div key={item.title} className="feature-item pl-5">
                  <h3 className="font-bold text-[var(--charcoal)] mb-1">{item.title}</h3>
                  <p className="text-[var(--concrete)] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-14 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">Where We Serve</p>
          <h2 className="h-display text-2xl sm:text-3xl text-white mb-4">
            Serving All of the Greater Toronto Area
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Based in Toronto, we serve homeowners across the entire GTA — including Mississauga, North York,
            Scarborough, Etobicoke, Markham, Richmond Hill, Vaughan, Oakville, Brampton, Pickering, Ajax,
            and surrounding communities.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {site.serviceAreas.map((city) => (
              <span key={city} className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="eyebrow justify-center">Get Started</p>
            <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-3">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-[var(--concrete)]">
              Free on-site estimates — we reply within {site.responseTime}.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
