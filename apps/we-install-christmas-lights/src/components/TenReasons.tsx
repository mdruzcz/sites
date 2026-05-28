import Image from "next/image";

const REASONS = [
  {
    title: "Professional Quality",
    body: "By choosing us you're getting professional-grade service. Our trained team installs holiday lights for an attractive, reliable display.",
  },
  {
    title: "Time-Saving",
    body: "The holiday season can be hectic — let us handle the install so you can focus on the moments that matter with your loved ones.",
  },
  {
    title: "Safety",
    body: "Installing holiday lights involves ladders and rooftops. We have the training, equipment, and insurance to complete the job safely.",
  },
  {
    title: "Custom Designs",
    body: "We create a unique lighting design that matches your taste and the architecture of your home — your house will stand out in the neighbourhood.",
  },
  {
    title: "Quality Lights",
    body: "We use high-quality LED lights that are energy-efficient, durable, and vibrant — the best display possible, year after year.",
  },
  {
    title: "Full Service",
    body: "We don't just install — we maintain throughout the season. Burned-out bulb or loose string? We'll fix it at no additional cost.",
  },
  {
    title: "Take-Down and Storage",
    body: "Once the holidays are over, we take down your lights and store them safely. One less thing on your post-holiday to-do list.",
  },
  {
    title: "Flexible Scheduling",
    body: "We offer flexible scheduling options so you can have your holiday lights installed when it works best for you.",
  },
  {
    title: "Eco-Friendly Options",
    body: "Energy-efficient LED options reduce your carbon footprint while still creating a stunning display.",
  },
  {
    title: "Hassle-Free Experience",
    body: "Above all — a completely hassle-free experience. We handle design, install, maintenance, takedown, and storage so you can enjoy the season.",
  },
];

export function TenReasons() {
  return (
    <section className="section bg-[color:var(--bg-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">Why Hire a Professional</p>
            <h2 className="heading-display text-3xl sm:text-4xl mt-3">
              10 Reasons People Choose We Install Christmas Lights
            </h2>
            <p className="mt-4 text-[color:var(--ink-soft)] text-lg">
              Real reasons real homeowners and businesses pick us year after year.
            </p>
            <div className="relative mt-8 h-72 rounded-2xl overflow-hidden">
              <Image
                src="/images/why-choose.jpg"
                alt="Professional crew installing Christmas lights on a London Ontario home"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {REASONS.map((r, i) => (
              <li key={r.title} className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[color:var(--brand-green)] text-white text-xs font-bold flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-display text-sm text-[color:var(--ink-strong)]">{r.title}</h3>
                </div>
                <p className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
