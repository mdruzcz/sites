type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, description, align = "center", dark = false }: Props) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center mx-auto" : "ml-0"} max-w-3xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`h-display text-3xl sm:text-4xl ${dark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? "text-blue-100" : "text-muted-strong"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
