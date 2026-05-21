import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group card overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
        <Image
          src={service.image}
          alt={`${service.title} — Concrete Tilsonburg, Tillsonburg ON`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 w-12 h-12 rounded-lg bg-[var(--charcoal)] flex items-center justify-center">
          <ServiceIcon name={service.icon} className="w-6 h-6 text-[var(--accent)]" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--concrete)] leading-relaxed flex-1">
          {service.shortDescription}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
          Learn more
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
