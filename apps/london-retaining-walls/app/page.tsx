import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "London Retaining Walls | Professional Installation & Repair in London, ON",
  description: "Professional retaining wall installation and repair in London, Ontario. Concrete, block and wood retaining walls. 8+ years experience. Ontario Building Code compliant. Free quotes.",
  openGraph: {
    title: "London Retaining Walls | Professional Installation & Repair",
    description: "Expert retaining wall installation in London, Ontario. Concrete, block, and wood walls. Free quotes. Ontario Building Code compliant.",
    url: site.url,
    images: [{ url: "/images/hero-retaining-wall.jpg", width: 1200, height: 630, alt: "Professional retaining wall installation in London, Ontario" }],
  },
};

const faqs = [
  { q: "What are the benefits of choosing Block Retaining Walls?", a: "Block retaining walls are a versatile choice for both residential and commercial properties in Ontario. Complying with the Ontario Building Code, these walls offer a wide range of design options, are great for preventing soil erosion, and can be customized to fit various shapes and heights. They're ideal for creating terraced landscapes, elevated planters, and garden beds." },
  { q: "How durable are Concrete Retaining Walls compared to other types?", a: "Concrete retaining walls are among the most durable types. Known for their strength and resilience, they provide long-lasting stability ideal for retaining steep slopes and creating level surfaces on uneven terrains. Custom formed to suit your landscape, they comply with the Ontario Building Code and are a reliable choice for any setting." },
  { q: "Can Wood & Timber Retaining Walls withstand Ontario's climate?", a: "Yes. Treated lumber or hardwoods used in these walls are chosen for their durability and compatibility with Ontario's climate. Regular maintenance is key to protect against decay and ensure longevity. A properly treated and drained wood wall can last 20–40 years." },
  { q: "What are common signs that indicate a need for Retaining Wall Repair?", a: "Signs your retaining wall needs repair include visible cracks, shifts in the wall, or any noticeable damage. Over time, soil movement, water pressure, and natural wear can compromise the wall's integrity. Timely repairs are crucial to maintain its effectiveness in soil erosion prevention and landscape support." },
  { q: "How do you ensure compliance with the Ontario Building Code?", a: "At London Retaining Walls, we prioritize compliance with the Ontario Building Code in all our projects. Our team ensures that each retaining wall — whether block, concrete, or wood — is engineered and constructed according to the code's standards, ensuring safety and durability." },
];

const services = [
  {
    name: "Block Retaining Walls",
    href: "/block-retaining-walls",
    desc: "Block retaining walls are engineered structures built with interlocking concrete blocks. These walls serve both functional and aesthetic purposes, preventing soil erosion and creating visually appealing terraced landscapes.",
  },
  {
    name: "Concrete Retaining Walls",
    href: "/concrete-retaining-walls",
    desc: "Concrete retaining walls are sturdy structures designed to hold back soil and prevent erosion. Known for their durability, concrete walls provide long-lasting stability in various landscapes.",
  },
  {
    name: "Wood & Timber Retaining Walls",
    href: "/wood-and-timber-retaining-walls",
    desc: "Wood and timber retaining walls bring a natural and warm aesthetic to outdoor spaces. Crafted from treated lumber or hardwood, these walls blend seamlessly with the environment.",
  },
  {
    name: "Retaining Wall Repair",
    href: "/retaining-wall-repair",
    desc: "Retaining wall repair involves addressing cracks, shifts, or damage to existing retaining structures. Timely repair is crucial to prevent further damage and maintain structural effectiveness.",
  },
];

