const items = [
  { label: "8+ Years Experience" },
  { label: "Free Quotes" },
  { label: "Ontario Building Code Compliant" },
  { label: "Residential & Commercial" },
];

export default function TrustBar() {
  return (
    <div className="bg-[var(--dark-mid)] text-white py-3">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
