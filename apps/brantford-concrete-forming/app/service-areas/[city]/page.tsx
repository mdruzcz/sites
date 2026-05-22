import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { getCity, getServiceAreas, getServices } from "@/lib/content";
import { breadcrumbSchema, localBusinessSchema, serviceSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const areas = getServiceAreas();
  return areas.cities.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};
  const title = `Concrete Forming in ${city.name}, ON`;
  const description = `Expert concrete driveway, patio & stamped concrete services in ${city.name}, ON. Steel-reinforced 32 MPa work by Brantford Concrete Forming. Free quotes.`;
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | Brantford Concrete Forming`,
      description: description.slice(0, 160),
      images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: `Concrete forming in ${city.name}, ON` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();
  const services = getServices();

  const jsonLd = [
    localBusinessSchema(),
    serviceSchema({
      name: `Concrete Forming in ${city.name}`,
      description: `Expert concrete driveway, patio, stamped, and broom finish services in ${city.name}, ON.`,
      url: `${site.url}/service-areas/${city.slug}`,
      city: city.name,
    }),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Service Areas", url: `${site.url}/service-areas` },
      { name: city.name, url: `${site.url}/service-areas/${city.slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Concrete Forming in {city.name}, ON
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8">{city.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary text-base">Get a Free Quote in {city.name}</Link>
            <a href={site.phoneHref} className="btn border-2 border-white text-white hover:bg-white hover:text-[#1a2332] transition-colors text-base">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332] mb-5">
                Concrete Services Available in {city.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                Brantford Concrete Forming provides the full range of residential and light commercial concrete forming services to {city.name} homeowners and businesses. From driveways to decorative stamped patios, our crew delivers 32 MPa steel-reinforced results — every time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="card p-5 hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-36 rounded-lg overflow-hidden mb-3">
                      <ImageWithBlur
                        src={service.image}
                        alt={`${service.title} in ${city.name}, ON`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-[#1a2332] mb-1">{service.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{service.shortDescription}</p>
                    <span className="text-[#E8751A] text-xs font-semibold mt-2 flex items-center gap-1">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="bg-[#1a2332] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Serving {city.name} and the Surrounding Area</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Based in Brantford, we serve all of Brant County including {getServiceAreas().cities.map(c => c.name).join(", ")}. No travel surcharges within our service area.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#f8fafc] rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#1a2332] mb-1">Free Quote — {city.name}</h3>
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
