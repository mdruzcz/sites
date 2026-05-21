import Link from "next/link";
import Image from "next/image";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <Image
        src="/images/deck-outdoor-living.jpg"
        alt="Beautiful outdoor deck space — contact Deck Heroes for your free quote"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest-dark/85" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
          Get Started Today
        </span>
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ready to Transform Your Deck?
        </h2>
        <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
          Get a free, no-obligation quote from our team. We proudly serve
          Southwestern Ontario with expert deck staining and refinishing.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="rounded-lg bg-terracotta px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-terra-dark transition-colors"
          >
            Get Your Free Quote
          </Link>
          <a
            href={PHONE_HREF}
            className="rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
