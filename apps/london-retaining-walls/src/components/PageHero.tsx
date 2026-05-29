import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

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
  image = "/images/hero-retaining-wall.jpg",
  imageAlt = "Professional retaining wall installation in London, Ontario",
  center = false,
  children,
}: PageHeroProps) {
  return (
    <div className="relative bg-[var(--dark)] py-20 px-4 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill className="object-cover opacity-25" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)]/80 to-[var(--dark)]/60" />
      </div>
      <div className={`relative z-10 container mx-auto max-w-5xl ${center ? "text-center" : ""}`}>
        {eyebrow && (
          <p className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest mb-3">{eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight font-[family-name:var(--font-poppins)]">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-4 text-gray-300 text-lg max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>
        )}
        {children ?? (
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        )}
      </div>
    </div>
  );
}
