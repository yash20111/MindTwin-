import { problem } from "@/content/copy";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function ProblemStrip() {
  return (
    <section aria-labelledby="problem-title" className="bg-surface-2 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="problem-title" title={problem.title} />
        <RevealGroup as="ul" className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {problem.cards.map((card) => (
            <RevealItem as="li" key={card.text} className="card flex flex-col gap-4 p-7">
              <span aria-hidden className="text-3xl">
                {card.emoji}
              </span>
              <p className="font-display text-ink text-xl leading-snug font-semibold">
                {card.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
