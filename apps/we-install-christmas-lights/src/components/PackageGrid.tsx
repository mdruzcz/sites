import Image from "next/image";

const STEPS = [
  {
    title: "FREE Quote and Design",
    image: "/images/package-design.jpg",
    body:
      "Begin by filling out our contact form with your ideas, your budget, and a photo of your home. We'll provide a FREE quote within 24 hours.",
    alt: "Designer reviewing a custom Christmas lighting plan",
  },
  {
    title: "Installation",
    image: "/images/package-install.jpg",
    body:
      "After accepting our estimate, our trained team supplies and installs professional-grade lights custom-cut to your roofline.",
    alt: "Installer mounting professional LED Christmas lights on a roofline",
  },
  {
    title: "Maintenance",
    image: "/images/package-maintenance.jpg",
    body:
      "We're not just installers — we're caretakers. We monitor and maintain your display throughout the season so it stays as stunning as day one.",
    alt: "Service technician maintaining outdoor Christmas lights mid-season",
  },
  {
    title: "Take-Down and Storage",
    image: "/images/package-storage.jpg",
    body:
      "When the season ends we carefully take down your lights and offer secure storage for next year — stress-free from start to finish.",
    alt: "Crew taking down Christmas lights after the holiday season",
  },
];

export function PackageGrid() {
  return (
    <section className="section bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">From Start to Finish, We Can Help</p>
          <h2 className="heading-display text-3xl sm:text-4xl mt-3">
            Our All-Inclusive Packages Take Care of:
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <article key={step.title} className="card overflow-hidden flex flex-col">
              <div className="relative h-48 bg-[color:var(--bg-soft)]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1">
                <h3 className="heading-display text-base text-[color:var(--brand-green)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)] leading-relaxed">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
