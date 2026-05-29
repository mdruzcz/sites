import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { localBusinessSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Driveways & Patios London, ON",
  description: "Expert concrete contractor in London, Ontario. Driveways, patios, retaining walls, stamped concrete & more. 20+ years experience. Call 519-914-1901 for a FREE quote!",
  openGraph: {
    title: "Concrete Driveways & Patios London, ON",
    description: "Expert concrete contractor in London, Ontario. Driveways, patios, retaining walls & stamped concrete. 20+ years experience.",
    url: site.url,
    images: [{ url: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg", alt: "Concrete driveway by London Concrete Forming in London, ON" }],
  },
  twitter: { card: "summary_large_image", title: "Concrete Driveways London, ON" },
};

const faqItems = [
  { question: "How much does a concrete driveway cost in London, ON?", answer: "Our concrete driveway installation costs between $10–$16 per square foot depending on the size, finish, and site conditions. This includes all labour, materials, and the concrete itself." },
  { question: "How long does concrete take to cure?", answer: "Concrete reaches walking strength within 24–48 hours and can handle light vehicle traffic after 7 days. Full strength is reached at 28 days. We recommend waiting the full 7 days before driving on a new driveway." },
  { question: "Do you offer stamped concrete options?", answer: "Yes! We offer a wide variety of stamped concrete patterns including slate, cobblestone, brick, and more. Stamped concrete adds beautiful curb appeal and can be combined with custom colours." },
  { question: "What areas do you serve?", answer: "We serve London and the surrounding area including St. Thomas, Woodstock, Stratford, Sarnia, Chatham, and Port Stanley." },
  { question: "Do you provide free quotes?", answer: "Yes, we provide free no-obligation quotes for all concrete projects. Contact us by phone at 519-914-1901 or fill out our online quote form and we will get back to you within 1 business day." },
];

const services = [
  { href: "/concrete-driveways", title: "Concrete Driveways", desc: "Natural, coloured, stamped, and broomed driveway options. Durable and low-maintenance.", img: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg", alt: "Freshly poured concrete driveway in London, ON by London Concrete Forming" },
  { href: "/concrete-patios", title: "Concrete Patios", desc: "Beautiful outdoor living spaces with custom finishes and stamped patterns.", img: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/PXL_20230718_125644595.jpg", alt: "Stamped concrete patio installation in London, Ontario" },
  { href: "/concrete-retaining-walls", title: "Retaining Walls", desc: "Expert concrete retaining wall construction for erosion control and landscaping.", img: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/IMG-20231218-WA0003.jpg", alt: "Concrete retaining wall construction in London, ON" },
  { href: "/stamped-concrete-driveway", title: "Stamped Concrete", desc: "Add curb appeal with decorative stamped patterns and custom colour options.", img: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/IMG-20231218-WA0005.jpg", alt: "Stamped concrete driveway with decorative pattern in London, Ontario" },
  { href: "/concrete-removal-services", title: "Concrete Removal", desc: "Professional removal and disposal of old driveways, patios, and slabs.", img: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/image-5.png", alt: "Concrete removal service in London, Ontario" },
  { href: "/concrete-shed-pad-installer", title: "Shed Pads", desc: "Solid concrete shed pad installations for garages, sheds, and hot tubs.", img: "https://londonconcreteforming.ca/wp-content/uploads/2023/12/PXL_20230718_125644595-1024x771.jpg", alt: "Concrete shed pad installation in London, Ontario" },
];

const benefits = [
  { icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Expert Contractors", desc: "Over 20 years of combined experience. Our team has completed 500+ projects across London and surrounding areas." },
  { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", title: "Timely Completion", desc: "We respect your time and schedule. Projects are completed on time with minimal disruption to your property." },
  { icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z", title: "Customer Satisfaction", desc: "5-star rated service. We stand behind our work and ensure every customer is completely satisfied." },
  { icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5", title: "Quality Materials", desc: "We use premium concrete mixes and reinforcement to ensure your project withstands Ontario winters for decades." },
  { icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42", title: "Creative Design", desc: "From natural broom finish to intricate stamped patterns — we help you design the perfect look for your home." },
  { icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418", title: "Environmental Responsibility", desc: "We practice responsible concrete disposal and site cleanup, minimizing our environmental footprint on every job." },
];

export default function HomePage() {
  const jsonLd = [localBusinessSchema(), faqSchema(faqItems)];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg"
            alt="Professional concrete driveway installation in London, Ontario by London Concrete Forming"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
        </div>
        <div className="relative container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                London, Ontario
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                Professional Concrete Driveways, Patios, Pads, and More
              </h1>
              <p className="text-slate-300 text-lg mb-3 font-semibold">20+ Years of Experience</p>
              <p className="text-slate-300 text-base mb-8 max-w-lg">
                Concrete flatwork across London, St Thomas, Woodstock, and Surrounding Areas
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact-us" className="btn btn-primary text-base">
                  Get a Free Quote Now!
                </Link>
                <a href={site.phoneHref} className="btn border-2 border-white text-white hover:bg-white hover:text-[#333333] transition-colors text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#333333] mb-1">Get a Free Quote</h2>
              <p className="text-slate-500 text-sm mb-5">We respond within {site.responseTime}.</p>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services Grid */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-3">How Can We Help You?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From driveways and patios to retaining walls and shed pads — we handle all your concrete needs across London and area.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="card group overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight">{service.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
                  <span className="text-[#F7931E] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-3">Why Choose London Concrete Forming?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We take pride in delivering exceptional results that last decades.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#F7931E]/10 flex items-center justify-center mx-auto mb-4 text-[#F7931E]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-[#333333] text-lg mb-2">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Trust */}
      <section className="section bg-[#333333]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">London, Ontario Trusted Concrete Contractor</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                London Concrete Forming is a local concrete contractor serving London and the surrounding area. Our team brings over 20 years of combined experience to every project, from simple driveway replacements to complex stamped concrete installations.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                We specialize in residential concrete work including driveways, patios, retaining walls, and shed pads. Every project is completed with attention to detail and a commitment to quality that has earned us a reputation as one of the most trusted concrete contractors in the region.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                Our pricing is transparent and competitive — typically $10–$16 per square foot for standard driveway installation. We provide detailed quotes with no hidden fees, and we stand behind every project we complete.
              </p>
              <Link href="/about-us" className="btn btn-primary text-base">Learn About Us</Link>
            </div>
            <div className="relative h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden">
              <Image
                src="https://londonconcreteforming.ca/wp-content/uploads/2023/12/PXL_20230718_125644595-1024x771.jpg"
                alt="London Concrete Forming team at work on a concrete project in London, Ontario"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality section */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-5">Quality Concrete That Lasts Is Our Number One Priority</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            At London Concrete Forming, we understand that a concrete driveway or patio is a long-term investment. That is why we only use high-quality concrete mixes and proper reinforcement techniques to ensure your project stands the test of time — especially through Ontario winters.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Every project begins with proper site preparation including excavation, grading, and compaction. We then set forms to exact specifications before pouring and finishing the concrete. The result is a smooth, level surface that drains properly and resists cracking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] rounded-xl p-6">
              <p className="text-3xl font-extrabold text-[#F7931E] mb-2">20+</p>
              <p className="text-slate-700 font-semibold">Years Experience</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-6">
              <p className="text-3xl font-extrabold text-[#F7931E] mb-2">500+</p>
              <p className="text-slate-700 font-semibold">Projects Completed</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-6">
              <p className="text-3xl font-extrabold text-[#F7931E] mb-2">$10–$16</p>
              <p className="text-slate-700 font-semibold">Per Sq. Ft.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common questions about concrete services in London, Ontario.</p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* What Makes Us Stand Out */}
      <section className="section bg-[#333333]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">What Makes Us Stand Out</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-white font-bold text-xl mb-3">Affordable Pricing</h3>
              <p className="text-slate-300 leading-relaxed">Competitive rates of $10–$16/sq.ft. with transparent pricing. No hidden fees or surprise charges — ever.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="text-white font-bold text-xl mb-3">Financing Options</h3>
              <p className="text-slate-300 leading-relaxed">We work with homeowners to find payment solutions that fit their budget. Ask us about our flexible financing options.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-white font-bold text-xl mb-3">Diverse Finishes</h3>
              <p className="text-slate-300 leading-relaxed">Broom finish, exposed aggregate, stamped patterns, coloured concrete — we offer every finish option to match your vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className="section bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-3">Get Your Free Quote Today</h2>
            <p className="text-slate-600">Fill out the form below and we will get back to you within {site.responseTime}.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-4">Areas We Serve</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">Proudly serving London and surrounding communities across Southwestern Ontario.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {site.serviceAreas.map((area) => (
              <span key={area} className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700">
                {area}, ON
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
