import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { privacy } from "@/content/copy";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

// TODO(legal): commitments below must be reviewed by counsel before launch.
export function PrivacySection() {
  return (
    <section
      aria-labelledby="privacy-title"
      className="relative overflow-hidden border-y border-white/5 bg-[#12151B] py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] max-w-[140%] -translate-x-1/2 rounded-full bg-[#FF8A5B]/18 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[400px] rounded-full bg-[#7B93FF]/15 blur-[100px]"
      />
      <div className="container-page relative">
        <SectionHeading
          invert
          id="privacy-title"
          eyebrow={privacy.eyebrow}
          title={privacy.title}
          sub={privacy.sub}
        />

        <RevealGroup as="ul" className="mt-14 grid gap-4 md:grid-cols-6 md:gap-5">
          {privacy.principles.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              className={cn(
                "flex flex-col gap-4 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7",
                i < 3 ? "md:col-span-2" : "md:col-span-3",
              )}
            >
              <IconBadge icon={p.icon} tone="dark" />
              <h3 className="font-display text-xl font-bold text-[#F2EFEA]">{p.title}</h3>
              <p className="text-[#B9BDC8]">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <Link
            href="/privacy-promise"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-semibold text-[#FFB08C] hover:underline"
          >
            {privacy.link} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
