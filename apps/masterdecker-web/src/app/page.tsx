import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { ServiceIcon } from "@/components/service-icon";
import { site } from "@/lib/site";
import testimonials from "@/content/testimonials.json";
import locations from "@/content/locations.json";
import faq from "@/content/faq.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: site.url },
  title: `${site.name} | Decks, Fences & Concrete | London Ontario`,
  description:
    "Master Decker Inc. — London Ontario's outdoor living experts since 2014. Deck staining, deck building, fence installation, concrete driveways, retaining walls. Free estimates across Southwestern Ontario.",
  openGraph: {
    title: `${site.name} | Decks, Fences & Concrete | London Ontario`,
    description: site.description,
    url: site.url,
    images: ["/images/pergola.jpg"],
  },
};

const hpServices = [
  { icon: "spray", title: "Fence Painting", desc: "Brighten and protect your property boundary." },
  { icon: "deck", title: "Deck Staining", desc: "Preserve the longevity and beauty of your deck." },
  { icon: "concrete", title: "Concrete Sealing", desc: "Guard your surfaces against wear and weather." },
  { icon: "boat", title: "Boat Dock Staining", desc: "Specialty staining services to beautify and protect." },
  { icon: "spray", title: "Pressure Washing", desc: "Comprehensive cleaning for decks, fences, and patios." },
  { icon: "deck", title: "Decks", desc: "Custom deck building, resurfacing, and repairs." },
  { icon: "pergola", title: "Pergolas & Gazebos", desc: "Crafted to complement your outdoor living." },
  { icon: "fence", title: "Fences & Privacy Screens", desc: "From classic wood to modern designs." },
  { icon: "wall", title: "Wood Retaining Walls", desc: "Functional, stylish solutions for sloped yards." },
  { icon: "driveway", title: "Driveways & Patios", desc: "Durable, stylish concrete installations." },
  { icon: "heated", title: "Heated Driveways", desc: "Keep your driveway clear in winter." },
  { icon: "stamp", title: "Stamped Concrete", desc: "Beautiful patterns for a unique look." },
  { icon: "walkway", title: "Concrete Walkways & Curbs", desc: "Practical and appealing concrete work." },
  { icon: "turf", title: "Low Voltage Lighting & Artificial Turf", desc: "Enhance your nights and reduce maintenance." },
  { icon: "rail", title: "Railings & Fencing", desc: "Security and style with a variety of materials." },
] as const;

const whyUs = [
  { title: "Exceptional Customer Service", desc: "Our team prioritizes clear and prompt communication. From the initial consultation to the final walkthrough, we keep you informed and involved. Your satisfaction is our top priority, and we're dedicated to exceeding your expectations with every project." },
  { title: "Customized Solutions", desc: "Every home is unique, and so should be its outdoor spaces. We offer fully customized designs tailored to meet your specific needs and preferences. Whether it's a custom deck layout, unique fence designs, or specialized concrete finishes, we make sure it's a perfect fit for your property." },
  { title: "Eco-Friendly Options", desc: "We're committed to sustainability. Master Decker provides eco-friendly options including reclaimed wood and low-impact concrete alternatives. Our practices are designed to minimize environmental impact while maximizing outdoor enjoyment." },
  { title: "Fast and Reliable Execution", desc: "Time is of the essence in any construction project. We pride ourselves on completing projects efficiently without disrupting your daily life. Our streamlined process, from planning to execution, ensures that your project is completed on time and to your satisfaction." },
];

