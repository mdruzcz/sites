import Link from "next/link";
import Script from "next/script";
import { Photo } from "./Photo";
import { HeroQuoteForm } from "./HeroQuoteForm";
import { site } from "@/lib/site";

interface Crumb { label: string; href?: string }

interface Props {
  photo: string;
  photoAlt?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  crumbs?: Crumb[];
  form?: boolean;
  formCity?: string;
  formService?: string;
  compact?: boolean;
}

export function PageHero({ photo, photoAlt, eyebrow, title, intro, crumbs = [], form = true, formCity, formService, compact = false }: Props) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: c.href ? (c.href === "/" ? site.url : `${site.url}${c.href}`) : undefined })),
  };
  const id = crumbs.map((c) => c.label).join("-").toLowerCase().replace(/[^a-z]+/g, "-") || "home";
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
      <Script id={`crumbs-${id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Photo name={photo} alt={photoAlt} ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className={`shell relative grid gap-10 pt-28 lg:grid-cols-[1.2fr_1fr] lg:items-center ${compact ? "pb-14 md:pt-32 md:pb-20" : "pb-16 md:pt-36 md:pb-24"}`}>
        <div className="reveal">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/70">
              {trail.map((c, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-1.5">/</span>}
                  {c.href && i < trail.length - 1 ? <Link href={c.href} className="hover:text-white hover:underline">{c.label}</Link> : <span className="text-white">{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <p className="eyebrow-pill">{eyebrow}</p>}
          <h1 className="font-display display mt-4 max-w-2xl text-white drop-shadow-sm">{title}</h1>
          {intro && <p className="lead mt-5 max-w-xl text-white/85">{intro}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className="btn-accent lg:hidden">Get a free quote</a>
            <a href={site.phoneHref} className="btn-white">{site.phone}</a>
          </div>
        </div>
        {form && (
          <div className="hidden lg:block">
            <HeroQuoteForm city={formCity} service={formService} />
          </div>
        )}
      </div>
    </section>
  );
}
