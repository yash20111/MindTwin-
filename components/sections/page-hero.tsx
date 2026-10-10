import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

/** Top-of-page header for secondary pages (renders the page's single h1). */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip pt-14 pb-16 md:pt-20 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="bg-twin/12 pointer-events-none absolute top-10 right-[10%] size-64 rounded-full blur-[90px]"
      />
      <div className="container-page relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} sub={sub} />
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
