import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function CtaBand() {
  return (
    <section
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 50%, var(--amber) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-[var(--night-deep)] mb-2 leading-tight">
              Ready to Light Up Your Home Year-Round?
            </h2>
            <p className="text-[var(--night-deep)]/80 text-lg">
              Get your free consultation today. No pressure, no obligation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-[var(--gold-bright)] bg-[var(--night-deep)] hover:bg-[var(--night)] transition-all hover:scale-105 hover:shadow-xl min-h-11"
            >
              Book Free Consultation
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[var(--night-deep)] border-2 border-[var(--night-deep)] hover:bg-[var(--night-deep)]/10 transition-all min-h-11"
            >
              <PhoneIcon className="w-5 h-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
