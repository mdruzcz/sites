import Link from "next/link";
import Script from "next/script";
import { Photo } from "./Photo";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

interface Crumb { label: string; href?: string }

export function PageHero({ photo, photoAlt, kicker, title, intro, crumbs = [], aside }: { photo: string; photoAlt?: string; kicker?: string; title: React.ReactNode; intro?: string; crumbs?: Crumb[]; aside?: React.ReactNode }) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const jsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: c.href ? (c.href === "/" ? site.url : `${site.url}${c.href}`) : undefined })) };
  const id = crumbs.map((c) => c.label).join("-").toLowerCase().replace(/[^a-z]+/g, "-") || "home";
  return (
    <section className="relative isolate overflow-hidden bg-[var(--graphite)] text-white">
      <Script id={`crumbs-${id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Photo name={photo} alt={photoAlt} ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className={`shell relative grid gap-10 pt-28 pb-14 md:pt-36 md:pb-20 ${aside ? "lg:grid-cols-[1.2fr_0.8fr] lg:items-end" : ""}`}>
        <div className="reveal">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5 text-xs uppercase tracking-[0.14em] text-white/60">
              {trail.map((c, i) => (
                <span key={i}>{i > 0 && <span className="mx-2 text-[var(--orange)]">/</span>}{c.href && i < trail.length - 1 ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}</span>
              ))}
            </nav>
          )}
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className="font-display display mt-4 max-w-3xl text-white">{title}</h1>
          {intro && <p className="lead mt-5 max-w-xl text-white/80">{intro}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quote" className="btn-orange">Get a free quote</a>
            <a href={site.phoneHref} className="btn-ghost"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          </div>
        </div>
        {aside && <div className="reveal">{aside}</div>}
      </div>
    </section>
  );
}