const differentiators = [
  { title: "Experience", desc: "Over 8 years of dedicated experience installing retaining walls across Southwestern Ontario. We bring expertise and genuine care to every project." },
  { title: "Craftsmanship", desc: "From pre-job planning to final walk-throughs, we never compromise on quality. Our commitment is unwavering — durability, aesthetics, and overall excellence." },
  { title: "Expertise", desc: "Whether it's a minor backyard repair or a large commercial installation, each project gets dedicated attention and a committed foreman overseeing progress." },
  { title: "Accountability", desc: "We hold ourselves accountable to exceed your expectations. Final payment is only accepted when we've surpassed your satisfaction levels." },
  { title: "Great Communication", desc: "Available every weekday from 7 AM to 5 PM to coordinate, facilitate scheduling, and promptly address any inquiries." },
  { title: "Attention to Detail", desc: "We guarantee the most comprehensive on-site consultations, with each estimate meticulously reviewed by our owner." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      {/* ─── HERO — split layout matching source ─── */}
      <section className="relative min-h-[560px] flex items-center bg-[var(--dark)]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-retaining-wall.jpg"
            alt="Professional retaining wall installation in London, Ontario"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 w-full container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: headline */}
          <div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white uppercase tracking-wide leading-tight font-[family-name:var(--font-poppins)]">
              PROFESSIONAL<br />RETAINING WALL<br />CONTRACTOR
            </h1>
            <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed">
              Your Trusted Retaining Wall Contractor serving London, St. Thomas, Woodstock, Kitchener, and Hamilton |{" "}
              <strong className="text-white">Free Estimate within 24 hours</strong>
            </p>
            <div className="flex flex-wrap gap-4 mt-7">
              <Link href="#services" className="btn btn-accent text-base px-8 py-3">
                SEE OUR SERVICES →
              </Link>
              <a href={site.phoneHref} className="btn btn-white text-base px-8 py-3 text-[var(--dark)]">
                Call {site.phone}
              </a>
            </div>
          </div>

          {/* Right: inline contact form card */}
          <div className="bg-white rounded shadow-2xl overflow-hidden lg:max-w-md w-full mx-auto">
            <div className="bg-[var(--accent)] px-6 py-4">
              <h2 className="text-lg font-bold text-white text-center uppercase tracking-wide font-[family-name:var(--font-poppins)]">
                CONTACT US
              </h2>
            </div>
            <div className="p-6">
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ORANGE INTRO BANNER ─── */}
      <section className="bg-[var(--accent)] py-14 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide leading-tight font-[family-name:var(--font-poppins)]">
              DURABLE RETAINING WALLS<br />FROM START TO FINISH
            </h2>
          </div>
          <div>
            <p className="text-white/90 leading-relaxed mb-6">
              London Retaining Walls is a company led by Kyle with over 8 years of experience installing retaining walls. We install wood, timber, concrete block, and concrete retaining walls across South-Western Ontario. As retaining wall builders, we can help both residential and commercial customers — standard and engineer walls, tight spaces, Permacon blocks, retention walls and more.
            </p>
            <Link href="/about-us" className="btn btn-dark">READ MORE ABOUT US</Link>
          </div>
        </div>
      </section>

      {/* ─── OUR SERVICES ─── */}
      <section id="services" className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] uppercase tracking-wide font-[family-name:var(--font-poppins)]">
              Our Services
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">We can help with various retaining wall styles. All of these will comply with the Ontario Building Code.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.href} className="card p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-[var(--dark)] mb-3 font-[family-name:var(--font-poppins)]">{s.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.href} className="text-[var(--accent)] text-sm font-semibold hover:underline">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <blockquote className="text-xl md:text-2xl italic text-[var(--dark)] leading-relaxed">
            &ldquo;No other landscape contractor wanted to repair our retaining wall in Byron. This company stepped up and rebuilt our leaning wood retaining wall in three days. I recommend them.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">— Sandra Rudy</p>
        </div>
      </section>

      {/* ─── RESIDENTIAL & COMMERCIAL ─── */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] uppercase tracking-wide text-center mb-10 font-[family-name:var(--font-poppins)]">
            Installing Residential and Commercial Retaining Walls
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--dark)] mb-3 font-[family-name:var(--font-poppins)]">Residential</h3>
              <p className="text-gray-600 leading-relaxed">Transform your home&rsquo;s landscape with our custom-designed residential retaining walls. Perfect for controlling soil erosion, creating terraced gardens, and enhancing outdoor living spaces, our retaining walls combine functionality with aesthetic appeal. Choose from a variety of materials like block, concrete, or wood to perfectly match your home&rsquo;s style.</p>
            </div>
            <div className="bg-gray-50 rounded p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--dark)] mb-3 font-[family-name:var(--font-poppins)]">Commercial</h3>
              <p className="text-gray-600 leading-relaxed">Elevate your commercial property with our durable and efficient commercial retaining wall services. Ideal for supporting sloped terrains, enhancing property aesthetics, and ensuring landscape stability. We specialize in large-scale projects, offering solutions that are both code-compliant and tailored to the unique needs of your business landscape.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WALL TYPES DETAIL ─── */}
      <section className="section bg-[var(--dark)] text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-center mb-10 font-[family-name:var(--font-poppins)]">
            Building Long Lasting Retaining Walls
          </h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">We specialize in tailored designs and installations, offering expertise in various landscaping retaining walls:</p>
          <ul className="space-y-5">
            {[
              { name: "Cantilevered Retaining Walls", desc: "A sleek option that optimizes materials, focusing on meticulous design and construction. Characterized by a thin wall, it extends into the backfill (heel) and forward beneath the soil (toe), showcasing a blend of efficiency and attention to detail." },
              { name: "Gravity Retaining Walls", desc: "A fundamental design leveraging the wall's mass and weight to secure the soil. Suited for various materials and finishes, shorter walls may not require additional reinforcement, while stability is enhanced through a small trench in most cases." },
              { name: "Anchored Retaining Walls", desc: "Versatile and adaptable, this design employs cables or strips to anchor the wall to the earth. Compatible with any material or style, anchored retaining walls provide a robust solution for diverse landscaping needs." },
            ].map((w) => (
              <li key={w.name} className="flex gap-4">
                <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[var(--accent)]" />
                <div>
                  <strong className="text-white font-semibold">{w.name}:</strong>{" "}
                  <span className="text-gray-300">{w.desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-gray-400 text-sm text-center">During your consultation, our experts assess soil conditions, property specifics, and your unique requirements to determine the most suitable retaining wall type.</p>
        </div>
      </section>

      {/* ─── DIFFERENTIATORS ─── */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] uppercase tracking-wide text-center mb-4 font-[family-name:var(--font-poppins)]">
            Find Out the Difference<br />London Retaining Walls Makes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {differentiators.map((d) => (
              <div key={d.title} className="p-6 bg-gray-50 rounded border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--dark)] mb-2 font-[family-name:var(--font-poppins)]">{d.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] uppercase tracking-wide text-center mb-2 font-[family-name:var(--font-poppins)]">
            Our Service Areas
          </h2>
          <p className="text-center text-gray-500 mb-8">Located in London, but we service all of Southwestern Ontario:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {site.serviceAreas.map((area) => (
              <Link
                key={area.name}
                href={area.href}
                className="px-4 py-2 text-center rounded border border-gray-200 text-gray-700 hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium text-sm transition-colors bg-white"
              >
                {area.name}
              </Link>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-gray-500">Outside these areas? <Link href="/contact-us" className="text-[var(--accent)] font-semibold hover:underline">Contact us to see if we can help today</Link></p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] uppercase tracking-wide text-center mb-10 font-[family-name:var(--font-poppins)]">
            FAQS
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="font-bold text-[var(--dark)] font-[family-name:var(--font-poppins)]">{faq.q}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
