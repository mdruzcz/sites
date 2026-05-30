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
    title: service.title,
    description: `Professional ${service.title.toLowerCase()} across Southwestern Ontario — permanent app-controlled LED lighting with a lifetime warranty. Call ${site.phone}.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Celebrate Lighting`,
      description: service.shortDescription,
      url: `${site.url}/services/${service.slug}`,
      images: [{ url: "/images/hero-main.jpg", alt: `${service.title} — permanent LED lighting by Celebrate Lighting` }],
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

      {/* In-depth content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 text-[var(--muted)] leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
            Why Choose Celebrate Lighting for {service.title}
          </h2>
          <p>
            {service.title} is more than a quick add-on — it&apos;s a permanent
            improvement to your home that you&apos;ll use every night of the year. Our
            team approaches every {service.title.toLowerCase()} project the same way:
            licensed, insured electricians, commercial-grade IP67 LED components rated to
            −40&deg;C, and a clean, colour-matched track that disappears into your soffit
            and fascia. Nothing about the finished result looks bolted-on or temporary.
          </p>
          <p>
            Because our systems are app-controlled over WiFi, your {service.title.toLowerCase()}{" "}
            gives you 16&nbsp;million-plus colours, custom scenes, and full scheduling from
            your phone. Warm white for everyday curb appeal, team colours on game day,
            orange and purple for Halloween, the full spectrum for the holidays — all
            without ever touching a ladder again. And every installation is backed by our
            comprehensive lifetime warranty covering LED modules, mounting hardware, and
            workmanship.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight pt-2">
            What to Expect
          </h2>
          <p>
            We start with a free, no-obligation consultation: a lighting specialist visits
            your property, takes measurements, colour-matches your soffit and fascia, and
            provides a transparent, itemized quote. Once you approve, our certified
            technicians complete most residential installations in one to two days with
            clean, concealed cable routing. Before we leave, we configure your mobile app,
            walk you through every control, and make sure you&apos;re comfortable running
            your new system. From first call to a fully lit home, most projects wrap up
            within the same week.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight pt-2">
            Built for Southwestern Ontario
          </h2>
          <p>
            From the freeze-thaw swings of a London winter to the humid summers across
            Oxford and Waterloo Region, our {service.title.toLowerCase()} systems are built
            for the local climate. We serve {areas.cities.map((c) => c.name).slice(0, -1).join(", ")} and{" "}
            {areas.cities[areas.cities.length - 1]?.name}, and we know the homes and
            architecture in each community. Whether you have a century brick home or a new
            build, we tailor the {service.title.toLowerCase()} to your property and your
            vision — and we stand behind it for life.
          </p>
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
