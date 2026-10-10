import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "h-12 w-full min-w-0 rounded-[var(--radius-input)] border border-border bg-surface px-4 text-base text-ink shadow-[inset_0_1px_2px_rgba(20,22,28,0.04)] transition-colors placeholder:text-ink-muted/80 hover:border-ink-muted/40 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputClass, className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        inputClass,
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235B6070' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
        className,
      )}
      {...props}
    />
  );
}
