import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { howItWorks } from "@/content/copy";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="hiw-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="hiw-title"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          sub={howItWorks.sub}
        />

        <div className="relative mt-16">
          {/* Animated dotted connector (desktop: horizontal, mobile: vertical) */}
          <svg
            aria-hidden
            className="absolute top-7 right-[16%] left-[16%] hidden h-2 md:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="0.1 3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: "1 10", animation: "dash 1.2s linear infinite" }}
            />
          </svg>
          <div
            aria-hidden
            className="border-accent/50 absolute top-14 bottom-14 left-7 w-px border-l-2 border-dotted md:hidden"
          />

          <RevealGroup
            as="ol"
            stagger={0.15}
            className="relative grid gap-10 md:grid-cols-3 md:gap-8"
          >
            {howItWorks.steps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.title}
                className="flex gap-5 md:flex-col md:items-center md:text-center"
              >
                <div className="relative">
                  <IconBadge
                    icon={step.icon}
                    size="lg"
                    tone={i === 2 ? "twin" : "accent"}
                    className="bg-surface ring-border ring-1 [box-shadow:var(--shadow-soft)]"
                  />
                  <span className="bg-ink text-bg absolute -top-2 -right-2 grid size-6 place-items-center rounded-full font-mono text-[11px] font-medium">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-2 md:max-w-xs">
                  <h3 className="h3">{step.title}</h3>
                  <p className="text-ink-muted">{step.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/how-it-works"
            className="text-twin-text inline-flex min-h-11 items-center gap-1.5 font-semibold hover:underline"
          >
            {howItWorks.link} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
