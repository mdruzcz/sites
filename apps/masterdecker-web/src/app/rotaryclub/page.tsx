import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlaylistBuilder } from "@/components/rotary/playlist-builder";
import library from "@/content/rotary-songs.json";

export const dynamic = "force-static";

const HERO_BLUR =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAHBAAAwABBQAAAAAAAAAAAAAAAAECAwQRMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwX/xAAZEQABBQAAAAAAAAAAAAAAAAAAAQIREhT/2gAMAwEAAhEDEQA/AMmsFUlt2L09RyUTYbfpXyMkKyn/2Q==";

export const metadata: Metadata = {
  title: "Blenheim Rotary Club Light Show Playlist | Master Decker",
  description:
    "Preview the Christmas songs and skits available for the Blenheim Rotary Club light show, pick your favourites and set the running order.",
  // Private client planning page — keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function RotaryClubPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--surface)] min-h-screen">
        <section className="relative bg-[#030a2e] text-white overflow-hidden">
          <Image
            src="/images/rotary/blenheim-light-show.jpg"
            alt="Blenheim Rotary Club Christmas light show with two pixel mega trees, a lit snowflake and nativity scene on the bandstand"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover object-[center_45%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a2e]/90 via-[#030a2e]/70 to-[#030a2e]/30" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030a2e]/80 to-transparent" aria-hidden="true" />
          <div className="container relative py-16 md:py-28 lg:py-36">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
              Blenheim Rotary Club · Christmas Light Show {library.showYear + 1}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-3xl drop-shadow-lg">
              Build this year&apos;s show playlist
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow">
              Press play to preview any song, tick the ones you want in this year&apos;s show, then drag
              them into the order you&apos;d like them played. Everything from last year&apos;s show is
              highlighted in green and already ticked, so untick anything you&apos;d like to swap out.
              Hit <strong className="text-white">Save playlist</strong>{" "}when you&apos;re happy and we&apos;ll
              see your picks on our end.
            </p>
          </div>
        </section>

        <PlaylistBuilder library={library} />
      </main>
      <Footer />
    </>
  );
}
