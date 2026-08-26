import { site } from "@/lib/site";
import { VideoLoop } from "./VideoLoop";
import videos from "@/content/xmas-videos.json";

// Prefer a full highlight reel; otherwise lead with the first clip.
const reel = videos.reel as { src: string; poster?: string } | null;
const hero = reel ?? (videos.clips.length ? videos.clips[0] : null);
// A themed still stands in until the muted clip streams in.
const heroPoster =
  reel?.poster ??
  "/images/xmas-gallery/blue-led-cone-christmas-trees-outdoor-light-show-01.jpg";

export function VideoShowcase() {
  if (!hero) return null;

  return (
    <section
      id="see-our-work"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--night)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            See Our Work
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Watch The Lights{" "}
            <span className="text-gradient-gold">Come Alive.</span>
          </h2>
          <p className="text-lg text-white/65">
            Programmable pixel colour, animated scenes and app-controlled
            schedules — this is the year-round curb appeal Halton Glow installs
            across Burlington and Oakville.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl gold-glow ring-1 ring-[rgba(245,194,107,0.2)]">
            <VideoLoop
              src={hero.src}
              poster={heroPoster}
              className="aspect-video w-full rounded-2xl object-cover bg-[var(--night-deep)]"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-[#0A0E1F] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,194,107,0.4)] min-h-11"
          >
            Get Your Free Estimate
          </a>
          <a
            href="/gallery"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-white/85 border border-white/15 hover:border-[var(--gold)]/40 hover:text-white transition-all min-h-11"
          >
            View Photo Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
