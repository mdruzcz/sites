import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="img-card group aspect-[4/3] block"
      aria-label={`${service.title} — learn more`}
    >
      <Image
        src={service.image}
        alt={`${service.title} — Concrete Tilsonburg, Tillsonburg ON`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient overlay */}
      <div className="img-card-overlay" aria-hidden="true" />

      {/* Icon badge */}
      <div className="absolute top-4 left-4 w-11 h-11 rounded-lg bg-[var(--accent)] flex items-center justify-center shadow-lg z-10">
        <ServiceIcon name={service.icon} className="w-5 h-5 text-white" />
      </div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-bold text-lg text-white leading-snug mb-1 group-hover:text-[var(--accent)] transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-white/75 leading-snug line-clamp-2">
          {service.shortDescription}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-wide">
          Learn more
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
