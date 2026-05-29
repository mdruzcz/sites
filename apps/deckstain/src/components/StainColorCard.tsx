import type { StainColor } from "@/lib/content";

interface StainColorCardProps {
  color: StainColor;
}

export default function StainColorCard({ color }: StainColorCardProps) {
  return (
    <div className="card p-4">
      {/* Color swatch */}
      <div
        className="stain-swatch mb-4"
        style={{ backgroundColor: color.swatchHex }}
        aria-label={`${color.name} stain color swatch`}
      />
      <h3 className="font-bold text-[var(--charcoal)] mb-2 font-[var(--font-montserrat)]">
        {color.name}
      </h3>
      <p className="text-sm text-[var(--concrete)] leading-relaxed normal-case font-normal">
        {color.description}
      </p>
    </div>
  );
}
