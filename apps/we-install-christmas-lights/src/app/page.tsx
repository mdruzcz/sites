import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/components/Hero";
import { Pitch } from "@/components/Pitch";
import { PackageGrid } from "@/components/PackageGrid";
import { Testimonials } from "@/components/Testimonials";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TenReasons } from "@/components/TenReasons";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FAQAccordion } from "@/components/FAQAccordion";
import { VideoLoop } from "@/components/VideoLoop";
import { site } from "@/lib/site";
import videosData from "@/content/xmas-videos.json";
import Link from "next/link";

export const revalidate = 3600;

type Clip = { src: string; alt: string; category: string };
type Videos = { reel: { src: string; poster: string } | null; clips: Clip[] };
const videos = videosData as Videos;

// Poster shown before the clip loads — a night blue/warm-white exterior that matches the reel.
const VIDEO_POSTER = "/images/xmas-gallery/condo-building-blue-warm-white-christmas-lights-night-01.jpg";
const heroVideo =
  videos.reel ??
  (videos.clips.length > 0 ? { src: videos.clips[0].src, poster: VIDEO_POSTER } : null);

const VIDEO_SCHEMA = heroVideo && {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "We Install Christmas Lights — Commercial & Residential Christmas Light Installation",
  description:
    "Watch a Christmas light installation by We Install Christmas Lights — professional holiday lighting for homes and businesses across London Ontario and South-Western Ontario.",
  thumbnailUrl: `${site.url}${heroVideo.poster}`,
  contentUrl: `${site.url}${heroVideo.src}`,
  uploadDate: "2026-08-25",
};

export const metadata: Metadata = {
  title: "Professional Christmas Light Installation | We Install Christmas Lights",
  description:
    "Get expert Christmas light installation and holiday decorating services for homes and businesses across South-Western Ontario. Easy, custom holiday lighting in as little as 1 day.",
  alternates: { canonical: "https://weinstallchristmaslights.ca" },
};

const FAQS = [
  {
    question: "Is there a cost for storing our decorations for next year?",
    answer:
      "Yes, we offer a convenient storage service starting at $100 to ensure your holiday decorations are safely stored and ready year after year — beautifully decorated homes for the holidays without the hassle of storing them yourself.",
  },
  {
    question: "Will we need to hire an electrician?",
    answer:
      "In most cases hiring an electrician is not necessary for our home decoration packages. Our experienced team handles the electrical aspects of the installation. For more elaborate setups, additional power sources may be required and we can guide you through the process.",
  },
  {
    question: "Are the lights and decorations you provide different from what I can buy locally?",
    answer:
      "Absolutely. All our Christmas lights and decorations are specifically manufactured to our high standards. Our lights feature longer-life bulbs and our greenery is lush and fuller. We use CSA and UL-rated outdoor extension cords and property-friendly installation accessories.",
  },
  {
    question: "Can you install and store Christmas decorations that I have already purchased?",
    answer:
      "We can only provide warranty and guarantee workmanship on lights and decorations that we supply. We are unable to install or store decorations that are not part of our inventory.",
  },
  {
    question: "How much does it cost to have our Christmas lights installed and taken down?",
    answer:
      "Since every home is unique, and each client has their own preferences, we offer customized solutions to fit every budget. Pricing for our home decoration projects is tailored to the specific property and your desired level of decoration.",
  },
  {
    question: "How many homes have you decorated over the years, and what areas do you service?",
    answer:
      "We've adorned hundreds of homes in and around London Ontario, the Greater Toronto Area, and Waterloo Region with colorful and festive decorations for the holidays. See our service-areas page for a full list of cities.",
  },
  {
    question: "Do we need to be present during the installation?",
    answer:
      "No. Our highly trained and efficient installation crew can complete the setup while you are away, ensuring a seamless and convenient experience for you.",
  },
  {
    question: "What other decorations do you offer besides lights?",
    answer:
      "In addition to our stunning lights we offer lush wreaths, pre-lit garlands and various sizes of bows. If there are specific decorations you desire, we're happy to assist in sourcing them for you.",
  },
  {
    question: "What type of lights do you use?",
    answer:
      "We use energy-efficient LED lights that emit a brilliant glow. Our selection includes traditional colors such as red, green, yellow, blue, and clear, allowing you to create the festive atmosphere you envision.",
  },
  {
    question: "Which parts of my home can you decorate with lights?",
    answer:
      "We customize your lighting design specifically to your home. Our skilled team adorns windows, trees, hedges, bushes, and even the facias and ridges of your roof — transforming your entire property into a winter wonderland.",
  },
  {
    question: "When do you take down the lights?",
    answer:
      "Our goal is a convenient and unobtrusive experience. We schedule the take-down once our team can safely access rooftops and trees considering the unpredictable Canadian winter weather. Simply unplug your timer when you decide you no longer want them illuminated.",
  },
  {
    question: "How far in advance should we book your services?",
    answer:
      "Booking as early as possible is recommended since the Christmas decorating season is relatively short. Our schedule fills quickly, with availability becoming limited as early as mid-November. Contact us soon to secure your preferred time slot.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {VIDEO_SCHEMA && (
        <Script
          id="video-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_SCHEMA) }}
        />
      )}

      <Hero />
      <Pitch />
      <PackageGrid />
      <Testimonials />
      <ProcessSteps />
      <TenReasons />
      <ServicesGrid />

      {/* See our work — video showcase */}
      {heroVideo && (
        <section className="section bg-[color:var(--brand-green)] text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">See Our Work</p>
              <h2 className="heading-display text-3xl sm:text-4xl mt-3 text-white">
                Christmas Light Installations In Motion
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-white/90">
                A look at the residential and commercial holiday displays we design, install, and
                maintain across South-Western Ontario.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <VideoLoop
                src={heroVideo.src}
                poster={heroVideo.poster}
                className="aspect-video w-full rounded-2xl object-cover"
              />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/gallery" className="btn btn-outline-white">View Full Gallery</Link>
              <Link href="/contact-us" className="btn btn-red">Get a Free Quote</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section bg-[color:var(--bg-cream)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Have a Question?</p>
            <h2 className="heading-display text-3xl sm:text-4xl mt-3">
              Christmas Light Installation FAQs
            </h2>
          </div>
          <FAQAccordion faqs={FAQS} />
          <div className="mt-10 text-center">
            <Link href="/faq" className="btn btn-outline-green">See all FAQs</Link>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="bg-[color:var(--brand-red)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready for the Most Magical Season Yet?
          </h2>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">
            Free quote within 24 hours. 5★ rated. London Ontario family-owned. We handle everything — design, install, maintenance, takedown, storage.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact-us" className="btn btn-outline-white">Get a Free Quote</Link>
            <Link href="tel:+15192666796" className="btn btn-green">Call (519) 266-6796</Link>
          </div>
        </div>
      </section>
    </>
  );
}
