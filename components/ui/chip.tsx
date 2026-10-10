import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Chip({
  className,
  tone = "neutral",
  ...props
}: ComponentProps<"span"> & { tone?: "neutral" | "accent" | "twin" | "success" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
        tone === "neutral" && "border-border bg-surface text-ink-muted border",
        tone === "accent" && "bg-accent/12 text-accent-text",
        tone === "twin" && "bg-twin/12 text-twin-text",
        tone === "success" && "bg-success/12 text-success-text",
        className,
      )}
      {...props}
    />
  );
}
