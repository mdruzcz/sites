'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Photo } from '@/lib/site';
import { PhotoImg } from './ui';
import { Icon } from './icons';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'christmas', label: 'Christmas' },
  { id: 'accent', label: 'Accent' },
  { id: 'daytime', label: 'Daytime' },
  { id: 'commercial', label: 'Commercial' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

function matches(photo: Photo, filter: FilterId) {
  return filter === 'all' || (photo.tags?.includes(filter) ?? false);
}

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [open, setOpen] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentRef = useRef<number | null>(null);

  const visible = photos.filter(p => matches(p, filter));
  const count = visible.length;
  const current = open !== null ? visible[open] : null;

  // Keep the native dialog in sync with React state.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    else if (open === null && d.open) d.close();
  }, [open]);

  // Remember which thumbnail to hand focus back to.
  useEffect(() => {
    if (open !== null) currentRef.current = open;
  }, [open]);

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen(o => (o === null || count === 0 ? o : (o + dir + count) % count)),
    [count],
  );

  // Fires for Escape, the close button and backdrop clicks alike.
  function handleDialogClose() {
    setOpen(null);
    const i = currentRef.current;
    if (i !== null) thumbRefs.current[i]?.focus();
  }

  function handleKey(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) close();
  }

  function changeFilter(id: FilterId) {
    thumbRefs.current = [];
    setFilter(id);
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
          {FILTERS.map(f => {
            const active = filter === f.id;
            const n = photos.filter(p => matches(p, f.id)).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => changeFilter(f.id)}
                className={`inline-flex items-center gap-2 min-h-[44px] rounded-full px-4 text-sm font-semibold border transition-colors ${
                  active ? 'bg-ink text-white border-ink' : 'bg-white text-ink-soft border-line hover:border-ink hover:text-ink'
                }`}
              >
                {f.label}
                <span className={`text-xs ${active ? 'text-white/60' : 'text-muted'}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {count} {count === 1 ? 'photo' : 'photos'}
        </p>
      </div>

      {/* Masonry grid */}
      {count === 0 ? (
        <p className="mt-10 text-muted">No photos in this category yet.</p>
      ) : (
        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
          {visible.map((p, i) => (
            <figure key={p.key} className="break-inside-avoid mb-4 md:mb-5">
              <button
                type="button"
                ref={el => {
                  thumbRefs.current[i] = el;
                }}
                onClick={() => setOpen(i)}
                aria-label={`View larger: ${p.caption ?? p.alt}`}
                className="group block w-full min-h-[44px] rounded-2xl overflow-hidden bg-soft text-left"
              >
                <PhotoImg
                  photo={p}
                  fill={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
              {p.caption && <figcaption className="mt-2.5 px-1 text-sm text-ink-soft">{p.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={handleDialogClose}
        onKeyDown={handleKey}
        aria-label="Photo viewer"
        className="fixed inset-0 m-0 p-0 w-full max-w-none h-full max-h-none bg-transparent text-white backdrop:bg-dark/95"
      >
        {current && (
          <div className="w-full h-full flex items-center justify-center p-4 md:p-8" onClick={handleBackdropClick}>
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <Icon.close size={22} />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Icon.arrow size={22} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Icon.arrow size={22} />
                </button>
              </>
            )}

            <figure className="flex flex-col items-center max-w-[min(1200px,100%)]">
              <PhotoImg
                key={current.key}
                photo={current}
                fill={false}
                sizes="(max-width: 1280px) 92vw, 1200px"
                quality={82}
                className="max-h-[76vh] w-auto h-auto max-w-full rounded-2xl"
              />
              <figcaption className="mt-4 text-center text-sm text-white/85">
                {current.caption ?? current.alt}
                <span className="ml-3 text-white/50">
                  {(open ?? 0) + 1} / {count}
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </div>
  );
}
