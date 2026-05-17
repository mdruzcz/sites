import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-[var(--wood-dark)] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="h-display text-2xl sm:text-3xl text-white mb-4">
          Ready to Transform Your Deck?
        </h2>
        <p className="text-stone-300 mb-8 text-lg">
          Get a free on-site quote. We&apos;ll assess your wood, recommend the right stain, and provide a transparent price.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn btn-primary">
            Get a Free Quote
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-ghost">
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
