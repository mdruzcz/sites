import Link from "next/link";
import type { Service } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group card overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Colour-block top instead of an image (placeholder until real images added) */}
      <div className="relative h-48 overflow-hidden bg-[var(--surface)] flex items-center justify-center">
        <div className="absolute inset-0 bg-[var(--charcoal)] opacity-5 group-hover:opacity-10 transition-opacity" />
        <div className="w-20 h-20 rounded-full bg-[var(--charcoal)]/8 flex items-center justify-center">
          <ServiceIcon name={service.icon} className="w-10 h-10 text-[var(--charcoal)]/30" />
        </div>
        <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
          {service.slug.includes("deck") ? "Decks" : "Fences"}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-lg uppercase tracking-wide text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--concrete)] leading-relaxed flex-1">
          {service.shortDescription}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
          Learn more
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
