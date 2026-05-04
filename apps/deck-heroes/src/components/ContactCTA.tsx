import Link from "next/link";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <section className="bg-wood py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-cream sm:text-4xl">
          Ready to Transform Your Deck?
        </h2>
        <p className="mt-4 text-lg text-cream-dark">
          Get a free, no-obligation quote from our team. We proudly serve
          Southwestern Ontario with expert deck staining and refinishing.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="rounded-lg bg-terracotta px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-terra-dark transition-colors"
          >
            Get Free Quote
          </Link>
          <a
            href={PHONE_HREF}
            className="rounded-lg border-2 border-cream/40 px-8 py-3.5 text-base font-semibold text-cream hover:bg-cream/10 transition-colors"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
