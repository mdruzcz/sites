import Link from "next/link";
import { getCities } from "@/lib/content";

export function AreasMarquee() {
  const cities = getCities();
  const items = [...cities, ...cities];
  return (
    <div className="overflow-hidden border-y border-[var(--line-dark)] bg-[var(--orange)] py-3 text-white">
      <div className="marquee gap-10 px-5">
        {items.map((c, i) => (
          <Link key={`${c.slug}-${i}`} href={`/service-areas/${c.slug}`} className="font-display flex items-center gap-10 whitespace-nowrap text-lg font-bold uppercase tracking-[0.2em] hover:underline">
            {c.city}<span aria-hidden className="size-1.5 rounded-full bg-white/70" />
          </Link>
        ))}
      </div>
    </div>
  );
}
