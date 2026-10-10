import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail, X } from "lucide-react";
import { privacyPromisePage as p } from "@/content/copy";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: { canonical: "/privacy-promise" },
  openGraph: { title: p.meta.title, description: p.meta.description, url: "/privacy-promise" },
};

// TODO(legal): every commitment on this page must be reviewed by legal counsel before launch.
export default function PrivacyPromisePage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} sub={p.sub} />

      <section aria-label="Our commitments" className="pb-24">
        <div className="container-page">
          <RevealGroup as="ul" className="grid gap-4 md:grid-cols-6">
            {p.commitments.map((c, i) => (
              <RevealItem
                as="li"
                key={c.title}
                className={`card flex flex-col gap-3 p-6 md:p-7 ${i < 3 ? "md:col-span-2" : "md:col-span-3"}`}
              >
                <IconBadge icon={c.icon} />
                <h2 className="h3">{c.title}</h2>
                <p className="text-ink-muted">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="collect-title" className="bg-surface-2/60 py-24 md:py-32">
        <div className="container-page">
          <SectionHeading id="collect-title" title={p.table.title} />
          <Reveal className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="card p-6 md:p-8">
              <h3 className="h3">{p.table.collectTitle}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {p.table.collect.map((item) => (
                  <li key={item} className="text-ink flex items-start gap-3">
                    <span className="bg-success/15 text-success-text mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-danger/25 p-6 md:p-8">
              <h3 className="h3">{p.table.neverTitle}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {p.table.never.map((item) => (
                  <li key={item} className="text-ink flex items-start gap-3">
                    <span className="bg-danger/12 text-danger-text mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                      <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="controls-title" className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading id="controls-title" title={p.controls.title} />
          <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.controls.items.map((c) => (
              <RevealItem as="li" key={c.title} className="card flex flex-col gap-3 p-6">
                <IconBadge icon={c.icon} tone="twin" size="sm" />
                <h3 className="font-display text-ink text-lg font-bold">{c.title}</h3>
                <p className="text-ink-muted text-sm">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="border-border bg-surface-2 mx-auto mt-16 max-w-3xl rounded-[var(--radius-card)] border p-6 text-center md:p-8">
            {/* TODO(legal): confirm DPDP Act / GDPR compliance claims with counsel. */}
            <p className="text-ink">{p.regulations}</p>
          </Reveal>

          <Reveal className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h2 className="h3">{p.contactTitle}</h2>
            <p className="text-ink-muted">{p.contactBody}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${siteConfig.email.privacy}`}
                className={buttonVariants({ variant: "ink" })}
              >
                <Mail aria-hidden /> {siteConfig.email.privacy}
              </a>
              <Link href="/legal/privacy" className={buttonVariants({ variant: "outline" })}>
                {p.legalLink}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
