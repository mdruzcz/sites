/** Clean line-art delivery truck — used next to "free shipping" messaging. */
export function TruckIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6.5h10.5v8.5H3z" />
      <path d="M13.5 9h3.4l2.6 2.7V15h-6z" />
      <circle cx="7" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
      <path d="M3 15h.8M8.8 17h6M18.3 17H21v-2" />
    </svg>
  );
}
