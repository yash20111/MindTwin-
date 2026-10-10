"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { timeline, type TimelineFilter } from "@/content/copy";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function TimelineShowcase() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const items = timeline.items.filter((i) => filter === "all" || i.categories.includes(filter));

  return (
    <section aria-labelledby="timeline-title" className="bg-surface-2/50 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="timeline-title"
          eyebrow={timeline.eyebrow}
          title={timeline.title}
          sub={timeline.sub}
        />

        <Reveal className="mt-10 flex flex-col items-center gap-4">
          <div
            role="group"
            aria-label={timeline.filtersLabel}
            className="flex flex-wrap justify-center gap-2"
          >
            {timeline.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
                  filter === f.id
                    ? "border-ink bg-ink text-bg"
                    : "border-border bg-surface text-ink-muted hover:text-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="text-ink-muted font-mono text-xs">{timeline.dayLabel}</p>
        </Reveal>

        <div className="relative mt-12">
          {/* Track: vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden
            className="from-accent via-accent-2 to-twin absolute top-0 bottom-0 left-[22px] w-0.5 rounded-full bg-gradient-to-b lg:top-[22px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
          />

          <LayoutGroup>
            <motion.ol
              layout={!reduce}
              className="relative flex flex-col gap-6 lg:flex-row lg:gap-4"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item, i) => (
                  <motion.li
                    key={item.time}
                    layout={!reduce}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
                    transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
                    className="flex gap-4 lg:flex-1 lg:flex-col lg:gap-5"
                  >
                    <span className="border-border bg-surface shadow-soft relative z-10 grid size-11 shrink-0 place-items-center rounded-full border text-lg">
                      <span aria-hidden>{item.emoji}</span>
                    </span>
                    <div className="card flex-1 p-4">
                      <p className="text-accent-text font-mono text-xs font-medium">{item.time}</p>
                      <h3 className="font-display text-ink mt-1 text-lg font-bold">{item.title}</h3>
                      <p className="text-ink-muted mt-1 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ol>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
