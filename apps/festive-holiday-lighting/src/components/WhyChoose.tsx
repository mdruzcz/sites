import { site } from "@/lib/site";
import { CheckIcon, ShieldIcon } from "./icons";

const reasons = [
  {
    icon: "🛡️",
    title: "No Risk — We Handle Everything",
    body: "Forget tangled lights, icy ladders, and blown fuses. We design, install, maintain, and remove your seasonal display. You keep two feet on the ground.",
  },
  {
    icon: "🏆",
    title: "Award-Winning Displays",
    body: "Cameron Blancher's customers have won awards for their Christmas tree wraps. When quality matters, experience matters — and we have 10+ years of it.",
  },
  {
    icon: "🚛",
    title: "Commercial-Grade Equipment",
    body: "We use high ladders, JLG and Genie boom trucks, and boom lifts. No job is too tall, too complex, or too large for our fully equipped crews.",
  },
  {
    icon: "📋",
    title: "All Materials Supplied",
    body: "We bring everything — lights, clips, extension cords, timers. You supply nothing. We install the highest-quality LED products that outlast anything from the hardware store.",
  },
  {
    icon: "🔧",
    title: "Mid-Season Maintenance",
    body: "We check on your display mid-season to fix any outages. If a bulb or section goes dark, we're back on-site. Your lights stay bright from Remembrance Day to Epiphany.",
  },
  {
    icon: "📦",
    title: "Takedown & Organized Storage",
    body: "After the holidays, we carefully take everything down and store it properly — labelled and ready for next year. No more tangled mess in the garage.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--night-deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--crimson-bright)" }}>
            Why Choose Festive
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            The Smarter Way to{" "}
            <span className="text-gradient-gold">Light Up the Holidays</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {site.yearsExperience}+ years of experience, {site.googleRating}-star reviews, and a founder who treats every install like it's his own home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="p-7 rounded-2xl border"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="text-3xl mb-4">{r.icon}</div>
              <h3 className="font-display text-base font-bold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        {/* Social proof strip */}
        <div
          className="mt-12 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(178,34,34,0.1) 0%, rgba(201,168,76,0.08) 100%)",
            borderColor: "rgba(201,168,76,0.2)",
          }}
        >
          <div className="flex items-center gap-4">
            <ShieldIcon className="w-10 h-10 text-[var(--gold-bright)] flex-shrink-0" />
            <div>
              <p className="font-display font-bold text-white text-lg">Fully Insured · WSIB Compliant · Family Owned</p>
              <p className="text-sm text-white/60">Peace of mind on every project — Cameron Blancher leads every crew personally.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all hover:scale-105 min-h-11 flex items-center"
            style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}
          >
            Book Your Install
          </a>
        </div>
      </div>
    </section>
  );
}
