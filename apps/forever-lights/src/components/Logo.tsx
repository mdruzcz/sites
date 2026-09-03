import Image from 'next/image';

/**
 * Brand mark rebuilt as SVG from the supplied logo geometry (chevron + 9 dots).
 * Colours the chevron with `currentColor` so it works on light and dark.
 */
export function Mark({ className = '', twinkle = false, title }: { className?: string; twinkle?: boolean; title?: string }) {
  const dots: [number, number, string][] = [
    [179.5, 399.4, 'var(--dot-red)'],
    [247.5, 359.4, 'var(--dot-amber)'],
    [315.5, 323.4, 'var(--dot-green)'],
    [379.5, 283.4, 'var(--dot-cyan)'],
    [447.4, 247.5, 'var(--dot-purple)'],
    [515.4, 283.4, 'var(--dot-cyan)'],
    [579.4, 323.4, 'var(--dot-green)'],
    [647.4, 359.4, 'var(--dot-amber)'],
    [715.4, 399.4, 'var(--dot-red)'],
  ];
  return (
    <svg
      viewBox="140 126 616 302"
      className={`${className} ${twinkle ? 'twinkle' : ''}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <polyline
        points="152.6,319.1 448,152.5 743.4,319.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="39.2"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />
      {dots.map(([cx, cy, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r="26" fill={fill} />
      ))}
    </svg>
  );
}

/** Just the 9-dot arc — used as a decorative divider. */
export function DotArc({ className = '' }: { className?: string }) {
  const dots: [number, number, string][] = [
    [26, 178, 'var(--dot-red)'],
    [94, 138, 'var(--dot-amber)'],
    [162, 102, 'var(--dot-green)'],
    [226, 62, 'var(--dot-cyan)'],
    [294, 26, 'var(--dot-purple)'],
    [362, 62, 'var(--dot-cyan)'],
    [426, 102, 'var(--dot-green)'],
    [494, 138, 'var(--dot-amber)'],
    [562, 178, 'var(--dot-red)'],
  ];
  return (
    <svg viewBox="0 0 588 204" className={className} aria-hidden="true">
      {dots.map(([cx, cy, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r="26" fill={fill} />
      ))}
    </svg>
  );
}

/** Flat row of the five brand dots — a tiny accent used under headings. */
export function DotRow({ className = '' }: { className?: string }) {
  const colours = ['var(--dot-red)', 'var(--dot-amber)', 'var(--dot-green)', 'var(--dot-cyan)', 'var(--dot-purple)'];
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden="true">
      {colours.map((c, i) => (
        <span key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
      ))}
    </span>
  );
}

type LockupProps = {
  variant?: 'ink' | 'white';
  tagline?: boolean;
  className?: string;
  priority?: boolean;
  height?: number;
};

/** The official horizontal lockup (PNG with alpha, trimmed + optimized). */
export function Logo({ variant = 'ink', tagline = false, className = '', priority = false, height = 40 }: LockupProps) {
  // Aspect ratios from the trimmed assets: no-tagline 834×261, tagline 1090×412.
  const ratio = tagline ? 1090 / 412 : 834 / 261;
  const src = tagline
    ? variant === 'white' ? '/images/brand/logo-horizontal-tagline-white.png' : '/images/brand/logo-horizontal-tagline.png'
    : variant === 'white' ? '/images/brand/logo-horizontal-white.png' : '/images/brand/logo-horizontal.png';
  const width = Math.round(height * ratio);
  return (
    <Image
      src={src}
      alt="Forever Lights - Permanent Roofline Lighting"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: 'auto' }}
      sizes={`${width * 2}px`}
    />
  );
}
