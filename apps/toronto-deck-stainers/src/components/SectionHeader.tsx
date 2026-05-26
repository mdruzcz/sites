type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, description, light }: Props) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <p className="eyebrow justify-center">{eyebrow}</p>
      <h2
        className={`h-display text-3xl sm:text-4xl mb-4 ${
          light ? "text-white" : "text-[var(--charcoal)]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
            light ? "text-white/70" : "text-[var(--concrete)]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
