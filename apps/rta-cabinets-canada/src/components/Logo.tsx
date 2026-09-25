import Link from "next/link";

/** Red maple leaf used in the wordmark. */
export function MapleLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 1.5 9.9 5.6c-.2.5-.6.6-1 .4l-1.9-.9 1.3 6.4c.1.6-.2.9-.6.6L5.3 9.7l-.5 1.4c-.1.4-.4.5-.8.4L1 10.6l1 3.6c.1.5 0 .8-.4 1L.5 15.9l4.9 3.6c.4.3.5.6.3 1.1l-.5 1.4 5.2-.9c.4-.1.7.2.7.6l-.3 5h2.4l-.3-5c0-.4.3-.7.7-.6l5.2.9-.5-1.4c-.2-.5-.1-.8.3-1.1l4.9-3.6-1.1-.7c-.4-.2-.5-.5-.4-1l1-3.6-3 1c-.4.1-.7 0-.8-.4l-.5-1.4-2.4 2.4c-.4.3-.7 0-.6-.6l1.3-6.4-1.9.9c-.4.2-.8.1-1-.4L12 1.5Z" />
    </svg>
  );
}

export function Wordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-bold leading-tight tracking-tight ${light ? "text-white" : "text-ink"} ${className}`}>
      <span>RTA Cabinets</span>
      <span className="inline-flex items-center gap-0.5 text-accent">
        Canada
        <MapleLeaf className="h-[1.05em] w-[1.05em] text-red-600" />
      </span>
    </span>
  );
}

export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`text-lg ${className}`} aria-label="RTA Cabinets Canada — home">
      <Wordmark light={light} />
    </Link>
  );
}
