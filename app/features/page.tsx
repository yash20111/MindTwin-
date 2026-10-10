import type { Metadata } from "next";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { featuresPage } from "@/content/copy";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCTA } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DiaryDemo } from "@/components/demos/diary-demo";
import {
  AskVisual,
  PeopleVisual,
  ReflectionVisual,
  RemindersVisual,
  TimelineVisual,
  VoiceVisual,
} from "@/components/sections/feature-visuals";

export const metadata: Metadata = {
  title: featuresPage.meta.title,
  description: featuresPage.meta.description,
  alternates: { canonical: "/features" },
  openGraph: {
    title: featuresPage.meta.title,
    description: featuresPage.meta.description,
    url: "/features",
  },
};

const mockups: Record<(typeof featuresPage.sections)[number]["mockup"], ReactNode> = {
  voice: <VoiceVisual />,
  timeline: <TimelineVisual />,
  ask: <AskVisual />,
  reminders: (
    <div className="flex flex-col gap-4">
      <RemindersVisual />
      <p className="border-border bg-surface-2 text-ink rounded-2xl border p-3 text-sm">
        🔔 <strong className="font-semibold">Arrived at office</strong> — “Ask Rahul for the budget
        sheet.”
      </p>
    </div>
  ),
  people: (
    <div className="flex flex-col gap-4">
      <PeopleVisual />
      <p className="border-border bg-surface-2 text-ink rounded-2xl border p-3 text-sm">
        👤 <strong className="font-semibold">Priya</strong> · last talked Sat — Pune trip, Dec 12–15
      </p>
    </div>
  ),
  reflection: <ReflectionVisual />,
};

const d = featuresPage.diarySection;
const heatTone = ["bg-border/60", "bg-twin/25", "bg-accent-2/40", "bg-accent/60", "bg-accent"];

export default function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow={featuresPage.eyebrow} title={featuresPage.title} sub={featuresPage.sub} />

      <div className="container-page flex flex-col gap-20 pb-24 md:gap-28 md:pb-32">
        {featuresPage.sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            <Reveal className={cn("flex flex-col gap-4", i % 2 === 1 && "md:order-2")}>
              <IconBadge icon={s.icon} tone={i % 2 === 1 ? "twin" : "accent"} />
              <h2 id={`${s.id}-title`} className="h2 !text-[clamp(1.75rem,3vw,2.5rem)]">
                {s.title}
              </h2>
              <p className="text-ink-muted text-lg">{s.body}</p>
              <ul className="mt-2 flex flex-col gap-2.5">
                {s.points.map((p) => (
                  <li key={p} className="text-ink flex items-start gap-2.5">
                    <Check
                      className="text-success-text mt-1 size-4 shrink-0"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div
                aria-hidden
                className={cn(
                  "absolute inset-6 rounded-[40px] blur-3xl",
                  i % 2 === 1 ? "bg-twin/15" : "bg-accent/15",
                )}
              />
              <div className="card relative p-6 md:p-8">{mockups[s.mockup]}</div>
            </Reveal>
          </section>
        ))}
      </div>

      {/* Diary deep-dive */}
      <section
        id="diary"
        aria-labelledby="diary-feature-title"
        className="bg-surface-2 py-24 md:py-32"
      >
        <div className="container-page">
          <SectionHeading
            id="diary-feature-title"
            eyebrow={d.eyebrow}
            title={d.title}
            sub={d.sub}
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <DiaryDemo />
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal className="card p-6" delay={0.1}>
                <h3 className="h3">{d.heatmapTitle}</h3>
                <div
                  className="mt-4 grid grid-cols-7 gap-1.5"
                  role="img"
                  aria-label="Sample mood heatmap: mostly good and great days over the month, with a few days without entries."
                >
                  {d.heatmap.map((level, i) => (
                    <span key={i} className={cn("aspect-square rounded-md", heatTone[level])} />
                  ))}
                </div>
                <ul className="text-ink-muted mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {d.heatmapLegend.map((l) => (
                    <li key={l.level} className="flex items-center gap-1.5">
                      <span aria-hidden className={cn("size-3 rounded-sm", heatTone[l.level])} />
                      {l.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="card ruled-paper p-6" delay={0.2}>
                <p className="text-accent-text font-mono text-xs tracking-wider uppercase">
                  {d.onThisDay.label}
                </p>
                <h3 className="font-display text-ink mt-2 text-xl font-bold">{d.onThisDay.date}</h3>
                <p className="text-ink mt-2 leading-8">{d.onThisDay.text}</p>
                <span className="border-border bg-surface text-ink mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-medium">
                  {d.onThisDay.mood}
                </span>
                <p className="text-ink-muted mt-3 text-xs italic">Sample data.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section aria-labelledby="roadmap-title" className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            id="roadmap-title"
            title={featuresPage.roadmap.title}
            sub={featuresPage.roadmap.sub}
          />
          <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuresPage.roadmap.items.map((item) => (
              <RevealItem
                as="li"
                key={item.title}
                className="border-border flex flex-col gap-3 rounded-[var(--radius-card)] border border-dashed p-6"
              >
                <IconBadge icon={item.icon} tone="twin" size="sm" />
                <h3 className="font-display text-ink text-lg font-bold">{item.title}</h3>
                <p className="text-ink-muted text-sm">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
