import Image, { type ImageProps } from "next/image";

/**
 * A neutral shimmer used as the blur-up placeholder.
 *
 * Photos on this site are owner-uploaded at runtime, so there is no build step
 * in which to compute a real base64 blur hash per image. A generated SVG of
 * the right aspect ratio gives the same perceived effect — the layout is
 * reserved and the swap is soft — without a round trip.
 */
function shimmer(w: number, h: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ebebeb"/>
      <stop offset="50%" stop-color="#f5f5f5"/>
      <stop offset="100%" stop-color="#ebebeb"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ebebeb"/>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(svg).toString("base64")
      : window.btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

type PhotoProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  /** Aspect ratio hint for the placeholder only. Defaults to 4:3. */
  ratio?: [number, number];
};

/** next/image with a shimmer blur-up placeholder already wired in. */
export function Photo({ ratio = [4, 3], alt, ...rest }: PhotoProps) {
  return (
    <Image
      {...rest}
      alt={alt}
      placeholder="blur"
      blurDataURL={shimmer(ratio[0] * 10, ratio[1] * 10)}
    />
  );
}

/** Standalone skeleton for areas waiting on data. */
export function PhotoSkeleton({ className = "", radius = 12 }: { className?: string; radius?: number }) {
  return <div className={`shimmer ${className}`} style={{ borderRadius: radius }} aria-hidden="true" />;
}
