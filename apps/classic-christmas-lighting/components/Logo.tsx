import Link from "next/link";

interface LogoProps {
  className?: string;
  /** "light" = gold+white (for dark backgrounds), "dark" = crimson+dark (for light backgrounds) */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { tree: 28, textMain: "text-[0.95rem]", textSub: "text-[0.5rem]", gap: "gap-2" },
  md: { tree: 36, textMain: "text-[1.15rem]", textSub: "text-[0.55rem]", gap: "gap-2.5" },
  lg: { tree: 48, textMain: "text-[1.5rem]", textSub: "text-[0.65rem]", gap: "gap-3" },
};

export function LogoMark({ size = "md", variant = "light" }: LogoProps) {
  const s = sizes[size];
  const starColor = "#D4AF37";
  const treeTopColor = variant === "light" ? "#C41E3A" : "#A01830";
  const treeMidColor = variant === "light" ? "#A01830" : "#7B1225";
  const treeBotColor = variant === "light" ? "#8B1028" : "#5E0D1C";
  const trunkColor = "#D4AF37";
  const textMainColor = variant === "light" ? "#D4AF37" : "#C41E3A";
  const textSubColor = variant === "light" ? "rgba(255,255,255,0.85)" : "rgba(10,20,12,0.7)";
  const h = s.tree;
  const w = Math.round(h * 0.9);

  return (
    <div className={`flex items-center ${s.gap} select-none`}>
      {/* Inline christmas tree SVG */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 36 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Star */}
        <path
          d="M18 1L19.4 5.3H24L20.3 7.8L21.7 12.1L18 9.6L14.3 12.1L15.7 7.8L12 5.3H16.6L18 1Z"
          fill={starColor}
        />
        {/* Top tier */}
        <polygon points="18,7 10,17 26,17" fill={treeTopColor} />
        {/* Mid tier */}
        <polygon points="18,13 6,25 30,25" fill={treeMidColor} />
        {/* Bottom tier */}
        <polygon points="18,19 2,34 34,34" fill={treeBotColor} />
        {/* Trunk */}
        <rect x="15" y="34" width="6" height="5" rx="1" fill={trunkColor} />
        {/* Ornament lights */}
        <circle cx="15" cy="15" r="1.6" fill={starColor} />
        <circle cx="22" cy="18" r="1.4" fill="white" fillOpacity="0.9" />
        <circle cx="10" cy="23" r="1.5" fill={starColor} />
        <circle cx="27" cy="22" r="1.4" fill="white" fillOpacity="0.9" />
        <circle cx="14" cy="29" r="1.6" fill={starColor} />
        <circle cx="25" cy="28" r="1.4" fill="white" fillOpacity="0.9" />
        <circle cx="19" cy="26" r="1.3" fill={starColor} />
      </svg>

      {/* Text stack */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-[0.12em] leading-none ${s.textMain}`}
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            color: textMainColor,
            letterSpacing: "0.1em",
          }}
        >
          CLASSIC
        </span>
        <span
          className={`font-semibold tracking-[0.28em] leading-none mt-1.5 ${s.textSub} uppercase`}
          style={{
            fontFamily: "var(--font-inter, system-ui, sans-serif)",
            color: textSubColor,
          }}
        >
          Christmas Lighting
        </span>
      </div>
    </div>
  );
}

export function LogoLink({ size = "md", variant = "light", className = "" }: LogoProps) {
  return (
    <Link href="/" aria-label="Classic Christmas Lighting — home" className={className}>
      <LogoMark size={size} variant={variant} />
    </Link>
  );
}
