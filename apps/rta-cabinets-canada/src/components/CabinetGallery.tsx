"use client";

import Image from "next/image";
import { useState } from "react";

export default function CabinetGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? "/images/placeholder.svg";
  return (
    <div>
      <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-sand mb-3">
        <Image
          src={main}
          alt={`${name} - White Shaker RTA cabinet`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 10).map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded overflow-hidden border bg-sand ${
                i === active ? "border-accent" : "border-border"
              }`}
              aria-label={`View image ${i + 1} of ${name}`}
            >
              <Image
                src={img}
                alt={`${name} - White Shaker RTA cabinet view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
