import Link from "next/link";
import { Check } from "lucide-react";
import type { Plan } from "@/content/copy";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function PricingCards({ plans, className }: { plans: Plan[]; className?: string }) {
  return (
    <RevealGroup
      className={cn(
        "mx-auto grid gap-5",
        plans.length === 3 ? "max-w-6xl lg:grid-cols-3" : "max-w-4xl md:grid-cols-2",
        className,
      )}
    >
      {plans.map((plan) => (
        <RevealItem
          key={plan.id}
          className={cn(
            "relative flex flex-col gap-6 rounded-[var(--radius-card)] border p-7 md:p-8",
            plan.highlighted
              ? "bg-surface shadow-lift ring-accent border-transparent ring-2"
              : "border-border bg-surface shadow-soft",
            plan.comingSoon && "bg-surface-2/60 shadow-none",
          )}
        >
          {plan.badge && (
            <span className="bg-signature text-on-accent shadow-soft absolute -top-3.5 left-7 rounded-full px-3.5 py-1 text-xs font-bold">
              {plan.badge}
            </span>
          )}
          <div>
            <h3 className="h3">{plan.name}</h3>
            <p className="text-ink-muted mt-1">{plan.description}</p>
          </div>
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            <span
              className={cn(
                "font-display text-ink font-extrabold tracking-tight",
                plan.comingSoon ? "text-3xl" : "text-5xl",
              )}
            >
              {plan.price}
            </span>
            {plan.period && <span className="text-ink-muted">{plan.period}</span>}
            {plan.note && <span className="text-ink-muted font-mono text-sm">({plan.note})</span>}
          </p>
          <ul className="flex flex-col gap-3">
            {plan.features.map((f) => (
              <li key={f} className="text-ink flex items-start gap-2.5">
                <Check
                  className={cn(
                    "mt-1 size-4 shrink-0",
                    plan.highlighted ? "text-accent-text" : "text-success-text",
                  )}
                  strokeWidth={2.25}
                  aria-hidden
                />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/waitlist"
            className={cn(
              buttonVariants({ variant: plan.highlighted ? "gradient" : "outline", size: "lg" }),
              "mt-auto w-full",
            )}
          >
            {plan.cta}
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
