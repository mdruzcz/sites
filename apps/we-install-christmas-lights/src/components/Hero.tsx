import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { Bulb } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left: red panel */}
        <div className="relative bg-[color:var(--brand-red)] text-white px-6 sm:px-10 lg:px-16 py-16 lg:py-28 flex items-center">
          {/* twinkling bulb accent row */}
          <div className="absolute top-6 left-6 flex gap-2 opacity-80">
            <Bulb className="w-3.5 h-3.5 twinkle" color="#FFD43B" />
            <Bulb className="w-3.5 h-3.5 twinkle" color="#2098D1" />
            <Bulb className="w-3.5 h-3.5 twinkle" color="#0E7A33" />
            <Bulb className="w-3.5 h-3.5 twinkle" color="#FFA600" />
            <Bulb className="w-3.5 h-3.5 twinkle" color="#FFFFFF" />
          </div>

          <div className="relative max-w-xl text-white">
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              Professional<br />Christmas and<br />Holiday Lighting
            </h1>
            <p className="mt-6 text-lg lg:text-xl font-medium leading-snug text-white/95">
              Easy, Custom, Holiday Lighting In As Little As 1 Day!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact-us" className="btn btn-outline-white">
                Online Quote
              </Link>
              <Link href={site.phoneHref} className="btn btn-green">
                Call
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/80">
              5★ rated · 96% return rate · Family-owned · London, ON
            </p>
          </div>
        </div>

        {/* Right: hero photo */}
        <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[560px]">
          <Image
            src="/images/hero-house.jpg"
            alt="Professional Christmas light installation on a London Ontario home — full roofline LED lighting and decorated trees by We Install Christmas Lights"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
