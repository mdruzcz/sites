import type { Metadata } from "next";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { getServices, getFeaturedTestimonials, getFeaturedProjects } from "@/lib/content";
import { localBusinessSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Brantford Concrete Forming | Driveways, Patios & More",
  description:
    "Expert concrete driveway installation, stamped concrete & patios in Brantford, ON. 32 MPa strength, steel-reinforced. Free quotes — call 519-914-5697.",
  openGraph: {
    title: "Brantford Concrete Forming | Driveways, Patios & More",
    description:
      "Expert concrete driveway installation, stamped concrete & patios in Brantford, ON. 32 MPa strength, steel-reinforced. Free quotes.",
    url: site.url,
    images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: "Concrete driveway installation in Brantford by BCF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brantford Concrete Forming | Driveways, Patios & More",
    description: "Expert concrete driveway installation, stamped concrete & patios in Brantford, ON.",
  },
};

const faqItems = [
  { question: "How much does a concrete driveway cost in Brantford?", answer: "$8–$14 per sq.ft. depending on finish and site conditions. This includes materials, labour, and 32 MPa concrete." },
  { question: "How long do I wait before driving on my new driveway?", answer: "7 days minimum before light vehicle traffic. Full strength is reached at 28 days." },
  { question: "Do you handle permits and excavation?", answer: "Yes. We manage the full project lifecycle: excavation, base prep, grading, forming, pouring, and finishing." },
  { question: "How long does concrete forming and pouring take?", answer: "Typically 2–4 days. Day 1: excavation and forming. Day 2: gravel base, reinforcement, and pour. Days 3–4: finishing and curing. Then 7-day cure before use." },
];

const processSteps = [
  { step: "01", title: "Site Prep", desc: "Excavation, soil removal, and grading for proper drainage." },
  { step: "02", title: "Form Work", desc: "Steel forms set to exact grade and dimensions for a perfect pour." },
  { step: "03", title: "Pouring", desc: "32 MPa concrete poured and distributed evenly across the reinforced base." },
  { step: "04", title: "Finishing", desc: "Broom, stamp, or smooth finish applied to your specification." },
  { step: "05", title: "Inspection", desc: "Final walkthrough to ensure every detail meets our quality standard." },
];

const whyUs = [
  {
    iconPath: "M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.498A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z",
    title: "32 MPa Quality",
    desc: "We only pour high-strength concrete designed to withstand Ontario freeze-thaw cycles for decades."
  },
  {
    iconPath: "M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z",
    title: "Proven Process",
    desc: "Five structured steps from site prep to final inspection — no shortcuts, no surprises."
  },
  {
    iconPath: "M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.203-4.599 3.203-7.327C19.5 7.116 15.964 3.5 12 3.5 8.037 3.5 4.5 7.116 4.5 12c0 2.728 1.259 5.244 3.203 7.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    title: "Local Experts",
    desc: "Brantford-based and proud of it. We understand local soil conditions and building codes."
  },
  {
    iconPath: "M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z",
    title: "5+ Years Experience",
    desc: "Over 56 completed projects in Brantford and surrounding communities. Our work speaks for itself."
  },
];

export default function HomePage() {
  const services = getServices();
  const testimonials = getFeaturedTestimonials();
  const projects = getFeaturedProjects();

  const jsonLd = [localBusinessSchema(), faqSchema(faqItems)];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="bg-[#1a2332] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithBlur
            src="/images/man-working-on-smoothing-concrete-600nw-2413949341.png"
            alt="Concrete worker smoothing a fresh concrete pour in Brantford"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline */}
            <div>
              <span className="inline-block bg-[#E8751A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Brantford, ON
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                Concrete Forming<br />
                <span className="text-[#E8751A]">Done Right.</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 max-w-lg">
                32 MPa steel-reinforced concrete driveways, patios, and more. Built for Ontario winters. Serving Brantford and surrounding areas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/services" className="btn btn-primary text-base">
                  View Our Services
                </Link>
                <a href={site.phoneHref} className="btn border-2 border-white text-white hover:bg-white hover:text-[#1a2332] transition-colors text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                  {site.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <span>5-star results · {site.projectsCompleted}+ projects completed</span>
              </div>
            </div>

            {/* Right: quote form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#1a2332] mb-1">Get a Free Quote</h2>
              <p className="text-slate-500 text-sm mb-5">We respond within {site.responseTime}.</p>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Pain point */}
      <section className="section bg-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-5">
            Tired of Cracked Asphalt and Patchy Repairs?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Asphalt driveways crack, shift, and need costly sealing every year. Stamped or broom-finish concrete lasts 2–3× longer with zero yearly maintenance. We handle everything — excavation, forming, pouring, and finishing — so you get a flawless result the first time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary text-base">Get a Free Estimate</Link>
            <Link href="/our-process" className="btn btn-outline text-base">See Our Process</Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-3">Our Concrete Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From driveways and patios to stamped finishes — all with steel reinforcement and 32 MPa concrete.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="card group overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <ImageWithBlur
                    src={service.image}
                    alt={`${service.title} example project by Brantford Concrete Forming`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight">{service.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{service.shortDescription}</p>
                  <span className="text-[#E8751A] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn btn-outline text-base">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-3">Why Choose Brantford Concrete Forming?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We take pride in every project, delivering results that last decades — not just seasons.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#E8751A]/10 flex items-center justify-center mx-auto mb-4 text-[#E8751A]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
                    <path fillRule="evenodd" d={item.iconPath} clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1a2332] text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-[#1a2332]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Our 5-Step Process</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every project follows a structured process that ensures quality from start to finish.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#E8751A] text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/our-process" className="btn btn-primary text-base">Learn More About Our Process</Link>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-3">Recent Projects</h2>
            <p className="text-slate-600">A sample of our concrete work across Brantford and surrounding area.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.slug} className="relative rounded-xl overflow-hidden h-60 group">
                <ImageWithBlur
                  src={project.image}
                  alt={`${project.title} by Brantford Concrete Forming in ${project.city}, ON`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-semibold">{project.title}</p>
                  <p className="text-slate-300 text-sm">{project.city}, ON</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline text-base">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-3">What Our Customers Say</h2>
            <p className="text-slate-600">Real results, real clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-[#1a2332]">{t.author}</p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews" className="btn btn-outline text-base">Read More Reviews</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common questions about concrete forming in Brantford.</p>
          </div>
          <FaqAccordion items={faqItems} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn btn-outline text-base">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-4">Areas We Serve</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">Proudly serving Brantford and the surrounding communities of Brant County.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {site.serviceAreas.map((area) => (
              <Link
                key={area}
                href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                className="bg-[#f8fafc] border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#E8751A] hover:text-[#E8751A] transition-colors"
              >
                {area}, ON
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
