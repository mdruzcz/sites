import { writeFileSync, mkdirSync } from 'fs';

const base = '/tmp/sites/apps/brantford-retaining-walls';

// Ensure all directories exist
const dirs = [
  'app', 'app/about', 'app/contact', 'app/services', 'app/services/[slug]',
  'app/services/[slug]/[city]', 'app/service-areas', 'app/service-areas/[city]',
  'app/faq', 'app/gallery', 'app/privacy-policy', 'app/api/quote'
];
dirs.forEach(d => mkdirSync(`${base}/${d}`, { recursive: true }));

// ===== HOMEPAGE =====
writeFileSync(`${base}/app/page.tsx`, String.raw`import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getFeaturedProjects, getFeaturedTestimonials, getFaqs, getServiceAreas } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustBar } from "@/components/TrustBar";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { StepProcess } from "@/components/StepProcess";

export const metadata: Metadata = {
  title: "Retaining Wall Contractors Brantford ON | Free Quotes",
  description: "Professional retaining wall installation in Brantford, Hamilton, Cambridge, Paris & Woodstock. Armour stone, interlocking block walls & erosion control. Free quotes.",
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default function Home() {
  const services = getServices();
  const projects = getFeaturedProjects();
  const testimonials = getFeaturedTestimonials();
  const faqs = getFaqs().slice(0, 5);
  const areas = getServiceAreas();

  return (
    <>
      <section className="relative bg-[var(--charcoal)] overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="text-white">
              <p className="eyebrow !text-[var(--accent)] !mb-4">Brantford&apos;s Retaining Wall Specialists</p>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-6">{site.tagline}</h1>
              <p className="text-lg sm:text-xl text-[var(--stone-200)] leading-relaxed mb-8 max-w-xl">
                We build retaining walls that solve drainage problems, prevent erosion, and transform sloped yards into usable outdoor living space.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {site.features.slice(0, 3).map((f) => (
                  <span key={f} className="inline-flex items-center gap-2 text-sm text-white/90">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {f}
                  </span>
                ))}
              </div>
              <a href={site.phoneHref} className="btn btn-outline text-base px-6 py-4 text-white border-white/30 hover:bg-white/10">Call {site.phone}</a>
            </div>
            <div className="card p-6 sm:p-8 bg-white">
              <h2 className="text-xl font-bold text-[var(--charcoal)] mb-1">Get Your Free Quote</h2>
              <p className="text-sm text-[var(--stone)] mb-5">No obligation — we respond {site.responseTime}.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="The Problem" title="Most Retaining Walls Fail Because of Poor Drainage" description="90% of retaining wall failures are caused by water pressure building up behind the wall. We engineer drainage into every project." />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Hydrostatic Pressure", desc: "Water builds behind walls without proper drainage, pushing them forward until they crack or lean." },
              { title: "Poor Base Prep", desc: "Walls built on uncompacted soil settle unevenly, creating gaps and structural failure." },
              { title: "Missing Reinforcement", desc: "Walls over 4 feet need geogrid reinforcement. Skip it, and gravity wins." },
            ].map((item) => (
              <div key={item.title} className="card p-6 border-red-200 bg-red-50/50">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                </div>
                <h3 className="font-bold text-[var(--charcoal)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--stone)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Services" title="Retaining Wall Solutions for Every Property" description="From natural armour stone to engineered commercial walls, we build walls that solve real drainage and grading problems." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why Choose Us" title="What Sets Our Walls Apart" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.features.map((f, i) => (
              <div key={f} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                  <span className="text-[var(--accent)] font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div><p className="font-semibold text-[var(--charcoal)] text-sm">{f}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Recent Work" title="Retaining Wall Projects We Are Proud Of" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p.title} className="card overflow-hidden group">
                <div className="aspect-[4/3] bg-[var(--surface)]" />
                <div className="p-5">
                  <h3 className="font-bold text-[var(--charcoal)] text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-[var(--stone)]">{p.city} &middot; {p.type}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How It Works" title="From Assessment to Finished Wall — 3 Simple Steps" />
          <StepProcess />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Service Area" title="Retaining Walls Across the Brantford Region" description="We serve homeowners and businesses throughout Brant County and the surrounding area." />
          <div className="flex flex-wrap justify-center gap-3">
            {areas.cities.map((c) => (
              <Link key={c.slug} href={` + '`/service-areas/${c.slug}`' + `} className="card px-5 py-3 hover:border-[var(--accent)] transition-colors text-sm font-medium text-[var(--charcoal)]">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Testimonials" title="What Our Clients Say" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => <svg key={j} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                <p className="text-sm text-[var(--stone)] leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold text-[var(--charcoal)]">{t.name}</p>
                <p className="text-xs text-[var(--stone)]">{t.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Common Questions About Retaining Walls" />
          <FaqAccordion faqs={faqs} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
`);
console.log('page.tsx written');

