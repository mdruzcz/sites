import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-[var(--accent)] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
          Ready to Start Your Project?
        </h2>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          Don&apos;t wait for erosion to damage your property. Contact us today for a free, no-obligation estimate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn bg-white text-[var(--accent)] border-2 border-white hover:bg-white/90">
            Get a Free Consultation
          </Link>
          <a href={site.phoneHref} className="btn btn-outline-white">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
