import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-navy py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="h-display text-2xl sm:text-3xl text-white mb-4">
          Ready to Make Your Basement Legal?
        </h2>
        <p className="text-slate-300 mb-8 text-lg">
          Get a free consultation and site assessment. We&apos;ll evaluate your basement&apos;s
          potential and provide a detailed, no-obligation quote.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn btn-primary">
            Get a Free Consultation
          </Link>
          <a href={site.phoneHref} className="btn btn-ghost">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
