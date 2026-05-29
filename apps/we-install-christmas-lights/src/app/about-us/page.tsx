import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us | We Install Christmas Lights London Ontario",
  description:
    "Meet the family behind We Install Christmas Lights — South-Western Ontario's most-trusted holiday lighting team. Custom designs, 96% return rate, 5-star reviews.",
  alternates: { canonical: `${site.url}/about-us` },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="eyebrow">About Us</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">
            Family-owned. London-based. Five-star rated.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            We Install Christmas Lights is South-Western Ontario&rsquo;s premier holiday lighting team — bringing the magic to homes and businesses since 2016.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/about-team.jpg"
              alt="The We Install Christmas Lights team installing holiday lights on a home in London Ontario"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="heading-display text-2xl sm:text-3xl">Our Story</h2>
            <div className="mt-4 prose text-[color:var(--ink-soft)] space-y-4 leading-relaxed">
              <p>
                We started with one goal — to make professional holiday lighting easy for the families and businesses in our community.
                After years of friends and neighbours asking "who did your lights?" we made it official: a full-service team for design,
                installation, maintenance, takedown, and storage.
              </p>
              <p>
                Today, we&rsquo;ve decorated <strong>over 740 homes</strong>, hung <strong>3,960+ light strands</strong>, and lit up
                <strong> 921 Christmas trees</strong> for residential clients alone. Our 96% return rate says it all — our customers come
                back year after year because we make holiday lighting genuinely stress-free.
              </p>
              <p>
                Our crews are based in London Ontario, but we travel across the Greater Toronto Area, Waterloo Region, and South-Western
                Ontario for residential, commercial, hotel, mall, casino, restaurant, bank, and HOA projects. Whatever your scope, we&rsquo;ve
                done one like it before.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/contact-us" className="btn btn-red">Get a Free Quote</Link>
              <Link href={site.phoneHref} className="btn btn-outline-green">Call {site.phone}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--bg-cream)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Years in business", value: "10+" },
            { label: "Homes decorated", value: site.stats[0].number },
            { label: "Light strands installed", value: site.stats[2].number },
          ].map((s) => (
            <div key={s.label} className="card p-8 text-center">
              <div className="heading-display text-4xl text-[color:var(--brand-green)]">{s.value}</div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[color:var(--ink-soft)]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
