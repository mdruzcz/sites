import { site } from "@/lib/site";

const stats = [
  { value: `${site.stats.projectsCompleted}+`, label: "Projects Completed" },
  { value: `${site.yearsExperience}+`, label: "Years Experience" },
  { value: "4.9 / 5", label: "Google Rating" },
  { value: "Written", label: "Guarantee" },
];

export function TrustBar() {
  return (
    <section className="bg-[var(--charcoal)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1 ? "lg:border-r lg:border-white/10" : ""
              }`}
            >
              <p className="stat-value">{stat.value}</p>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[var(--concrete-200)] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
