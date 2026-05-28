import { site } from "@/lib/site";

export function TrustBar() {
  const stats = [
    { value: `${site.stats.projectsCompleted}+`, label: "Projects Sealed" },
    { value: `${site.yearsExperience}+`, label: "Years Experience" },
    { value: "4.9 / 5", label: "Google Rating" },
    { value: `${site.warrantyYears}-Year`, label: "Written Warranty" },
  ];

  return (
    <section className="bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1 ? "lg:border-r lg:border-white/25" : ""
              }`}
            >
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/80 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
