import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { hero } from "@/content/copy";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Chip } from "@/components/ui/chip";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent)]"
      />
      <div className="container-page relative grid items-center gap-10 pt-10 pb-20 md:pt-16 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="flex flex-col items-start gap-6">
          <Chip tone="accent" className="px-3.5 py-1.5 text-sm">
            {hero.eyebrow}
          </Chip>
          <h1 id="hero-title" className="h1">
            {hero.titleStart} <span className="text-gradient">{hero.titleHighlight}</span>
          </h1>
          <p className="text-ink-muted max-w-xl text-lg md:text-xl">{hero.sub}</p>

          {/* Desktop: the inline email form is the primary CTA (one "Join the waitlist" only). */}
          <div className="hidden w-full max-w-lg lg:block">
            <WaitlistForm variant="inline" />
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {/* Mobile/tablet: no inline form, so link to the waitlist page instead. */}
            <GradientButton href="/waitlist" size="lg" className="lg:hidden">
              {hero.primaryCta}
            </GradientButton>
            <Link
              href="#how-it-works"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {hero.secondaryCta}
              <ArrowDown aria-hidden />
            </Link>
          </div>

          <div className="w-full">
            <p className="text-ink-muted mb-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase">
              {hero.principlesLabel}
            </p>
            <ul className="text-ink-muted flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {hero.principles.map((p) => (
                <li key={p.label} className="flex items-center gap-1.5">
                  <span aria-hidden>{p.emoji}</span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
