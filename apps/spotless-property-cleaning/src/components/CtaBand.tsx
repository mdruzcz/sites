import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative bg-navy-deep py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="dotted-divider w-full h-full" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="h-display text-2xl sm:text-3xl text-white mb-2">
          Your property deserves better.
        </h2>
        <p className="font-display italic text-[var(--accent-light)] text-xl sm:text-2xl mb-8">
          Let&apos;s make it spotless.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn btn-primary px-8 py-4">
            Get a Free Estimate
          </Link>
          <a href={site.phoneHref} className="btn btn-ghost px-8 py-4">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
