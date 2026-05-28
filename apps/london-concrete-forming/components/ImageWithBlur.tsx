import Image, { ImageProps } from "next/image";

const FALLBACK_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAAmSURBVBXBQREAIAzDwK9h/yKSBwnMo+6+N/OXJEmSJEmSJEmSADcVBgSj4oOk0gAAAABJRU5ErkJggg==";

type Props = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  src: string;
};

export default function ImageWithBlur({ src, alt, sizes, ...props }: Props) {
  const effectiveSizes = sizes ?? "100vw";

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={FALLBACK_BLUR}
      sizes={effectiveSizes}
      {...props}
    />
  );
}
