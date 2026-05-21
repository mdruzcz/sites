type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, subtitle, center = false, light = false }: Props) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}
      <h2 className={`section-title ${light ? "!text-white" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-base sm:text-lg leading-relaxed max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-[var(--concrete-200)]" : "text-[var(--concrete)]"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
