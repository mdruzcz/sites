import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="img-card group block h-64 sm:h-72"
    >
      <Image
        src={service.image}
        alt={service.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="img-card-overlay" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-1">
          Concrete Sealing
        </p>
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{service.title}</h3>
        <p className="text-white/70 text-sm leading-snug line-clamp-2">{service.shortDescription}</p>
        <p className="text-[var(--accent)] text-xs font-semibold mt-2 group-hover:underline">
          Learn more →
        </p>
      </div>
    </Link>
  );
}
