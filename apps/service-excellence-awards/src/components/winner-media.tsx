import type { CSSProperties } from "react";

// Deterministic, restrained accent per category so image-less winners still
// read as intentional design rather than broken images.
const CATEGORY_TINT: Record<string, [string, string]> = {
  "deck-building": ["#7c5e3b", "#a47c4a"],
  "fence-construction": ["#5b6b54", "#7d8f6e"],
  "deck-fence-staining": ["#8a5a2b", "#b67a3c"],
  "retaining-walls": ["#6b5848", "#8d7561"],
  "concrete-finishing": ["#55585c", "#787c82"],
  "concrete-sealing": ["#4b5563", "#6b7280"],
  "foundation-waterproofing": ["#414b59", "#5d6b7d"],
  "roofing": ["#5a4a4a", "#7c6565"],
  "siding": ["#4f5b62", "#6f7d85"],
  "windows-doors": ["#43607a", "#5d83a6"],
  "interior-renovations": ["#6e5a48", "#917a64"],
  "kitchen-remodeling": ["#6b5a44", "#8f7a5c"],
  "basement-finishing": ["#4d4a55", "#6b6678"],
  "flooring": ["#75604a", "#9a8064"],
  "heating-cooling": ["#9a5a3c", "#c47a52"],
  "electrical": ["#7a6a36", "#a08e48"],
  "permanent-outdoor-lighting": ["#3a3550", "#5b5384"],
  "holiday-christmas-lighting": ["#5a2330", "#8a3a4a"],
};

function tint(categorySlug?: string): [string, string] {
  return (categorySlug && CATEGORY_TINT[categorySlug]) || ["#6b5d3e", "#9a8552"];
}

export function initials(name: string): string {
  const words = name.replace(/[^A-Za-z0-9 &]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "★";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Photo thumbnail with a designed monogram fallback when no photo exists. */
export function WinnerThumb({
  name,
  photoUrl,
  categorySlug,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  name: string;
  photoUrl?: string | null;
  categorySlug?: string;
  className?: string;
  aspect?: string;
}) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={`${name} — 2026 Service Excellence Award winner`}
        loading="lazy"
        className={`${aspect} w-full object-cover ${className}`}
      />
    );
  }
  const [a, b] = tint(categorySlug);
  const style: CSSProperties = { background: `linear-gradient(135deg, ${a}, ${b})` };
  return (
    <div
      aria-hidden
      style={style}
      className={`${aspect} w-full ${className} grid place-items-center`}
    >
      <span className="font-serif text-4xl tracking-tight text-white/90">{initials(name)}</span>
    </div>
  );
}

/** Small logo chip; falls back to a gold monogram tile. */
export function WinnerLogo({
  name,
  logoUrl,
  size = "h-12 w-12",
  className = "",
}: {
  name: string;
  logoUrl?: string | null;
  size?: string;
  className?: string;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={`${name} logo`}
        loading="lazy"
        className={`${size} ${className} rounded-md object-contain bg-white`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`${size} ${className} grid place-items-center rounded-md border border-stone-200 bg-[var(--gold-soft)] font-serif text-sm text-[var(--gold)]`}
    >
      {initials(name)}
    </span>
  );
}

export function StarRating({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[var(--gold)] ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M10 1.6l2.47 5.06 5.58.81-4.04 3.94.95 5.56L10 14.9l-4.99 2.62.95-5.56L1.92 7.47l5.58-.81L10 1.6z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}
