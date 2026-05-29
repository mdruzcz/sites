import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import {
  getServiceBySlug,
  getServices,
  getServiceAreas,
  getFeaturedTestimonials,
} from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";
import { Star } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServices().map((s) => ({ service: s.slug }));
}

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { service } = await params;
  const svc = getServiceBySlug(service);
  if (!svc) return {};

  return {
    title: `${svc.title} | GTA Christmas Lights`,
    description: svc.shortDescription,
    openGraph: {
      title: `${svc.title} in the GTA`,
      description: svc.shortDescription,
      url: `${site.url}/services/${service}`,
      images: [{ url: svc.image, alt: svc.imageAlt }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const svc = getServiceBySlug(service);
  if (!svc) notFound();

  const areas = getServiceAreas().slice(0, 10);
  const testimonials = getFeaturedTestimonials().slice(0, 3);
  const otherServices = getServices().filter((s) => s.slug !== service).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(svc.title, svc.shortDescription)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: svc.title, url: `${site.url}/services/${service}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--dark-bg)] py-24 md:py-28 overflow-hidden">
        <Image
          src={svc.image}
          alt={svc.imageAlt}
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/55 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Services
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            {svc.title}
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            {svc.shortDescription}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary px-8">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost px-8">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Description + form */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                What you get
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-5"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                {svc.title} — Done Right
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                {svc.longDescription}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Free property review",
                  "Commercial-grade LED lights",
                  "Custom-cut to fit your home",
                  "Programmable dusk/dawn timer",
                  "Season-long maintenance",
                  "Perfect-Until-Christmas-Eve Guarantee",
                  "End-of-season takedown",
                  "Climate-controlled storage",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-[var(--foreground)]"
                  >
                    <CheckCircle className="h-4 w-4 text-[var(--accent)] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Want to talk through your property? Call{" "}
                <a
                  href={site.phoneHref}
                  className="text-[var(--accent)] font-semibold"
                >
                  {site.phone}
                </a>{" "}
                or send us your address using the form.
              </p>
            </div>
            <div className="card p-6">
              <QuoteForm
                heading="Free Quote"
                defaultService={svc.title}
                showPromise
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Reviews
          </p>
          <h2
            className="text-center text-3xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Clients Say
          </h2>
          <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-xs text-white/55">
                  <strong className="text-white/85">{t.author}</strong> ·{" "}
                  {t.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Where We Work
          </p>
          <h2
            className="text-3xl font-bold text-[var(--foreground)] mb-8"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Available Across the GTA
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/services/christmas-light-installation/${a.slug}`}
                className="px-4 py-2 rounded-full text-sm border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {a.city}
              </Link>
            ))}
            <Link
              href="/service-areas"
              className="px-4 py-2 rounded-full text-sm bg-[var(--accent)] text-white"
            >
              + 10 more →
            </Link>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-[var(--dark-bg)] py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-center text-3xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Explore More Services
          </h2>
          <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-dark overflow-hidden group block"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3
                    className="absolute bottom-4 left-4 right-4 text-white font-bold"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {s.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
