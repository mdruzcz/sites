// One kit in a product grid: photo, price, what it covers and a direct way to
// buy. Used on /kits and on the homepage. Each kit has its own lit-home photo
// (see kitPhotoKey), so six cards never share a picture.
import Link from 'next/link';
import { getPhoto } from '@/lib/site';
import { type Kit, kitLightCount, kitTrackFeet, kitPhotoKey, formatCad } from '@/lib/kits';
import { PhotoImg } from './ui';
import { Icon } from './icons';

export function KitCard({
  kit,
  priority = false,
  compact = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
}: {
  kit: Kit;
  priority?: boolean;
  /** Smaller card for the homepage strip and "other sizes" rows: no description, one button. */
  compact?: boolean;
  sizes?: string;
}) {
  const photo = getPhoto(kitPhotoKey(kit));
  const href = `/kits/${kit.slug}`;

  return (
    <article className="card group flex flex-col overflow-hidden transition-colors hover:border-ink">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-dark" tabIndex={-1} aria-hidden="true">
        <PhotoImg photo={photo} sizes={sizes} priority={priority} className="transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink">{kit.feet} ft</span>
      </Link>
      <div className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5 md:p-6'}`}>
        <div className={compact ? 'flex flex-col' : 'flex flex-wrap items-baseline justify-between gap-x-3'}>
          <h3 className={`font-heading font-bold text-ink ${compact ? 'text-lg' : 'text-2xl'}`}>
            <Link href={href} className="hover:underline underline-offset-4">{kit.feet} ft kit</Link>
          </h3>
          <p className={`font-heading font-bold text-ink tabular-nums ${compact ? 'text-lg' : 'text-2xl'}`}>{formatCad(kit.price)}</p>
        </div>
        <p className="mt-1 text-sm text-muted">
          {kitLightCount(kit)} lights · {kitTrackFeet(kit)} ft of track{compact ? '' : ` · about ${formatCad(kit.price / kit.feet, 2)} per foot`}
        </p>
        {!compact && <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">Covers {lowerFirst(kit.suits)}</p>}
        {compact ? (
          <div className="mt-auto pt-4">
            <Link href={`${href}#order`} className="btn btn-primary btn-sm w-full" aria-label={`Buy the ${kit.feet} ft kit`}>
              Buy this kit
            </Link>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`${href}#order`} className="btn btn-primary flex-1 px-5" aria-label={`Buy the ${kit.feet} ft kit`}>
              <Icon.cart size={18} /> Buy this kit
            </Link>
            <Link href={`${href}#in-the-box`} className="btn btn-outline flex-1 px-5" aria-label={`What is in the ${kit.feet} ft kit`}>
              What is in the box
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

/** "A garage face, …" reads as "Covers a garage face, …". */
function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
