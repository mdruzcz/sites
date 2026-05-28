import type { Metadata } from "next";
import Link from "next/link";
import { OurKitchensGallery } from "@/components/our-kitchens-gallery";
import { getOurKitchens } from "@/lib/our-kitchens";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchens We've Built — Real Forever Cabinets Installs",
  description:
    "Browse photos of real kitchens built with Forever Cabinets White Shaker — plywood boxes, painted birch & MDF doors, 36″ wall cabinets, soft-close hardware.",
  alternates: { canonical: "/our-kitchens" },
};

export default function OurKitchensPage() {
  const photos = getOurKitchens();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-navy)]">Kitchens We&rsquo;ve Built</span>
      </nav>

      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Real installs
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
          Kitchens we&rsquo;ve built.
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          {photos.length > 0
            ? `${photos.length} ${photos.length === 1 ? "kitchen" : "kitchens"} built with Forever Cabinets — White Shaker, plywood box, 36″ wall cabinets as standard.`
            : "Customer install photos are coming soon. In the meantime, browse the catalog or build a kitchen with the visualizer."}
        </p>
      </header>

      {photos.length > 0 ? (
        <OurKitchensGallery variant="full" heading="" blurb="" />
      ) : (
        <div className="border border-dashed border-[var(--color-line)] bg-[var(--color-sandstone-soft)] p-12 text-center">
          <p className="font-display text-2xl text-[var(--color-navy)]">No photos yet.</p>
          <p className="mx-auto mt-3 max-w-md text-[var(--color-ink-soft)]">
            We&rsquo;re building a gallery of customer kitchens. Be one of the first — order today and we&rsquo;ll feature your install.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/visualizer" className="btn-primary">Build your kitchen</Link>
            <Link href="/cabinets" className="btn-secondary">Browse the catalog</Link>
          </div>
        </div>
      )}
    </div>
  );
}
