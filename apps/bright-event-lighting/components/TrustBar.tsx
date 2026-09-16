import { Star } from "lucide-react";
import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="bg-[var(--surface)] border-y border-[var(--border)] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]"
                />
              ))}
            </div>
            <span>
              {site.googleRating}/5 on Google ({site.googleReviewCount}+ reviews)
            </span>
          </div>
          {site.trustBadges.slice(1).map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-semibold">{badge.value}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
