import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { site } from "@/lib/site";
import testimonials from "@/content/testimonials.json";
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
    images: ["/images/wp-deck-railing.jpg"],
  },
};

const hpServices = [
  { title: "Fence Painting", desc: "Brighten and protect your property boundary.", bg: "/images/fence.jpg", href: "/fence-painting-services" },
  { title: "Deck Staining", desc: "Preserve the longevity and beauty of your deck.", bg: "/images/wp-deck-stained-cedar.jpg", href: "/deck-staining-services" },
  { title: "Concrete Sealing", desc: "Guard your surfaces against wear and weather.", bg: "/images/wp-stamped-concrete.jpg", href: "/concrete-sealing" },
  { title: "Pressure Washing", desc: "Comprehensive cleaning for decks, fences, and patios.", bg: "/images/wp-project-2.jpg", href: "/patio-pressure-washing-services" },
  { title: "Decks", desc: "Custom deck building, resurfacing, and repairs.", bg: "/images/wp-deck-building.jpg", href: "/deck-building" },
  { title: "Pergolas & Gazebos", desc: "Crafted to complement your outdoor living.", bg: "/images/pergola.jpg", href: "/custom-pergolas" },
  { title: "Fences & Privacy Screens", desc: "From classic wood to modern designs.", bg: "/images/testimonial-3.jpg", href: "/fence-building" },
  { title: "Retaining Walls", desc: "Functional, stylish solutions for sloped yards.", bg: "/images/wp-arbor.jpg", href: "/wooden-retaining-wall" },
  { title: "Driveways & Patios", desc: "Durable, stylish concrete installations.", bg: "/images/wp-heated-driveway.jpg", href: "/concrete-driveways" },
  { title: "Stamped Concrete", desc: "Beautiful patterns for a unique look.", bg: "/images/wp-stamped-concrete-2.jpg", href: "/stamped-concrete-driveway-installation" },
];

const whyUs = [
  { title: "Exceptional Customer Service", desc: "Our team prioritizes clear and prompt communication. From the initial consultation to the final walkthrough, we keep you informed and involved. Your satisfaction is our top priority, and we're dedicated to exceeding your expectations with every project." },
  { title: "Customized Solutions", desc: "Every home is unique, and so should be its outdoor spaces. We offer fully customized designs tailored to meet your specific needs and preferences. Whether it's a custom deck layout, unique fence designs, or specialized concrete finishes, we make sure it's a perfect fit for your property." },
  { title: "Eco-Friendly Options", desc: "We're committed to sustainability. Master Decker provides eco-friendly options including reclaimed wood and low-impact concrete alternatives. Our practices are designed to minimize environmental impact while maximizing outdoor enjoyment." },
  { title: "Fast and Reliable Execution", desc: "Time is of the essence in any construction project. We pride ourselves on completing projects efficiently without disrupting your daily life. Our streamlined process, from planning to execution, ensures that your project is completed on time and to your satisfaction." },
];

const recentProjects = [
  { title: "Pergolas", desc: "We can make any pergola look like new with a good cleaning and a quality stain!", image: "/images/pergola.jpg", alt: "Premium pergola with swing built by Master Decker in London Ontario" },
  { title: "Gazebos", desc: "Show off your gazebo and make it the perfect gathering spot!", image: "/images/gazebo.jpg", alt: "Custom gazebo restoration by Master Decker in Southwestern Ontario" },
  { title: "Fences", desc: "Make your backyard eye-catching and extend its lifespan with fence restoration.", image: "/images/fence.jpg", alt: "Cedar fence build by Master Decker in London Ontario" },
];

const testimonialBg = "/images/wp-cedar-deck.jpg";

const gallery = [
  { src: "/images/wp-backyard-deck.jpg", alt: "Backyard deck build — Master Decker, London Ontario" },
  { src: "/images/wp-deck-railing.jpg", alt: "Deck with custom railing — Master Decker" },
  { src: "/images/wp-deck-tree.jpg", alt: "Custom deck wrapped around a tree — Master Decker" },
  { src: "/images/wp-project-1.jpg", alt: "Master Decker deck project" },
  { src: "/images/wp-deck-stained-cedar.jpg", alt: "Stained cedar deck — Master Decker" },
  { src: "/images/wp-project-3.jpg", alt: "Master Decker outdoor living project" },
  { src: "/images/wp-stamped-concrete.jpg", alt: "Stamped concrete patio — Master Decker" },
  { src: "/images/wp-stamped-concrete-2.jpg", alt: "Stamped concrete driveway — Master Decker" },
  { src: "/images/wp-heated-driveway.jpg", alt: "Heated concrete driveway install — Master Decker" },
];

