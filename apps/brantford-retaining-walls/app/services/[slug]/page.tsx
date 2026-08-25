import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import Link from "next/link";
import gallery from "@/content/gallery.json";

type Props = { params: Promise<{ slug: string }> };

type GalleryItem = (typeof gallery)[number];

// Map each service to the gallery material(s) that best represent it.
// `mix: true` interleaves the listed materials for a varied strip; otherwise
// the primary material is exhausted first before falling back to the next.
const SERVICE_GALLERY: Record<string, { materials: string[]; mix?: boolean }> = {
  "residential-retaining-walls": { materials: ["segmental-block", "timber"], mix: true },
  "armour-stone-installation": { materials: ["armour-stone", "natural-stone", "boulder"] },
  "interlocking-concrete-blocks": { materials: ["segmental-block"] },
  "engineered-commercial-walls": { materials: ["poured-concrete"] },
  "erosion-control-drainage": { materials: ["boulder", "poured-concrete"] },
  "wall-repair-restoration": { materials: ["poured-concrete"] },
};

function getProjectPhotos(slug: string, exclude: string, count = 3): GalleryItem[] {
  const config =
    SERVICE_GALLERY[slug] ??
    { materials: ["segmental-block", "timber", "poured-concrete"], mix: true };
  const pools = config.materials.map((m) =>
    gallery.filter((g) => g.material === m && g.image !== exclude)
  );
  const picked: GalleryItem[] = [];

  if (config.mix) {
    let round = 0;
    while (picked.length < count && pools.some((p) => p.length > round)) {
      for (const pool of pools) {
        if (picked.length >= count) break;
        if (pool[round]) picked.push(pool[round]);
      }
      round++;
    }
  } else {
    for (const pool of pools) {
      for (const item of pool) {
        if (picked.length >= count) break;
        picked.push(item);
      }
      if (picked.length >= count) break;
    }
  }

  return picked.slice(0, count);
}

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Brantford | ${site.name}`,
    description: `${service.shortDescription} Professional ${service.title.toLowerCase()} across Brantford, Paris, Cambridge, and Brant County. Free estimates.`,
  };
}

export const revalidate = 3600;

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();
  const projectPhotos = getProjectPhotos(service.slug, service.image);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow !text-[var(--accent)]">Our Services</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {service.title}
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
                <Image
                  src={service.image}
                  alt={`${service.title} - Professional installation in Brantford, ON`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <p className="text-[var(--concrete)] leading-relaxed mb-6">{service.description}</p>

              <h2 className="font-bold text-lg uppercase tracking-wide text-[var(--charcoal)] mb-4">What&apos;s Included</h2>
              <ul className="space-y-3 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--concrete)]">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {projectPhotos.length > 0 && (
                <>
                  <h2 className="font-bold text-lg uppercase tracking-wide text-[var(--charcoal)] mb-4">
                    Recent {service.title} Projects
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {projectPhotos.map((p) => (
                      <div key={p.image} className="card overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.alt}
                          width={p.width}
                          height={p.height}
                          placeholder="blur"
                          blurDataURL={p.blurDataURL}
                          sizes="(max-width:768px) 100vw, 33vw"
                          className="h-52 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h2 className="font-bold text-lg uppercase tracking-wide text-[var(--charcoal)] mb-4">Service Areas</h2>
              <div className="flex flex-wrap gap-2">
                {areas.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-[var(--surface)] text-[var(--charcoal)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <QuoteForm defaultService={service.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
