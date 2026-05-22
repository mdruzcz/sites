import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card group overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} - Retaining wall service in Brantford, ON`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--concrete)] leading-relaxed line-clamp-2">
          {service.shortDescription}
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--accent)] mt-3">
          Learn More
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
