import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A small "memory" as it appears in the MindTwin app. */
export function MemoryCard({
  emoji,
  meta,
  children,
  tags,
  className,
}: {
  emoji?: string;
  meta?: ReactNode;
  children: ReactNode;
  tags?: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-surface shadow-soft rounded-2xl border p-3.5 text-left",
        className,
      )}
    >
      {meta && (
        <p className="text-ink-muted mb-1.5 flex items-center gap-1.5 font-mono text-[0.7rem] leading-tight">
          {emoji && <span aria-hidden>{emoji}</span>}
          {meta}
        </p>
      )}
      <div className="text-ink text-sm leading-snug">{children}</div>
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-twin/12 text-twin-text rounded-full px-2 py-0.5 font-mono text-[0.68rem]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
