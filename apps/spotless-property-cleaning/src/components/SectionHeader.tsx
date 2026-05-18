export function SectionHeader({
  eyebrow,
  title,
  accentWord,
  description,
  center = true,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  const titleParts = accentWord ? title.split(accentWord) : null;

  return (
    <div className={`mb-10 sm:mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`font-semibold text-sm uppercase tracking-wider mb-2 ${light ? "text-[var(--accent-light)]" : "text-[var(--accent)]"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`h-display text-3xl sm:text-4xl ${light ? "text-white" : "text-slate-900"}`}>
        {titleParts ? (
          <>
            {titleParts[0]}
            <em className="text-[var(--accent)] not-italic font-display italic">{accentWord}</em>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
