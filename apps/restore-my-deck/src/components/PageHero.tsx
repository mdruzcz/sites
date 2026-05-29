import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  center?: boolean;
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image = "/images/hero-deck.jpg",
  imageAlt = "Professional deck and fence restoration",
  center = false,
  children,
}: PageHeroProps) {
  return (
    <div className="relative bg-[var(--dark)] py-16 px-4 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill className="object-cover opacity-20" priority sizes="100vw" />
      </div>
      <div className={`relative z-10 container mx-auto max-w-4xl ${center ? "text-center" : ""}`}>
        {eyebrow && (
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">{eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">{title}</h1>
        {subtitle && (
          <p className={`mt-4 text-gray-400 text-lg max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
