import { ShieldIcon } from "./icons";
import { AwardBadge } from "./award-badge";

export function TrustBar() {
  return (
    <section className="border-b border-[var(--line)] bg-white">
      <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-5 text-sm text-[var(--ink-soft)]">
        <span className="flex items-center gap-2"><ShieldIcon className="w-4 h-4 text-[var(--moss)]" />Eco-friendly, plant-safe products</span>
        <span className="hidden h-5 w-px bg-[var(--line)] sm:block" />
        <span>Brush-applied, never sprayed</span>
        <span className="hidden h-5 w-px bg-[var(--line)] sm:block" />
        <span>Ready Seal &amp; Penofin Verde oil-based stains</span>
        <span className="hidden h-5 w-px bg-[var(--line)] sm:block" />
        <span>Most projects done in 2 days</span>
        <span className="hidden h-5 w-px bg-[var(--line)] lg:block" />
        <AwardBadge style={{ padding: "6px 12px 6px 8px", gap: "8px" }} />
      </div>
    </section>
  );
}
