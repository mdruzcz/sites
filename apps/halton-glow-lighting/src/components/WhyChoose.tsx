import {
  ShieldIcon,
  PaletteIcon,
  PhoneAppIcon,
  CheckIcon,
  SunIcon,
  CloudRainIcon,
} from "./icons";

const features = [
  {
    icon: ShieldIcon,
    title: "Convenience & Safety",
    desc: "Never waste time or risk your safety climbing ladders to install lights again. Our permanent system is always ready when you are.",
  },
  {
    icon: PaletteIcon,
    title: "Endless Customization",
    desc: "Change colors to suit any occasion — pink for Valentine's Day, green for St. Patrick's, your team's colors on game day, or warm white for everyday curb appeal.",
  },
  {
    icon: PhoneAppIcon,
    title: "Smart App Control",
    desc: "Run your entire lighting system from your phone — Wi-Fi connected, with millions of colors, scenes and automatic schedules at your fingertips.",
  },
  {
    icon: CheckIcon,
    title: "Seamless Integration",
    desc: "Our LED tracks are color-matched to your soffit and tucked under the trim, so by daylight you barely notice they're there.",
  },
  {
    icon: SunIcon,
    title: "Year-Round Beauty",
    desc: "From Christmas lights to summer accent glow, your home looks polished every season — no boxes to dig out, no ladder weekend lost.",
  },
  {
    icon: CloudRainIcon,
    title: "Built for Canadian Weather",
    desc: "IP67 waterproof, UV-protected, and rated for -40 °C operation. Designed specifically for the Halton Region's snow, ice and humidity.",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="relative py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(31,40,73,0.6) 0%, rgba(5,8,22,1) 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Why Choose Halton Glow
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Premium Permanent Lighting
            <br />
            <span className="text-gradient-gold">Done Right</span>
          </h2>
          <p className="text-lg text-white/65">
            Six reasons homeowners across Burlington and Oakville choose
            Halton Glow for year-round outdoor lighting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-7 rounded-2xl border transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245,194,107,0.18), rgba(232,163,61,0.08))",
                  border: "1px solid rgba(245,194,107,0.25)",
                  color: "var(--gold-bright)",
                }}
              >
                <f.icon />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
