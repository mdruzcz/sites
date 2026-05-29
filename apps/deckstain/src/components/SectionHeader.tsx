interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${light ? "text-[var(--accent-600)]" : ""}`}>{eyebrow}</p>
      )}
      <h2 className={`h-display text-2xl md:text-3xl lg:text-4xl mb-4 ${light ? "text-white" : "text-[var(--charcoal)]"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base max-w-2xl leading-relaxed normal-case font-normal ${centered ? "mx-auto" : ""} ${light ? "text-white/80" : "text-[var(--concrete)]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
