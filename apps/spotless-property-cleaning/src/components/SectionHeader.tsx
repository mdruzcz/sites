export function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="h-display text-3xl sm:text-4xl text-slate-900">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
