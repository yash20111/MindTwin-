import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { aboutPage } from "@/content/copy";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCTA } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: aboutPage.meta.title,
  description: aboutPage.meta.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: aboutPage.meta.title,
    description: aboutPage.meta.description,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutPage.eyebrow} title={aboutPage.title} sub={aboutPage.sub} />

      <section aria-labelledby="story-title" className="pb-24 md:pb-32">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal className="relative hidden lg:block">
            <div className="border-border bg-surface-2 sticky top-28 grid aspect-square place-items-center rounded-[40px] border">
              <div aria-hidden className="bg-accent/20 absolute inset-16 rounded-full blur-3xl" />
              <LogoMark className="text-ink relative size-40" />
            </div>
          </Reveal>
          <Reveal>
            <h2 id="story-title" className="h2">
              {aboutPage.story.title}
            </h2>
            <div className="text-ink-muted mt-8 flex flex-col gap-5 text-lg leading-relaxed">
              {aboutPage.story.paragraphs.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-surface-2/60 py-24 md:py-32">
        <div className="container-page">
          <SectionHeading id="values-title" title={aboutPage.values.title} />
          <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {aboutPage.values.items.map((v) => (
              <RevealItem as="li" key={v.title} className="card flex flex-col gap-3 p-7">
                <IconBadge icon={v.icon} />
                <h3 className="h3">{v.title}</h3>
                <p className="text-ink-muted">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="hiring-title" className="py-24">
        <Reveal className="container-page flex flex-col items-center gap-4 text-center">
          <h2 id="hiring-title" className="h2">
            {aboutPage.hiring.title}
          </h2>
          <p className="text-ink-muted max-w-xl text-lg">{aboutPage.hiring.body}</p>
          <a
            href={`mailto:${siteConfig.email.hello}`}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Mail aria-hidden /> {aboutPage.hiring.cta}
          </a>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}
