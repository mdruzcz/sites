export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-2.5">
      {items.map((f) => (
        <details key={f.q} className="card group px-5">
          <summary className="flex min-h-[60px] items-center justify-between gap-4 py-3 font-black tracking-[-0.01em]">
            <span>{f.q}</span>
            <span aria-hidden className="faq-plus grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--page)] text-xl leading-none transition-transform">
              +
            </span>
          </summary>
          <p className="pb-5 pr-10 text-[var(--muted)]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
