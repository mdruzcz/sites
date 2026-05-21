import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content";

type Props = {
  service: Service;
};

export function ServiceCard({ service }: Props) {
  return (
    <div className="card overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden bg-[var(--surface)]">
        <Image
          src={service.image}
          alt={`${service.title} by Total Brantford Concrete in Brantford, ON`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2 uppercase tracking-tight">{service.title}</h3>
        <p className="text-sm text-[var(--concrete)] leading-relaxed mb-4">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug}`}
          className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:text-[var(--accent-600)] flex items-center gap-1.5 transition-colors"
        >
          Learn More
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
