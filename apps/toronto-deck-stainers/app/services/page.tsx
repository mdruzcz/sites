import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getProjects, getPosts } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Deck Staining & Restoration Services in Toronto | GTA",
  description: "Professional deck staining, sealing, refinishing, restoration, and fence staining for Toronto & GTA homeowners. 15+ years, 1,500+ decks restored.",
  openGraph: { title: "Deck Services in Toronto & GTA", description: "Full-service deck staining, sealing, refinishing, and restoration across the Greater Toronto Area.", url: `${site.url}/services` },
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();
  const projects = getProjects().slice(0, 4);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Services", url: `${site.url}/services` },
      ])) }} />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Professional Deck Care</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining &amp; Restoration Services in Toronto &amp; GTA
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Expert deck staining, sealing, refinishing, and full restoration for Toronto homeowners.
            Every job backed by 15+ years of experience, premium eco-friendly products, and a satisfaction guarantee.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary">Get a Free Estimate</Link>
            <a href={site.phoneHref} className="btn btn-ghost">{site.phone}</a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {services.map((service, i) => (
              <div key={service.slug} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image}
                      alt={`${service.title} by Toronto Deck Stainers in the GTA`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="eyebrow">Service {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[var(--concrete)] leading-relaxed mb-6">
                    {service.fullDescription.slice(0, 280)}...
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--charcoal)]">
                        <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="btn btn-primary">
                    Learn More About {service.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Recent Projects" title="Latest Work Across the GTA" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {projects.map((p) => (
              <div key={p.slug} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-900)]/80 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/gallery" className="btn btn-outline px-7 py-3">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Blog teasers */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Resources" title="Deck Staining Tips & Guides" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card group overflow-hidden hover:-translate-y-1 transition-transform">
                <div className="relative aspect-[16/9]">
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[var(--accent)] font-semibold mb-2">{post.readTime}</p>
                  <h3 className="font-bold text-[var(--charcoal)] text-sm leading-snug group-hover:text-[var(--accent)] transition-colors">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="btn btn-outline px-7 py-3">View All Posts</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
