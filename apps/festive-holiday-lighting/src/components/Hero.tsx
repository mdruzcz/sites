import { site } from "@/lib/site";
import { PhoneIcon, SparkleIcon, CheckIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Festive bokeh background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 40%, #1A0A0A 100%)" }}>
        {/* Animated bokeh dots */}
        {[
          { top: "15%", left: "8%", size: 120, color: "rgba(178,34,34,0.15)", dur: "6s", delay: "0s" },
          { top: "25%", left: "75%", size: 80, color: "rgba(201,168,76,0.2)", dur: "5s", delay: "1s" },
          { top: "60%", left: "20%", size: 60, color: "rgba(201,168,76,0.15)", dur: "7s", delay: "2s" },
          { top: "70%", left: "85%", size: 100, color: "rgba(178,34,34,0.1)", dur: "4s", delay: "0.5s" },
          { top: "40%", left: "55%", size: 50, color: "rgba(232,197,107,0.12)", dur: "8s", delay: "3s" },
          { top: "80%", left: "45%", size: 90, color: "rgba(178,34,34,0.12)", dur: "5.5s", delay: "1.5s" },
          { top: "10%", left: "40%", size: 70, color: "rgba(201,168,76,0.1)", dur: "6.5s", delay: "2.5s" },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bokeh-dot"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              background: `radial-gradient(circle, ${dot.color} 0%, transparent 70%)`,
              filter: "blur(20px)",
              "--duration": dot.dur,
              "--delay": dot.delay,
            } as React.CSSProperties}
          />
        ))}
        {/* Twinkle light strings */}
        <div className="absolute top-0 left-0 right-0 flex justify-around opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-twinkle"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i % 2 === 0 ? "var(--crimson)" : "var(--gold-bright)",
                marginTop: `${20 + Math.sin(i) * 15}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(201,168,76,0.12)",
              color: "var(--gold-bright)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <SparkleIcon className="w-3.5 h-3.5" />
            Southern Ontario's Holiday Lighting Experts
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-6 text-white">
            Make Your Home or
            <br />
            Business{" "}
            <span className="text-gradient-gold">Sparkle</span>
            <br />
            This Holiday Season
          </h1>

          <p className="text-lg lg:text-xl text-white/75 mb-4 leading-relaxed max-w-xl">
            Professional Christmas light installation and year-round permanent LED systems.
            We design, install, maintain, and store everything — you just enjoy the glow.
          </p>

          <div className="flex flex-wrap gap-2 mb-9">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">🎄 Seasonal Christmas Lights</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">✨ Permanent LED Systems</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">🏠 Residential & Commercial</span>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
              style={{
                background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
                boxShadow: "0 8px 32px rgba(178,34,34,0.5)",
              }}
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white border border-white/25 hover:bg-white/10 backdrop-blur-sm transition-all min-h-11"
            >
              <PhoneIcon className="w-5 h-5" />
              {site.phone}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {site.trustBadges.map((b) => (
              <div key={b.label} className="flex items-start gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "var(--gold-bright)",
                  }}
                >
                  <CheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">{b.label}</p>
                  <p className="text-[11px] text-white/50">{b.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-white/30">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/15" />
      </div>
    </section>
  );
}
