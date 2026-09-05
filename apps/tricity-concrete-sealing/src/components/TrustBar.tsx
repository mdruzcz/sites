import { site } from "@/lib/site";
import { StarIcon, ShieldIcon } from "./icons";
import { AwardBadge } from "./award-badge";

export function TrustBar() {
  return (
    <section className="border-b border-[var(--line)] bg-white">
      <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-5 text-sm text-[var(--ink-soft)]">
        <span className="flex items-center gap-2">
          <span className="flex text-[var(--gold)]">{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} className="w-4 h-4" filled />)}</span>
          <span className="font-bold text-[var(--ink)]">{site.googleRating}</span>
          <span className="text-[var(--muted)]">Google rating</span>
        </span>
        <span className="hidden h-5 w-px bg-[var(--line)] sm:block" />
        <span className="flex items-center gap-2"><ShieldIcon className="w-4 h-4 text-[var(--moss)]" />{site.warrantyYears}-year workmanship warranty</span>
        <span className="hidden h-5 w-px bg-[var(--line)] sm:block" />
        <span>{site.stats.projectsCompleted}+ projects sealed</span>
        <span className="hidden h-5 w-px bg-[var(--line)] sm:block" />
        <span>Solvent-based · matte, semi-gloss or gloss</span>
        <span className="hidden h-5 w-px bg-[var(--line)] lg:block" />
        <AwardBadge style={{ padding: "6px 12px 6px 8px", gap: "8px" }} />
      </div>
    </section>
  );
}
