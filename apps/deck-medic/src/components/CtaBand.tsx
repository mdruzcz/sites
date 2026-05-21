import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: "var(--slate)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
          Ready to Restore Your View?
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Join hundreds of homeowners who trust Deck Medic for their wood preservation needs.
          Contact us today for a no-obligation estimate.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/contact"
            className="px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-2xl min-h-11 flex items-center"
            style={{ background: "var(--blue)" }}
          >
            Request a Free Quote
          </a>
          <a
            href={site.phoneHref}
            className="px-8 py-4 rounded-full font-bold text-white text-base border border-white/30 hover:bg-white/10 transition-all min-h-11 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01L6.62 10.79z" />
            </svg>
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
