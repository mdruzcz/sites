import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import { getService, getServices, getServiceAreas } from "@/lib/content";
import { serviceSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.title} in Brantford, ON`;
  const description = `${service.shortDescription} Serving Brantford, Paris, Burford & surrounding Brant County communities. Free estimates — call 519-914-5697.`;
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | Brantford Concrete Forming`,
      description: description.slice(0, 160),
      images: [{ url: service.image, alt: `${service.title} in Brantford, ON by BCF` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
  "concrete-driveway-installation": [
    { question: "How thick should a residential concrete driveway be?", answer: "Typically 4 inches for passenger vehicles, 5–6 inches if heavy trucks will use it regularly." },
    { question: "Will my concrete driveway crack?", answer: "Control joints are installed during construction to direct any natural cracking below the surface. Properly installed driveways rarely show visible surface cracks." },
    { question: "How long does driveway installation take?", answer: "Most residential driveways are completed in 2–3 days, with a 7-day cure before driving." },
  ],
  "stamped-concretes": [
    { question: "How durable is stamped concrete?", answer: "Very durable when properly sealed. We apply a professional sealer to protect against staining and UV fading, extending the life significantly." },
    { question: "Can stamped concrete get slippery?", answer: "We add a non-slip additive to the sealer for surfaces like pool decks and entry stairs, ensuring safety in wet conditions." },
    { question: "How often does stamped concrete need resealing?", answer: "Every 2–3 years for high-traffic areas, 3–5 years for patios. Resealing keeps the colour vibrant and the surface protected." },
  ],
  "concrete-patio-installation": [
    { question: "Is concrete or paving stones better for a patio?", answer: "Concrete is lower maintenance, more cost-effective, and provides a seamless surface. Pavers can shift and allow weeds; concrete does not." },
    { question: "Can you pour concrete over my existing deck area?", answer: "It depends on the base condition. We assess each site and may need to excavate and compact a new gravel base for proper drainage." },
  ],
  "broom-finish-concretes": [
    { question: "What is a broom finish?", answer: "A textured surface created by dragging a stiff broom across freshly poured concrete. It creates fine ridges that improve traction — ideal for driveways, sidewalks, and garage floors." },
    { question: "Is broom finish the cheapest concrete option?", answer: "Yes, it is the most affordable finish and the industry standard for functional applications like driveways and sidewalks." },
  ],
  "driveway-replacement": [
    { question: "Should I repair or replace my driveway?", answer: "If more than 25% of your driveway is cracked or heaving, replacement is more cost-effective than repeated patching." },
    { question: "Do you remove and dispose of the old driveway?", answer: "Yes, full demolition, removal, and disposal of the existing surface is included in our driveway replacement service." },
  ],
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceAreas = getServiceAreas();
  const faqs = serviceFaqs[slug] || [];

  const jsonLd = [
    localBusinessSchema(),
    serviceSchema({
      name: service.title,
      description: service.fullDescription,
      url: `${site.url}/services/${service.slug}`,
    }),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Services", url: `${site.url}/services` },
      { name: service.title, url: `${site.url}/services/${service.slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <section className="bg-[#1a2332] relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <ImageWithBlur
            src={service.image}
            alt={`${service.title} in Brantford, ON`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container-custom py-16 md:py-24">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl">
            {service.title} in Brantford, ON
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mb-8">{service.shortDescription}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary text-base">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn border-2 border-white text-white hover:bg-white hover:text-[#1a2332] transition-colors text-base">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main content + form */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332] mb-5">
                Expert {service.title} in Brantford & Brant County
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">{service.fullDescription}</p>

              {/* Features */}
              <h3 className="text-xl font-bold text-[#1a2332] mb-4">What&apos;s Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {service.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 bg-[#f8fafc] rounded-lg p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#E8751A" className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>

              {/* Service image */}
              <div className="relative rounded-2xl overflow-hidden h-72 mb-8">
                <ImageWithBlur
                  src={service.image}
                  alt={`Completed ${service.title} project by Brantford Concrete Forming`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Service cities */}
              <h3 className="text-xl font-bold text-[#1a2332] mb-4">{service.title} Near You</h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="bg-[#f8fafc] border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-700 hover:border-[#E8751A] hover:text-[#E8751A] transition-colors"
                  >
                    {service.title} in {city.name}
                  </Link>
                ))}
              </div>

              {/* FAQ */}
              {faqs.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-[#1a2332] mb-5">Common Questions About {service.title}</h3>
                  <FaqAccordion items={faqs} />
                </div>
              )}
            </div>

            {/* Right: quote form */}
            <div className="lg:col-span-1">
              <div className="bg-[#f8fafc] rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#1a2332] mb-1">Get a Free Quote</h3>
                <p className="text-slate-500 text-sm mb-5">We respond within {site.responseTime}.</p>
                <QuoteForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
