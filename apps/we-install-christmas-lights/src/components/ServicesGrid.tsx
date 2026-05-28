import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/site";

export function ServicesGrid() {
  const featured = services.slice(0, 6);
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Our Christmas Lighting Services</p>
          <h2 className="heading-display text-3xl sm:text-4xl mt-3">
            Full-service holiday lighting for homes and businesses
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card group overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-[color:var(--bg-soft)]">
                <Image
                  src={s.image ?? "/images/service-default.jpg"}
                  alt={`${s.name} — by We Install Christmas Lights, London Ontario`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="heading-display text-base text-[color:var(--brand-green)]">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)] leading-relaxed flex-1">
                  {s.description}
                </p>
                <span className="mt-4 text-xs uppercase tracking-widest font-bold text-[color:var(--brand-red)] group-hover:underline">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/service-areas" className="btn btn-outline-green">View all service areas</Link>
        </div>
      </div>
    </section>
  );
}