const cities = [
  { name: "Toronto", cities: "Markham, Vaughan, Mississauga, Richmond Hill, Brampton, Oakville", bg: "/images/city-toronto.jpg" },
  { name: "London", cities: "St. Thomas, Strathroy, Woodstock, Sarnia, Chatham, Grand Bend", bg: "/images/city-london.jpg" },
  { name: "Kitchener", cities: "Waterloo, Cambridge, New Hamburg, Elmira, Elora, Listowel, Baden", bg: "/images/city-kitchener.jpg" },
  { name: "Guelph", cities: "Milton, Halton Hills, Rockwood, Erin, Fergus", bg: "/images/city-guelph.jpg" },
  { name: "Hamilton", cities: "Brantford, Caledonia, Ancaster, Grimsby, Waterdown, Burlington", bg: "/images/city-hamilton.jpg" },
  { name: "Niagara Falls", cities: "St. Catharines, Welland, Port Colborne, Lincoln", bg: "/images/city-niagara.jpg" },
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
        <Hero
          title="Master Decker Home Services"
          subtitle="We Help Enhance Your Outdoor Living Spaces From Deck Staining to Concrete Patios and Everything In Between"
          background="/images/wp-deck-railing.jpg"
          primaryCta={{ label: "More About Us", href: "/about" }}
          secondaryCta={{ label: "Our Projects", href: "/project-examples" }}
        />

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
                Helping homeowners with their home services since 2014, we pride ourselves on providing you with the best services in house. Our team has a variety of skills to tie different projects together — shortening the time frame, minimizing headaches, and lowering the cost for you.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: "Quick Communication", desc: "We pride ourselves on rapid response times and thorough communication throughout your project." },
                { title: "Friendly Service", desc: "Our teams are professional, friendly, and committed to ensuring your complete satisfaction." },
                { title: "Quality Work", desc: "We treat every project as if it were our own, focusing on superior craftsmanship and attention to detail." },
              ].map((b) => (
                <div key={b.title} className="bg-white p-8 border border-[var(--border)] text-center">
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

        {/* SERVICES GRID — image cards */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">What We Do</p>
              <h2 className="h-display text-3xl md:text-4xl">Services Provided By Master Decker</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hpServices.map((s) => (
                <Link key={s.title} href={s.href} className="svc-card group" aria-label={s.title}>
                  <div className="svc-card-bg" style={{ backgroundImage: `url(${s.bg})` }} role="img" aria-label={s.title} />
                  <div className="svc-card-overlay" />
                  <div className="svc-card-content">
                    <div className="svc-card-title">{s.title}</div>
                    <p className="svc-card-desc">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-primary">View All Services</Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="section relative bg-[var(--ink)] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(/images/wp-cedar-deck.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" aria-hidden="true" />
          <div className="container relative">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-3">Why Choose Us</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Why Choose Master Decker?</h2>
              <p className="text-white/80 leading-relaxed">
                At Master Decker, we understand that your outdoor space is not just an extension of your home, but a reflection of your lifestyle. Our dedicated team combines expertise, quality materials, and a passion for craftsmanship to transform your vision into reality.
              </p>
              <p className="font-bold mt-4 text-[var(--accent)]">Here&apos;s why you should choose us for your next outdoor project.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              {whyUs.map((p) => (
                <div key={p.title}>
                  <div className="w-12 h-1 bg-[var(--accent)] mb-5" />
                  <h3 className="font-bold text-xl mb-3">{p.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{p.desc}</p>
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
              {recentProjects.map((p) => (
                <article key={p.title} className="group">
                  <div className="relative aspect-[4/3] mb-5 overflow-hidden border-2 border-[var(--accent)]">
                    <Image src={p.image} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2">{p.title}</h3>
                  <p className="text-[var(--ink-soft)]">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT GALLERY 3x3 */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">Portfolio</p>
              <h2 className="h-display text-3xl md:text-4xl mb-3">View Our Project Gallery</h2>
              <p className="text-[var(--ink-soft)] text-sm">Showcasing our completed decks, fences, and concrete works.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g, i) => (
                <div key={i} className="gallery-item">
                  <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/project-examples" className="btn-primary">See More</Link>
            </div>
          </div>
        </section>

        {/* GET STARTED */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-3">How It Works</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Get Started Today</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                We&apos;re dedicated to making things easy for you. Here&apos;s how you can get started in just three easy steps.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                { n: "1", title: "Complete the Form", desc: "Click here to access our detailed quote form. Please fill it out with as much detail as possible to ensure an accurate quote. If you have any general inquiries or need assistance with the form, feel free to contact us directly." },
                { n: "2", title: "Wait for Feedback", desc: "After you submit the form, we will review the details and send you a personalized quote via email. If we need any more information to provide a comprehensive estimate, we may contact you directly." },
                { n: "3", title: "Schedule the Job", desc: "Once you approve the quote, we'll work with you to schedule the job at a time that suits your convenience. We aim to start the cleaning or repair services as quickly as possible, ensuring minimal disruption to your daily routine." },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--accent)] text-white text-3xl font-extrabold flex items-center justify-center mx-auto mb-5 shadow-lg">{s.n}</div>
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

        {/* TESTIMONIALS SLIDER */}
        <TestimonialSlider items={[...testimonials]} background={testimonialBg} />

        {/* SERVICE AREAS */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">Where We Work</p>
              <h2 className="h-display text-3xl md:text-4xl mb-3">Service Areas</h2>
              <p className="text-[var(--ink-soft)]">Based out of London, we service the following locations.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((c) => (
                <div key={c.name} className="city-card">
                  <div className="city-card-bg" style={{ backgroundImage: `url(${c.bg})` }} role="img" aria-label={`${c.name} skyline`} />
                  <div className="city-card-overlay" />
                  <div className="city-card-content">
                    <div className="city-card-title">{c.name}</div>
                    <p className="city-card-cities">{c.cities}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/service-locations" className="btn-outline">View All Service Locations</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Got Questions?</p>
              <h2 className="h-display text-3xl md:text-4xl">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faq.groups[4].items.map((q) => (
                <details key={q.q} className="group bg-white border border-[var(--border)] p-5">
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
        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/wp-backyard-deck.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Get a FREE Quote</h2>
            <p className="text-white/85 mb-8 text-lg">
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
