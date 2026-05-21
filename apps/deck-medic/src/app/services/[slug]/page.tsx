import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services, getServiceBySlug } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `${site.url}/services/${s.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `${site.url}/services/${s.slug}`,
      images: [{ url: s.image, width: 1024, height: 1024, alt: s.imageAlt }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    image: `${site.url}${s.image}`,
    url: `${site.url}/services/${s.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      url: site.url,
      address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
    },
    areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Script id="ld-service" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        <NavBar />

        {/* Hero */}
        <section className="pt-28 pb-0 lg:pt-36" style={{ background: "var(--off-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--slate-muted)" }}>
              <Link href="/" className="hover:text-[var(--blue)] transition">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[var(--blue)] transition">Services</Link>
              <span>/</span>
              <span style={{ color: "var(--slate)" }}>{s.name}</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Professional Service</p>
                <h1 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "var(--slate)" }}>
                  {s.name}
                </h1>
                <p className="text-lg font-semibold mb-4" style={{ color: "var(--blue)" }}>{s.shortDesc}</p>
                <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--slate-muted)" }}>{s.description}</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-lg min-h-11"
                  style={{ background: "var(--blue)" }}
                >
                  Get a Free Estimate
                </a>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image src={s.image} alt={s.imageAlt} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>What You Get</p>
                <h2 className="font-display text-3xl font-extrabold mb-8 leading-tight" style={{ color: "var(--slate)" }}>Key Benefits</h2>
                <ul className="space-y-4">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--blue)" }}>
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-base leading-relaxed" style={{ color: "var(--slate-light)" }}>{b}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>How It Works</p>
                <h2 className="font-display text-3xl font-extrabold mb-8 leading-tight" style={{ color: "var(--slate)" }}>Our Process</h2>
                <ol className="space-y-4">
                  {s.process.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm"
                        style={{ background: "var(--blue-pale)", color: "var(--blue)" }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-base leading-relaxed pt-1" style={{ color: "var(--slate-light)" }}>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {s.faqs.length > 0 && (
          <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>FAQ</p>
                <h2 className="font-display text-3xl font-extrabold leading-tight" style={{ color: "var(--slate)" }}>
                  Common Questions About {s.name}
                </h2>
              </div>
              <div className="space-y-4">
                {s.faqs.map((faq) => (
                  <div key={faq.q} className="rounded-2xl p-7 border" style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}>
                    <h3 className="font-semibold mb-3" style={{ color: "var(--slate)" }}>{faq.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--slate-muted)" }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other services */}
        <section className="py-16" style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold mb-8" style={{ color: "var(--slate)" }}>Other Services</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {services.filter((other) => other.slug !== s.slug).slice(0, 3).map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group rounded-xl overflow-hidden border transition-all hover:shadow-lg"
                  style={{ borderColor: "var(--light-grey)" }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={other.image} alt={other.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-1 group-hover:text-[var(--blue)] transition" style={{ color: "var(--slate)" }}>{other.name}</h3>
                    <p className="text-sm" style={{ color: "var(--slate-muted)" }}>{other.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <Contact />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
