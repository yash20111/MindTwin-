import { cn } from "@/lib/utils";

const HEIGHTS = [40, 70, 55, 90, 65, 100, 75, 45, 85, 60, 95, 50, 80, 35, 70, 55, 90, 40, 65, 30];

/** CSS-animated audio waveform. Freezes automatically with reduced motion (global CSS). */
export function Waveform({
  bars = 20,
  active = true,
  className,
  barClassName,
}: {
  bars?: number;
  active?: boolean;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div aria-hidden className={cn("flex h-10 items-center gap-[3px]", className)}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={cn("bg-signature w-[3px] origin-center rounded-full", barClassName)}
          style={{
            height: `${HEIGHTS[i % HEIGHTS.length]}%`,
            animation: active
              ? `wave ${0.9 + (i % 5) * 0.15}s ease-in-out ${i * 0.05}s infinite`
              : undefined,
            transform: active ? undefined : "scaleY(0.35)",
          }}
        />
      ))}
    </div>
  );
}
