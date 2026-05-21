type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, description, align = "center", light = false }: Props) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${
        align === "center" ? "" : "ml-0"
      }`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`h-display text-3xl sm:text-4xl ${light ? "text-white" : "text-white"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg ${light ? "text-white/80" : "text-muted-strong"} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}
