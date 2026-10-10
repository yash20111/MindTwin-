import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * MindTwin mark: two overlapping rounded circles — a person and their twin —
 * with the overlap filled by the signature gradient.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent, #FF7A45)" />
          <stop offset="100%" stopColor="var(--accent-2, #FFB547)" />
        </linearGradient>
        <clipPath id={`c-${id}`}>
          <circle cx="12" cy="16" r="9" />
        </clipPath>
      </defs>
      <circle cx="20" cy="16" r="9" fill={`url(#g-${id})`} clipPath={`url(#c-${id})`} />
      <circle cx="12" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="16" r="9" fill="none" stroke="var(--twin, #4C6FFF)" strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  if (variant === "mark") return <LogoMark className={className} title="MindTwin" />;
  return (
    <span className={cn("text-ink inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-[1.35rem] leading-none font-bold tracking-tight">
        Mind<span className="text-accent-text">Twin</span>
      </span>
    </span>
  );
}
