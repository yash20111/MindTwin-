import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pricing } from "@/content/copy";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCards } from "./pricing-cards";

export function PricingTeaser() {
  return (
    <section aria-labelledby="pricing-title" className="bg-surface-2/50 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="pricing-title"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          sub={pricing.sub}
        />
        <PricingCards plans={pricing.plans} className="mt-14" />
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-ink-muted text-sm">{pricing.note}</p>
          <Link
            href="/pricing"
            className="text-twin-text inline-flex min-h-11 items-center gap-1.5 font-semibold hover:underline"
          >
            {pricing.fullLink} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
