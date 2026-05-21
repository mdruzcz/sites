import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About — Ontario's Synchronized Light Show Specialists",
  description: `${site.name} is an Ontario-based addressable LED light show studio. Music-synced, IP67/IP68 hardware, multi-year warranty, installed across Ontario.`,
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="eyebrow">About Us</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 max-w-4xl">
            We build the <span className="gradient-text">moment</span>, not just the lights.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Ontario Light Shows is a small, focused studio based in Chatham-Kent. We design, install, and program music-synchronized addressable LED light shows for homes, businesses, community events, and live productions across Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose-ols">
          <h2>How we got here</h2>
          <p>
            We started Ontario Light Shows because we kept getting asked the same question: "How did you make that?" After running pixel-mapped installations for community parades, friends' weddings, and one too many holiday rooflines, the answer became a business — one that pairs music, architecture, and addressable RGB into a single coherent show.
          </p>
          <p>
            Today we serve homeowners who want a permanent system that runs warm white year-round and unlocks full RGB on holidays, businesses that want their building to become part of a campaign or activation, and event producers who want their parade, gala, or festival to actually look like the headline event it is.
          </p>

          <h2>How we work</h2>
          <p>
            Every project starts with a conversation, not a quote. We want to know what moment you're trying to create — the song, the audience reaction, the photo that lands on Instagram, the line of cars at the gate. Then we map the pixels, sequence the show, and ship hardware that's engineered to survive the install.
          </p>
          <p>
            We're a small team, which means the person who designs your show is the person who installs it. There's no handoff. The trade-off is that we book a limited number of projects each season — once a calendar slot is gone, it's gone.
          </p>

          <h2>What sets the work apart</h2>
          <ul>
            <li><strong>Music-first sequencing.</strong> We sequence individual pixels to your soundtrack frame-by-frame in studio before we touch a single fixture on-site.</li>
            <li><strong>IP67 / IP68 hardware.</strong> Every fixture, connector, and driver is weather-sealed for Ontario freeze-thaw and lake-effect humidity.</li>
            <li><strong>Invisible by day.</strong> Permanent installs disappear into low-profile aluminum channels tucked along your roofline.</li>
            <li><strong>Outdoor-grade protocol stack.</strong> Standard E1.31/Art-Net/DMX so the system plays nicely with any future addition.</li>
            <li><strong>Long-form warranty.</strong> Manufacturer warranty plus our own written workmanship guarantee. LED lifespan is 50,000+ hours.</li>
          </ul>

          <h2>Where we work</h2>
          <p>
            Core service zones cover {site.serviceAreas.slice(0, -1).join(", ")}, and {site.serviceAreas[site.serviceAreas.length - 1]}. For larger commercial installs and events, we travel across Ontario.
          </p>

          <h2>The Blenheim Christmas parade</h2>
          <p>
            The 2024 Blenheim Rotary Club Christmas Parade is our calling card — a small-town community event we helped scale into a regional headline. It's the project we point to when someone asks what we can do.{" "}
            <a href="/case-studies/blenheim-rotary-christmas-parade">Read the case study →</a>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
