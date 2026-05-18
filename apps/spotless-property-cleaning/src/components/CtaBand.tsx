import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-slate-900 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="h-display text-2xl sm:text-3xl text-white mb-4">
          Ready for a Spotless Property?
        </h2>
        <p className="text-slate-400 mb-8 text-lg">
          Don&apos;t let dirt, mould, and grime drag down your property&apos;s appearance.
          Contact Spotless Property Cleaning today for a free estimate on pressure washing,
          exterior cleaning, and more.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn btn-primary">
            Request Free Quote
          </Link>
          <a href={site.phoneHref} className="btn btn-ghost">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
