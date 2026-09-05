import Link from "next/link";
import { BEFORE_AFTER, photo } from "@/lib/photos";
import { BeforeAfter } from "./BeforeAfter";

export function BeforeAfterSection({ limit = 2, showLink = true }: { limit?: number; showLink?: boolean }) {
  const pairs = BEFORE_AFTER.slice(0, limit);
  return (
    <section className="bg-white">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow-pill moss">Before &amp; after</p>
            <h2 className="font-display h2-fluid mt-4">Same concrete, one visit later.</h2>
          </div>
          {showLink && <Link href="/gallery" className="btn-outline btn-sm">See all projects</Link>}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {pairs.map((p) => (
            <BeforeAfter key={p.before} before={photo(p.before)} after={photo(p.after)} title={p.title} city={p.city} finish={p.finish} />
          ))}
        </div>
      </div>
    </section>
  );
}
