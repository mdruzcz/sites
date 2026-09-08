import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBand({ title = "Get a straight answer on your wall", text = "Kyle walks every site personally, explains what is going on with the grade and drainage, and puts a written quote in your hands within a day." }: { title?: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="courses-dark absolute inset-0" aria-hidden />
      <div className="container-x relative flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="kicker text-accent">Free site visit and written quote</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-stone-2">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/contact-us#quote" className="btn btn-accent">Request a quote</Link>
          <a href={site.phoneHref} className="btn btn-paper">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
