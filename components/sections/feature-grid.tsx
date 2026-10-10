import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { featureGrid } from "@/content/copy";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  AskVisual,
  PeopleVisual,
  ReflectionVisual,
  RemindersVisual,
  TimelineVisual,
  VoiceVisual,
} from "./feature-visuals";

const c = featureGrid.cards;

type Card = {
  key: string;
  icon: IconName;
  title: string;
  body: string;
  visual: ReactNode;
  span: string;
  tone?: "accent" | "twin";
};

// Bento: 6-col grid on desktop → L(4) M(2) / M(2) S(2) S(2) / L(6)
const cards: Card[] = [
  { key: "voice", icon: "mic", ...c.voice, visual: <VoiceVisual />, span: "lg:col-span-4" },
  {
    key: "timeline",
    icon: "calendarClock",
    ...c.timeline,
    visual: <TimelineVisual />,
    span: "lg:col-span-2",
    tone: "twin",
  },
  { key: "ask", icon: "ask", ...c.ask, visual: <AskVisual />, span: "lg:col-span-2", tone: "twin" },
  {
    key: "reminders",
    icon: "bell",
    ...c.reminders,
    visual: <RemindersVisual />,
    span: "lg:col-span-2",
  },
  { key: "people", icon: "users", ...c.people, visual: <PeopleVisual />, span: "lg:col-span-2" },
  {
    key: "reflection",
    icon: "chart",
    ...c.reflection,
    visual: <ReflectionVisual />,
    span: "lg:col-span-6",
  },
];

export function FeatureGrid() {
  return (
    <section aria-labelledby="features-title" className="bg-surface-2/50 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="features-title"
          eyebrow={featureGrid.eyebrow}
          title={featureGrid.title}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {cards.map((card) => (
            <RevealItem
              key={card.key}
              className={cn(
                "card gradient-border group hover:shadow-lift flex flex-col gap-6 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 md:p-7",
                card.span,
                (card.key === "voice" || card.key === "reflection") && "sm:col-span-2",
                card.key === "reflection" && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10",
              )}
            >
              <div className="flex flex-col gap-3">
                <IconBadge icon={card.icon} tone={card.tone} />
                <h3 className="h3">{card.title}</h3>
                <p className="text-ink-muted">{card.body}</p>
              </div>
              <div className="mt-auto">{card.visual}</div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <Link
            href="/features"
            className="text-twin-text inline-flex min-h-11 items-center gap-1.5 font-semibold hover:underline"
          >
            {featureGrid.link} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
