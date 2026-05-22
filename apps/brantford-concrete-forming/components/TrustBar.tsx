import { site } from "@/lib/site";

export default function TrustBar() {
  return (
    <div className="bg-[#1a2332] border-b border-slate-700">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-700">
          {site.trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center py-5 px-4 text-center"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-[#E8751A]">
                {badge.value}
              </span>
              <span className="text-slate-300 text-xs mt-1 font-medium uppercase tracking-wide">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
