import Image from "next/image";
import { StarIcon } from "./icons";

const REVIEWS = [
  {
    name: "John M.",
    city: "St. Thomas, Ontario",
    image: "/images/review-john.jpg",
    alt: "Front of a holiday-decorated home in St Thomas Ontario by We Install Christmas Lights",
    quote:
      "Absolutely delighted with the service provided by 'We Install Christmas Lights'. They took the hassle out of our holiday preparations by providing a professional and timely installation and takedown service. Kyle and his team's attention to detail was impressive — creating a magical and festive ambiance for our home.",
  },
  {
    name: "Jonathan and Diane",
    city: "London, Ontario",
    image: "/images/review-jonathan.jpg",
    alt: "Christmas-lit two-story home in London Ontario with tree and roofline lights",
    quote:
      "Matt and Kyle from 'We Install Christmas Lights' provided an exceptional light installation service in London. They transformed our home into a winter wonderland with their expert touch. The team's efficiency in both installation and takedown was commendable. Working with them was an absolute pleasure.",
  },
  {
    name: "Mike and Beth",
    city: "Woodstock, Ontario",
    image: "/images/review-mike.jpg",
    alt: "Light Install — Christmas-lit home in Woodstock Ontario",
    quote:
      "Their professionalism and expertise were evident in every step. The quality of the lights used was truly top-notch — brightness and durability stood out in our harsh winter weather, adding a magical touch to our home. Anyone seeking a high-quality, hassle-free experience should consider Kyle and Matt's service.",
  },
  {
    name: "Philipe Cartier",
    city: "Ingersoll, Ontario",
    image: "/images/review-philipe.jpg",
    alt: "Ingersoll Ontario home with professional Christmas lighting on roofline",
    quote:
      "From the moment I received a very reasonable quote, the entire process was smooth and swift. Their turnaround time from quote to installation was incredibly quick, without compromising on the quality of their work. This level of efficiency and professionalism is rare and greatly appreciated during the busy holiday season.",
  },
];

export function Testimonials() {
  return (
    <section className="section bg-[color:var(--bg-cream)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">What Our Customers Think About Us</p>
          <h2 className="heading-display text-3xl sm:text-4xl mt-3">
            Five-star reviews across South-Western Ontario
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <article key={r.name} className="card overflow-hidden flex flex-col md:flex-row">
              <div className="relative h-56 md:h-auto md:w-1/3 bg-[color:var(--bg-soft)]">
                <Image
                  src={r.image}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 768px) 16vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <div className="flex text-[color:#F5A623] gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className="w-4 h-4" />)}
                </div>
                <h3 className="heading-display text-base text-[color:var(--brand-green)] mt-3">
                  {r.name} <span className="text-[color:var(--ink-soft)] font-normal normal-case">— {r.city}</span>
                </h3>
                <blockquote className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
