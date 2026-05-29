import Link from "next/link";
import type { Kit } from "@/lib/kits";
import { formatCad } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";

export function KitCard({ kit }: { kit: Kit }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-[var(--color-line)] bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/kits/${kit.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-warm)]">
          <KitPlaceholder shape={kit.shape ?? "Kit"} />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink)]">
            {kit.shape}
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            {kit.pieces} pieces
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <Link href={`/kits/${kit.slug}`} className="block">
            <h3 className="font-display text-2xl leading-tight group-hover:text-[var(--color-accent)]">
              {kit.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{kit.tagline}</p>
        </div>
        <p className="text-sm text-[var(--color-ink-soft)] line-clamp-2">{kit.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">Package price</p>
            <p className="font-display text-3xl leading-none">{formatCad(kit.price_cad)}</p>
            <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">CAD · pickup in Belmont</p>
          </div>
          <div className="flex flex-col gap-2">
            <AddToCartButton slug={kit.slug} className="btn-primary !px-4 !py-2.5 text-sm" label="Add to Cart" />
            <Link href={`/kits/${kit.slug}`} className="text-center text-xs font-medium text-[var(--color-ink-soft)] underline-offset-4 hover:underline">
              See what&rsquo;s included →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function KitPlaceholder({ shape }: { shape: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f1ea" />
            <stop offset="100%" stopColor="#e6e1d8" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#bg)" />
        <KitShapeIllustration shape={shape} />
      </svg>
    </div>
  );
}

function KitShapeIllustration({ shape }: { shape: string }) {
  const cab = "#ffffff";
  const cabStroke = "#c7bfae";
  const counter = "#3a4252";
  const wall = "#dad1be";

  if (shape === "Single Wall") {
    return (
      <g>
        <rect x="40" y="60" width="320" height="50" fill={wall} />
        <rect x="50" y="80" width="60" height="30" fill={cab} stroke={cabStroke} />
        <rect x="115" y="80" width="60" height="30" fill={cab} stroke={cabStroke} />
        <rect x="180" y="80" width="80" height="30" fill={cab} stroke={cabStroke} />
        <rect x="265" y="80" width="90" height="30" fill={cab} stroke={cabStroke} />
        <rect x="40" y="200" width="320" height="8" fill={counter} />
        <rect x="50" y="208" width="60" height="60" fill={cab} stroke={cabStroke} />
        <rect x="115" y="208" width="80" height="60" fill={cab} stroke={cabStroke} />
        <rect x="200" y="208" width="60" height="60" fill={cab} stroke={cabStroke} />
        <rect x="265" y="208" width="90" height="60" fill={cab} stroke={cabStroke} />
      </g>
    );
  }
  if (shape === "Galley") {
    return (
      <g>
        <rect x="40" y="50" width="320" height="40" fill={wall} />
        <rect x="50" y="60" width="70" height="30" fill={cab} stroke={cabStroke} />
        <rect x="125" y="60" width="100" height="30" fill={cab} stroke={cabStroke} />
        <rect x="230" y="60" width="70" height="30" fill={cab} stroke={cabStroke} />
        <rect x="305" y="60" width="50" height="30" fill={cab} stroke={cabStroke} />
        <rect x="40" y="125" width="320" height="6" fill={counter} />
        <rect x="50" y="131" width="60" height="38" fill={cab} stroke={cabStroke} />
        <rect x="115" y="131" width="100" height="38" fill={cab} stroke={cabStroke} />
        <rect x="220" y="131" width="60" height="38" fill={cab} stroke={cabStroke} />
        <rect x="285" y="131" width="70" height="38" fill={cab} stroke={cabStroke} />
        <rect x="40" y="200" width="320" height="6" fill={counter} />
        <rect x="50" y="206" width="80" height="38" fill={cab} stroke={cabStroke} />
        <rect x="135" y="206" width="60" height="38" fill={cab} stroke={cabStroke} />
        <rect x="200" y="206" width="100" height="38" fill={cab} stroke={cabStroke} />
        <rect x="305" y="206" width="50" height="38" fill={cab} stroke={cabStroke} />
      </g>
    );
  }
  if (shape === "L-Shape") {
    return (
      <g>
        <rect x="40" y="60" width="220" height="40" fill={wall} />
        <rect x="50" y="70" width="60" height="30" fill={cab} stroke={cabStroke} />
        <rect x="115" y="70" width="70" height="30" fill={cab} stroke={cabStroke} />
        <rect x="190" y="70" width="60" height="30" fill={cab} stroke={cabStroke} />
        <rect x="40" y="140" width="220" height="6" fill={counter} />
        <rect x="260" y="60" width="6" height="200" fill={counter} />
        <rect x="50" y="146" width="60" height="50" fill={cab} stroke={cabStroke} />
        <rect x="115" y="146" width="70" height="50" fill={cab} stroke={cabStroke} />
        <rect x="190" y="146" width="60" height="50" fill={cab} stroke={cabStroke} />
        <rect x="200" y="200" width="50" height="50" fill={cab} stroke={cabStroke} />
        <rect x="266" y="60" width="40" height="200" fill={cab} stroke={cabStroke} />
      </g>
    );
  }
  if (shape === "L-Shape + Island") {
    return (
      <g>
        <rect x="20" y="50" width="200" height="40" fill={wall} />
        <rect x="30" y="60" width="50" height="30" fill={cab} stroke={cabStroke} />
        <rect x="85" y="60" width="65" height="30" fill={cab} stroke={cabStroke} />
        <rect x="155" y="60" width="60" height="30" fill={cab} stroke={cabStroke} />
        <rect x="20" y="125" width="200" height="6" fill={counter} />
        <rect x="220" y="50" width="6" height="120" fill={counter} />
        <rect x="30" y="131" width="50" height="40" fill={cab} stroke={cabStroke} />
        <rect x="85" y="131" width="65" height="40" fill={cab} stroke={cabStroke} />
        <rect x="155" y="131" width="60" height="40" fill={cab} stroke={cabStroke} />
        <rect x="226" y="50" width="50" height="120" fill={cab} stroke={cabStroke} />
        <rect x="120" y="220" width="200" height="40" fill={cab} stroke={cabStroke} />
        <rect x="120" y="215" width="200" height="5" fill={counter} />
        <line x1="160" y1="220" x2="160" y2="260" stroke={cabStroke} />
        <line x1="200" y1="220" x2="200" y2="260" stroke={cabStroke} />
        <line x1="240" y1="220" x2="240" y2="260" stroke={cabStroke} />
        <line x1="280" y1="220" x2="280" y2="260" stroke={cabStroke} />
      </g>
    );
  }
  if (shape === "U-Shape") {
    return (
      <g>
        <rect x="40" y="50" width="40" height="200" fill={cab} stroke={cabStroke} />
        <rect x="320" y="50" width="40" height="200" fill={cab} stroke={cabStroke} />
        <rect x="80" y="50" width="240" height="6" fill={counter} />
        <rect x="80" y="50" width="240" height="40" fill={wall} />
        <rect x="90" y="60" width="50" height="30" fill={cab} stroke={cabStroke} />
        <rect x="145" y="60" width="60" height="30" fill={cab} stroke={cabStroke} />
        <rect x="210" y="60" width="50" height="30" fill={cab} stroke={cabStroke} />
        <rect x="265" y="60" width="50" height="30" fill={cab} stroke={cabStroke} />
        <rect x="80" y="200" width="240" height="6" fill={counter} />
        <rect x="90" y="206" width="60" height="44" fill={cab} stroke={cabStroke} />
        <rect x="155" y="206" width="50" height="44" fill={cab} stroke={cabStroke} />
        <rect x="210" y="206" width="60" height="44" fill={cab} stroke={cabStroke} />
        <rect x="275" y="206" width="40" height="44" fill={cab} stroke={cabStroke} />
      </g>
    );
  }
  return null;
}
