interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}

export function SectionHeader({ eyebrow, title, description, light, center = true }: Props) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow ${center ? "justify-center" : ""} ${light ? "!text-[var(--accent)]" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`h-display text-3xl sm:text-4xl lg:text-5xl mb-4 ${
          light ? "text-white" : "text-[var(--navy)]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl ${center ? "mx-auto" : ""} leading-relaxed ${
            light ? "text-white/70" : "text-[var(--concrete)]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
