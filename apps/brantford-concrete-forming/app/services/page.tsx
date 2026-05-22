import type { Metadata } from "next";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import CtaBand from "@/components/CtaBand";
import { getServices } from "@/lib/content";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Services in Brantford, ON",
  description:
    "Explore all concrete services offered by Brantford Concrete Forming: driveway installation, stamped concrete, patios, broom finish & driveway replacement. Free quotes.",
  openGraph: {
    title: "Concrete Services in Brantford, ON | Brantford Concrete Forming",
    description: "Expert concrete driveway, patio, stamped, and broom finish services in Brantford and surrounding Brant County communities.",
    images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: "Concrete services in Brantford by BCF" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  const services = getServices();
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Services", url: `${site.url}/services` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Page header */}
      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Concrete Services</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            From residential driveways to commercial patios — we deliver steel-reinforced, 32 MPa concrete work built to last decades in Ontario&apos;s climate.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10">
            {services.map((service, idx) => (
              <div
                key={service.slug}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`relative rounded-2xl overflow-hidden h-72 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                  <ImageWithBlur
                    src={service.image}
                    alt={`${service.title} by Brantford Concrete Forming`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332] mb-3">{service.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-5">{service.fullDescription}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-slate-700 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#E8751A" className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="btn btn-primary">
                    Learn More About {service.title}
                  </Link>
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
