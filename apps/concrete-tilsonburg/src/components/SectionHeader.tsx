type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, description, center = true, light = false }: Props) {
  return (
    <div className={`mb-10 sm:mb-14 ${center ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      {eyebrow && (
        <p className={`eyebrow ${center ? "justify-center" : ""} ${light ? "!text-[var(--accent)]" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`h-display text-3xl sm:text-4xl lg:text-[2.75rem] ${light ? "text-white" : "text-[var(--charcoal)]"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-[var(--concrete-200)]" : "text-[var(--concrete)]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
