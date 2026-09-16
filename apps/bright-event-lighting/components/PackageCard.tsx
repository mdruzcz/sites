import Link from "next/link";
import { Check } from "lucide-react";
import { Pic } from "@/components/Pic";
import type { Package } from "@/lib/content";

export function PackageCard({ pkg, compact = false }: { pkg: Package; compact?: boolean }) {
  const featured = "featured" in pkg && pkg.featured;
  return (
    <article
      id={pkg.slug}
      className={`card overflow-hidden flex flex-col scroll-mt-24 ${featured ? "border-[var(--accent)]/60 ring-1 ring-[var(--accent)]/30" : ""}`}
    >
      <div className="relative aspect-[16/10] bg-[var(--surface)]">
        <Pic src={pkg.image} alt={pkg.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        {featured && !compact && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0F0F10]">
            Most popular
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="text-xl font-bold text-[var(--foreground)]">{pkg.name}</h3>
          <span className="text-[var(--accent)] font-semibold whitespace-nowrap">{pkg.priceLabel}</span>
        </div>
        <p className="text-sm text-[var(--muted)] italic mb-4">{pkg.tagline}</p>
        {!compact && (
          <ul className="space-y-2 mb-5 text-sm text-[var(--muted)]">
            {pkg.includes.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-[var(--muted)]/70 mb-5">
          <span className="text-[var(--foreground)]/80 font-medium">Ideal for:</span> {pkg.idealFor}
        </p>
        <Link href={`/contact?package=${pkg.slug}`} className="btn btn-primary justify-center min-h-[44px] mt-auto">
          Check My Date
        </Link>
      </div>
    </article>
  );
}
