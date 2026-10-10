import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pure-CSS phone frame. Children render as the screen. */
export function PhoneMockup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "border-border bg-ink relative w-[272px] rounded-[44px] border p-[9px] shadow-[0_40px_80px_-30px_rgba(20,22,28,0.45),0_0_0_1px_rgba(255,255,255,0.04)_inset] sm:w-[300px] dark:bg-[#05070A]",
        className,
      )}
    >
      <div className="bg-bg relative h-[540px] overflow-hidden rounded-[36px] sm:h-[590px]">
        {/* Dynamic island */}
        <div className="bg-ink absolute top-2.5 left-1/2 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full dark:bg-black" />
        {/* Status bar */}
        <div className="text-ink relative z-10 flex items-center justify-between px-7 pt-3.5 font-mono text-[11px] font-medium">
          <span>9:41</span>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="flex h-2.5 items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="bg-ink w-[3px] rounded-sm" style={{ height: h }} />
              ))}
            </span>
            <span className="border-ink/70 ml-1 h-[10px] w-[20px] rounded-[3px] border p-[1.5px]">
              <span className="bg-ink block h-full w-3/4 rounded-[1px]" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
