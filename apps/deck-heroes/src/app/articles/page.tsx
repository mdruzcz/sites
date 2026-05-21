import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Deck Care Articles, Tips & Expert Advice",
  description:
    "Expert articles on deck staining, sealing, maintenance, and wood care. Learn the best practices for keeping your Ontario deck looking its best year-round.",
  openGraph: {
    title: "Deck Care Articles, Tips & Expert Advice | Deck Heroes",
    description:
      "Expert articles on deck staining, sealing, maintenance, and wood care from Deck Heroes.",
    url: "https://deckheroes.ca/articles",
  },
};

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

const ARTICLES: Article[] = [
  {
    slug: "how-often-should-you-stain-your-deck",
    title: "How Often Should You Stain Your Deck?",
    description:
      "Discover the ideal staining schedule for your deck based on wood type, climate, and stain choice. Keep your deck protected without over-staining.",
    category: "Maintenance",
    readTime: "5 min read",
  },
  {
    slug: "best-time-of-year-for-deck-staining-ontario",
    title: "Best Time of Year for Deck Staining in Ontario",
    description:
      "Timing is everything when it comes to deck staining. Learn which months offer the best conditions for a flawless finish in Ontario's climate.",
    category: "Seasonal",
    readTime: "4 min read",
  },
  {
    slug: "oil-based-vs-water-based-deck-stains",
    title: "Oil-Based vs Water-Based Deck Stains: Complete Guide",
    description:
      "Compare the pros and cons of oil-based and water-based deck stains, including durability, drying time, VOC levels, and ease of application.",
    category: "Stain Guide",
    readTime: "7 min read",
  },
  {
    slug: "signs-your-deck-needs-refinishing",
    title: "5 Signs Your Deck Needs Refinishing",
    description:
      "Is your deck trying to tell you something? Learn the telltale signs that it is time for a professional refinishing before damage gets worse.",
    category: "Maintenance",
    readTime: "4 min read",
  },
  {
    slug: "prepare-your-deck-for-winter",
    title: "How to Prepare Your Deck for Winter",
    description:
      "Protect your investment from Ontario's harsh winters. Step-by-step guide to winterizing your deck including cleaning, sealing, and furniture storage.",
    category: "Seasonal",
    readTime: "6 min read",
  },
  {
    slug: "cedar-vs-pressure-treated-deck-wood",
    title: "Cedar vs Pressure-Treated: Which Deck Wood is Best?",
    description:
      "Choosing between cedar and pressure-treated lumber? Compare cost, durability, appearance, and maintenance requirements for each wood type.",
    category: "Wood Care",
    readTime: "6 min read",
  },
  {
    slug: "diy-vs-professional-deck-staining",
    title: "DIY vs Professional Deck Staining: What to Consider",
    description:
      "Thinking about staining your deck yourself? Weigh the real costs, time investment, and quality differences between DIY and hiring a professional.",
    category: "Planning",
    readTime: "5 min read",
  },
  {
    slug: "deck-maintenance-calendar",
    title: "Deck Maintenance Calendar: Your Year-Round Guide",
    description:
      "A month-by-month maintenance calendar to keep your deck in peak condition through every Ontario season, from spring thaw to winter freeze.",
    category: "Maintenance",
    readTime: "8 min read",
  },
];

const categoryColors: Record<string, string> = {
  Maintenance: "bg-terracotta/10 text-terracotta",
  Seasonal: "bg-forest/10 text-forest",
  "Stain Guide": "bg-bg-alt text-wood-dark",
  "Wood Care": "bg-forest/10 text-forest",
  Planning: "bg-cream-dark text-wood-dark",
};

export default function ArticlesPage() {
  return (
    <>
      {/* Hero — image-based */}
      <section className="relative min-h-[350px] lg:min-h-[400px] flex items-center">
        <Image src="/images/deck-seats.jpeg" alt="Professional deck and fence care tips and articles" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-forest-dark/85" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
            Articles
          </span>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Deck Care Articles, Tips &amp; Expert Advice
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Everything you need to know about maintaining, staining, and
            protecting your deck. Practical advice from Ontario&apos;s deck care
            professionals.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-bg py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href="#"
                className="group rounded-2xl bg-white p-6 shadow-md shadow-forest-dark/5 border border-cream-dark/50 hover:shadow-lg hover:border-terracotta/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[article.category] || "bg-cream-dark text-wood-dark"}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-wood-light">
                    {article.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold text-wood-dark group-hover:text-terracotta transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-wood leading-relaxed">
                  {article.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-terracotta group-hover:gap-2 transition-all">
                  Read Article
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
