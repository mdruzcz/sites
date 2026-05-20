type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionHeader({ eyebrow, title, description, center = true }: Props) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-[var(--charcoal)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-[var(--concrete)] leading-relaxed">{description}</p>
      )}
    </div>
  );
}
