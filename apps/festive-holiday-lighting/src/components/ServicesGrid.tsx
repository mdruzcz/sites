import Link from "next/link";
import { services } from "@/lib/site";
import { ArrowRightIcon } from "./icons";

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            What We Do
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Full-Service Holiday <span className="text-gradient-gold">Lighting Solutions</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From one-time seasonal installs to permanent year-round systems — we handle it all for homes and businesses across Southern Ontario.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group relative rounded-2xl p-7 border transition-all hover:border-[var(--crimson)]/40 hover:bg-white/[0.03]"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-3xl mb-4">{svc.icon}</div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[var(--gold-bright)] transition">
                {svc.name}
              </h3>
              <p className="text-sm text-white/55 mb-4 leading-relaxed">{svc.tagline}</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--crimson-bright)] group-hover:text-[var(--gold-bright)] transition">
                Learn more <ArrowRightIcon className="w-3.5 h-3.5" />
              </div>

              {/* Special badge for permanent lighting */}
              {svc.slug === "permanent-lighting" && (
                <span
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", color: "#fff" }}
                >
                  Year-Round
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
            style={{
              background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
              boxShadow: "0 8px 32px rgba(178,34,34,0.4)",
            }}
          >
            Get a Free Quote for Any Service
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
