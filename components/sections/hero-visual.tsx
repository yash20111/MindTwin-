"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Mic, Check } from "lucide-react";
import { hero } from "@/content/copy";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { Waveform } from "@/components/ui/waveform";
import { MemoryCard } from "@/components/ui/memory-card";

const FLOAT_POSITIONS = [
  "left-0 top-[8%] sm:-left-6 lg:-left-16",
  "right-0 top-[30%] sm:-right-4 lg:-right-14",
  "left-0 bottom-[22%] sm:-left-10 lg:-left-20",
  "right-0 bottom-[6%] sm:-right-2 lg:-right-10",
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"recording" | "memory">("recording");

  useEffect(() => {
    // Reduced motion: settle on the finished memory card once, no looping.
    // (Decided after mount so server and client render the same first frame.)
    if (reduce) {
      if (stage === "memory") return;
      const id = window.setTimeout(() => setStage("memory"), 0);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(
      () => setStage((s) => (s === "recording" ? "memory" : "recording")),
      stage === "recording" ? 3200 : 5200,
    );
    return () => window.clearTimeout(id);
  }, [stage, reduce]);

  return (
    <div className="relative mx-auto flex w-full max-w-[520px] justify-center py-6" aria-hidden>
      {/* Twin glow */}
      <div className="bg-twin/25 absolute top-1/4 left-1/2 size-[340px] -translate-x-[70%] rounded-full blur-[90px]" />
      <div className="bg-accent/25 absolute top-1/2 left-1/2 size-[320px] -translate-x-[20%] rounded-full blur-[90px]" />

      <PhoneMockup className="relative z-10">
        <div className="flex h-full flex-col px-4 pt-6 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink-muted font-mono text-[10px] tracking-wider uppercase">
                {hero.phone.today}
              </p>
              <p className="font-display text-ink text-xl font-bold">{hero.phone.greeting}</p>
            </div>
            <span className="bg-signature size-8 rounded-full" />
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <MemoryCard emoji="📍" meta="7:30 AM · Home" className="opacity-70">
              Morning note: 3 priorities for today
            </MemoryCard>
          </div>

          <div className="relative mt-3 min-h-[170px]">
            <AnimatePresence mode="wait" initial={false}>
              {stage === "recording" ? (
                <motion.div
                  key="rec"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="border-border bg-surface shadow-soft flex flex-col items-center gap-3 rounded-2xl border p-4"
                >
                  <div className="text-ink-muted flex w-full items-center justify-between font-mono text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="bg-danger size-2 animate-pulse rounded-full" />
                      {hero.phone.recording}
                    </span>
                    <span>{hero.phone.time}</span>
                  </div>
                  <Waveform bars={24} className="h-12" />
                  <span className="bg-signature text-on-accent grid size-11 place-items-center rounded-full">
                    <Mic className="size-5" strokeWidth={1.75} />
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="mem"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MemoryCard
                    meta={hero.phone.memoryMeta}
                    tags={hero.phone.tags}
                    className="border-accent/40 shadow-lift"
                  >
                    <span className="font-medium">{hero.phone.memoryText}</span>
                  </MemoryCard>
                  <p className="text-success-text mt-2 flex items-center gap-1 text-[11px] font-medium">
                    <Check className="size-3.5" strokeWidth={2} /> {hero.phone.savedLabel}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto flex flex-col gap-2.5">
            <MemoryCard emoji="✅" meta="Reminder · Fri">
              Pay electricity bill
            </MemoryCard>
            <div className="border-border bg-surface-2 text-ink-muted flex items-center gap-2 rounded-full border px-3 py-2.5 text-[12px]">
              <span className="text-twin-text">✦</span> Ask your twin…
            </div>
          </div>
        </div>
      </PhoneMockup>

      {hero.floatingCards.map((card, i) => (
        <motion.div
          key={card.text}
          className={cn(
            "absolute z-20 max-w-[200px] sm:max-w-[230px]",
            FLOAT_POSITIONS[i],
            i >= 2 && "hidden sm:block",
          )}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
        >
          <div
            className={i % 2 === 0 ? "animate-float" : "animate-float-slow"}
            style={{ animationDelay: `${i * -2.3}s` }}
          >
            <div className="glass border-border text-ink shadow-lift flex items-start gap-2 rounded-2xl border px-3 py-2.5 text-[13px] leading-snug backdrop-blur-md backdrop-saturate-150">
              <span>{card.emoji}</span>
              <span>{card.text}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
