const steps = [
  {
    n: "01",
    title: "Free On-Site Assessment",
    text: "We start with a no-obligation consultation at your home. Our team inspects your deck's condition — identifying damage, discoloration, mould, rot, or structural issues before any work begins.",
  },
  {
    n: "02",
    title: "Professional Power Washing",
    text: "We remove dirt, mildew, old finishes, and grey oxidation using commercial-grade pressure washing equipment. This deep cleaning prepares the wood for optimal stain adhesion and penetration.",
  },
  {
    n: "03",
    title: "Repairs & Surface Prep",
    text: "Our restoration work includes sanding, nail and screw replacement, and minor carpentry where needed. Surface cracks and splinters are addressed before any stain touches the wood.",
  },
  {
    n: "04",
    title: "Premium Stain Application",
    text: "We apply premium oil-based stains in even, controlled passes — no lap marks, no dry edges. Colour is matched to your preference from our extensive palette of cedar, honey, walnut, and grey tones.",
  },
  {
    n: "05",
    title: "Sealing & Protection",
    text: "Where needed, we apply a protective sealer over the stain to create a complete moisture barrier engineered for Ontario's freeze-thaw cycles, UV summers, and heavy spring rainfall.",
  },
  {
    n: "06",
    title: "Final Walkthrough",
    text: "Once complete, we walk through the project with you to ensure full satisfaction. We provide care and maintenance tips to help your deck's finish last as long as possible.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.n} className="card p-6 sm:p-8 relative overflow-hidden">
          <span
            className="absolute top-3 right-4 text-7xl font-black text-[var(--charcoal)]/[0.04] leading-none select-none"
            aria-hidden="true"
          >
            {step.n}
          </span>
          <div className="relative w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-black text-lg mb-5 shadow-md">
            {parseInt(step.n)}
          </div>
          <h3 className="font-bold text-[var(--charcoal)] text-lg mb-2 leading-snug">
            {step.title}
          </h3>
          <p className="text-[var(--concrete)] leading-relaxed text-sm">
            {step.text}
          </p>
        </div>
      ))}
    </div>
  );
}
