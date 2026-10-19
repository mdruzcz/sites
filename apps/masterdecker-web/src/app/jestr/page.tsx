import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DisplayPicker, type JestrCatalog } from "@/components/jestr/display-picker";
import catalog from "@/content/jestr-catalog.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Holiday Displays for Jester Events | Master Decker",
  description: "Lit holiday displays for each Jester Events theme night, with season rental prices.",
  // Private client page: keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function JestrPage() {
  const data = catalog as JestrCatalog;
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--surface)]">
        <section className="relative overflow-hidden bg-[#0b1026] text-white">
          <Image src="/images/jestr/tunnel.jpg" alt="A walk-through light tunnel lit in blue and white" fill priority sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1026]/95 via-[#0b1026]/75 to-[#0b1026]/30" aria-hidden="true" />
          <div className="container relative py-16 md:py-24">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              {data.client} · {data.season}
            </p>
            <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">Holiday displays for every theme night</h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Your light tunnel and snowman family are at the top. Below them are displays picked for each of your five
              themes, with season rental prices that include setup, care and takedown. Tick anything you like and send us
              your list, and we will put it into one quote.
            </p>
            <nav className="mt-6 flex flex-wrap gap-2" aria-label="Themes">
              {data.themes.map((t) => (
                <a key={t.key} href={`#${t.key}`} className="rounded-full border border-white/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-[var(--ink)]">
                  {t.date} · {t.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <DisplayPicker catalog={data} />
      </main>
      <Footer />
    </>
  );
}
