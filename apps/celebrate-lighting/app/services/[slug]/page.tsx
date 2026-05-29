import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Celebrate Lighting`,
    description: `${service.shortDescription} Serving ${site.serviceAreas.slice(0, 3).join(", ")} and more. Call ${site.phone} for a free quote.`,
    openGraph: {
      title: `${service.title} | Celebrate Lighting`,
      description: service.shortDescription,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();
  const allServices = getServices();
  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Services", url: `${site.url}/services` },
        { name: service.title, url: `${site.url}/services/${service.slug}` },
      ])) }} />

      {/* Hero */}
      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-[var(--accent)]">Services</Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-eyebrow mb-3">Our Services</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-6">{service.title}</h1>
              <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">{service.fullDescription}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--foreground)]">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-xl text-sm" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
                <strong className="text-[var(--foreground)]">Available in:</strong>{" "}
                {areas.cities.map((c, i) => (
                  <span key={c.slug}>
                    <Link href={`/services/${service.slug}/${c.slug}`} className="text-[var(--accent)] hover:underline font-medium">{c.name}</Link>
                    {i < areas.cities.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-8">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Get a Free Quote for {service.title}</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Other Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card p-6 hover:shadow-md transition-shadow group">
                  <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">{s.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{s.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
