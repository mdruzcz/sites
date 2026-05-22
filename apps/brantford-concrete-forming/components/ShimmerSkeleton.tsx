export default function ShimmerSkeleton({
  className = "",
  height = "h-48",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <div
      className={`shimmer rounded-lg ${height} ${className}`}
      aria-hidden="true"
    />
  );
}
