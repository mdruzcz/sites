import { Icon, type IconName } from "@/components/icons";
import { BENEFITS } from "@/lib/site";

/** Benefits bar — the five promises, repeated under the hero and on key landing pages. */
export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section className="border-y border-[var(--color-border)] bg-white" aria-label="Why buy from Holiday Light Supplies">
      <div className={`shell grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-5 ${compact ? "py-5" : "py-7"}`}>
        {BENEFITS.map((b) => {
          const I = Icon[b.icon as IconName];
          return (
            <div key={b.title} className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                <I size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-[var(--color-text)]">{b.title}</p>
                {!compact && <p className="mt-1 text-xs leading-snug text-[var(--color-muted)]">{b.body}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
