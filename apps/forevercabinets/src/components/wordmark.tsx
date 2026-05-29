import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Wordmark({ className, size = "md" }: Props) {
  const sizes: Record<string, string> = {
    sm: "text-[15px] tracking-[0.32em]",
    md: "text-[18px] tracking-[0.34em]",
    lg: "text-[28px] tracking-[0.38em]",
  };
  return (
    <span className={cn("inline-flex flex-col items-center select-none", className)}>
      <span
        className={cn(
          "font-display font-medium uppercase text-[var(--color-navy)] leading-none",
          sizes[size],
        )}
      >
        Forever
      </span>
      <span
        className={cn(
          "font-display font-light uppercase text-[var(--color-navy)] leading-none mt-0.5",
          sizes[size],
        )}
      >
        Cabinets
      </span>
      <span
        aria-hidden="true"
        className="mt-1.5 block h-[1.5px] w-[60%] bg-[var(--color-brass)]"
      />
    </span>
  );
}
