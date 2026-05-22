import Image, { ImageProps } from "next/image";
import blurData from "@/content/blur-data.json";

const FALLBACK_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAAmSURBVBXBQREAIAzDwK9h/yKSBwnMo+6+N/OXJEmSJEmSJEmSADcVBgSj4oOk0gAAAABJRU5ErkJggg==";

type BlurDataKey = keyof typeof blurData;

type Props = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  src: string;
};

export default function ImageWithBlur({ src, alt, sizes, ...props }: Props) {
  const blur = (blurData as Record<string, string>)[src as BlurDataKey] ?? FALLBACK_BLUR;

  // Provide a sensible default sizes value when using fill layout
  const effectiveSizes = sizes ?? "100vw";

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={blur}
      sizes={effectiveSizes}
      {...props}
    />
  );
}
