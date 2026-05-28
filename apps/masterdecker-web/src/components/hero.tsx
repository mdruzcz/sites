import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  background: string;
  align?: "left" | "center";
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showPhone?: boolean;
};

export function Hero({ eyebrow, title, subtitle, background, align = "left", primaryCta, secondaryCta, showPhone }: Props) {
  const containerAlign = align === "center" ? "text-center mx-auto" : "";
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${background})` }} />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className={`max-w-3xl ${containerAlign}`}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="h-display text-4xl md:text-5xl lg:text-6xl mb-6">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">{subtitle}</p>}
          {(primaryCta || secondaryCta || showPhone) && (
            <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
              {primaryCta && <Link href={primaryCta.href} className="btn-primary">{primaryCta.label}</Link>}
              {secondaryCta && <Link href={secondaryCta.href} className="btn-ghost-light">{secondaryCta.label}</Link>}
              {showPhone && <a href={site.phoneHref} className="btn-ghost-light">{site.phone}</a>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
