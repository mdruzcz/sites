type Props = { icon: string; className?: string };

export function ServiceIcon({ icon, className = "w-7 h-7" }: Props) {
  const props = {
    className,
    fill: "none" as const,
    stroke: "currentColor" as const,
    viewBox: "0 0 24 24",
    strokeWidth: 1.75,
  };
  switch (icon) {
    case "sparkles":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.5 6L22 11l-6.5 2L13 19l-2.5-6L4 11l6.5-2L13 3z" />
        </svg>
      );
    case "frame":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm0 4h16M4 16h16M8 4v16M16 4v16" />
        </svg>
      );
    case "rgb":
      return (
        <svg {...props}>
          <circle cx="9" cy="10" r="5" />
          <circle cx="15" cy="10" r="5" />
          <circle cx="12" cy="15" r="5" />
        </svg>
      );
    case "stage":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V11l7-5 7 5v10M9 21v-6h6v6M12 3v2" />
        </svg>
      );
    case "tree":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l6 7h-3l4 5h-3l4 5H4l4-5H5l4-5H6l6-7zM12 20v2" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
