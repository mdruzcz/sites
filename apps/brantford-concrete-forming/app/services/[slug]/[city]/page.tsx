import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { getService, getServices, getServiceAreas, getCity } from "@/lib/content";
import { serviceSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((s) =>
    areas.cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getCity(citySlug);
  if (!service || !city) return {};

  const title = `${service.title} in ${city.name}, ON`;
  const description = `Looking for ${service.title.toLowerCase()} in ${city.name}, ON? Brantford Concrete Forming delivers 32 MPa steel-reinforced results. Free quotes — call 519-914-5697.`;
  return {
    title: title.length > 60 ? title.slice(0, 57) + "..." : title,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | Brantford Concrete Forming`,
      description: description.slice(0, 160),
      images: [{ url: service.image, alt: `${service.title} in ${city.name}, ON` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getCity(citySlug);
  if (!service || !city) notFound();

  const jsonLd = [
    localBusinessSchema(),
    serviceSchema({
      name: `${service.title} in ${city.name}`,
      description: `${service.fullDescription} Serving ${city.name}, ON and surrounding communities.`,
      url: `${site.url}/services/${service.slug}/${city.slug}`,
      city: city.name,
    }),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Services", url: `${site.url}/services` },
      { name: service.title, url: `${site.url}/services/${service.slug}` },
      { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
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
            alt={`${service.title} in ${city.name}, ON`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container-custom py-16 md:py-20">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-white transition-colors">{service.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl">
            {service.title} in {city.name}, ON
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mb-8">{city.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary text-base">Get a Free Quote in {city.name}</Link>
            <a href={site.phoneHref} className="btn border-2 border-white text-white hover:bg-white hover:text-[#1a2332] transition-colors text-base">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332] mb-5">
                Trusted {service.title} Contractor in {city.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                Brantford Concrete Forming provides professional {service.title.toLowerCase()} services throughout {city.name}, ON. {service.fullDescription}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our team is familiar with {city.name}&apos;s local soil conditions, frost depth requirements, and municipal standards. Every project is poured at 32 MPa and reinforced with steel wire mesh or rebar for maximum longevity.
              </p>

              {/* Features */}
              <h3 className="text-xl font-bold text-[#1a2332] mb-4">What&apos;s Included in {city.name}</h3>
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

              <div className="relative rounded-2xl overflow-hidden h-64 mb-8">
                <ImageWithBlur
                  src={service.image}
                  alt={`${service.title} completed project in ${city.name}, ON by Brantford Concrete Forming`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Trust signals */}
              <div className="bg-[#1a2332] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Why {city.name} Homeowners Choose Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  {site.trustBadges.slice(0, 3).map((b) => (
                    <div key={b.label}>
                      <div className="text-2xl font-extrabold text-[#E8751A]">{b.value}</div>
                      <div className="text-slate-300 text-xs mt-1">{b.label}</div>
                    </div>
                  ))}
                </div>
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
