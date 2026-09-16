import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ServiceIcon } from "@/components/icons";
import type { Service } from "@/lib/content";

export function ServiceCard({ service, city }: { service: Service; city?: { slug: string; name: string } }) {
  const href = city ? `/services/${service.slug}/${city.slug}` : `/services/${service.slug}`;
  return (
    <Link href={href} className="card overflow-hidden group flex flex-col hover:border-[var(--accent)]/40 transition-colors">
      <div className="relative aspect-[4/3] bg-[var(--surface)]">
        <Pic
          src={service.image}
          alt={city ? `${service.title} in ${city.name}, Ontario` : undefined}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F0F10]/80 text-[var(--accent)] backdrop-blur">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[var(--foreground)] text-lg mb-2">{service.title}</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">{service.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[var(--accent)] font-semibold">From ${service.startingAt.toLocaleString("en-CA")}</span>
          <span className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">Details →</span>
        </div>
      </div>
    </Link>
  );
}
