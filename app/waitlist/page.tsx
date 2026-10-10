import type { Metadata } from "next";
import { waitlistPage } from "@/content/copy";
import { IconBadge } from "@/components/ui/icon-badge";
import { Chip } from "@/components/ui/chip";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export const metadata: Metadata = {
  title: waitlistPage.meta.title,
  description: waitlistPage.meta.description,
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: waitlistPage.meta.title,
    description: waitlistPage.meta.description,
    url: "/waitlist",
  },
};

export default function WaitlistPage() {
  return (
    <section className="relative overflow-x-clip pt-12 pb-24 md:pt-20 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-2)_24%,transparent),transparent)]"
      />
      <div className="container-page relative grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-20">
        <div className="flex flex-col items-start gap-5 lg:pt-8">
          <Chip tone="accent" className="px-3.5 py-1.5 text-sm">
            {waitlistPage.eyebrow}
          </Chip>
          <h1 className="h1">{waitlistPage.title}</h1>
          <p className="text-ink-muted max-w-lg text-lg">{waitlistPage.sub}</p>
          <ul className="mt-4 flex flex-col gap-5">
            {waitlistPage.benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <IconBadge icon={b.icon} />
                <div>
                  <h2 className="text-ink font-sans text-base font-semibold">{b.title}</h2>
                  <p className="text-ink-muted">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card shadow-lift relative p-6 md:p-8">
          <WaitlistForm variant="full" />
        </div>
      </div>
    </section>
  );
}
