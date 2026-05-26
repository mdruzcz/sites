import Link from "next/link";
import { SmartphoneIcon, CheckIcon } from "./icons";

const features = [
  "App-controlled from your phone — change colours in seconds",
  "16 million+ colour options: Christmas red/green, Halloween orange, team colours, any occasion",
  "Installed once, lasts a lifetime — no more climbing ladders every season",
  "Weatherproof hardware rated for Canadian winters",
  "Programmable schedules — set it and forget it",
  "No visible hardware during the day — discreet roofline channels",
  "Lifetime warranty on all installed hardware",
  "Pairs perfectly with our seasonal Christmas programs",
];

export function PermanentLightsSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: "var(--night)" }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(178,34,34,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: "rgba(178,34,34,0.15)", color: "var(--crimson-bright)", border: "1px solid rgba(178,34,34,0.3)" }}
            >
              ✨ New Service
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Permanent Lights —{" "}
              <span className="text-gradient-festive">One Install,</span>
              <br />
              Every Occasion Forever
            </h2>

            <p className="text-lg text-white/65 mb-8 leading-relaxed">
              Imagine changing your home's lights for Christmas, Halloween, Canada Day, birthdays, and playoff games — all from your phone, in seconds. Smart RGBW LED lights installed permanently in your roofline. No ladders, no tangles, no annual install fees.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(178,34,34,0.2)", color: "var(--crimson-bright)" }}
                  >
                    <CheckIcon className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-white/75">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/services/permanent-lighting"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
                style={{
                  background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
                  boxShadow: "0 8px 32px rgba(178,34,34,0.4)",
                }}
              >
                See Permanent Lighting
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition min-h-11"
              >
                Get a Quote
              </a>
            </div>
          </div>

          {/* Visual representation */}
          <div className="relative">
            <div
              className="rounded-2xl p-8 border"
              style={{
                background: "linear-gradient(135deg, rgba(31,10,10,0.8) 0%, rgba(20,10,30,0.8) 100%)",
                borderColor: "rgba(178,34,34,0.25)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}
                >
                  <SmartphoneIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Smart App Control</p>
                  <p className="text-xs text-white/50">Control from anywhere</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Christmas Mode", color: "#B22222", active: true },
                  { label: "Halloween Orange", color: "#FF8C00", active: false },
                  { label: "Canada Day", color: "#D52B1E", active: false },
                  { label: "Team Blue", color: "#003F7D", active: false },
                  { label: "Custom Colour", color: "linear-gradient(90deg,#ff0,#0f0,#00f,#f0f)", active: false },
                ].map((mode) => (
                  <div
                    key={mode.label}
                    className="flex items-center justify-between p-3 rounded-xl transition"
                    style={{
                      backgroundColor: mode.active ? "rgba(178,34,34,0.2)" : "rgba(255,255,255,0.05)",
                      border: mode.active ? "1px solid rgba(178,34,34,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ background: mode.color }}
                      />
                      <span className="text-sm text-white/80">{mode.label}</span>
                    </div>
                    {mode.active && (
                      <span className="text-[10px] font-bold text-[var(--crimson-bright)] uppercase tracking-wider">Active</span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <p className="text-xs font-semibold text-[var(--gold-bright)] uppercase tracking-wider mb-1">Lifetime Warranty</p>
                <p className="text-sm text-white/65">All hardware permanently installed & guaranteed</p>
              </div>
            </div>

            {/* Glow behind card */}
            <div
              className="absolute -inset-4 -z-10 opacity-30 blur-3xl rounded-2xl"
              style={{ background: "radial-gradient(ellipse, rgba(178,34,34,0.4) 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
