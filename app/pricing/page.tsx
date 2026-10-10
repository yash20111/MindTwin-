import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { pricing, pricingPage } from "@/content/copy";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/sections/page-hero";
import { PricingCards } from "@/components/sections/pricing-cards";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: pricingPage.meta.title,
  description: pricingPage.meta.description,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: pricingPage.meta.title,
    description: pricingPage.meta.description,
    url: "/pricing",
  },
};

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <>
        <Check className="text-success-text mx-auto size-5" strokeWidth={2.25} aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="text-ink-muted/60 mx-auto size-5" strokeWidth={1.75} aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-ink text-sm">{value}</span>;
}

export default function PricingPage() {
  const { comparison } = pricingPage;
  return (
    <>
      <PageHero eyebrow={pricingPage.eyebrow} title={pricingPage.title} sub={pricingPage.sub} />

      <section aria-label="Plans" className="pb-12">
        <div className="container-page">
          <PricingCards plans={[...pricing.plans, pricing.family]} />
          <p className="text-ink-muted mt-8 text-center text-sm">{pricing.note}</p>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="py-20 md:py-28">
        <div className="container-page max-w-5xl">
          <SectionHeading id="compare-title" title={comparison.title} />
          <Reveal className="card mt-12 overflow-x-auto p-0">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Feature comparison between Free, Pro and Family plans
              </caption>
              <thead>
                <tr className="border-border border-b">
                  <th scope="col" className="text-ink-muted p-4 text-sm font-semibold md:p-5">
                    Feature
                  </th>
                  {comparison.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className={cn(
                        "font-display text-ink p-4 text-center text-lg font-bold md:p-5",
                        col === "Pro" && "bg-accent/8",
                      )}
                    >
                      {col}
                      {col === "Family" && (
                        <span className="text-ink-muted block font-sans text-xs font-medium">
                          Coming soon
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.feature} className="border-border border-b last:border-b-0">
                    <th scope="row" className="text-ink p-4 text-[0.95rem] font-medium md:p-5">
                      {row.feature}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={cn("p-4 text-center md:p-5", i === 1 && "bg-accent/8")}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <div className="bg-surface-2/50">
        <FAQ items={pricingPage.faq} title="Pricing questions" eyebrow="FAQ" />
      </div>
      <div className="pt-24">
        <FinalCTA />
      </div>
    </>
  );
}
