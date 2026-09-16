import Image, { type ImageProps } from "next/image";
import { picProps } from "@/lib/images";

type PicProps = Omit<ImageProps, "src" | "alt" | "placeholder" | "blurDataURL"> & {
  src: string;
  alt?: string;
};

/** next/image wrapper for local photos: pulls alt + blur placeholder from content/images.json. */
export function Pic({ src, alt, ...rest }: PicProps) {
  const p = picProps(src, alt);
  return <Image {...p} {...rest} />;
}
