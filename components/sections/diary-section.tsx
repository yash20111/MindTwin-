import { diary } from "@/content/copy";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DiaryDemo } from "@/components/demos/diary-demo";

export function DiarySection() {
  return (
    <section
      id="diary"
      aria-labelledby="diary-title"
      className="bg-surface-2 relative overflow-x-clip py-24 md:py-32"
    >
      {/* soft paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--accent-2)_14%,transparent)_1px,transparent_1px)] [background-size:22px_22px] opacity-60"
      />
      <div className="container-page relative grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="diary-title"
            align="left"
            eyebrow={diary.eyebrow}
            title={diary.title}
            sub={diary.sub}
          />
          <RevealGroup
            as="ul"
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          >
            {diary.bullets.map((b) => (
              <RevealItem as="li" key={b.title} className="flex gap-3.5">
                <IconBadge icon={b.icon} size="sm" />
                <div>
                  <h3 className="text-ink font-sans text-base font-semibold">{b.title}</h3>
                  <p className="text-ink-muted text-[0.95rem] leading-relaxed">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Reveal className="lg:sticky lg:top-28">
          <DiaryDemo />
        </Reveal>
      </div>
    </section>
  );
}
