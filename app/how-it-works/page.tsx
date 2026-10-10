import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { Fragment } from "react";
import { howItWorksPage } from "@/content/copy";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCTA } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: howItWorksPage.meta.title,
  description: howItWorksPage.meta.description,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: howItWorksPage.meta.title,
    description: howItWorksPage.meta.description,
    url: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  const { diagram } = howItWorksPage;
  return (
    <>
      <PageHero
        eyebrow={howItWorksPage.eyebrow}
        title={howItWorksPage.title}
        sub={howItWorksPage.sub}
      />

      {/* Diagram: Capture → Understand → Memory vault → Ask */}
      <section aria-labelledby="diagram-title" className="pb-20">
        <div className="container-page">
          <h2 id="diagram-title" className="sr-only">
            {diagram.title}
          </h2>
          <Reveal className="card overflow-hidden p-6 md:p-10">
            <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
              {diagram.nodes.map((node, i) => (
                <Fragment key={node.label}>
                  <li
                    className={cn(
                      "flex flex-1 items-center gap-4 rounded-2xl border p-4 lg:flex-col lg:p-6 lg:text-center",
                      node.icon === "lock"
                        ? "border-twin/30 bg-twin/8 ring-twin/5 ring-4"
                        : "border-border bg-surface-2/60",
                    )}
                  >
                    <IconBadge
                      icon={node.icon}
                      tone={node.icon === "lock" || node.icon === "ask" ? "twin" : "accent"}
                    />
                    <div>
                      <p className="font-display text-ink text-lg font-bold">{node.label}</p>
                      <p className="text-ink-muted text-sm">{node.sub}</p>
                    </div>
                  </li>
                  {i < diagram.nodes.length - 1 && (
                    <li aria-hidden className="text-accent-text flex justify-center">
                      <ArrowDown className="size-5 lg:hidden" strokeWidth={1.75} />
                      <ArrowRight className="hidden size-5 lg:block" strokeWidth={1.75} />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="bg-surface-2/60 py-24 md:py-32">
        <div className="container-page">
          <SectionHeading id="steps-title" title="Step by step" />
          <RevealGroup as="ol" className="mx-auto mt-14 flex max-w-4xl flex-col gap-5">
            {howItWorksPage.steps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.title}
                className="card grid gap-6 p-6 md:grid-cols-[auto_1fr_1fr] md:p-8"
              >
                <IconBadge icon={step.icon} size="lg" tone={i % 2 ? "twin" : "accent"} />
                <div>
                  <h3 className="h3">{step.title}</h3>
                  <p className="text-ink-muted mt-2">{step.body}</p>
                </div>
                <ul className="border-border flex flex-col gap-2 border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                  {step.details.map((detail) => (
                    <li key={detail} className="text-ink flex items-start gap-2 text-sm">
                      <Check
                        className="text-success-text mt-0.5 size-4 shrink-0"
                        strokeWidth={2.25}
                        aria-hidden
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="pt-24">
        <FinalCTA />
      </div>
    </>
  );
}
