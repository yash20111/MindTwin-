import { finalCta } from "@/content/copy";
import { LogoMark } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="pt-8 pb-24 md:pb-32">
      <div className="container-page">
        <Reveal className="relative">
          <div
            aria-hidden
            className="bg-signature absolute inset-x-8 top-10 -bottom-6 rounded-[40px] opacity-50 blur-3xl"
          />
          <div className="bg-signature shadow-lift relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-10 md:py-20">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 size-72 rounded-full bg-[#4C6FFF]/25 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/30 blur-3xl"
            />
            <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/50 text-[#14161C] backdrop-blur">
                <LogoMark className="size-9" />
              </span>
              <h2 id="final-cta-title" className="h2 !text-[#14161C]">
                {finalCta.title}
              </h2>
              <p className="text-lg text-[#14161C]/85">{finalCta.sub}</p>
              <WaitlistForm variant="inline" tone="glow" className="mt-2 text-left" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
