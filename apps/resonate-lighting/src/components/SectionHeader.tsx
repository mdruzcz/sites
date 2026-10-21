type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, description, align = "center", as = "h2" }: Props) {
  const Tag = as;
  return (
    <div className={`mb-12 max-w-3xl ${align === "center" ? "text-center mx-auto" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="h-display text-3xl sm:text-4xl text-white">{title}</Tag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted-strong leading-relaxed">{description}</p>
      )}
    </div>
  );
}
