import Link from "next/link";
import { Star, ArrowRight, Check } from "lucide-react";
import { Pic } from "@/components/Pic";
import { TrustBar } from "@/components/TrustBar";
import { StepProcess } from "@/components/StepProcess";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { PackageCard } from "@/components/PackageCard";
import { site } from "@/lib/site";
import { getServices, getEventTypes, getFeaturedProjects, getFeaturedTestimonials, getFaq, getPackageGroups } from "@/lib/content";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export default function HomePage() {
  const services = getServices();
  const events = getEventTypes();
  const projects = getFeaturedProjects().slice(0, 9);
  const testimonials = getFeaturedTestimonials().slice(0, 6);
  const faqs = getFaq().slice(0, 6);
  const groups = getPackageGroups();
  const spotlight = [
    groups.find((g) => g.slug === "weddings")?.packages.find((p) => "featured" in p && p.featured),
    groups.find((g) => g.slug === "corporate")?.packages.find((p) => "featured" in p && p.featured),
    groups.find((g) => g.slug === "holiday")?.packages.find((p) => "featured" in p && p.featured),
  ].filter(Boolean) as NonNullable<(typeof groups)[number]["packages"][number]>[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <Pic
          src="/images/backyard-edison-string-lights-dinner-party.jpg"
          alt="Edison bulb string lights strung over an outdoor evening dinner party in London, Ontario"
          fill
          className="object-cover object-[50%_35%]"
          priority
          quality={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F10]/90 via-[#0F0F10]/60 to-[#0F0F10]/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F0F10] to-transparent" />
        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <div>
              <p className="text-[var(--accent)] text-sm tracking-[0.3em] uppercase mb-6">
                Weddings · Corporate Events · Christmas Parties
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.05] max-w-3xl">
                Outdoor Lighting and Holiday Decor That Makes the <span className="italic text-[var(--accent)]">Whole Night</span> Glow
              </h1>
              <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
                Uplighting, Edison string light canopies, tent lighting, cold sparks, lit garlands and wreaths, and commercial holiday displays.
                Installed by our crew across London, Ontario and Southwestern Ontario.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/packages" className="btn btn-primary text-base min-h-[48px] px-8">See Packages & Pricing</Link>
                <Link href="/gallery" className="btn btn-ghost text-base min-h-[48px] px-8">View Our Work</Link>
              </div>
              <ul className="mt-10 grid gap-2 sm:grid-cols-2 max-w-xl text-sm text-[var(--muted)]">
                {["Flat-rate quotes within 4 business hours", "Wireless, DMX-controlled fixtures", "Crew handles setup and teardown", "Insured for venues, malls and offices"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6 md:p-8 bg-[#141416]/90 backdrop-blur border-[var(--accent)]/30">
              <QuoteForm heading="Check Your Date" showPromise compact />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Event types */}
      <section className="py-20 md:py-28 bg-[#0F0F10]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="What Are We Lighting?" headline="Lighting for Every Kind of Celebration" description="Pick your event and we'll show you the services and packages that fit it." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {events.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="card overflow-hidden group relative aspect-[4/5] block">
                <Pic src={e.image} alt={`${e.title} by Bright Event Lighting`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[var(--accent)] text-xs tracking-[0.2em] uppercase mb-1">{e.eyebrow}</p>
                  <h3 className="text-xl font-bold text-[var(--foreground)] leading-tight">{e.menuTitle}</h3>
                  <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">{e.shortDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-[var(--accent)]">Explore <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Services" headline="What We Light and Decorate" description="Rent the pieces you need or bundle them into a package. Every service includes delivery, setup and teardown by our crew." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* Packages spotlight */}
      <section className="py-20 md:py-28 bg-[#0F0F10]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Packages & Pricing" headline="Straightforward Packages, Flat-Rate Quotes" description="Our most-booked package for weddings, corporate events and holiday parties. See all twelve on the packages page." />
          <div className="grid gap-6 md:grid-cols-3">
            {spotlight.map((p) => <PackageCard key={p.slug} pkg={p} compact />)}
          </div>
          <div className="mt-10 text-center">
            <Link href="/packages" className="btn btn-ghost min-h-[44px]">All Packages & Add-On Pricing</Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Pic src="/images/garden-wedding-string-lights-draped-arch.jpg" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <p className="text-[var(--accent)] text-sm tracking-[0.2em] uppercase mb-4">The Difference</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-6">Your Venue Looks Great at 2 PM. We Handle 9 PM.</h2>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-4">
                Most venues, patios and backyards look stunning in daylight, then flatten out the moment the sun sets. DIY string lights from the hardware store have one mode: on. No dimming for the first dance, no colour match to your palette or brand, and nobody to fix it when a strand dies at 9 PM.
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                We design the lighting around your timeline, hang it on proper cable and hardware, and run it live from a DMX console: bright and social for cocktails, warm and low for dinner, a cinematic dip for the first dance or the speeches, and full colour for the party. For holiday events we bring the decor too, so the garland, the tree and the light are designed as one look.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/our-process" className="btn btn-ghost min-h-[44px]">How It Works</Link>
                <Link href="/contact" className="btn btn-primary min-h-[44px]">Get a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-[#0F0F10]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Our Work" headline="Real Events. Real Light." description="Weddings, corporate events, holiday parties and commercial displays across Southwestern Ontario." />
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link href={`/gallery?c=${project.category}`} key={project.slug} className="card overflow-hidden group block">
                <div className="aspect-[4/3] bg-[var(--surface)] relative">
                  <Pic src={project.image} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm" style={{ fontFamily: "var(--font-sans)" }}>{project.title}</h3>
                  <p className="text-xs text-[var(--accent)] mt-1">{project.city}, ON</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn btn-ghost min-h-[44px]">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="How It Works" headline="From Inquiry to Illumination" description="No site visits required for most events. No phone tag. A firm, flat-rate quote in your inbox." />
          <StepProcess />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[#0F0F10]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Kind Words" headline="What Clients Say" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />)}
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-xs text-[var(--muted)]/60">
                  <span className="text-[var(--foreground)] font-medium">{t.author}</span> · {t.venue}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/reviews" className="btn btn-ghost min-h-[44px]">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Questions" headline="Frequently Asked" />
          <div className="max-w-2xl mx-auto">
            <FaqAccordion faqs={faqs} />
            <div className="mt-6 text-center">
              <Link href="/faq" className="text-sm text-[var(--accent)] hover:underline">See all FAQs →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom form */}
      <section className="py-20 md:py-28 bg-[#0F0F10]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <SectionHeader eyebrow="Ready?" headline="Check Your Date" description={`Get a flat-rate quote in your inbox within ${site.responseTime}. Weddings, corporate events, holiday parties and commercial displays.`} />
            <QuoteForm heading="" showPromise />
          </div>
        </div>
      </section>
    </>
  );
}
