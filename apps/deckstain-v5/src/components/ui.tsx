import Link from "next/link";
import Image from "next/image";

export const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 text-[var(--green)] shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.37 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.17 0l-2.8 2.03c-.79.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.37-1.12L2.96 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z" />
        </svg>
      ))}
    </span>
  );
}

export function Heading({ eyebrow, title, intro, center = true, wood = false }: { eyebrow?: string; title: React.ReactNode; intro?: string; center?: boolean; wood?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12 md:mb-16`}>
      {eyebrow && <p className={`eyebrow mb-3 ${wood ? "eyebrow-wood" : ""}`}>{eyebrow}</p>}
      <h2 className="h text-[1.9rem] md:text-[2.6rem] text-[var(--ink)]">{title}</h2>
      {intro && <p className="muted text-[1.1rem] mt-4 leading-relaxed">{intro}</p>}
    </div>
  );
}

export function Arrow({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 font-semibold text-[var(--green)] hover:gap-2.5 transition-all" style={{ fontFamily: "var(--font-head)" }}>
      {children}
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
    </Link>
  );
}

export function Photo({ src, alt, className = "", priority = false, sizes = "100vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} priority={priority} sizes={sizes} />
    </div>
  );
}
