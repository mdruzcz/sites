interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  description?: string;
  light?: boolean;
  center?: boolean;
  /** Heading level for the headline. Use "h1" when this is the page's primary heading. */
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  headline,
  description,
  center = true,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-sm tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-[var(--foreground)]">
        {headline}
      </Heading>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${
            center ? "mx-auto" : ""
          } text-[var(--muted)]`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
