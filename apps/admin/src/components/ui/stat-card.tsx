export function StatCard({
  label,
  value,
  hint,
  tone = "default"
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "warning" | "danger" | "success";
}) {
  const toneClasses = {
    default: "border-slate-200 bg-white",
    warning: "border-amber-200 bg-amber-50",
    danger: "border-rose-200 bg-rose-50",
    success: "border-emerald-200 bg-emerald-50"
  }[tone];

  return (
    <div className={`rounded-lg border p-4 ${toneClasses}`}>
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