const projects = [
  { title: "Pergolas", desc: "We can make any pergola look like new with a good cleaning and a quality stain!", image: "/images/pergola.jpg", alt: "Premium pergola with swing built by Master Decker in London Ontario" },
  { title: "Gazebos", desc: "Show off your gazebo and make it the perfect gathering spot!", image: "/images/gazebo.jpg", alt: "Custom gazebo restoration by Master Decker in Southwestern Ontario" },
  { title: "Fences", desc: "Make your backyard eye-catching and extend its lifespan with fence restoration.", image: "/images/fence.jpg", alt: "Cedar fence build by Master Decker in London Ontario" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  description: site.description,
  foundingDate: String(site.foundedYear),
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 10:00-17:00"],
  areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
  sameAs: [site.socials.facebook, site.socials.linkedin],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.groups[4].items.map((q) => ({
    "@type": "Question",
    name: q.q,
    acceptedAnswer: { "@type": "Answer", text: q.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        {/* HERO */}
        <section className="relative bg-[var(--accent-dark)] text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url(/images/pergola.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-darker)] via-[var(--accent-darker)]/85 to-transparent" aria-hidden="true" />
          <div className="container relative section py-24 md:py-32">
            <div className="max-w-2xl">
              <h1 className="h-display text-4xl md:text-5xl lg:text-6xl mb-6">Master Decker Home Services</h1>
              <p className="text-lg md:text-xl text-white/85 mb-9 max-w-xl leading-relaxed">
                We Help Enhance Your Outdoor Living Spaces From Deck Staining to Concrete Patios and Everything In Between
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary">More About Us</Link>
                <Link href="/project-examples" className="btn-outline border-white text-white hover:bg-white hover:text-[var(--accent)]">Our Projects</Link>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section bg-white">
          <div className="container text-center max-w-4xl mx-auto">
            <h2 className="h-display text-3xl md:text-4xl mb-4">
              Deck, Fence, Concrete Company Near You – Serving London and Surrounding Areas Since 2014
            </h2>
            <p className="text-lg text-[var(--ink-soft)]">
              Get the help you need from building a new deck, to deck restoration. We can help.
            </p>
          </div>
        </section>

        {/* PROFESSIONAL HOME SERVICES */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-3">Why Master Decker</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Professional Home Services</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                Helping homeowners with their home services since 2014, we pride ourselves on providing you with the best services in house. Our team has a variety of skills to tie different projects together – shortening the time frame, minimizing headaches, and lowering the cost for you.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: "Quick Communication", desc: "We pride ourselves on rapid response times and thorough communication throughout your project." },
                { title: "Friendly Service", desc: "Our teams are professional, friendly, and committed to ensuring your complete satisfaction." },
                { title: "Quality Work", desc: "We treat every project as if it were our own, focusing on superior craftsmanship and attention to detail." },
              ].map((b) => (
                <div key={b.title} className="bg-white rounded p-7 border border-[var(--border)] text-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{b.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">What We Do</p>
              <h2 className="h-display text-3xl md:text-4xl">Services Provided By Master Decker</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hpServices.map((s) => (
                <div key={s.title} className="group bg-white rounded border border-[var(--border)] p-6 hover:border-[var(--accent)] hover:shadow-md transition-all">
                  <div className="text-[var(--accent)] mb-4 group-hover:scale-110 transition-transform origin-left">
                    <ServiceIcon icon={s.icon as Parameters<typeof ServiceIcon>[0]["icon"]} className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[var(--ink)]">{s.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services" className="btn-primary">View All Services</Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="section bg-[var(--accent-dark)] text-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow text-[var(--accent-light)] mb-3">Why Choose Us</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Why Choose Master Decker?</h2>
              <p className="text-white/75 leading-relaxed">
                At Master Decker, we understand that your outdoor space is not just an extension of your home, but a reflection of your lifestyle. Our dedicated team combines expertise, quality materials, and a passion for craftsmanship to transform your vision into reality.
              </p>
              <p className="font-bold mt-4">Here&apos;s why you should choose us for your next outdoor project.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              {whyUs.map((p) => (
                <div key={p.title}>
                  <div className="w-12 h-0.5 bg-[var(--accent)] mb-5" />
                  <h3 className="font-bold text-xl mb-3">{p.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT PROJECTS */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="eyebrow mb-3">Our Work</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Recent Projects</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                Decks are not all we do! Protect and transform any wood structure with our same restoration process. We can transform your pergola, gazebo, fence, posts, shed, furniture, and more!
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article key={p.title} className="group">
                  <div className="relative aspect-[4/3] mb-4 rounded overflow-hidden">
                    <Image src={p.image} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)]">{p.desc}</p>
                </article>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/project-examples" className="btn-primary">See More</Link>
            </div>
          </div>
        </section>

        {/* GET STARTED */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-3">How It Works</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Get Started Today</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                We&apos;re dedicated to making things easy for you. Here&apos;s how you can get started in just three easy steps.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { n: "1", title: "Complete the Form", desc: "Click here to access our detailed quote form. Please fill it out with as much detail as possible to ensure an accurate quote. If you have any general inquiries or need assistance with the form, feel free to contact us directly." },
                { n: "2", title: "Wait for Feedback", desc: "After you submit the form, we will review the details and send you a personalized quote via email. If we need any more information to provide a comprehensive estimate, we may contact you directly." },
                { n: "3", title: "Schedule the Job", desc: "Once you approve the quote, we'll work with you to schedule the job at a time that suits your convenience. We aim to start the cleaning or repair services as quickly as possible, ensuring minimal disruption to your daily routine." },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent)] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-5">{s.n}</div>
                  <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">Reviews</p>
              <h2 className="h-display text-3xl md:text-4xl mb-3">Testimonials</h2>
              <p className="text-[var(--ink-soft)]">See what our customers are saying about working with us.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="bg-[var(--surface)] rounded p-7 border border-[var(--border)]">
                  <svg className="w-8 h-8 text-[var(--accent)] mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h4v4H7c0 2 1 4 4 4v3c-4 0-7-3-7-7V7zm9 0h4v4h-4c0 2 1 4 4 4v3c-4 0-7-3-7-7V7z" /></svg>
                  <blockquote className="text-[var(--ink-soft)] mb-5 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Image src={t.image} alt={`${t.name} - Master Decker customer in ${t.location}`} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-[var(--ink-soft)]">{t.location}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">Where We Work</p>
              <h2 className="h-display text-3xl md:text-4xl mb-3">Service Areas</h2>
              <p className="text-[var(--ink-soft)]">Based out of London, we service the following locations</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {locations.regions.map((r) => (
                <div key={r.name} className="text-center">
                  <h3 className="font-bold text-xl text-[var(--accent)] mb-3">{r.name}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{r.cities.join(", ")}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/service-locations" className="btn-outline">View All Service Locations</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Got Questions?</p>
              <h2 className="h-display text-3xl md:text-4xl">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faq.groups[4].items.map((q) => (
                <details key={q.q} className="group bg-[var(--surface)] border border-[var(--border)] rounded p-5">
                  <summary className="cursor-pointer flex justify-between items-center font-bold list-none">
                    <span>{q.q}</span>
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">{q.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/faq" className="btn-outline">Read More</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-[var(--accent-dark)] text-white text-center">
          <div className="container max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Get a FREE Quote</h2>
            <p className="text-white/80 mb-8 text-lg">
              Don&apos;t wait to improve your outdoor space. Talk to us today and see how easy it is to get started with Master Decker.
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
