const items = [
  { icon: "🏗️", label: "8+ Years Experience" },
  { icon: "📋", label: "Free Quotes" },
  { icon: "✅", label: "Ontario Building Code Compliant" },
  { icon: "🏠", label: "Residential & Commercial" },
];

export default function TrustBar() {
  return (
    <div className="bg-[var(--dark)] text-white py-4">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-medium">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2 whitespace-nowrap">
              <span>{item.icon}</span>
              <span className="text-gray-300">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
