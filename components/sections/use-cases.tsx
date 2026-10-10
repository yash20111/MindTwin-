import { Check } from "lucide-react";
import { useCases } from "@/content/copy";
import { icons } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { MemoryCard } from "@/components/ui/memory-card";
import { Reveal } from "@/components/ui/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UseCases() {
  return (
    <section aria-labelledby="usecases-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="usecases-title" eyebrow={useCases.eyebrow} title={useCases.title} />
        <Reveal className="mt-12">
          <Tabs defaultValue={useCases.tabs[0].id} className="flex flex-col items-center">
            <TabsList aria-label={useCases.tabsLabel}>
              {useCases.tabs.map((t) => {
                const Icon = icons[t.icon];
                return (
                  <TabsTrigger key={t.id} value={t.id}>
                    <Icon strokeWidth={1.75} aria-hidden />
                    {t.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {useCases.tabs.map((t) => (
              <TabsContent key={t.id} value={t.id} className="w-full">
                <div className="card grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
                  <div>
                    <p className="font-display text-ink text-xl leading-snug font-semibold md:text-2xl">
                      {t.scenario}
                    </p>
                    <h3 className="text-ink-muted mt-6 mb-3 font-mono text-xs tracking-[0.12em] uppercase">
                      {useCases.momentsLabel}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {t.moments.map((m) => (
                        <li key={m} className="text-ink flex items-start gap-2.5">
                          <span className="bg-accent/15 text-accent-text mt-1 grid size-5 shrink-0 place-items-center rounded-full">
                            <Check className="size-3" strokeWidth={2.5} aria-hidden />
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div
                      aria-hidden
                      className="bg-accent/15 absolute inset-4 rounded-3xl blur-2xl"
                    />
                    <MemoryCard
                      emoji={t.card.emoji}
                      meta={t.card.meta}
                      className="shadow-lift relative p-5 text-base"
                    >
                      <span className="text-base font-medium">{t.card.text}</span>
                    </MemoryCard>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
