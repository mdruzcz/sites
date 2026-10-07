import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlaylistBuilder } from "@/components/rotary/playlist-builder";
import library from "@/content/rotary-songs.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Rotary Club Light Show Playlist | Master Decker",
  description:
    "Preview the Christmas songs and skits available for the Rotary Club light show, pick your favourites and set the running order.",
  // Private client planning page — keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function RotaryClubPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--surface)] min-h-screen">
        <section className="bg-[var(--shell)] text-white">
          <div className="container py-10 md:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
              Rotary Club · Christmas Light Show {library.showYear + 1}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Build your show playlist
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
              Press play to preview any song, tick the ones you want in this year&apos;s show, then drag
              them into the order you&apos;d like them played. Songs from last year&apos;s show are
              highlighted in green and already ticked — untick anything you&apos;d like to swap out. Hit{" "}
              <strong className="text-white">Save playlist</strong>
              {" "}when you&apos;re happy and we&apos;ll see your picks on our end.
            </p>
          </div>
        </section>

        <PlaylistBuilder library={library} />
      </main>
      <Footer />
    </>
  );
}
