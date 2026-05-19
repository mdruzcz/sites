export function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`font-semibold text-sm uppercase tracking-wider mb-2 ${dark ? "text-cyan-300" : "text-[var(--accent)]"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`h-display text-3xl sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl ${center ? "mx-auto" : ""} ${dark ? "text-white/70" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
