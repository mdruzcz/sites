type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
};

export function SectionHeader({ eyebrow, title, subtitle, light, center }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "!text-[var(--accent)]" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`section-title ${light ? "!text-white" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-base max-w-2xl leading-relaxed ${light ? "text-[var(--concrete-200)]" : "text-[var(--concrete)]"} ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
