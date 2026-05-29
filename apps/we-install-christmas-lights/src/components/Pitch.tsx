import Link from "next/link";
import Image from "next/image";
import { CheckIcon } from "./icons";

const POINTS = [
  "5-star customer satisfaction",
  "1-day installation in most homes",
  "96% return rate year after year",
  "Packages from classic to full Griswold-effect",
];

export function Pitch() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden">
          <Image
            src="/images/pitch-house.jpg"
            alt="Front porch and roofline of a London Ontario home professionally decorated with Christmas lights by We Install Christmas Lights"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">Professional Holiday Lighting Made Easy</p>
          <h2 className="heading-display text-3xl sm:text-4xl mt-3">
            From a special gift for your family to spreading cheer in your neighbourhood
          </h2>
          <p className="mt-4 text-[color:var(--ink-soft)] text-lg leading-relaxed">
            We take care of the headaches of buying, installing, maintaining,
            taking down and storing your holiday lighting — so your season stays
            pain-free and joyful.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-[color:var(--brand-red)] text-white flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3" />
                </span>
                <span className="font-semibold text-[color:var(--ink-strong)]">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about-us" className="btn btn-green">Read more about us</Link>
            <Link href="/contact-us" className="btn btn-outline-green">Get a Free Quote</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
