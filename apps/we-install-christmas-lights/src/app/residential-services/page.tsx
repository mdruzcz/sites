import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services, site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Residential Christmas Light Services | We Install Christmas Lights",
  description:
    "Full-service residential Christmas light installation, design, maintenance, takedown and year-long storage. London ON and South-Western Ontario.",
  alternates: { canonical: `${site.url}/residential-services` },
};

export default function ResidentialServices() {
  const residential = services.filter((s) => s.category === "residential" || s.category === "addon");
  return (
    <>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Residential Services</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Holiday Lighting for Your Home</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            Custom-cut professional LED lighting for your roofline, trees, hedges, and yard — design, install, maintain, takedown, store.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {residential.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card overflow-hidden group">
              <div className="relative h-44 bg-[color:var(--bg-soft)]">
                <Image
                  src={s.image ?? "/images/service-default.jpg"}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="heading-display text-base text-[color:var(--brand-green)]">{s.name}</h3>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
