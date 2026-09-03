import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './icons';
import { getPhoto, site, phoneHref, type Photo } from '@/lib/site';

/* ─── Breadcrumbs ─── */
export function Breadcrumbs({ items, light = false }: { items: { href?: string; label: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${light ? 'text-white/60' : 'text-muted'}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className={`${light ? 'hover:text-white' : 'hover:text-ink'} transition-colors`}>Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {it.href ? (
              <Link href={it.href} className={`${light ? 'hover:text-white' : 'hover:text-ink'} transition-colors`}>{it.label}</Link>
            ) : (
              <span className={light ? 'text-white/90' : 'text-ink'} aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─── Section heading ─── */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  light = false,
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
      {eyebrow && <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</span>}
      <Tag className={`mt-3 font-bold leading-[1.08] ${Tag === 'h1' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'} ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </Tag>
      {sub && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-muted'}`}>{sub}</p>}
    </div>
  );
}

/* ─── Simple page header (light pages) ─── */
export function PageHeader({
  eyebrow,
  title,
  sub,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  crumbs?: { href?: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-soft border-b border-line">
      <div className="wrap pt-8 pb-12 md:pt-10 md:pb-16">
        {crumbs && <div className="mb-6"><Breadcrumbs items={crumbs} /></div>}
        <SectionHeading as="h1" align="left" eyebrow={eyebrow} title={title} sub={sub} className="max-w-3xl" />
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/* ─── Photo ─── */
export function PhotoImg({
  photo,
  sizes,
  priority = false,
  className = '',
  alt,
  fill = true,
  quality = 75,
}: {
  photo: Photo;
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
  fill?: boolean;
  quality?: number;
}) {
  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      priority={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      sizes={sizes}
      className={className}
    />
  );
}

/* ─── Check list ─── */
export function CheckList({ items, light = false, className = '' }: { items: string[]; light?: boolean; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map(item => (
        <li key={item} className={`flex items-start gap-3 leading-relaxed ${light ? 'text-white/85' : 'text-ink-soft'}`}>
          <span className="mt-0.5 w-6 h-6 rounded-full bg-accent/20 text-ink flex items-center justify-center shrink-0">
            <Icon.check size={14} strokeWidth={2.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Feature card (icon + title + text) ─── */
export function FeatureCard({ icon, title, text, dark = false }: { icon: React.ReactNode; title: string; text: string; dark?: boolean }) {
  return (
    <div className={`${dark ? 'card-dark' : 'card'} p-6 md:p-7 h-full`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${dark ? 'bg-white/10 text-accent' : 'bg-soft text-ink'}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-bold mb-2 ${dark ? 'text-white' : 'text-ink'}`}>{title}</h3>
      <p className={`text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>{text}</p>
    </div>
  );
}

/* ─── Final CTA band (dark, photo-backed) ─── */
export function CtaBand({
  title,
  text,
  photoKey = 'warm-white-night',
  primaryLabel = 'Get My Free Quote',
  primaryHref = '/contact',
}: {
  title?: React.ReactNode;
  text?: string;
  photoKey?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  const photo = getPhoto(photoKey);
  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <div className="absolute inset-0">
        <PhotoImg photo={photo} sizes="100vw" className="opacity-40" quality={60} />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
      </div>
      <div className="relative wrap section">
        <div className="max-w-2xl">
          <span className="eyebrow eyebrow-light">Free site visit · Written quote within 24h</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-[1.05]">
            {title ?? <>Ready to never hang lights again?</>}
          </h2>
          <p className="mt-5 text-lg text-white/75 leading-relaxed">
            {text ?? 'We measure your roofline, colour-match the track to your soffit and hand you an exact price. No pressure, no obligation.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href={primaryHref} className="btn btn-primary btn-lg">{primaryLabel}</Link>
            <a href={phoneHref} className="btn btn-outline-light btn-lg"><Icon.phone size={20} /> {site.phone}</a>
          </div>
          <p className="mt-5 text-sm text-white/50">{site.hours} · {site.warranty}</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Coming soon badge ─── */
export function ComingSoon({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-ink text-xs font-semibold px-3 py-1.5 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Coming soon
    </span>
  );
}