// ===== ABOUT =====
writeFileSync(`${base}/app/about/page.tsx`, `import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us | Retaining Wall Experts in Brantford ON",
  description: "Learn about Brantford Retaining Walls — 15+ years building engineered retaining walls across Brantford, Hamilton, Cambridge, Paris & Woodstock, ON.",
  alternates: { canonical: "/about" },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "About", url: ` + '`${site.url}/about`' + ` }])) }} />
      <section className="bg-[var(--charcoal)] py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow !text-[var(--accent)]">About Us</p>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Built on Reputation. Backed by Engineering.</h1>
          <p className="text-lg text-[var(--stone-200)] max-w-2xl mx-auto">Over 15 years of retaining wall expertise serving the Brantford region.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-4">Our Story</h2>
          <p className="text-[var(--stone)] leading-relaxed mb-6">Brantford Retaining Walls was founded with a straightforward goal: build retaining walls that actually last. After seeing too many walls crack, lean, and fail within a few years, we committed to doing things differently — engineering proper drainage, compacting bases to spec, and using geogrid reinforcement where the wall demands it.</p>
          <p className="text-[var(--stone)] leading-relaxed mb-6">Today, we serve homeowners, builders, and commercial property managers across Brantford, Hamilton, Cambridge, Paris, and Woodstock. Every project starts with a free on-site assessment where we evaluate the soil, the slope, and the water flow — because understanding the site is the first step to building a wall that lasts 30 to 50 years.</p>
          <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-4 mt-12">What We Believe</h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {[
              { title: "Drainage First", desc: "90% of wall failures come from water. We engineer drainage into every project before a single stone is placed." },
              { title: "Honest Quotes", desc: "Written quotes with no surprises. We walk you through every line item so you understand what you are paying for." },
              { title: "Built to Code", desc: "We assist with permits when required and build to Ontario Building Code standards — no shortcuts." },
              { title: "Local Accountability", desc: "We live and work in this community. Our reputation depends on every wall we build." },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-bold text-[var(--charcoal)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--stone)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-4 mt-12">Service Area</h2>
          <p className="text-[var(--stone)] leading-relaxed mb-4">We proudly serve the following communities:</p>
          <div className="flex flex-wrap gap-2">
            {site.serviceAreas.map((area) => (
              <span key={area} className="card px-4 py-2 text-sm font-medium text-[var(--charcoal)]">{area}</span>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">Get a Free Assessment</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
`);
console.log('about written');

// ===== CONTACT =====
writeFileSync(`${base}/app/contact/page.tsx`, `import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Us | Free Retaining Wall Quotes Brantford",
  description: "Request a free retaining wall quote in Brantford, Hamilton, Cambridge, Paris or Woodstock. Call 519-266-6796 or fill out our form for same-day response.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Contact", url: ` + '`${site.url}/contact`' + ` }])) }} />
      <section className="bg-[var(--charcoal)] py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow !text-[var(--accent)]">Contact Us</p>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Get Your Free Retaining Wall Quote</h1>
          <p className="text-lg text-[var(--stone-200)] max-w-2xl mx-auto">Tell us about your project and we will get back to you {site.responseTime}.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-bold text-[var(--charcoal)] text-lg mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <a href={site.phoneHref} className="flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                      <svg className="w-5 h-5 text-[var(--accent)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div><p className="font-semibold">{site.phone}</p><p className="text-xs text-[var(--stone)]">Call or text</p></div>
                  </a>
                  <a href={site.emailHref} className="flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                      <svg className="w-5 h-5 text-[var(--accent)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div><p className="font-semibold">{site.email}</p><p className="text-xs text-[var(--stone)]">Email anytime</p></div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div><p className="font-semibold text-[var(--charcoal)]">{site.hours}</p><p className="text-xs text-[var(--stone)]">Business hours</p></div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-[var(--charcoal)] text-lg mb-3">Service Area</h2>
                <p className="text-sm text-[var(--stone)] leading-relaxed">We serve {site.serviceAreas.join(", ")} and the surrounding communities throughout Brant County.</p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[var(--charcoal)] mb-1">Request a Free Quote</h2>
                <p className="text-sm text-[var(--stone)] mb-6">Fill out the form below and we will respond {site.responseTime}.</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`);
console.log('contact written');

// ===== SERVICES INDEX =====
writeFileSync(`${base}/app/services/page.tsx`, `import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Retaining Wall Services | Brantford ON Contractors",
  description: "Armour stone walls, interlocking block systems, erosion control, wall repair & hardscaping. Explore our full range of retaining wall services in Brantford, ON.",
  alternates: { canonical: "/services" },
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: ` + '`${site.url}/services`' + ` }])) }} />
      <section className="bg-[var(--charcoal)] py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow !text-[var(--accent)]">Our Services</p>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Retaining Wall Solutions for Every Property</h1>
          <p className="text-lg text-[var(--stone-200)] max-w-2xl mx-auto">From natural armour stone to engineered commercial walls, every project includes proper drainage design and a written quote.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.slug} className="relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center z-10">{String(i + 1).padStart(2, "0")}</span>
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
`);
console.log('services index written');

console.log('Batch 1 complete (4 files)');
